const $BrokerGuardImpactEvent = Java.loadClass("net.neoforged.neoforge.event.entity.ProjectileImpactEvent");

const BROKER_GUARD_TAGS = [
  "echoshop_ftb_broker_early",
  "echoshop_ftb_broker_mid",
  "echoshop_ftb_broker_late",
];

const isBrokerCatch = (event) => {
  const projectile = event.getProjectile();
  const hit = event.getRayTraceResult();
  const catcher = projectile && String(projectile.type) === "justdirethings:creature_catcher";
  const target = catcher && !projectile.level.isClientSide() && String(hit.getType()) === "ENTITY" ? hit.getEntity() : null;
  const tags = target ? target.entityTags() : null;
  return tags ? BROKER_GUARD_TAGS.some((t) => tags.contains(t)) : false;
};

NativeEvents.onEvent($BrokerGuardImpactEvent, (event) => {
  try {
    if (isBrokerCatch(event)) event.setCanceled(true);
  } catch (e) {
    console.warn("[broker_catch_guard] handler error: " + e);
  }
});
