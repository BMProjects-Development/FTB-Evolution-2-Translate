// priority: 800
const event_goat = {
  name: "ftb:goat",
  displayName: "Goat",
  description: "Toggles the Goat Event. Spawns a random Quantum Goat near you",
  chance: 0.25,
  size: -1,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,
  itemDespawnTime: 400,
  stage: null,
  disableStage: null,
  lootTable: [
    { entry: "ae2:certus_quartz_crystal", weight: 10 },
    { entry: "mysticalagradditions:nether_star_shard", weight: 3 },
    { entry: "minecraft:iron_ingot", weight: 15 },
    { entry: "minecraft:obsidian", weight: 10 },
    { entry: "minecraft:copper_ingot", weight: 15 },
    { entry: "minecraft:gold_ingot", weight: 8 },
    { entry: "minecraft:ender_pearl", weight: 4 },
    { entry: "minecraft:amethyst_shard", weight: 6 },
    { entry: "enderio:grains_of_infinity", weight: 5 },
  ],

  execute(event, player, location, name) {
    let level = player.level;
    let server = level.server;
    player.sendSystemMessage(Text.translate("ftb.event_system.spawn.warning").red(), true);

    server.scheduleInTicks(140, () => {
      if (!player.isAlive()) return;
      let goat = level.createEntity("minecraft:goat");
      goat.setPosition(player.x, player.y, player.z);
      goat.setCustomName(name ?? Text.translate("ftb.event_system.names.quantum_goat"));
      goat.setCustomNameVisible(true);
      goat.setScreamingGoat(true);
      EventLib.addEffect(goat, "minecraft:invisibility", 10, 1, true, false);
      goat.spawn();

      server.scheduleInTicks(120, () => {
        if (!goat.isAlive()) return;
        let drop = level.createEntity("minecraft:item");
        drop.setItem(Item.of(EventLib.weightedPick(event_goat.lootTable)));
        drop.setPosition(goat.x, goat.y, goat.z);
        drop.setGlowing(true);
        drop.spawn();
        goat.discard();
      });
    });
  },
};

EntityEvents.afterHurt((event) => {
  let { source, entity } = event;
  if (!entity || !source) return;
  let actualSource = source.getActual();
  if (!actualSource) return;

  let award = (target) => {
    try {
      if (target.stages.has("seen_goat")) return;
      target.stages.add("seen_goat");
    } catch (e) {
      return;
    }
    target.level.server.scheduleInTicks(40, () => {
      target.sendSystemMessage(Text.translate("ftb.event_system.goat.disablestage").green(), true);
    });
  };

  if (entity.isPlayer() && actualSource.type === "minecraft:goat") award(entity);
  else if (actualSource.isPlayer() && entity.type === "minecraft:goat") award(actualSource);
});
