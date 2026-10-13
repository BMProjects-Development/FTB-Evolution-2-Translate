// priority: 800
const fairyBuffs = [
  { effect: "minecraft:speed", duration: 18000, amplifier: 1 },
  { effect: "minecraft:strength", duration: 18000, amplifier: 1 },
  { effect: "minecraft:regeneration", duration: 18000, amplifier: 1 },
];

const grantFairyBuff = (player) => {
  player.heal(8);
  let buff = fairyBuffs[Math.floor(Math.random() * fairyBuffs.length)];
  player.potionEffects.add(buff.effect, buff.duration, buff.amplifier, true, false);
  player.tell(Text.translate("ftb.event.fairy_buff", [buff.effect, buff.duration / 20]));
};

const isFairy = (entity) => {
  if (entity.type !== "minecraft:allay") return false;
  let data = entity.persistentData.getCompoundOrEmpty("trade");
  return data.getBooleanOr("fairy", false);
};

const consumeFairy = (level, server, fairy, player) => {
  let data = fairy.persistentData.getCompoundOrEmpty("trade");
  if (data.getBooleanOr("isTrading", false)) return;
  data.putBoolean("isTrading", true);
  fairy.setDancing(true);
  grantFairyBuff(player);
  grantEvoAdvancement(player, "fairy_blessed");
  server.scheduleInTicks(20, () => {
    if (!fairy.isAlive()) return;
    let held = fairy.getMainHandItem().copy();
    fairy.setItemInHand("MAIN_HAND", Item.of("minecraft:air"));
    if (!held.isEmpty()) level.getBlock(fairy.x, fairy.y, fairy.z).popItemFromFace(held, "up");
    fairy.discard();
  });
  EventLib.lowerTimer(player, 10);
};

const event_fairy = {
  name: "ftb:fairy",
  displayName: "Fairy Event",
  description: "A random Allay (Fairy) spawns, Healing you or giving you a random buff",
  chance: 1,
  stage: null,
  disableStage: null,
  size: 1,
  minDistance: 4,
  maxDistance: 8,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: false,

  execute(event, player, location) {
    let level = player.level;
    let server = level.server;

    let fairy = level.createEntity("minecraft:allay");
    fairy.setGlowing(true);
    fairy.setPos(location.pos.x, location.pos.y + 1, location.pos.z);
    fairy.setInvulnerable(true);
    fairy.setCustomName(Text.translate("ftb.event_system.names.fairy"));
    fairy.persistentData.trade = { isTrading: false, fairy: true, spawnTime: Utils.getSystemTime() };
    fairy.spawn();

    player.tell(Text.translate("ftb.event.fairy_spawned", [fairy.x, fairy.y, fairy.z]));
    server.scheduleInTicks(20, () => EventLib.lowerTimer(player, 10));

    [10, 20, 30, 40].forEach((seconds) => {
      server.scheduleInTicks(20 * seconds, () => {
        if (!fairy.isAlive() || !player.isAlive()) return;
        fairy.getNavigation().moveTo(player, 1.5);
      });
    });

    [15, 25, 35, 45].forEach((seconds) => {
      server.scheduleInTicks(20 * seconds, () => {
        if (!fairy.isAlive() || !player.isAlive()) return;
        let near = EventLib.distance({ x: fairy.x, y: fairy.y, z: fairy.z }, { x: player.x, y: player.y, z: player.z }) < 5;
        if (near) consumeFairy(level, server, fairy, player);
      });
    });
  },
};

ItemEvents.entityInteracted((event) => {
  let { player, target, level, server, hand } = event;
  if (hand !== "MAIN_HAND") return;
  if (!target || !isFairy(target)) return;
  consumeFairy(level, server, target, player);
});
