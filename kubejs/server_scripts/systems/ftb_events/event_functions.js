// priority: 120
const checks = {
  player: {
    getRandomPlayer: (players) => {
      if (players.length === 0) return null;
      return players[Math.floor(Math.random() * players.length)];
    },

    isCreativeOrSpectator: (player) => {
      if (!player.isCreative() && !player.isSpectator()) return false;
      Statistics().addFailure("Player is creative or spectator");
      return true;
    },

    isAlive: (player) => {
      if (player.alive) return true;
      Statistics().addFailure("Player Dead");
      return false;
    },

    hasTimer: (player) => {
      if (player.persistentData.contains("timer")) return true;
      Statistics().addFailure("No Timer");
      return false;
    },

    isOnCooldown: (player, timeCooldown) => {
      if (player.persistentData.getIntOr("timer", 0) >= timeCooldown) return false;
      Statistics().addFailure("On Cooldown");
      return true;
    },

    isInSpawn: (player) => {
      if (player.level.getBiome(player.blockPosition()).getRegisteredName() !== SpawnPyramid.BIOME) return false;
      Statistics().addFailure("Player in spawn");
      return true;
    },

    isInSpace: (player) => {
      if (!String(player.level.dimension).startsWith("stellaris:")) return false;
      Statistics().addFailure("Player in space");
      return true;
    },

    getDisabledEvents: (player) => {
      let disabled = [];
      let list = player.persistentData.getListOrEmpty("disabledEvents");
      for (let i = 0; i < list.size(); i++) {
        disabled.push(String(list.getStringOr(i, "")));
      }
      return disabled;
    },
  },

  event: {
    inBiome: (event, player) => {
      if (!event.requiredBiomes || event.requiredBiomes.length <= 0) return true;
      let biome = player.level.minecraftLevel.getBiome(player.block.pos);
      if (event.requiredBiomes.some((entry) => biome.is(entry))) return true;
      Statistics().addFailure("Required Biome");
      return false;
    },

    filterEvents: (events, player) => {
      let filtered = events.filter((entry) => {
        if (Math.random() > entry.chance) return false;
        if (entry.stage && !EventLib.hasStage(player, entry.stage)) {
          Statistics().addFailure("Missing Stage");
          return false;
        }
        return true;
      });
      if (filtered.length === 0) {
        Statistics().addFailure("No Event");
        return [];
      }
      return filtered;
    },

    getRandomEvent: (events) => {
      if (events.length === 0) {
        Statistics().addFailure("No Event");
        return null;
      }
      return events[Math.floor(Math.random() * events.length)];
    },

    findSpawnLocation: (event, player, maxAttempts) => {
      if (event.size < 0 || !event.minDistance || !event.maxDistance) return null;
      let level = player.level;
      let playerPos = player.block.pos;
      for (let tries = 0; tries < maxAttempts; tries++) {
        let candidate = EventLib.randomLocationAround(level, playerPos, event.minDistance, event.maxDistance);
        let spot = EventLib.findSpawnSpot(level, candidate, event.size, event.checkBlocks, event.requireBlockBelow);
        if (spot.okay) return { pos: candidate, locationInfo: spot };
      }
      Statistics().addFailure("Spawn not found");
      return null;
    },
  },
};
