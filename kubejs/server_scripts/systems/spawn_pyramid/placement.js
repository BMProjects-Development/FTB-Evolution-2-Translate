// priority: 120
let spawnPyramidBusy = false;

const spawnPyramidTell = (source, component) => {
  if (!source) return;
  try {
    source.sendSuccess(component, false);
  } catch (e) {
    SpawnPyramid.warn("could not reach command source: " + e);
  }
};

const spawnPyramidRelease = (server, range) => {
  try {
    SpawnPyramid.forceChunks(server, range, false);
  } catch (e) {
    SpawnPyramid.error("could not release force-loaded chunks: " + e);
  }
};

const spawnPyramidSucceed = (server, origin, range, source) => {
  let data = SpawnPyramid.data(server);
  let claim = null;
  let rotation = SpawnPyramid.detectRotation(server, origin);
  data.putString("state", "done");
  data.putInt("originX", origin.x);
  data.putInt("originY", origin.y);
  data.putInt("originZ", origin.z);
  data.putInt("rotation", rotation < 0 ? 0 : rotation);
  SpawnPyramid.applyWorldSpawn(server);
  spawnPyramidRelease(server, range);
  try {
    claim = SpawnPyramid.claim(server, origin);
  } catch (e) {
    SpawnPyramid.error("claim step threw, run /ftbevolution2 claim to retry: " + e);
  }
  data.putBoolean("claimed", claim !== null && claim.claimed > 0);
  SpawnPyramid.log("placed at " + origin.x + " " + origin.y + " " + origin.z);
  spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.placed", [origin.x, origin.y, origin.z]).green());
  spawnPyramidBusy = false;
};

const spawnPyramidFail = (server, range, reason, source) => {
  let data = SpawnPyramid.data(server);
  let attempts = data.getIntOr("attempts", 0);
  spawnPyramidRelease(server, range);
  spawnPyramidBusy = false;
  if (attempts >= SpawnPyramid.MAX_ATTEMPTS) {
    data.putString("state", "failed");
    SpawnPyramid.error("giving up after " + attempts + " attempts: " + reason);
    spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.failed").red());
    return;
  }
  SpawnPyramid.warn("attempt " + attempts + " failed (" + reason + "), retrying");
  spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.retrying").yellow());
  server.scheduleInTicks(SpawnPyramid.POLL_TICKS * 5, () => spawnPyramidAttempt(server, source));
};

const spawnPyramidCheck = (server, origin, range, source) => {
  try {
    if (SpawnPyramid.verify(server, origin)) {
      spawnPyramidSucceed(server, origin, range, source);
      return;
    }
    spawnPyramidFail(server, range, "verification found missing blocks", source);
  } catch (e) {
    SpawnPyramid.error("verification threw: " + e);
    spawnPyramidFail(server, range, "verification threw", source);
  }
};

const spawnPyramidBuild = (server, origin, range, source) => {
  let data = SpawnPyramid.data(server);
  data.putInt("attempts", data.getIntOr("attempts", 0) + 1);
  if (!SpawnPyramid.runPlace(server, origin)) {
    spawnPyramidFail(server, range, "place command errored", source);
    return;
  }
  server.scheduleInTicks(SpawnPyramid.POLL_TICKS, () => spawnPyramidCheck(server, origin, range, source));
};

const spawnPyramidWait = (server, origin, range, polls, source) => {
  let missing = 0;
  try {
    missing = SpawnPyramid.missingChunks(server, range);
  } catch (e) {
    SpawnPyramid.error("chunk check threw: " + e);
    spawnPyramidFail(server, range, "chunk check threw", source);
    return;
  }
  if (missing === 0) {
    spawnPyramidBuild(server, origin, range, source);
    return;
  }
  if (polls >= SpawnPyramid.POLL_LIMIT) {
    spawnPyramidFail(server, range, missing + " chunks never loaded", source);
    return;
  }
  server.scheduleInTicks(SpawnPyramid.POLL_TICKS, () => spawnPyramidWait(server, origin, range, polls + 1, source));
};

