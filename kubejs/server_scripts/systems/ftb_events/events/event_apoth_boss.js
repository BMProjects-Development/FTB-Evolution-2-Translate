// priority: 800
const apothBossesByDimension = {
  overworld: [
    "bogged",
    "bogged_in_wet",
    "breeze",
    "enderman",
    "husk",
    "husk_in_dry",
    "skeleton",
    "stray",
    "stray_in_cold",
    "vindicator",
    "wolf",
    "zombie",
  ],
  the_nether: ["blaze", "piglin", "piglin_brute", "wither_skeleton", "zoglin", "zombified_piglin"],
  the_end: ["enderman", "endermite", "evoker", "phantom", "shulker"],
};

const event_apoth_boss = {
  name: "ftb:apoth_boss",
  displayName: "Apotheosis Boss Event",
  description: "Toggles the Apotheosis Boss Event. Spawns a random Apotheosis Boss near you while you carry Bad Omen.",
  chance: 1,
  minDistance: 12,
  maxDistance: 24,
  size: 0,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,
  stage: null,
  disableStage: null,

  execute(event, player, location, name, options) {
    let level = player.level;
    let server = level.server;

    if (!options || !options.bypassOmen) {
      if (!player.potionEffects.isActive("minecraft:bad_omen")) {
        Statistics().addFailure(this.displayName);
        Statistics().removeSuccess(this.displayName);
        return;
      }
    }

    player.sendSystemMessage(Text.translate("ftb.event_system.spawn.warning").red(), true);

    let dimension = "overworld";
    if (options && options.dimension) dimension = String(options.dimension).replace(/"/g, "");
    if (!apothBossesByDimension[dimension]) dimension = "overworld";

    let pool = apothBossesByDimension[dimension];
    let boss = "apotheosis:" + dimension + "/" + pool[Math.floor(Math.random() * pool.length)];
    if (options && options.boss) boss = String(options.boss).replace(/"/g, "");

    server.scheduleInTicks(140, () => {
      if (!player.isAlive()) return;
      player.sendSystemMessage(Text.translate("ftb.event_system.apotheosis.spawn").red(), true);
      server.runCommand(
        "execute in " + level.dimension + " as " + player.username + " run apoth spawn_boss " +
        location.pos.x + " " + (location.pos.y - 1) + " " + location.pos.z + " " + boss
      );
    });
  },
};
