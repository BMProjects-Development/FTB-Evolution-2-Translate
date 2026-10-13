// priority: 115
const $SpawnWaystoneBlockEntity = Java.loadClass("net.blay09.mods.waystones.block.entity.WaystoneBlockEntityBase");
const $SpawnWaystoneVisibility = Java.loadClass("net.blay09.mods.waystones.api.WaystoneVisibility");
const $SpawnWaystoneIndex = Java.loadClass("net.blay09.mods.waystones.core.WaystoneIndexManager");
const $SpawnWaystoneSync = Java.loadClass("net.blay09.mods.waystones.core.WaystoneSyncManager");
const $SpawnWaystoneStore = Java.loadClass("net.blay09.mods.waystones.store.SavedDataWaystonesStore");
const $SpawnWaystoneUUID = Java.loadClass("java.util.UUID");
const $SpawnWaystoneBlockPos = Java.loadClass("net.minecraft.core.BlockPos");

const SpawnWaystone = {
  BLOCK: "waystones:prismarine_waystone",
  OFFSET: { x: 62, y: 43, z: 118 },
  NAME: "Spawn",
  OWNER_UUID: "5f0b1e6a-3c2d-4e8f-9a71-0d4c2b8e6f13",
  OWNER_NAME: "Spawn",
};

const spawnWaystonePos = (server) => {
  let origin = SpawnPyramid.storedOrigin(server);
  let rotation = SpawnPyramid.data(server).getIntOr("rotation", 0);
  let mapped = SpawnPyramid.rotate(SpawnWaystone.OFFSET.x, SpawnWaystone.OFFSET.z, rotation);
  return { x: origin.x + mapped.x, y: origin.y + SpawnWaystone.OFFSET.y, z: origin.z + mapped.z };
};

const spawnWaystoneIsClaimed = (waystone) =>
  String(waystone.getOwnerUid().orElse(null)) === SpawnWaystone.OWNER_UUID &&
  waystone.getVisibility() === $SpawnWaystoneVisibility.GLOBAL &&
  String(waystone.getName().getString()) === SpawnWaystone.NAME;

const spawnWaystoneClaim = (server) => {
  let level = server.overworld();
  let pos = spawnWaystonePos(server);
  let blockEntity = null;
  let waystone = null;
  let previous = null;

  if (!level.hasChunk(pos.x >> 4, pos.z >> 4)) return null;
  blockEntity = level.getBlockEntity(new $SpawnWaystoneBlockPos(pos.x, pos.y, pos.z));
  if (!(blockEntity instanceof $SpawnWaystoneBlockEntity)) {
    SpawnPyramid.warn("no waystone block entity at " + pos.x + " " + pos.y + " " + pos.z);
    return false;
  }

  waystone = blockEntity.getOrLoadWaystone();
  if (!waystone.isValid()) {
    SpawnPyramid.warn("spawn waystone at " + pos.x + " " + pos.y + " " + pos.z + " did not initialize");
    return false;
  }
  if (spawnWaystoneIsClaimed(waystone)) return true;

  previous = waystone.getVisibility();
  waystone.setOwnerUid($SpawnWaystoneUUID.fromString(SpawnWaystone.OWNER_UUID));
  waystone.setOwnerUsername(SpawnWaystone.OWNER_NAME);
  waystone.setName(Text.of(SpawnWaystone.NAME));
  waystone.setSeen(true);
  waystone.setVisibility($SpawnWaystoneVisibility.GLOBAL);
  $SpawnWaystoneIndex.visibilityChanged(server, waystone, previous);
  $SpawnWaystoneStore.get(server).setDirty();
  $SpawnWaystoneSync.sendWaystoneUpdateToAll(server, waystone);
  SpawnPyramid.log("claimed spawn waystone " + waystone.getWaystoneUid() + " at " + pos.x + " " + pos.y + " " + pos.z);
  return true;
};

const spawnWaystoneClaimWhenLoaded = (server, polls) => {
  let result = null;
  try {
    result = spawnWaystoneClaim(server);
  } catch (e) {
    SpawnPyramid.error("spawn waystone claim threw: " + e);
    return;
  }
  if (result !== null) return;
  if (polls >= SpawnPyramid.POLL_LIMIT) {
    SpawnPyramid.log("spawn waystone not loaded this session, it will be claimed on first use");
    return;
  }
  server.scheduleInTicks(SpawnPyramid.POLL_TICKS, () => spawnWaystoneClaimWhenLoaded(server, polls + 1));
};

ServerEvents.loaded((event) => {
  event.server.scheduleInTicks(SpawnPyramid.BOOT_DELAY + SpawnPyramid.POLL_TICKS, () =>
    spawnWaystoneClaimWhenLoaded(event.server, 0)
  );
});

BlockEvents.rightClicked(SpawnWaystone.BLOCK, (event) => {
  let server = event.server;
  let pos = null;
  let clicked = event.block.pos;
  if (!server || String(event.level.dimension) !== String(server.overworld().dimension)) return;
  pos = spawnWaystonePos(server);
  if (clicked.getX() !== pos.x || clicked.getZ() !== pos.z) return;
  if (clicked.getY() !== pos.y && clicked.getY() !== pos.y + 1) return;
  try {
    spawnWaystoneClaim(server);
  } catch (e) {
    SpawnPyramid.error("spawn waystone claim on use threw: " + e);
  }
});
