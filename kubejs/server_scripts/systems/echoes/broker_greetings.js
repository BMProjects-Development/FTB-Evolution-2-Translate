// priority: 400

const $NpcMessageExecutor = Java.loadClass("de.markusbordihn.easynpc.entity.easynpc.handlers.action.executor.MessageActionExecutor");
const $NpcMessageData = Java.loadClass("de.markusbordihn.easynpc.data.action.MessageActionData");
const $NpcRecipientScope = Java.loadClass("de.markusbordihn.easynpc.data.action.MessageRecipientScope");
const $NpcActionContext = Java.loadClass("de.markusbordihn.easynpc.data.action.ActionContext");
const $GreetLivingEntity = Java.loadClass("net.minecraft.world.entity.LivingEntity");

const BROKER_SEEN_PREFIX = "brokerSeen_";
const BROKER_TALK_RANGE = 8;
const BROKER_LOOK_DOT = 0.95;
const BROKER_BUBBLE_TICKS = 200;
const BROKER_CHECK_TICKS = 5;

const brokerChatter = [
  { keeper: "broker_early", line: "ftb.broker.chat.broker_early" },
  { keeper: "broker_mid", line: "ftb.broker.chat.broker_mid" },
  { keeper: "broker_late", line: "ftb.broker.chat.broker_late" },
];

const brokerBubble = new $NpcMessageData(false, false, true, "", $NpcRecipientScope.INITIATOR);

const brokerEntryFor = (npc) => {
  let tags = npc.entityTags();
  return brokerChatter.find((entry) => tags.contains(keeperTag(keeperDefs[entry.keeper])));
};

const brokerBusyUntil = {};

const lookDot = (player, npc) => {
  let look = player.getViewVector(1.0);
  let dx = npc.getX() - player.getX();
  let dy = npc.getEyeY() - player.getEyeY();
  let dz = npc.getZ() - player.getZ();
  let len = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (len < 0.001) return 1;
  return (look.x() * dx + look.y() * dy + look.z() * dz) / len;
};

PlayerEvents.tick((event) => {
  let player = event.player;
  if (!player || player.tickCount % BROKER_CHECK_TICKS !== 0) return;
  try {
    if (player.isSpectator()) return;
    let key = String(player.username);
    if (brokerBusyUntil[key] && player.tickCount < brokerBusyUntil[key]) return;
    let data = player.persistentData;
    if (brokerChatter.every((entry) => data.getBooleanOr(BROKER_SEEN_PREFIX + entry.keeper, false))) return;

    let target = null;
    let targetEntry = null;
    let bestDot = BROKER_LOOK_DOT;
    player.level.getEntitiesOfClass($GreetLivingEntity, player.getBoundingBox().inflate(BROKER_TALK_RANGE)).forEach((npc) => {
      if (npc.type !== "easy_npc:humanoid") return;
      if (player.distanceToEntitySqr(npc) > BROKER_TALK_RANGE * BROKER_TALK_RANGE) return;
      let entry = brokerEntryFor(npc);
      if (!entry) return;
      if (data.getBooleanOr(BROKER_SEEN_PREFIX + entry.keeper, false)) return;
      let dot = lookDot(player, npc);
      if (dot < bestDot || !player.hasLineOfSight(npc)) return;
      bestDot = dot;
      target = npc;
      targetEntry = entry;
    });
    if (!target) return;

    $NpcMessageExecutor.send(target, Text.translate(targetEntry.line), brokerBubble, $NpcActionContext.of(player), BROKER_BUBBLE_TICKS);
    data.putBoolean(BROKER_SEEN_PREFIX + targetEntry.keeper, true);
    brokerBusyUntil[key] = player.tickCount + BROKER_BUBBLE_TICKS;
  } catch (e) {
    console.warn("[broker_greetings] look check failed: " + e);
  }
});

const resetBrokerSeen = (player) => {
  brokerChatter.forEach((entry) => player.persistentData.remove(BROKER_SEEN_PREFIX + entry.keeper));
  delete brokerBusyUntil[String(player.username)];
};

PlayerEvents.loggedIn((event) => {
  if (event.player) delete brokerBusyUntil[String(event.player.username)];
});
