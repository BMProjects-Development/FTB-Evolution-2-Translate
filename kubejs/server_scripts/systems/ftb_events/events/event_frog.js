// priority: 800
const event_frog = {
  name: "ftb:frogs",
  displayName: "Frog and Squids",
  description: "Toggles the Frog and Squids Event. Frogs and Squids will spawn in water.",
  chance: 1,
  minDistance: 1,
  maxDistance: 15,
  size: 0,
  checkBlocks: ["minecraft:water"],
  requireBlockBelow: false,
  itemDespawnTime: 400,
  stage: null,
  disableStage: null,

  execute(event, player, location, name) {
    let level = player.level;
    let creature;
    if (Math.random() < 0.5) {
      creature = "minecraft:frog";
      player.tell(Text.translate("ftb.event_system.frog.ribbit"));
    } else {
      creature = Math.random() < 0.9 ? "minecraft:squid" : "minecraft:glow_squid";
      player.tell(Text.translate("ftb.event_system.frog.splash"));
    }

    if (EventLib.countEntitiesNearby(level, creature, location.pos, 64) >= 10) {
      if (Math.random() < 0.5) eventSystem(event, false, level.server);
      return;
    }

    let entity = level.createEntity(creature);
    if (name) {
      entity.setCustomName(name);
      entity.setCustomNameVisible(true);
    }
    entity.setPosition(location.pos.x + 0.5, location.pos.y + 0.5, location.pos.z + 0.5);
    entity.spawn();
  },
};
