// priority: 800
const creeperRingPositions = [
  { x: -1.5, z: -1.5 },
  { x: -2, z: 0 },
  { x: -1.5, z: 1.5 },
  { x: 0, z: -2 },
  { x: 0, z: 2 },
  { x: 1.5, z: -1.5 },
  { x: 1.5, z: 1.5 },
  { x: 2, z: 0 },
];

const event_creeper = {
  name: "ftb:creeper",
  displayName: "Creeper",
  description: "Toggles the Creeper Event. A ring of harmless creepers flashes around you and drops gunpowder.",
  chance: 0.1,
  stage: null,
  disableStage: null,
  size: -1,
  minDistance: 1,
  maxDistance: 24,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: false,

  execute(event, player, location, name) {
    let level = player.level;
    let server = level.server;
    let creepers = [];

    server.scheduleInTicks(60, () => {
      if (!player.isAlive()) return;
      creeperRingPositions.forEach((offset) => {
        let creeper = level.createEntity("minecraft:creeper");
        if (name) {
          creeper.setCustomName(name);
          creeper.setCustomNameVisible(true);
        }
        creeper.setPos(player.x + offset.x, player.y, player.z + offset.z);
        creeper.spawn();
        creeper.mergeNbt({ Fuse: 6000, ExplosionRadius: 0 });
        creepers.push(creeper);
      });
    });

    server.scheduleInTicks(65, () => {
      creepers.forEach((creeper) => {
        if (creeper.isAlive()) creeper.ignite();
      });
    });

    server.scheduleInTicks(94, () => {
      creepers.forEach((creeper) => {
        if (!creeper.isAlive()) return;
        creeper.block.popItemFromFace(Item.of("minecraft:gunpowder", Math.floor(Math.random() * 2 + 1)), "up");
        creeper.discard();
      });
    });

    EventLib.lowerTimer(player, 11000);
  },
};
