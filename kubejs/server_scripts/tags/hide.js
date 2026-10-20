const hideFromJEI = [
  "justdirethings:time_crystal_cluster_small",
  "justdirethings:time_crystal_cluster_medium",
  "justdirethings:time_crystal_cluster_large",
  "neovitae:dungeon_tester",
  "mysticalagriculture:copper_alloy_seeds",
  "mysticalagriculture:copper_alloy_essence",
  "arsmagicalegacy:nature_scythe",
  "arsmagicalegacy:winters_grasp",
  "enderio:block_detector",
]

const georeBuds = {
  resources: [
  "coal", "copper", "diamond", "emerald", "lead", "aluminum", 
  "monazite", "black_quartz", "zinc", "topaz",
  "sapphire", "ruby", "ancient_debris", "redstone", "quartz",
  "lapis", "iron", "gold", "nickel", "osmium", "platinum", 
  "silver", "tin", "tungsten", "uranium", "uraninite",
  ],
  size: ["small", "medium", "large"]
}
georeBuds.resources.forEach((resource) => {
  georeBuds.size.forEach((size) => {
    hideFromJEI.push(`geore:${size}_${resource}_bud`)
  })
});

const dyeColors = [
  "white", "orange", "magenta", "light_blue", "yellow", "lime", "pink", "gray",
  "light_gray", "cyan", "purple", "blue", "brown", "green", "red", "black",
]

const cableTiersBlocks = { gray: [], light_blue: [] }
const cableTiers = ["elite", "ultra", "mega", "creative"]
const cableTiersCableBlocks = ["importer", "exporter", "constructor", "destructor"]
const cableTiersDeviceBlocks = ["disk_interface", "autocrafter"]
cableTiers.forEach((tier) => {
  cableTiersCableBlocks.forEach((block) => cableTiersBlocks.gray.push(`${tier}_${block}`))
  cableTiersDeviceBlocks.forEach((block) => cableTiersBlocks.light_blue.push(`${tier}_${block}`))
});

const coloredVariants = [
  {
    mod: "refinedstorage",
    defaultColor: "gray",
    blocks: ["cable", "importer", "exporter", "constructor", "destructor", "external_storage"],
  },
  {
    mod: "refinedstorage",
    defaultColor: "light_blue",
    blocks: [
      "controller", "creative_controller", "grid", "crafting_grid", "pattern_grid",
      "autocrafting_monitor", "autocrafter", "autocrafter_manager", "disk_interface",
      "detector", "relay", "network_receiver", "network_transmitter",
      "wireless_transmitter", "security_manager",
    ],
  },
  { mod: "cabletiers", defaultColor: "gray", blocks: cableTiersBlocks.gray },
  { mod: "cabletiers", defaultColor: "light_blue", blocks: cableTiersBlocks.light_blue },
]
coloredVariants.forEach(({ mod, defaultColor, blocks }) => {
  blocks.forEach((block) => {
    dyeColors.filter((color) => color !== defaultColor).forEach((color) => {
      hideFromJEI.push(`${mod}:${color}_${block}`)
    })
  })
});

ServerEvents.tags("item", (event) => {
  hideFromJEI.forEach((item) => {
    event.add("c:hidden_from_recipe_viewers", item)
  })
  event.add("c:hidden_from_recipe_viewers", "@easy_npc")
});
