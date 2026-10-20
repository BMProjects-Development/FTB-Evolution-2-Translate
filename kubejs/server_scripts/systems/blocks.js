// priority: 500

const ETERNAL_WATER = "evilcraft:eternal_water";

BlockEvents.broken(ETERNAL_WATER, (event) => {
  const player = event.player;
  if (player.isCreative()) return;

  const block = event.block;
  const level = block.level;
  const pos = block.pos;

  level.server.scheduleInTicks(1, () => {
    const current = level.getBlock(pos);
    if (String(current.id) === ETERNAL_WATER) return;
    current.popItem(Item.of(ETERNAL_WATER));
  });
});
