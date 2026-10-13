// priority: 500

const NODE_PLACER = "thaumaturge:creative_node_placer";

BlockEvents.rightClicked((event) => {
  const { player, item, hand } = event;

  if (!item || item.isEmpty() || item.id !== NODE_PLACER) return;
  if (player.level.isClientSide()) return;
  if (player.isCreative() || player.isSpectator()) return;

  const server = player.server;
  if (!server) return;

  server.scheduleInTicks(1, () => {
    const held = player.getItemInHand(hand);
    if (!held || held.isEmpty() || held.id !== NODE_PLACER) return;
    held.shrink(1);
    player.setItemInHand(hand, held);
  });
});