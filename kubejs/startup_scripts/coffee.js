const $CoffeeDataComponents = Java.loadClass("net.minecraft.core.component.DataComponents");
const $CoffeeFoodProperties = Java.loadClass("net.minecraft.world.food.FoodProperties");
const $CoffeeConsumables = Java.loadClass("net.minecraft.world.item.component.Consumables");
const $CoffeeApplyEffects = Java.loadClass("net.minecraft.world.item.consume_effects.ApplyStatusEffectsConsumeEffect");
const $CoffeeMobEffectInstance = Java.loadClass("net.minecraft.world.effect.MobEffectInstance");
const $CoffeeMobEffects = Java.loadClass("net.minecraft.world.effect.MobEffects");
const $CoffeeUseRemainder = Java.loadClass("net.minecraft.world.item.component.UseRemainder");
const $CoffeeItemStackTemplate = Java.loadClass("net.minecraft.world.item.ItemStackTemplate");
const $CoffeeItems = Java.loadClass("net.minecraft.world.item.Items");
const $CoffeeArrayList = Java.loadClass("java.util.ArrayList");

const COFFEE_EFFECT_TICKS = 1800;
const COFFEE_NUTRITION = 1;
const COFFEE_SATURATION = 0.2;

StartupEvents.registry("item", (event) => {
  const effects = new $CoffeeArrayList();
  effects.add(new $CoffeeMobEffectInstance($CoffeeMobEffects.HASTE, COFFEE_EFFECT_TICKS, 0));
  effects.add(new $CoffeeMobEffectInstance($CoffeeMobEffects.SPEED, COFFEE_EFFECT_TICKS, 0));

  event
    .create("ftb:coffee")
    .maxStackSize(16)
    .component($CoffeeDataComponents.FOOD, new $CoffeeFoodProperties(COFFEE_NUTRITION, COFFEE_SATURATION, true))
    .component($CoffeeDataComponents.CONSUMABLE, $CoffeeConsumables.defaultDrink().onConsume(new $CoffeeApplyEffects(effects)).build())
    .component($CoffeeDataComponents.USE_REMAINDER, new $CoffeeUseRemainder(new $CoffeeItemStackTemplate($CoffeeItems.GLASS_BOTTLE)));
});
