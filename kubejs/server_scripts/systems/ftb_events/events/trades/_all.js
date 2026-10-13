// priority: 1000
const allTrades = [
  { weight: 2, entry: { buy: "minecraft:snowball", sell: "minecraft:blue_ice" } },
  { weight: 1, entry: { buy: "minecraft:ink_sac", sell: "2x minecraft:glow_ink_sac" } },
  { weight: 1, entry: { buy: "enderio:grains_of_infinity", sell: "8x ae2:sky_stone_block" } },
  { weight: 1, entry: { buy: "minecraft:melon_slice", sell: "4x minecraft:glow_berries" } },
  { weight: 1, entry: { buy: "minecraft:amethyst_shard", sell: "2x ae2:certus_quartz_crystal" } },
  {
    weight: 1,
    entry: {
      buy: "minecraft:lapis_lazuli",
      action: "weather thunder",
      spawn_message: Text.translate("ftb.trade.thunderstorm.spawn"),
      success_message: Text.translate("ftb.trade.thunderstorm.success"),
      name: Text.translate("ftb.trade.thunderstorm.name"),
    },
  },
  {
    weight: 1,
    entry: {
      buy: "minecraft:sunflower",
      action: "weather clear",
      spawn_message: Text.translate("ftb.trade.sunny.spawn"),
      success_message: Text.translate("ftb.trade.sunny.success"),
      name: Text.translate("ftb.trade.sunny.name"),
    },
  },
];
