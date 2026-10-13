const $FTBTeamsAPI = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");
const $WorldTierTeamStages = Java.loadClass("dev.ftb.mods.ftbteams.api.TeamStagesHelper");
const $WorldTierTeamChanged = Java.loadClass("dev.ftb.mods.ftbteams.api.neoforge.FTBTeamsEvent$PlayerChangedTeam");

const WORLD_TIERS = ["frontier", "ascent", "summit", "pinnacle"];
const FRONTIER_ADVANCEMENT = "apotheosis:progression/frontier";
const SKYLINE_FLAG = "worldTierSkylineGranted";

const worldTierAdvancement = (tier) => "apotheosis:progression/" + tier;
const worldTierStage = (tier) => "ftb:world_tier_" + tier;

const worldTierTeam = (player) => {
  try {
    return $FTBTeamsAPI.api().getManager().getTeamForPlayer(player).orElse(null);
  } catch (e) {
    return null;
  }
};

const teamHasWorldTier = (team, tier) => {
  try {
    return $WorldTierTeamStages["hasTeamStage(dev.ftb.mods.ftbteams.api.Team,java.lang.String)"](team, worldTierStage(tier));
  } catch (e) {
    return false;
  }
};

const previousWorldTier = (tier) => WORLD_TIERS[WORLD_TIERS.indexOf(tier) - 1];
const nextWorldTier = (tier) => WORLD_TIERS[WORLD_TIERS.indexOf(tier) + 1];

const unlockNextWorldTier = (server, player, tier) => {
  const next = nextWorldTier(tier);
  if (!next || player.isAdvancementDone(worldTierAdvancement(next))) return;
  server.runCommandSilent("advancement grant " + player.username + " only " + worldTierAdvancement(next) + " previous_tier");
};

const grantWorldTier = (server, player, tier) => {
  if (player.isAdvancementDone(worldTierAdvancement(tier))) return;
  const previous = previousWorldTier(tier);
  if (previous && !player.isAdvancementDone(worldTierAdvancement(previous))) return;
  server.runCommandSilent("advancement grant " + player.username + " only " + worldTierAdvancement(tier));
};

const shareWorldTier = (server, player, tier) => {
  const team = worldTierTeam(player);
  if (!team || teamHasWorldTier(team, tier)) return;
  try {
    $WorldTierTeamStages.addTeamStage(team, worldTierStage(tier));
  } catch (e) {
    console.warn("[world_tiers] could not record " + tier + " for the team: " + e);
    return;
  }
  team.getOnlineMembers().forEach((member) => grantWorldTier(server, member, tier));
};

const syncWorldTiers = (player) => {
  const server = player.server;
  const team = worldTierTeam(player);
  if (!server || !team) return;
  WORLD_TIERS.forEach((tier) => {
    if (teamHasWorldTier(team, tier)) grantWorldTier(server, player, tier);
    else if (player.isAdvancementDone(worldTierAdvancement(tier))) shareWorldTier(server, player, tier);
    if (player.isAdvancementDone(worldTierAdvancement(tier))) unlockNextWorldTier(server, player, tier);
  });
};

WORLD_TIERS.forEach((tier) => {
  PlayerEvents.advancement(worldTierAdvancement(tier), (event) => {
    const player = event.entity;
    if (!player || !player.server) return;
    unlockNextWorldTier(player.server, player, tier);
    shareWorldTier(player.server, player, tier);
  });
});

PlayerEvents.loggedIn((event) => {
  const player = event.player;
  if (!player) return;
  try {
    syncWorldTiers(player);
  } catch (e) {
    console.warn("[world_tiers] login sync failed: " + e);
  }
});

NativeEvents.onEvent($WorldTierTeamChanged, (event) => {
  const player = event.getEventData().player();
  if (!player || !player.server) return;
  player.server.scheduleInTicks(1, (_) => {
    try {
      syncWorldTiers(player);
    } catch (e) {
      console.warn("[world_tiers] team change sync failed: " + e);
    }
  });
});

PlayerEvents.tick((event) => {
  const player = event.player;
  if (!player || player.tickCount % 20 !== 5) return;
  if (player.persistentData.getBooleanOr(SKYLINE_FLAG, false)) return;
  if (!player.stages.has("skyline_unlocked")) return;
  player.server.runCommandSilent("advancement grant " + player.username + " only " + FRONTIER_ADVANCEMENT + " skyline");
  player.persistentData.putBoolean(SKYLINE_FLAG, true);
});
