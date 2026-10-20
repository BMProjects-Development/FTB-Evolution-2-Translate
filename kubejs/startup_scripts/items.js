const $ItemsDataComponents = Java.loadClass("net.minecraft.core.component.DataComponents");
const $ItemsFoods = Java.loadClass("net.minecraft.world.food.Foods");
const $ItemsConsumables = Java.loadClass("net.minecraft.world.item.component.Consumables");

StartupEvents.registry("item", (event) => {
  event.create("ftb:oil_residue");
  event.create("ftb:blood_vial").maxStackSize(16);
  event
    .create("ftb:meat_ingot")
    .component($ItemsDataComponents.FOOD, $ItemsFoods.COOKED_BEEF)
    .component($ItemsDataComponents.CONSUMABLE, $ItemsConsumables.DEFAULT_FOOD);
});
