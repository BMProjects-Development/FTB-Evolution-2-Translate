StartupEvents.registry("block", (event) => {
  event.create("ftb:blaze_block")
    .stoneSoundType()
    .hardness(2)
    .resistance(6)
    .lightLevel(0.7)
    .requiresTool(true)
    .tagBlock("minecraft:mineable/pickaxe");
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
