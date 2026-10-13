const TaglockItem = Java.loadClass("dev.sterner.witchery.content.item.taglock.TaglockItem");
const WitcheryDataComponents = Java.loadClass("dev.sterner.witchery.core.registry.WitcheryDataComponents");
const JavaLong = Java.loadClass("java.lang.Long");

ItemEvents.entityInteracted("witchery:taglock", (event) => {
  const { player, target, hand, item, level } = event;
  if (String(hand) !== "MAIN_HAND") return;
  if (!player || !target || !target.isLiving()) return;
  if (item.count !== 1 || TaglockItem.Companion.isFilled(item)) return;

  const bound = TaglockItem.Companion.tryTaglockEntity(level, player, item, target, item);
  if (bound) {
    item.set(WitcheryDataComponents.INSTANCE.getTIMESTAMP().get(), JavaLong.valueOf(String(level.getGameTime())));
  } else {
    player.getCooldowns().addCooldown(item, 100);
  }
  event.cancel();
});
