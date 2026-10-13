// priority: 0

const LivingDeathEvent = Java.loadClass("net.neoforged.neoforge.event.entity.living.LivingDeathEvent");
const LivingEntity = Java.loadClass("net.minecraft.world.entity.LivingEntity");

NativeEvents.onEvent(LivingDeathEvent, (event) => {
  const entity = event.getEntity();

  if (!(entity instanceof LivingEntity)) return;
  if (entity.isPlayer()) return;

  const source = event.getSource();
  const attacker = source.getActual ? source.getActual() : (source.getDirectEntity ? source.getDirectEntity() : source.getTrueSource());
  if (!attacker || !attacker.isPlayer()) return;

  const level = attacker.level;
  if (level.isClientSide()) return;

  if (level.random.nextFloat() < 0.02) {
    const mobId = entity.getType().toString();
    let itemStr = `peekaboo:disguise[peekaboo:disguise={entity:{id:"${mobId}"}}]`;
    const dropEnt = level.createEntity("minecraft:item");
    dropEnt.setItem(Item.of(itemStr));
    dropEnt.setPos(entity.getX(), entity.getY() + 0.25, entity.getZ());
    dropEnt.spawn();
  }
});