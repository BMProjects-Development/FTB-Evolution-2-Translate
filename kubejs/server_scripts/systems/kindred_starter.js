const STARTER_SPIRIT_TAG = "ftb_starter_spirit";
const STARTER_SPIRIT_RANGE_SQ = 64;
const STARTER_SPIRIT_TYPES = ["kindredspirits:nightfox", "kindredspirits:direwolf", "kindredspirits:quokka"];

const nearestStarterOwner = (entity, level) => {
  let nearest = null;
  let nearestDist = STARTER_SPIRIT_RANGE_SQ;
  level.players.forEach((player) => {
    const dx = player.getX() - entity.getX();
    const dy = player.getY() - entity.getY();
    const dz = player.getZ() - entity.getZ();
    const dist = dx * dx + dy * dy + dz * dz;
    if (dist <= nearestDist) {
      nearest = player;
      nearestDist = dist;
    }
  });
  return nearest;
};

const adoptStarterSpirit = (entity, level) => {
  const tagged = entity.removeTag(STARTER_SPIRIT_TAG);
  const owner = tagged && entity.isAlive() ? nearestStarterOwner(entity, level) : null;
  if (!owner) return;
  entity.adopt(owner);
};

const onStarterSpiritSpawned = (event) => {
  const entity = event.entity;
  const server = event.server;
  const level = event.level;
  if (!entity || !server || !entity.entityTags().contains(STARTER_SPIRIT_TAG)) return;
  server.scheduleInTicks(1, () => {
    try {
      adoptStarterSpirit(entity, level);
    } catch (e) {
      console.error("[kindred_starter] could not tame starter spirit: " + e);
    }
  });
};

STARTER_SPIRIT_TYPES.forEach((type) => EntityEvents.spawned(type, onStarterSpiritSpawned));
