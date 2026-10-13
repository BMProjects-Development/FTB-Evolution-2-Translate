// priority: 2000
const EVO_SHOP_STAGES = [
  "ftb:arcanist_wares",
  "ftb:beastmaster_wares",
  "ftb:broker_late_wares",
  "ftb:broker_mid_wares",
  "ftb:fishmonger_wares",
  "ftb:gambler_wares",
  "ftb:gatekeeper_wares",
  "ftb:hedge_witch_wares",
  "ftb:jewler_wares",
  "ftb:sanguine_merchant_wares",
  "ftb:swashbuckler_wares",
  "ftb:village_apiarist_wares",
  "ftb:village_food_wares",
  "ftb:village_storage_wares",
  "ftb:village_tech_wares",
  "ftb:wayfarer_wares",
];

const grantEvoAdvancement = (player, key) => {
  if (!player) return;
  try {
    player.server.runCommandSilent("advancement grant " + player.username + " only ftb:evolution/" + key);
  } catch (e) {
    console.warn("[evolution_advancements] grant " + key + " failed: " + e);
  }
};
