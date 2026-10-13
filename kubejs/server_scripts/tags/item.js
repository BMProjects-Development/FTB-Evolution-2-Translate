// priority: 1002
// #region Add Item Tags
const addItemTags = [
  // Mystical Agriculture seed tags
  {
    tagName: "ftb:t1seeds",
    itemIDs: [
      "mysticalagriculture:stone_seeds",
      "mysticalagriculture:dirt_seeds",
      "mysticalagriculture:wood_seeds",
      "mysticalagriculture:ice_seeds",
      "mysticalagriculture:deepslate_seeds",
    ],
  },
  {
    tagName: "ftb:elementalseed",
    itemIDs: [
      "mysticalagriculture:air_seeds",
      "mysticalagriculture:earth_seeds",
      "mysticalagriculture:water_seeds",
      "mysticalagriculture:fire_seeds",
    ],
  },
  {
    tagName: "ftb:t2seeds",
    itemIDs: [
      //Vanilla
      "mysticalagriculture:nature_seeds",
      "mysticalagriculture:dye_seeds",
      "mysticalagriculture:nether_seeds",
      "mysticalagriculture:coal_seeds",
      "mysticalagriculture:coral_seeds",
      "mysticalagriculture:honey_seeds",
      "mysticalagriculture:amethyst_seeds",
      "mysticalagriculture:basalt_seeds",
      //Modded
      "mysticalagriculture:rubber_seeds",
      "mysticalagriculture:silicon_seeds",
      "mysticalagriculture:sulfur_seeds",
      "mysticalagriculture:aluminum_seeds",
      "mysticalagriculture:saltpeter_seeds",
      "mysticalagriculture:grains_of_infinity_seeds",
      "mysticalagriculture:limestone_seeds",
      "mysticalagriculture:menril_seeds",
      "mysticalagriculture:marble_seeds",
    ],
  },
  {
    tagName: "ftb:t2mobseeds",
    itemIDs: [
      "mysticalagriculture:pig_seeds",
      "mysticalagriculture:chicken_seeds",
      "mysticalagriculture:cow_seeds",
      "mysticalagriculture:sheep_seeds",
      "mysticalagriculture:squid_seeds",
      "mysticalagriculture:fish_seeds",
      "mysticalagriculture:slime_seeds",
      "mysticalagriculture:turtle_seeds",
      "mysticalagriculture:armadillo_seeds",
    ],
  },
  {
    tagName: "ftb:t3seeds",
    itemIDs: [
      //Vanilla
      "mysticalagriculture:iron_seeds",
      "mysticalagriculture:copper_seeds",
      "mysticalagriculture:nether_quartz_seeds",
      "mysticalagriculture:glowstone_seeds",
      "mysticalagriculture:redstone_seeds",
      "mysticalagriculture:obsidian_seeds",
      "mysticalagriculture:prismarine_seeds",
      "mysticalagriculture:sculk_seeds",
      //Modded
      "mysticalagriculture:tin_seeds",
      "mysticalagriculture:zinc_seeds",
      "mysticalagriculture:silver_seeds",
      "mysticalagriculture:lead_seeds",
      "mysticalagriculture:sky_stone_seeds",
      "mysticalagriculture:certus_quartz_seeds",
      "mysticalagriculture:quartz_enriched_iron_seeds",
    ],
  },
  {
    tagName: "ftb:t3mobseeds",
    itemIDs: [
      "mysticalagriculture:zombie_seeds",
      "mysticalagriculture:skeleton_seeds",
      "mysticalagriculture:creeper_seeds",
      "mysticalagriculture:spider_seeds",
      "mysticalagriculture:phantom_seeds",
      "mysticalagriculture:rabbit_seeds",
    ],
  },
  {
    tagName: "ftb:t4seeds",
    itemIDs: [
      //Vanilla
      "mysticalagriculture:gold_seeds",
      "mysticalagriculture:lapis_lazuli_seeds",
      "mysticalagriculture:end_seeds",
      "mysticalagriculture:experience_seeds",
      //Modded
      "mysticalagriculture:soulium_seeds",
      "mysticalagriculture:soularium_seeds",
      "mysticalagriculture:steel_seeds",
      "mysticalagriculture:nickel_seeds",
      "mysticalagriculture:constantan_seeds",
      "mysticalagriculture:uranium_seeds",
      "mysticalagriculture:hop_graphite_seeds",
      "mysticalagriculture:osmium_seeds",
      "mysticalagriculture:fluorite_seeds",
      "mysticalagriculture:compressed_iron_seeds",
      "mysticalagriculture:fluix_seeds",
      "mysticalagriculture:ruby_seeds",
    ],
  },
  {
    tagName: "ftb:t4mobseeds",
    itemIDs: [
      //Vanilla
      "mysticalagriculture:blaze_seeds",
      "mysticalagriculture:ghast_seeds",
      "mysticalagriculture:enderman_seeds",
      //Modded
      "mysticalagriculture:breeze_seeds",
    ],
  },
  {
    tagName: "ftb:t5seeds",
    itemIDs: [
      //Vanilla
      "mysticalagriculture:diamond_seeds",
      "mysticalagriculture:emerald_seeds",
      "mysticalagriculture:netherite_seeds",
      //Modded
      "mysticalagriculture:platinum_seeds",
      "mysticalagriculture:iridium_seeds",
      "mysticalagriculture:draconium_seeds",
    ],
  },
  { tagName: "ftb:t5mobseeds", itemIDs: ["mysticalagriculture:wither_skeleton_seeds"] },

  // Refined Storage / Cable Tiers device tiers
  {
    tagName: "ftb:tiered_constructors",
    itemIDs: [
      "refinedstorage:constructor",
      "cabletiers:elite_constructor",
      "cabletiers:ultra_constructor",
      "cabletiers:mega_constructor",
      "cabletiers:creative_constructor",
    ],
  },
  {
    tagName: "ftb:tiered_destructors",
    itemIDs: [
      "refinedstorage:destructor",
      "cabletiers:elite_destructor",
      "cabletiers:ultra_destructor",
      "cabletiers:mega_destructor",
      "cabletiers:creative_destructor",
    ],
  },
  {
    tagName: "ftb:tiered_importers",
    itemIDs: [
      "refinedstorage:importer",
      "cabletiers:elite_importer",
      "cabletiers:ultra_importer",
      "cabletiers:mega_importer",
      "cabletiers:creative_importer",
    ],
  },
  {
    tagName: "ftb:tiered_exporters",
    itemIDs: [
      "refinedstorage:exporter",
      "cabletiers:elite_exporter",
      "cabletiers:ultra_exporter",
      "cabletiers:mega_exporter",
      "cabletiers:creative_exporter",
    ],
  },
  {
    tagName: "ftb:tiered_interfaces",
    itemIDs: [
      "refinedstorage:interface",
      "cabletiers:elite_interface",
      "cabletiers:ultra_interface",
      "cabletiers:mega_interface",
      "cabletiers:creative_interface",
    ],
  },
  {
    tagName: "ftb:ars_magica_altar_caps",
    itemIDs: [
      "minecraft:coal_block",
      "minecraft:copper_block",
      "minecraft:iron_block",
      "minecraft:redstone_block",
      "arsmagicalegacy:vinteum_block",
      "arsmagicalegacy:chimerite_block",
      "minecraft:lapis_block",
      "minecraft:gold_block",
      "arsmagicalegacy:topaz_block",
      "minecraft:diamond_block",
      "minecraft:emerald_block",
      "minecraft:netherite_block",
      "arsmagicalegacy:sunstone_block",
    ]
  },
  {
    tagName: "ftb:ars_magica_altar_materials",
    itemIDs: [
      "minecraft:smooth_sandstone",
      "minecraft:oak_planks",
      "minecraft:stone_bricks",
      "minecraft:bricks",
      "minecraft:red_sandstone",
      "minecraft:sandstone",
      "minecraft:granite",
      "minecraft:diorite",
      "minecraft:andesite",
      "minecraft:cobbled_deepslate",
      "minecraft:mossy_cobblestone",
      "minecraft:polished_deepslate",
      "minecraft:mossy_stone_bricks",
      "minecraft:polished_andesite",
      "minecraft:polished_granite",
      "minecraft:polished_diorite",
      "minecraft:polished_blackstone",
      "minecraft:smooth_quartz",
      "minecraft:end_stone_bricks",
      "minecraft:purpur_block",
      "minecraft:red_nether_bricks",
      "minecraft:quartz_block",
      "minecraft:blackstone",
      "minecraft:warped_planks",
      "minecraft:prismarine",
      "arsmagicalegacy:witchwood_log",
      "minecraft:cut_copper",
      "minecraft:smooth_red_sandstone",
    ]
  },
  {
    tagName: "ftb:ic_rectifier",
    itemIDs: [
      "ftbic:lv_rectifier",
      "ftbic:mv_rectifier",
      "ftbic:hv_rectifier",
      "ftbic:ev_rectifier",
      "ftbic:iv_rectifier",
    ]
  },
  {
    tagName: "ftb:ltx_eseries_utils",
    itemIDs: [
      "ltxi:epsilon_brush",
      "ltxi:epsilon_fishing_rod",
      "ltxi:epsilon_lighter",
      "ltxi:epsilon_shears",
    ]
  },
  {
    tagName: "ftb:ltx_eseries_tools",
    itemIDs: [
      "ltxi:epsilon_drill",
      "ltxi:epsilon_sword",
      "ltxi:epsilon_shovel",
      "ltxi:epsilon_axe",
      "ltxi:epsilon_hoe",
    ]
  },
  {
    tagName: "ftb:ltx_turrets_basic",
    itemIDs: [
      "ltxi:rocket_turret",
      "ltxi:arc_turret",
    ]
  },
  {
    tagName: "ftb:ltx_weapons_basic",
    itemIDs: [
      "ltxi:aurora",
      "ltxi:hanabi",
      "ltxi:stargazer",
    ]
  },
  { tagName: "c:ores", itemIDs: ["#c:ores/celestine"] },
  { tagName: "c:gems/coal", itemIDs: ["minecraft:coal", "geore:coal_shard"] },
  { tagName: "c:slimeballs", itemIDs: ["ftboceanmobs:sludge_ball"] },
  { tagName: "c:slime_balls", itemIDs: ["ftboceanmobs:sludge_ball"] },
  { tagName: "minecraft:axes", itemIDs: ["hephaestus_tools:broad_axe"] },
  { tagName: "agritechevolved:sand_soils", itemIDs: ["utilitarian:snad", "utilitarian:red_snad"] },
  { tagName: "agritechevolved:soul_sand_soils", itemIDs: ["utilitarian:soul_snad"] },
];
// #endregion

// #region Server Events
ServerEvents.tags("item", (event) => {
  addItemTags.forEach((tag) => event.add(tag.tagName, tag.itemIDs));
});
// #endregion
