const COFFEE_MACHINE_BLOCK = "cookingforblockheads:coffee_machine";
const COFFEE_MACHINE_OUTPUT = "ftb:coffee";
const COFFEE_MACHINE_BEANS = "minecraft:cocoa_beans";
const COFFEE_MACHINE_BOTTLE = "minecraft:potion";

const $CoffeeMachineDataComponents = Java.loadClass("net.minecraft.core.component.DataComponents");
const $CoffeeMachinePotions = Java.loadClass("net.minecraft.world.item.alchemy.Potions");
const $CoffeeMachineItemUtils = Java.loadClass("net.minecraft.world.item.ItemUtils");
const $CoffeeMachineLevelEvent = Java.loadClass("net.minecraft.world.level.block.LevelEvent");

const coffeeMachineIsWaterBottle = (stack) => {
  const contents =
    stack && !stack.isEmpty() && String(stack.id) === COFFEE_MACHINE_BOTTLE
      ? stack.get($CoffeeMachineDataComponents.POTION_CONTENTS)
      : null;
  return contents != null && contents.is($CoffeeMachinePotions.WATER);
};

const coffeeMachineFindBeans = (inventory) => {
  const size = inventory.getContainerSize();
  let slot = 0;
  for (slot = 0; slot < size; slot++) {
    if (String(inventory.getItem(slot).id) === COFFEE_MACHINE_BEANS) return slot;
  }
  return -1;
};

BlockEvents.rightClicked(COFFEE_MACHINE_BLOCK, (event) => {
  const player = event.player;
  const hand = event.hand;
  const held = event.item;

  if (player.isShiftKeyDown() || !coffeeMachineIsWaterBottle(held)) return;

  const inventory = player.getInventory();
  const beanSlot = coffeeMachineFindBeans(inventory);
  const level = event.level;
  const pos = event.block.pos;

  if (beanSlot < 0) {
    player.setStatusMessage(Text.translate("ftb.coffee_machine.no_beans").red());
    event.cancel();
    return;
  }

  if (!player.isCreative()) inventory.getItem(beanSlot).shrink(1);
  player.setItemInHand(hand, $CoffeeMachineItemUtils.createFilledResult(held, player, Item.of(COFFEE_MACHINE_OUTPUT)));
  level.spawnParticles("minecraft:white_smoke", false, pos.getX() + 0.5, pos.getY() + 0.8, pos.getZ() + 0.5, 0.12, 0.05, 0.12, 6, 0.01);
  level.levelEvent($CoffeeMachineLevelEvent.SOUND_BREWING_STAND_BREW, pos, 0);
  event.cancel();
});
