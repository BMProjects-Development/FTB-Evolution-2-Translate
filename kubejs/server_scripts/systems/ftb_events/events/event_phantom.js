// priority: 800
const event_phantom = {
  name: "ftb:phantom",
  displayName: "Phantom Bomber Event",
  description: "A random Phantom spawns, trying to drop an Anvil on the player",
  chance: 0.1,
  stage: null,
  disableStage: null,
  size: -1,
  minDistance: 1,
  maxDistance: 24,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: false,

  execute(event, player, location) {
    let level = player.level;
    if (!level.isDarkOutside()) return;
    let server = level.server;

    let angle = Math.random() * Math.PI * 2;
    let dist = 8 + Math.random() * 8;
    let spawn = {
      x: player.x + Math.cos(angle) * dist,
      y: player.y + 32,
      z: player.z + Math.sin(angle) * dist,
    };

    let phantom = level.createEntity("minecraft:phantom");
    phantom.setPos(spawn.x, spawn.y, spawn.z);
    EventLib.addEffect(phantom, "minecraft:fire_resistance", 1000000, 0, false, false);
    phantom.setGlowing(true);
    phantom.spawn();
    phantom.setAggressive(true);
    phantom.setTarget(player);
    player.sendSystemMessage(Text.translate("ftb.event_system.phantom.spawned"));

    server.scheduleInTicks(20, () => EventLib.lowerTimer(player, 10));

    server.scheduleInTicks(20 * Math.floor(Math.random() * 5 + 2), () => {
      if (!phantom.isAlive() || !player.isAlive()) return;
      let motion = anvilMotionTowards(phantom, player);
      server.runCommandSilent(
        "execute in " + level.dimension + " run summon falling_block " +
        phantom.x + " " + phantom.y + " " + phantom.z +
        ' {BlockState:{Name:"minecraft:anvil"},Time:1,Motion:[' +
        motion.vx.toFixed(3) + "," + motion.vy.toFixed(3) + "," + motion.vz.toFixed(3) + "]}"
      );
      server.scheduleInTicks(20 * 10, () => {
        if (phantom.isAlive()) phantom.discard();
      });
    });
  },
};

const anvilMotionTowards = (phantom, player) => {
  let dx = player.x - phantom.x;
  let dz = player.z - phantom.z;
  let horizontalDistance = Math.sqrt(dx * dx + dz * dz);
  let flightTime = Math.max(30, horizontalDistance * 1.5);
  let upward = Math.max(0.3, Math.min(1.0, 0.4 + horizontalDistance * 0.025));
  return { vx: dx / flightTime, vy: upward, vz: dz / flightTime };
};
