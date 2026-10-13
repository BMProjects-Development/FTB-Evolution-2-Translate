// priority: 800
const $TreasureGoblinEvent = Java.loadClass("dev.ftb.mods.ftbevolutioncompanion.compat.gateways.TreasureGoblinEvent");

const event_treasure_goblin = {
  name: "ftb:treasure_goblin",
  displayName: "Treasure Goblin",
  description: "Toggles the Treasure Goblin Event. While you fight a group of monsters, a Treasure Goblin can appear and run for an escape portal.",
  toggleable: true,
  chance: 0,
  stage: null,
  disableStage: null,
  size: -1,
  minDistance: 12,
  maxDistance: 16,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,

  execute(event, player, location, name) {
    if ($TreasureGoblinEvent.start(player)) return;
    player.tell(Text.translate("ftb.event_system.spawn.not_found", [this.displayName]).red());
    Statistics().addFailure(this.displayName);
    Statistics().removeSuccess(this.displayName);
  },
};
