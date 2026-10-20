const grantWares = (player, stage) => {
  if (!player || !stage) return;
  try {
    if (player.stages.has(stage)) return;
    player.stages.add(stage);
    grantEvoAdvancement(player, "open_for_business");
    if (EVO_SHOP_STAGES.every((s) => player.stages.has(s))) grantEvoAdvancement(player, "valued_customer");
  } catch (e) {}
};

const isPlayer = (entity) => {
  try { return entity && entity.type === "minecraft:player"; } catch (e) { return false; }
};

const hasAnyItem = (player, ids) => {
  try {
    let inv = player.inventory;
    let n = inv.getContainerSize();
    for (let i = 0; i < n; i++) {
      let st = inv.getItem(i);
      if (st && !st.isEmpty() && ids.indexOf(st.id) !== -1) return true;
    }
  } catch (e) {}
  return false;
};

const hasPatchouliBook = (player, book) => {
  const inv = player.inventory;
  const size = inv.getContainerSize();
  let found = false;
  let i = 0;
  let stack = null;
  for (i = 0; i < size && !found; i++) {
    stack = inv.getItem(i);
    found = stack.id === "patchouli:guide_book" && String(stack.getComponentsPatch()).indexOf(book) !== -1;
  }
  return found;
};

const ARCANIST_ITEMS = ["arsmagicalegacy:vinteum_dust", "thaumaturge:thaumometer"];
const HEDGE_WITCH_ITEMS = [
  "witchery:guidebook",
  "rootsclassic:verdant_sprig",
  "witchery:belladonna_seeds",
  "witchery:mandrake_seeds",
  "witchery:snowbell_seeds",
  "witchery:wolfsbane_seeds",
  "witchery:water_artichoke_seeds",
];
const BEASTMASTER_ITEMS = ["iceandfire:bestiary"];
const ATOMIC_FORGE_ITEMS = ["oritech:atomic_forge", "oritech:super_ai_chip", "oritech:heisenberg_compensator", "oritech:advanced_computing_engine"];

ItemEvents.foodEaten((event) => {
  let eater = event.entity;
  if (!isPlayer(eater)) return;
  grantWares(eater, "ftb:village_food_wares");
});

const BACKPACK_TIERS = [
  "sophisticatedbackpacks:copper_backpack",
  "sophisticatedbackpacks:iron_backpack",
  "sophisticatedbackpacks:gold_backpack",
  "sophisticatedbackpacks:diamond_backpack",
  "sophisticatedbackpacks:netherite_backpack",
];

ItemEvents.crafted((event) => {
  let crafter = event.entity;
  if (!isPlayer(crafter)) return;
  let item = event.item;
  if (!item) return;
  let id = item.id;
  if (id === "irons_jewelry:jewelcrafting_station") {
    grantWares(crafter, "ftb:jewler_wares");
    return;
  }
  let storageUpgrade = id.indexOf("sophisticatedstorage:") === 0 && id.indexOf("tier_upgrade") !== -1;
  if (BACKPACK_TIERS.indexOf(id) !== -1 || storageUpgrade) {
    grantWares(crafter, "ftb:village_storage_wares");
  }
});

ItemEvents.entityInteracted((event) => {
  let player = event.entity;
  if (!isPlayer(player)) return;
  let item = event.item;
  if (!item || (item.id !== "productivebees:bee_cage" && item.id !== "productivebees:sturdy_bee_cage")) return;
  let target = event.target;
  if (!target) return;
  let t = target.type;
  if (!t || t.indexOf("bee") === -1) return;
  grantWares(player, "ftb:village_apiarist_wares");
});

EntityEvents.death((event) => {
  try {
    let dead = event.entity;
    if (!dead || dead.type !== "irons_artifice:gunslinger") return;
    let source = event.source;
    if (!source) return;
    let killer = source.getEntity();
    if (!isPlayer(killer)) return;
    grantWares(killer, "ftb:swashbuckler_wares");
  } catch (e) {}
});

