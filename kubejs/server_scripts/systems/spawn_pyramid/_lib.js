// priority: 210
const $SpawnChunkDimPos = Java.loadClass("dev.ftb.mods.ftblibrary.math.ChunkDimPos");
const $SpawnFTBChunksAPI = Java.loadClass("dev.ftb.mods.ftbchunks.api.FTBChunksAPI");
const $SpawnFTBTeamsAPI = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");
const $SpawnColor4I = Java.loadClass("dev.ftb.mods.ftblibrary.icon.Color4I");

const spawnPyramidDefaults = {
  state: "pending",
  attempts: 0,
  originX: 0,
  originY: 0,
  originZ: 0,
  claimed: false,
};

const SpawnPyramid = {
  STRUCTURE: "ftb:spawn_pyramid",
  NAMESPACE: "ftb",
  SIZE_X: 131,
  SIZE_Y: 96,
  SIZE_Z: 136,
  FOOTPRINT: 136,
  ORIGIN_X: -62,
  ORIGIN_Z: -65,
  UNDERSIDE_Y: 223,
  SPAWN_OFFSET: { x: 62, y: 43, z: 112 },
  BIOME: "ftb:pyramid",
  TEAM_NAME: "Spawn",
  MAX_ATTEMPTS: 3,
  BOOT_DELAY: 200,
  POLL_TICKS: 20,
  POLL_LIMIT: 45,
  LOAD_MARGIN: 1,
  STRUCTURE_BLOCK_LIMIT: 512,
  SHOWCASE_GAP: 16,

  PIECE_TEMPLATES: [
    { id: "ftb:spawn_pyramid/foundation", dy: 0 },
    { id: "ftb:spawn_pyramid/terrace", dy: 12 },
    { id: "ftb:spawn_pyramid/body", dy: 55 },
    { id: "ftb:spawn_pyramid/spire", dy: 83 },
  ],

  SAMPLES: [
    [96, 0, 77, "minecraft:snow_block"],
    [37, 24, 75, "minecraft:snow_block"],
    [33, 48, 18, "minecraft:snow_block"],
    [64, 60, 49, "minecraft:stone"],
    [55, 72, 56, "minecraft:stone"],
    [65, 95, 62, "minecraft:sandstone_wall"],
  ],

  log: (msg) => console.log("[spawn_pyramid] " + msg),
  warn: (msg) => console.warn("[spawn_pyramid] " + msg),
  error: (msg) => console.error("[spawn_pyramid] " + msg),

  data: (server) => {
    let pData = server.persistentData;
    if (!pData.contains("spawnPyramid")) pData.spawnPyramid = spawnPyramidDefaults;
    return pData.getCompoundOrEmpty("spawnPyramid");
  },

  isDone: (server) => SpawnPyramid.data(server).getStringOr("state", "pending") === "done",

  storedOrigin: (server) => {
    let data = SpawnPyramid.data(server);
    return {
      x: data.getIntOr("originX", 0),
      y: data.getIntOr("originY", SpawnPyramid.UNDERSIDE_Y),
      z: data.getIntOr("originZ", 0),
    };
  },

  spawnOrigin: () => ({ x: SpawnPyramid.ORIGIN_X, y: SpawnPyramid.UNDERSIDE_Y, z: SpawnPyramid.ORIGIN_Z }),

  chunkRange: (origin, sizeX, sizeZ, margin) => ({
    minCX: (origin.x >> 4) - margin,
    minCZ: (origin.z >> 4) - margin,
    maxCX: ((origin.x + sizeX - 1) >> 4) + margin,
    maxCZ: ((origin.z + sizeZ - 1) >> 4) + margin,
  }),

  pyramidRange: (origin, margin) =>
    SpawnPyramid.chunkRange(origin, SpawnPyramid.FOOTPRINT, SpawnPyramid.FOOTPRINT, margin),

  eachChunk: (range, fn) => {
    let cx = 0;
    let cz = 0;
    for (cx = range.minCX; cx <= range.maxCX; cx++) {
      for (cz = range.minCZ; cz <= range.maxCZ; cz++) fn(cx, cz);
    }
  },

  chunkCount: (range) => (range.maxCX - range.minCX + 1) * (range.maxCZ - range.minCZ + 1),

  forceChunks: (server, range, on) => {
    let level = server.overworld();
    let failed = 0;
    SpawnPyramid.eachChunk(range, (cx, cz) => {
      try {
        level.setChunkForced(cx, cz, on);
      } catch (e) {
        failed++;
      }
    });
    if (failed > 0) SpawnPyramid.warn("force-load toggle failed for " + failed + " chunk(s)");
    return failed;
  },

  missingChunks: (server, range) => {
    let level = server.overworld();
    let missing = 0;
    SpawnPyramid.eachChunk(range, (cx, cz) => {
      try {
        if (!level.hasChunk(cx, cz)) missing++;
      } catch (e) {
        missing++;
      }
    });
    return missing;
  },

  rotate: (x, z, rotation) => {
    if (rotation === 1) return { x: SpawnPyramid.SIZE_Z - 1 - z, z: x };
    if (rotation === 2) return { x: SpawnPyramid.SIZE_X - 1 - x, z: SpawnPyramid.SIZE_Z - 1 - z };
    if (rotation === 3) return { x: z, z: SpawnPyramid.SIZE_X - 1 - x };
    return { x: x, z: z };
  },

  verifyRotation: (server, origin, rotation) => {
    let level = server.overworld();
    let sample = null;
    let mapped = null;
    let i = 0;
    for (i = 0; i < SpawnPyramid.SAMPLES.length; i++) {
      sample = SpawnPyramid.SAMPLES[i];
      mapped = SpawnPyramid.rotate(sample[0], sample[2], rotation);
      try {
        if (String(level.getBlock(origin.x + mapped.x, origin.y + sample[1], origin.z + mapped.z).id) !== sample[3]) {
          return false;
        }
      } catch (e) {
        SpawnPyramid.warn("verification sample unreadable: " + e);
        return false;
      }
    }
    return true;
  },

  detectRotation: (server, origin) => {
    let rotation = 0;
    for (rotation = 0; rotation < 4; rotation++) {
      if (SpawnPyramid.verifyRotation(server, origin, rotation)) return rotation;
    }
    return -1;
  },

  verify: (server, origin) => SpawnPyramid.detectRotation(server, origin) >= 0,

  spawnPoint: (origin, rotation) => {
    let mapped = SpawnPyramid.rotate(SpawnPyramid.SPAWN_OFFSET.x, SpawnPyramid.SPAWN_OFFSET.z, rotation);
    return { x: origin.x + mapped.x, y: origin.y + SpawnPyramid.SPAWN_OFFSET.y, z: origin.z + mapped.z };
  },

  applyWorldSpawn: (server) => {
    // The companion mod owns the world spawn (set on overworld load, before the first join),
    // so the placement only needs the spawn-radius rule for the fixed point.
    try {
      server.runCommandSilent("gamerule respawn_radius 0");
    } catch (e) {
      SpawnPyramid.error("could not set respawn_radius: " + e);
    }
  },

  runPlace: (server, origin) => {
    let i = 0;
    let piece = null;
    try {
      for (i = 0; i < SpawnPyramid.PIECE_TEMPLATES.length; i++) {
        piece = SpawnPyramid.PIECE_TEMPLATES[i];
        server.runCommandSilent(
          "place template " + piece.id + " " +
          origin.x + " " + (origin.y + piece.dy) + " " + origin.z + " none none"
        );
      }
      server.runCommandSilent(
        "fill " + origin.x + " " + origin.y + " " + origin.z + " " +
        origin.x + " " + (origin.y + SpawnPyramid.SIZE_Y - 1) + " " + origin.z +
        " minecraft:air replace minecraft:jigsaw"
      );
      return true;
    } catch (e) {
      SpawnPyramid.error("place command threw: " + e);
      return false;
    }
  },

  spawnTeam: (server) => {
    let api = $SpawnFTBTeamsAPI.api();
    let manager = null;
    let existing = null;
    if (!api.isManagerLoaded()) {
      SpawnPyramid.warn("FTB Teams manager not loaded, claim deferred");
      return null;
    }
    manager = api.getManager();
    existing = manager.getTeamByName(SpawnPyramid.TEAM_NAME);
    if (existing.isPresent()) return existing.get();
    try {
      return manager.createServerTeam(
        server.createCommandSourceStack(),
        SpawnPyramid.TEAM_NAME,
        "FTB Evolution 2 spawn",
        $SpawnColor4I.rgb(90, 160, 220)
      );
    } catch (e) {
      SpawnPyramid.error("could not create the spawn team: " + e);
      return null;
    }
  },

  claim: (server, origin) => {
    let team = null;
    let chunksApi = $SpawnFTBChunksAPI.api();
    let teamData = null;
    let dimension = null;
    let range = null;
    let source = null;
    let needed = 0;
    let claimed = 0;
    let refused = 0;

    if (!chunksApi.isManagerLoaded()) {
      SpawnPyramid.warn("FTB Chunks manager not loaded, claim deferred");
      return null;
    }
    team = SpawnPyramid.spawnTeam(server);
    if (team === null) return null;

    teamData = chunksApi.getManager().getOrCreateData(team);
    dimension = server.overworld().dimension;
    range = SpawnPyramid.pyramidRange(origin, 0);
    source = server.createCommandSourceStack();
    needed = SpawnPyramid.chunkCount(range);

    if (teamData.getExtraClaimChunks() < needed) teamData.setExtraClaimChunks(needed);

    SpawnPyramid.eachChunk(range, (cx, cz) => {
      let result = null;
      try {
        result = teamData.claim(source, new $SpawnChunkDimPos(dimension, cx, cz), false);
        if (result !== null && result.isSuccess()) claimed++;
        else refused++;
      } catch (e) {
        refused++;
      }
    });

    SpawnPyramid.log("claimed " + claimed + "/" + needed + " chunks for team " + SpawnPyramid.TEAM_NAME +
      (refused > 0 ? " (" + refused + " already claimed or refused)" : ""));
    return { claimed: claimed, refused: refused, needed: needed };
  },
};
