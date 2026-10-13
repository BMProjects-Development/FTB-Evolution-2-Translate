BlockEvents.drops("oritech:black_hole", (event) => {
  const tool = event.tool;
  if (!tool || tool.isEmpty()) return;
  if (!tool.isCorrectToolForDrops(event.block.blockState)) return;
  event.addItem(Item.of("oritech:black_hole"));
});
