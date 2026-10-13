StartupEvents.registry("item", (event) => {
  const CELL_TYPE = "meinfinitycell:infinity_cell";
  const cellTextures = (name) => ({
    layer0: "meinfinitycell:item/infinity_cell",
    layer1: `ftb:item/infinity_${name}`,
    layer2: "ftb:item/infinity_cell_layer_2",
  });

  const itemCells = {
    dirt: "minecraft:dirt",
    sand: "minecraft:sand",
    andesite: "minecraft:andesite",
    soul_sand: "minecraft:soul_sand",
    blackstone: "minecraft:blackstone",
    basalt: "minecraft:basalt",
    cobbled_deepslate: "minecraft:cobbled_deepslate",
    end_stone: "minecraft:end_stone",
    netherrack: "minecraft:netherrack",
    sky_stone: "ae2:sky_stone_block",
    kivi: "xycraft_world:kivi",
  };

  Object.keys(itemCells).forEach((name) => {
    event
      .create(`ftb:infinity_${name}_cell`, CELL_TYPE)
      .itemType(itemCells[name])
      .textures(cellTextures(name));
  });

  event
    .create("ftb:infinity_lava_cell", CELL_TYPE)
    .fluidType("minecraft:lava")
    .textures(cellTextures("lava"));
});
