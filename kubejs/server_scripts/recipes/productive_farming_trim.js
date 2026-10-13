// priority: 0

const PF_PREFIX = "productivefarming:";
const PF_HIDE_TAG = "c:hidden_from_recipe_viewers";

const PF_KEEP_FLOWERS = [
  "alium", "amaryllis", "anemone", "azure_bluet",
  "balloon_flower", "black_bearded_iris", "blue_jade_vine", "blue_orchid",
  "butterfly_pea", "cape_leadwort", "cattail", "chrysanthemum",
  "cornflower", "dahlia", "dandelion", "great_lobelia",
  "hellebore", "himalayan_poppy", "hydrangea", "lilac",
  "lily_of_the_valley", "morning_glory", "motherwort", "oxeye_daisy",
  "peony", "poppy", "rose_bush", "sea_holly",
  "skullcap", "stinging_nettle", "torchflower", "tulip",
  "valerian_root", "wither_rose", "zinnia",
];

const PF_KEEP_FUNCTIONAL = [
  "farm_controller", "farm_hatch", "feeding_trough", "nutrient_water",
  "nutrient_water_bucket", "pollen", "watering_trough",
];

const PF_KEEP_CROPS = [
  "dried_luffa", "luffa", "luffa_crate",
];

const PF_VILLAGE_FARM_TAGS = [
  "productivefarming:desert_village_farm_crops",
  "productivefarming:plains_village_farm_crops",
  "productivefarming:savanna_village_farm_crops",
  "productivefarming:snowy_village_farm_crops",
  "productivefarming:taiga_village_farm_crops",
];

const PF_VILLAGE_FARM_CROPS = [
  "minecraft:wheat",
  "minecraft:carrots",
  "minecraft:potatoes",
  "minecraft:beetroots",
  "minecraft:air",
];

const PF_KEEP = {};
PF_KEEP_FLOWERS.concat(PF_KEEP_FUNCTIONAL, PF_KEEP_CROPS).forEach((name) => {
  PF_KEEP[PF_PREFIX + name] = true;
});

function pfCutIds() {
  const out = [];
  Item.getTypeList().forEach((entry) => {
    const id = String(entry);
    if (id.indexOf(PF_PREFIX) === 0 && !PF_KEEP[id]) out.push(id);
  });
  return out;
}

ServerEvents.tags("item", (event) => {
  pfCutIds().forEach((id) => {
    event.remove("minecraft:villager_plantable_seeds", id);
    event.add(PF_HIDE_TAG, id);
  });
});

ServerEvents.tags("minecraft:villager_trade", (event) => {
  event.remove("minecraft:farmer/level_1", "productivefarming:farmer/level_1/yellow_dent_corn");
});

ServerEvents.tags("block", (event) => {
  PF_VILLAGE_FARM_TAGS.forEach((tag) => {
    event.removeAll(tag);
    event.add(tag, PF_VILLAGE_FARM_CROPS);
  });
});

ServerEvents.recipes((event) => {
  const cut = pfCutIds();
  if (cut.length === 0) return;

  event.remove({ mod: "productivefarming", output: cut });
  event.remove({ mod: "productivefarming", input: cut });
});
