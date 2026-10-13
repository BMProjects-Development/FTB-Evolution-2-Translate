const $StageSyncTeamsAPI = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");
const $StageSyncTeamStages = Java.loadClass("dev.ftb.mods.ftbteams.api.TeamStagesHelper");

PlayerEvents.loggedIn((event) => {
  let player = event.player;
  if (!player) return;
  let team = $StageSyncTeamsAPI.api().getManager().getTeamForPlayer(player).orElse(null);
  if (!team) return;
  $StageSyncTeamStages.getStages(team).forEach((stage) => {
    let id = String(stage);
    if (!player.stages.has(id)) player.stages.add(id);
  });
});
