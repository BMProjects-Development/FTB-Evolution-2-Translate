const FOOD_OVERRIDES = [
  { id: "occultism:pitaya", nutrition: 6, saturation: 7.2 },
  { id: "occultism:golden_pitaya", nutrition: 6, saturation: 12.0 },
  { id: "occultism:enchanted_golden_pitaya", nutrition: 6, saturation: 14.4 },
  { id: "minecraft:glistering_melon_slice", nutrition: 4, saturation: 0.8, makeConsumable: true },
];

ItemEvents.modification(event => {
  FOOD_OVERRIDES.forEach(entry => {
    event.modify(entry.id, item => {
      item.setFood(entry.nutrition, entry.saturation);
      if (entry.makeConsumable) {
        item.set("minecraft:consumable", {
          consumeSeconds: 1.6,
          animation: "eat",
          sound: "minecraft:entity.generic.eat",
          hasConsumeParticles: true,
          onConsumeEffects: [],
        });
      }
    });
  });
});
