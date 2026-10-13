// priority: 460

const ECHO_STAGES = {
  "ftb:broker_early":        null,
  "ftb:broker_mid":          "ftb:broker_mid_wares",
  "ftb:broker_late":         "ftb:broker_late_wares",
  "ftb:village_storage":     "ftb:village_storage_wares",
  "ftb:village_tech":        "ftb:village_tech_wares",
  "ftb:village_food":        "ftb:village_food_wares",
  "ftb:village_apiarist":    "ftb:village_apiarist_wares",
  "ftb:fishmonger":          "ftb:fishmonger_wares",
  "ftb:wayfarer":            "ftb:wayfarer_wares",
  "ftb:jewler":              "ftb:jewler_wares",
  "ftb:beastmaster":         "ftb:beastmaster_wares",
  "ftb:gatekeeper":          "ftb:gatekeeper_wares",
  "ftb:arcanist":            "ftb:arcanist_wares",
  "ftb:hedge_witch":         "ftb:hedge_witch_wares",
  "ftb:sanguine_merchant":   "ftb:sanguine_merchant_wares",
  "ftb:swashbuckler":        "ftb:swashbuckler_wares",
  "ftb:gambler":             "ftb:gambler_wares",
  "ftb:wandering_merchant":  null,
  "ftb:trader_black_market": null,
};

const ECHO_TIERS = {
  "ftb:village_apiarist": [
    "ftb:village_apiarist_alpha",
    "ftb:village_apiarist_beta",
    "ftb:village_apiarist_gamma",
  ],
};

const $TeamProgressManager = Java.loadClass("dev.ftb.mods.ftbechoes.echo.progress.TeamProgressManager");
const $Identifier = Java.loadClass("net.minecraft.resources.Identifier");
const $TeamStagesHelper = Java.loadClass("dev.ftb.mods.ftbteams.api.TeamStagesHelper");

const hasStageOrTeamStage = (player, stage) => {
  if (player.stages.has(stage)) return true;
  try {
    return $TeamStagesHelper["hasTeamStage(net.minecraft.world.entity.player.Player,java.lang.String)"](player, stage);
  } catch (e) {
    return false;
  }
};

const currentEchoStage = (server, player, echoId) => {
  let progress = null;
  try {
    progress = $TeamProgressManager.get(server).getProgress(player).orElse(null);
  } catch (e) {
    return -1;
  }
  return progress ? progress.getCurrentStage($Identifier.parse(echoId)) : -1;
};

const tierTarget = (player, echoId) => {
  let level = 1;
  let open = true;
  if (!hasStageOrTeamStage(player, ECHO_STAGES[echoId])) return 0;
  ECHO_TIERS[echoId].forEach((stage) => {
    if (open && hasStageOrTeamStage(player, stage)) level++;
    else open = false;
  });
  return level;
};

const STAGE_TO_ECHO = {};
Object.keys(ECHO_STAGES).forEach((echoId) => {
  let stage = ECHO_STAGES[echoId];
  if (stage) STAGE_TO_ECHO[stage] = echoId;
});

const syncEcho = (server, player, echoId) => {
  if (currentEchoStage(server, player, echoId) >= 1) return;
  try {
    server.runCommandSilent(
      "ftbechoes progress player " + player.username + " " + echoId + " set_stage 1"
    );
  } catch (e) {
    console.warn("[echo_unlock] could not sync echo " + echoId + ": " + e);
  }
};

const unlockEcho = (server, player, echoId) => {
  try {
    server.runCommandSilent(
      "ftbechoes progress player " + player.username + " " + echoId + " set_stage 1"
    );
  } catch (e) {
    console.warn("[echo_unlock] could not open echo " + echoId + ": " + e);
  }
  let stage = ECHO_STAGES[echoId];
  if (stage) {
    try {
      player.stages.add(stage);
    } catch (e) {
      console.warn("[echo_unlock] could not grant stage " + stage + " for " + echoId + ": " + e);
    }
  }
};

const OPEN_ECHOES = [
  "ftb:trader_black_market",
  "ftb:wandering_merchant",
  "ftb:broker_early",
];

PlayerEvents.loggedIn((event) => {
  const player = event.player;
  if (!player) return;
  const server = player.server;
  if (!server) return;

  server.scheduleInTicks(40, (_) => {
    OPEN_ECHOES.forEach((echo) => unlockEcho(server, player, echo));
  });
});

PlayerEvents.tick((event) => {
  const player = event.player;
  if (!player || player.tickCount % 20 !== 0) return;
  const server = player.server;
  if (!server) return;
  Object.keys(STAGE_TO_ECHO).forEach((stage) => {
    try {
      if (!player.stages.has(stage)) return;
      let echoId = STAGE_TO_ECHO[stage];
      let key = "echoSynced_" + echoId;
      if (player.persistentData.getBooleanOr(key, false)) return;
      syncEcho(server, player, echoId);
      player.persistentData.putBoolean(key, true);
    } catch (e) {}
  });
  Object.keys(ECHO_TIERS).forEach((echoId) => {
    let target = 0;
    try {
      target = tierTarget(player, echoId);
      if (target <= 1 || currentEchoStage(server, player, echoId) >= target) return;
      server.runCommandSilent("ftbechoes progress player " + player.username + " " + echoId + " set_stage " + target);
    } catch (e) {
      console.warn("[echo_unlock] could not raise " + echoId + " to stage " + target + ": " + e);
    }
  });
});

const $PlayerChangedTeamEvent = Java.loadClass("dev.ftb.mods.ftbteams.api.neoforge.FTBTeamsEvent$PlayerChangedTeam");

const resyncEchoesForTeamChange = (player) => {
  const server = player.server;
  if (!server) return;
  OPEN_ECHOES.forEach((echo) => unlockEcho(server, player, echo));
  Object.keys(STAGE_TO_ECHO).forEach((stage) => {
    let echoId = STAGE_TO_ECHO[stage];
    player.persistentData.putBoolean("echoSynced_" + echoId, false);
  });
};

NativeEvents.onEvent($PlayerChangedTeamEvent, (event) => {
  const data = event.getEventData();
  const player = data.player();
  if (!player) return;
  const server = player.server;
  if (!server) return;
  server.scheduleInTicks(1, (_) => {
    try {
      resyncEchoesForTeamChange(player);
    } catch (e) {
      console.warn("[echo_unlock] team change resync failed: " + e);
    }
  });
});