const spawnPyramidAttempt = (server, source) => {
  let data = null;
  let origin = null;
  let range = null;
  let reuse = null;

  if (spawnPyramidBusy) {
    spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.busy").yellow());
    return;
  }

  try {
    data = SpawnPyramid.data(server);

    if (data.getStringOr("state", "pending") === "done") {
      origin = SpawnPyramid.storedOrigin(server);
      if (SpawnPyramid.missingChunks(server, SpawnPyramid.pyramidRange(origin, 0)) > 0) {
        SpawnPyramid.log("spawn structure area is not loaded, leaving the recorded placement alone");
        spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.already", [origin.x, origin.y, origin.z]).green());
        return;
      }
      if (SpawnPyramid.verify(server, origin)) {
        if (!data.getBooleanOr("claimed", false)) {
          data.putBoolean("claimed", SpawnPyramid.claim(server, origin) !== null);
        }
        spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.already", [origin.x, origin.y, origin.z]).green());
        return;
      }
      SpawnPyramid.warn("recorded placement no longer verifies, rebuilding at the recorded origin");
      data.putString("state", "pending");
      data.putInt("attempts", 0);
      reuse = origin;
    }

    if (data.getStringOr("state", "pending") === "failed" && !source) {
      SpawnPyramid.warn("placement is marked failed, run /ftbevolution2 place to retry");
      return;
    }

    spawnPyramidBusy = true;
    origin = reuse || SpawnPyramid.spawnOrigin();
    range = SpawnPyramid.pyramidRange(origin, SpawnPyramid.LOAD_MARGIN);
    SpawnPyramid.log("preparing " + SpawnPyramid.chunkCount(range) + " chunks around " + origin.x + "/" + origin.z);
    SpawnPyramid.forceChunks(server, range, true);
    server.scheduleInTicks(SpawnPyramid.POLL_TICKS, () => spawnPyramidWait(server, origin, range, 0, source));
  } catch (e) {
    spawnPyramidBusy = false;
    SpawnPyramid.error("placement aborted: " + e);
    spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.failed").red());
  }
};

const spawnPyramidVerifyWhenLoaded = (server, origin, polls) => {
  let missing = 0;
  try {
    missing = SpawnPyramid.missingChunks(server, SpawnPyramid.pyramidRange(origin, 0));
  } catch (e) {
    SpawnPyramid.warn("verification chunk check threw: " + e);
    return;
  }
  if (missing > 0) {
    if (polls >= SpawnPyramid.POLL_LIMIT) {
      SpawnPyramid.log("verification skipped, the spawn area never loaded this session");
      return;
    }
    server.scheduleInTicks(SpawnPyramid.POLL_TICKS, () => spawnPyramidVerifyWhenLoaded(server, origin, polls + 1));
    return;
  }
  if (SpawnPyramid.verify(server, origin)) {
    SpawnPyramid.log("worldgen structure verified at " + origin.x + " " + origin.y + " " + origin.z);
  } else {
    SpawnPyramid.error("the spawn structure did not generate with this world; create a new world, or an admin can run /ftbevolution2 place");
  }
};

const spawnPyramidClaimWhenReady = (server, origin, polls) => {
  let data = SpawnPyramid.data(server);
  let claim = null;
  if (data.getBooleanOr("claimed", false)) return;
  try {
    claim = SpawnPyramid.claim(server, origin);
  } catch (e) {
    SpawnPyramid.error("claim step threw, run /ftbevolution2 claim to retry: " + e);
    return;
  }
  if (claim !== null) {
    data.putBoolean("claimed", claim.claimed > 0);
    return;
  }
  if (polls >= SpawnPyramid.POLL_LIMIT) {
    SpawnPyramid.error("claim managers never became available, run /ftbevolution2 claim");
    return;
  }
  server.scheduleInTicks(SpawnPyramid.POLL_TICKS, () => spawnPyramidClaimWhenReady(server, origin, polls + 1));
};

const spawnPyramidBoot = (server) => {
  let data = null;
  let origin = null;
  try {
    data = SpawnPyramid.data(server);
    origin = SpawnPyramid.spawnOrigin();
    SpawnPyramid.log("boot check: state " + data.getStringOr("state", "pending") + ", claimed " + data.getBooleanOr("claimed", false));
    if (data.getStringOr("state", "pending") !== "done") {
      data.putString("state", "done");
      data.putInt("originX", origin.x);
      data.putInt("originY", origin.y);
      data.putInt("originZ", origin.z);
      data.putInt("rotation", 0);
    }
    SpawnPyramid.applyWorldSpawn(server);
    spawnPyramidClaimWhenReady(server, origin, 0);
    spawnPyramidVerifyWhenLoaded(server, origin, 0);
  } catch (e) {
    SpawnPyramid.error("boot threw: " + e);
  }
};

ServerEvents.loaded((event) => {
  try {
    SpawnPyramid.data(event.server);
    event.server.scheduleInTicks(SpawnPyramid.BOOT_DELAY, () => spawnPyramidBoot(event.server));
  } catch (e) {
    SpawnPyramid.error("startup hook failed: " + e);
  }
});
