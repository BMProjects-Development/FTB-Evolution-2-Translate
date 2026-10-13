// priority: 110
const spawnPyramidSlowFall = {
  INTERVAL: 200,
  DURATION: 1200,
  AMPLIFIER: 4,
};

PlayerEvents.tick((event) => {
  const player = event.player;
  if (player.level.isClientSide()) return;
  if (player.tickCount % spawnPyramidSlowFall.INTERVAL !== 0) return;
  if (player.level.getBiome(player.blockPosition()).getRegisteredName() !== SpawnPyramid.BIOME) return;
  player.potionEffects.add("minecraft:slow_falling", spawnPyramidSlowFall.DURATION, spawnPyramidSlowFall.AMPLIFIER, true, false);
});
