const MYSTICAL_SWORD_DAMAGE = {
  inferium: 6,
  prudentium: 7,
  tertium: 9,
  imperium: 11,
  supremium: 14,
  awakened_supremium: 17,
};

const AXE_OVER_SWORD = 2;
const PAXEL_OVER_SWORD = 1;
const SCYTHE_OVER_SWORD = 1;
const PICKAXE_UNDER_SWORD = 2;
const SHOVEL_UNDER_SWORD = 1.5;
const SICKLE_UNDER_SWORD = 1;

const WEAPON_DAMAGE = [
  { id: "iceandfire:dread_knight_sword", damage: 12 },
  { id: "iceandfire:dread_queen_sword", damage: 13 },
  { id: "iceandfire:ghost_sword", damage: 6 },
  { id: "oritech:promethium_axe", damage: 10.5 },
  { id: "thaumaturge:thaumium_sword", damage: 8, requires: "thaumaturge" },
  { id: "thaumaturge:elemental_sword", damage: 9, requires: "thaumaturge" },
  { id: "thaumaturge:crimson_blade", damage: 9, requires: "thaumaturge" },
  { id: "thaumaturge:void_sword", damage: 10, requires: "thaumaturge" },
  { id: "occultism:silver_sword", damage: 7 },
];

Object.keys(MYSTICAL_SWORD_DAMAGE).forEach(tier => {
  const sword = MYSTICAL_SWORD_DAMAGE[tier];
  WEAPON_DAMAGE.push({ id: "mysticalagriculture:" + tier + "_sword", damage: sword });
  WEAPON_DAMAGE.push({ id: "mysticalagriculture:" + tier + "_axe", damage: sword + AXE_OVER_SWORD });
  WEAPON_DAMAGE.push({ id: "mysticalagradditions:" + tier + "_paxel", damage: sword + PAXEL_OVER_SWORD });
  WEAPON_DAMAGE.push({ id: "mysticalagriculture:" + tier + "_scythe", damage: sword + SCYTHE_OVER_SWORD });
  WEAPON_DAMAGE.push({ id: "mysticalagriculture:" + tier + "_pickaxe", damage: sword - PICKAXE_UNDER_SWORD });
  WEAPON_DAMAGE.push({ id: "mysticalagriculture:" + tier + "_shovel", damage: sword - SHOVEL_UNDER_SWORD });
  WEAPON_DAMAGE.push({ id: "mysticalagriculture:" + tier + "_sickle", damage: sword - SICKLE_UNDER_SWORD });
});

ItemEvents.modification(event => {
  WEAPON_DAMAGE.forEach(entry => {
    if (entry.requires && !Platform.isLoaded(entry.requires)) return;
    event.modify(entry.id, item => {
      item.setAttackDamage(entry.damage - 1);
    });
  });
});
