// priority: 500
const $EchoTeamProgress = Java.loadClass("dev.ftb.mods.ftbechoes.echo.progress.TeamProgressManager");
const $EchoIdentifier = Java.loadClass("net.minecraft.resources.Identifier");

let shopKeeperBlacklist = null;

const holdsBlacklistedItem = (player) => {
  if (!shopKeeperBlacklist) shopKeeperBlacklist = Ingredient.of("#ftb:shop_keeper_interaction_blacklist");
  return shopKeeperBlacklist.test(player.mainHandItem) || shopKeeperBlacklist.test(player.offHandItem);
};

const keeperForEcho = (echoId) => {
  const keys = Object.keys(keeperDefs).filter((k) => keeperDefs[k].id === echoId);
  return keys.length ? keeperDefs[keys[0]] : null;
};

const waresUnlocked = (server, player, keeper) => {
  let progress = null;
  if (!keeper || !keeper.stage) return true;
  if (player.stages.has(keeper.stage)) return true;
  try {
    progress = $EchoTeamProgress.get(server).getProgress(player);
    return progress.isPresent() && progress.get().getCurrentStage($EchoIdentifier.parse(keeper.id)) >= 1;
  } catch (e) {
    console.warn("[echo_shop_villagers] could not read team progress for " + keeper.id + ": " + e);
    return false;
  }
};

ItemEvents.entityInteracted((event) => {
  const { player, target, hand, server } = event;
  if (hand !== "MAIN_HAND") return;
  if (!player || !target) return;
  if (holdsBlacklistedItem(player)) return;

  const echoId = target.persistentData.getStringOr("EchoShop", "");
  if (!echoId) return;

  const keeper = keeperForEcho(echoId);
  if (!waresUnlocked(server, player, keeper)) {
    player.tell(Text.translate("ftb.shopkeeper.locked", [
      Text.translate(keeper.name).color(keeper.color),
      Text.translate("ftb.shopkeeper.locked." + keeper.id.split(":")[1]).gray(),
    ]));
    event.cancel();
    return;
  }

  server.runCommandSilent(`execute as ${player.username} run ftbechoes open ${echoId}`);
  event.cancel();
});
