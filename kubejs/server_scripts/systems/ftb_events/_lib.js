// priority: 200
const $EventAABB = Java.loadClass("net.minecraft.world.phys.AABB");
const $EventBlockPos = Java.loadClass("net.minecraft.core.BlockPos");
const $EventMobEffectInstance = Java.loadClass("net.minecraft.world.effect.MobEffectInstance");

const EMPTY_BLOCKS = ["minecraft:air", "minecraft:cave_air", "minecraft:void_air", "minecraft:water", "minecraft:lava"];
const AIR_BLOCKS = ["minecraft:air", "minecraft:cave_air", "minecraft:void_air"];

const EventLib = {
  isEmpty: (level, x, y, z) => EMPTY_BLOCKS.indexOf(level.getBlock(x, y, z).id) !== -1,

  isAir: (level, x, y, z) => AIR_BLOCKS.indexOf(level.getBlock(x, y, z).id) !== -1,

  randomLocationAround: (level, pos, minDistance, maxDistance) => {
    let angle = Math.random() * Math.PI * 2;
    let spread = Math.max(0, maxDistance - minDistance);
    let distance = minDistance + Math.random() * spread;
    let x = Math.floor(pos.x + Math.cos(angle) * distance);
    let z = Math.floor(pos.z + Math.sin(angle) * distance);
    return new $EventBlockPos(x, EventLib.groundLevel(level, x, pos.y, z), z);
  },

  groundLevel: (level, x, startY, z) => {
    let offset = 0;
    let down = startY;
    let up = startY;
    for (offset = 0; offset <= 12; offset++) {
      down = startY - offset;
      if (EventLib.isEmpty(level, x, down, z) && !EventLib.isEmpty(level, x, down - 1, z)) return down;
      up = startY + offset;
      if (EventLib.isEmpty(level, x, up, z) && !EventLib.isEmpty(level, x, up - 1, z)) return up;
    }
    return startY;
  },

  findSpawnSpot: (level, pos, size, checkBlocks, requireBlockBelow) => {
    const radius = Math.max(0, size);
    const blocks = [];
    let dx = 0;
    let dy = 0;
    let dz = 0;
    let x = 0;
    let y = 0;
    let z = 0;
    let block = null;
    for (dx = -radius; dx <= radius; dx++) {
      for (dy = 0; dy <= radius; dy++) {
        for (dz = -radius; dz <= radius; dz++) {
          x = pos.x + dx;
          y = pos.y + dy;
          z = pos.z + dz;
          block = level.getBlock(x, y, z);
          if (checkBlocks.indexOf(block.id) === -1) continue;
          if (requireBlockBelow && EventLib.isEmpty(level, x, y - 1, z)) continue;
          if (requireBlockBelow && !EventLib.isAir(level, x, y + 1, z)) continue;
          blocks.push(block);
        }
      }
    }
    return { okay: blocks.length > 0, blocks: blocks };
  },

  countEntitiesNearby: (level, typeId, pos, radius) => {
    let box = new $EventAABB(
      pos.x - radius,
      pos.y - radius,
      pos.z - radius,
      pos.x + radius + 1,
      pos.y + radius + 1,
      pos.z + radius + 1
    );
    let count = 0;
    level.getEntitiesWithin(box).forEach((entity) => {
      if (entity.type === typeId) count++;
    });
    return count;
  },

  weightedPick: (entries) => {
    if (!entries || entries.length === 0) return null;
    let total = 0;
    entries.forEach((entry) => (total += entry.weight || 1));
    let roll = Math.random() * total;
    let picked = null;
    entries.forEach((entry) => {
      if (picked !== null) return;
      roll -= entry.weight || 1;
      if (roll <= 0) picked = entry.entry;
    });
    return picked !== null ? picked : entries[entries.length - 1].entry;
  },

  teamStages: (player) => {
    let api = null;
    let helper = null;
    let team = null;
    let stages = null;
    try {
      api = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");
      helper = Java.loadClass("dev.ftb.mods.ftbteams.api.TeamStagesHelper");
      team = api.api().getManager().getTeamForPlayer(player);
      if (!team.isPresent()) return [];
      stages = helper.getStages(team.get());
    } catch (e) {
      return [];
    }
    return stages ? Array.from(stages) : [];
  },

  playerStages: (player) => {
    let stages = [];
    try {
      player.stages.getAll().forEach((stage) => stages.push(String(stage)));
    } catch (e) {
      console.warn("[ftb_events] player stages unavailable: " + e);
    }
    EventLib.teamStages(player).forEach((stage) => stages.push(String(stage)));
    return stages;
  },

  distance: (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)),

  lowerTimer: (player, ticks) => player.persistentData.putInt("timer", ticks),

  addEffect: (entity, effect, duration, amplifier, ambient, visible) => {
    entity.addEffect(new $EventMobEffectInstance(effect, duration, amplifier, ambient, visible));
  },

  hasStage: (player, stage) => {
    if (!stage) return true;
    try {
      return player.stages.has(stage);
    } catch (e) {
      console.warn("[ftb_events] stages unavailable, treating stage '" + stage + "' as locked");
      return false;
    }
  },
};
