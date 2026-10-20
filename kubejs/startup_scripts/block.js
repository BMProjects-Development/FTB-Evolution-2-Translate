const $StabilizerBlock = Java.loadClass("damien.nodeworks.block.StabilizerBlock");
const $BlockProperties = Java.loadClass("net.minecraft.world.level.block.state.BlockBehaviour$Properties");
const $BlockItem = Java.loadClass("net.minecraft.world.item.BlockItem");
const $ItemProperties = Java.loadClass("net.minecraft.world.item.Item$Properties");
const $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey");
const $Registries = Java.loadClass("net.minecraft.core.registries.Registries");
const $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");
const $Identifier = Java.loadClass("net.minecraft.resources.Identifier");
const $BlockEntityTypeAddBlocksEvent = Java.loadClass("net.neoforged.neoforge.event.BlockEntityTypeAddBlocksEvent");

const coolantIds = ["adamantite", "aeternium", "aurichalcum"].map((material) => `ftb:${material}_coolant`);

StartupEvents.registry("block", (event) => {
  event.create("ftb:blaze_block")
    .stoneSoundType()
    .hardness(2)
    .resistance(6)
    .lightLevel(0.7)
    .requiresTool(true)
    .tagBlock("minecraft:mineable/pickaxe");

  coolantIds.forEach((id) => {
    event.createCustom(id, () =>
      new $StabilizerBlock(
        $BlockProperties.of()
          .strength(3, 6)
          .requiresCorrectToolForDrops()
          .setId($ResourceKey.create($Registries.BLOCK, $Identifier.parse(id)))
      )
    );
  });
});

StartupEvents.registry("item", (event) => {
  coolantIds.forEach((id) => {
    event.createCustom(id, () =>
      new $BlockItem(
        $BuiltInRegistries.BLOCK.getValue($Identifier.parse(id)),
        new $ItemProperties()
          .setId($ResourceKey.create($Registries.ITEM, $Identifier.parse(id)))
          .useBlockDescriptionPrefix()
      )
    );
  });
});

NativeEvents.onEvent($BlockEntityTypeAddBlocksEvent, (event) => {
  coolantIds.forEach((id) => {
    event.modify(
      $BuiltInRegistries.BLOCK_ENTITY_TYPE.getValue($Identifier.parse("nodeworks:stabilizer")),
      $BuiltInRegistries.BLOCK.getValue($Identifier.parse(id))
    );
  });
});

StartupEvents.modifyCreativeTab("nodeworks:nodeworks", (event) => {
  event.addAfter("nodeworks:stabilizer", coolantIds);
});

BlockEvents.modification((e) => {
  const defaultHardness = 1;
  const defaultRequiresTool = false;

  const blocks = [
    {
      name: "oritech:black_hole",
      hardness: 10,
      requiresTool: true,
    },
  ];

  blocks.forEach((block) => {
    e.modify(block.name, (b) => {
      b.setDestroySpeed(block.hardness !== undefined ? block.hardness : defaultHardness);
      if (block.requiresTool !== undefined ? block.requiresTool : defaultRequiresTool) b.setRequiresTool(true);
      if (block.soundType) b.setSoundType(block.soundType);
      if (block.lightLevel !== undefined) b.setLightEmission(block.lightLevel);
      if (block.explosionResistance !== undefined) b.setExplosionResistance(block.explosionResistance);
    });
  });
});
