ServerEvents.tags("enchantment", (event) => {
  event.remove("minecraft:non_treasure", "apothic_enchanting:miners_fervor");
  event.add("minecraft:on_random_loot", "apothic_enchanting:miners_fervor");
});
