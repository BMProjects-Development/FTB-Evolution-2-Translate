// Hydra and Cyclops caves are built in Java and spawn their boss directly; this swaps that boss for a trial spawner.
const $IafBossRegistries = Java.loadClass("net.minecraft.core.registries.Registries");

const IAF_BOSS_FLAG = "ftbTrialBoss";
const IAF_BOSS_SEARCH = 5;
const IAF_BOSS_CAVES = {
  "iceandfire:hydra": { cave: "iceandfire:hydra_cave", config: "ftb:iceandfire/hydra" },
  "iceandfire:cyclops": { cave: "iceandfire:cyclops_cave", config: "ftb:iceandfire/cyclops" },
};

const iafBossNearSpawner = (level, pos) => {
  for (let dx = -IAF_BOSS_SEARCH; dx <= IAF_BOSS_SEARCH; dx++) {
    for (let dy = -3; dy <= 3; dy++) {
      for (let dz = -IAF_BOSS_SEARCH; dz <= IAF_BOSS_SEARCH; dz++) {
        if (String(level.getBlock(pos.offset(dx, dy, dz)).id) === "minecraft:trial_spawner") return true;
      }
    }
  }
  return false;
};

const iafBossInCave = (level, pos, caveId) => {
  const reg = level.registryAccess().lookupOrThrow($IafBossRegistries.STRUCTURE);
  let found = false;
  level.structureManager().getAllStructuresAt(pos).keySet().forEach((structure) => {
    if (String(reg.getKey(structure)) === caveId) found = true;
  });
  return found;
};

const iafBossConvert = (level, entity, boss) => {
  if (entity.isRemoved()) return;
  const pos = entity.blockPosition();

  if (iafBossNearSpawner(level, pos) || !iafBossInCave(level, pos, boss.cave)) {
    entity.persistentData.putBoolean(IAF_BOSS_FLAG, true);
    return;
  }

  let spot = pos;
  for (let i = 0; i < 8 && level.getBlockState(spot.below()).canBeReplaced(); i++) {
    spot = spot.below();
  }

  level.server.runCommandSilent(
    `execute in ${level.dimension} run setblock ${spot.x} ${spot.y} ${spot.z} minecraft:trial_spawner{normal_config:"${boss.config}",ominous_config:"${boss.config}",target_cooldown_length:72000,required_player_range:20}`
  );
  entity.discard();
};

Object.keys(IAF_BOSS_CAVES).forEach((type) => {
  EntityEvents.spawned(type, (event) => {
    const entity = event.entity;
    if (entity.persistentData.getBooleanOr(IAF_BOSS_FLAG, false)) return;
    const level = entity.level;
    level.server.scheduleInTicks(1, () => iafBossConvert(level, entity, IAF_BOSS_CAVES[type]));
  });
});