PlayerEvents.tick((event) => {
  let player = event.player;
  if (!player || player.tickCount % 20 !== 0) return;
  try {
    if (!player.stages.has("ftb:gatekeeper_wares")) {
      let mh = player.mainHandItem;
      let oh = player.offHandItem;
      if ((mh && mh.id === "gateways:gate_pearl") || (oh && oh.id === "gateways:gate_pearl")) {
        grantWares(player, "ftb:gatekeeper_wares");
      }
    }
    if (!player.stages.has("ftb:arcanist_wares") && (hasAnyItem(player, ARCANIST_ITEMS) || hasPatchouliBook(player, "arsmagicalegacy:arcane_compendium"))) {
      grantWares(player, "ftb:arcanist_wares");
    }
    if (!player.stages.has("ftb:hedge_witch_wares") && hasAnyItem(player, HEDGE_WITCH_ITEMS)) {
      grantWares(player, "ftb:hedge_witch_wares");
    }
    if (!player.stages.has("ftb:beastmaster_wares") && hasAnyItem(player, BEASTMASTER_ITEMS)) {
      grantWares(player, "ftb:beastmaster_wares");
    }
    if (!player.stages.has("oritech_atomic_forge") && hasAnyItem(player, ATOMIC_FORGE_ITEMS)) {
      player.stages.add("oritech_atomic_forge");
    }
  } catch (e) {}
});

const ADVANCEMENT_WARES = [
  { advancement: "neovitae:neovitae/root", wares: "ftb:sanguine_merchant_wares" },
  { advancement: "minecraft:husbandry/fishy_business", wares: "ftb:fishmonger_wares" },
];

ADVANCEMENT_WARES.forEach((entry) => {
  PlayerEvents.advancement(entry.advancement, (event) => {
    let player = event.entity;
    if (!isPlayer(player)) return;
    grantWares(player, entry.wares);
  });
});

PlayerEvents.loggedIn((event) => {
  const player = event.player;
  if (!player) return;
  ADVANCEMENT_WARES.forEach((entry) => {
    try {
      if (!player.stages.has(entry.wares) && player.isAdvancementDone(entry.advancement)) grantWares(player, entry.wares);
    } catch (e) {}
  });
});

const TECH_NAMESPACES = ["ftbic", "oritech", "enderio", "energizedpower", "powah", "pipez", "laserio", "modularrouters", "mffs", "integrateddynamics", "ltxi"];

const WAYFARER_ITEMS = [
  "waystones:warp_stone",
  "waystones:warp_scroll",
  "waystones:return_scroll",
  "waystones:bound_scroll",
  "naturescompass:naturescompass",
  "explorerscompass:explorerscompass",
  "paraglider:paraglider",
];

const PYRAMID_WARES = [
  { stage: "skyline_unlocked", wares: "ftb:broker_mid_wares" },
  { stage: "skyline3_unlocked", wares: "ftb:broker_late_wares" },
];

ItemEvents.crafted((event) => {
  const crafter = event.entity;
  const item = event.item;
  const namespace = item ? String(item.id).split(":")[0] : "";
  if (!isPlayer(crafter) || TECH_NAMESPACES.indexOf(namespace) === -1) return;
  grantWares(crafter, "ftb:village_tech_wares");
});

ItemEvents.rightClicked("ftbquests:lootcrate", (event) => {
  grantWares(event.player, "ftb:gambler_wares");
});

PlayerEvents.tick((event) => {
  const player = event.player;
  if (!player || player.tickCount % 20 !== 10) return;
  PYRAMID_WARES.forEach((entry) => {
    if (player.stages.has(entry.stage)) grantWares(player, entry.wares);
  });
  if (!player.stages.has("ftb:wayfarer_wares") && hasAnyItem(player, WAYFARER_ITEMS)) {
    grantWares(player, "ftb:wayfarer_wares");
  }
});
