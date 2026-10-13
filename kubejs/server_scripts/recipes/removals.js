// priority: 0

const removeRecipeId = [
  "productivebees:centrifuge/dusts/honeycomb_blazing",
  "productivebees:centrifuge/honeycomb_breeze",
  "utilitarian:utility/redying/white_stained_glass",
  "utilitarian:utility/redying/orange_stained_glass",
  "utilitarian:utility/redying/magenta_stained_glass",
  "utilitarian:utility/redying/light_blue_stained_glass",
  "utilitarian:utility/redying/yellow_stained_glass",
  "utilitarian:utility/redying/lime_stained_glass",
  "utilitarian:utility/redying/pink_stained_glass",
  "utilitarian:utility/redying/gray_stained_glass",
  "utilitarian:utility/redying/light_gray_stained_glass",
  "utilitarian:utility/redying/cyan_stained_glass",
  "utilitarian:utility/redying/purple_stained_glass",
  "utilitarian:utility/redying/blue_stained_glass",
  "utilitarian:utility/redying/brown_stained_glass",
  "utilitarian:utility/redying/green_stained_glass",
  "utilitarian:utility/redying/red_stained_glass",
  "utilitarian:utility/redying/black_stained_glass",
  "reliquary:magicbane",
  "oritech:crafting/centrifuge",
  "oritech:crafting/pulverizeralt",
  "oritech:crafting/assembleralt",
  "powah:crafting/reactor_starter",
  "powah:crafting/reactor_basic",
  "powah:crafting/thermo_generator_starter",
  "powah:crafting/thermo_generator_basic",
  "bhc:yellow_heart_melted_from_red_heart_melted",
  "bhc:green_heart_melted_from_yellow_heart_melted",
  "bhc:blue_heart_melted_from_green_heart_melted",
  "magnumtorch:diamond_magnum_torch",
  "magnumtorch:emerald_magnum_torch",
  "magnumtorch:amethyst_magnum_torch",
  "hephaestus:clear_glass",
  "connectedglass:borderless_glass1",
  "oritech:pulverizer/uranium",
  "ltxi:pressing/silicon_plate",
  "nep:infused_awakening_matrix",
  "nep:mystical_agriculture_encoding_module",
  "nep:apothic_enchanting_encoding_module",
  "justdynathings:creative_goo",
];

const removeItemFromIOAndHide = [
  "pylons:infusion_pylon",
  "stellaris:oil_bucket",
  "paraglider:heart_container",
  "power_armor:compressor",
  "nep:machine_hub",
  "nep:hub_linker",
];

const FACADE_RECIPE_TYPE = "integrateddynamics:crafting_special_facade";

// #region Server Events
ServerEvents.tags("item", (event) => {
  const HIDE_TAG = "c:hidden_from_recipe_viewers";
  const allTagIds = [];
  event.build((tagId) => {
    if (tagId.toString() !== HIDE_TAG) allTagIds.push(tagId);
  });

  removeItemFromIOAndHide.forEach((item) => {
    if (!Item.exists(item)) return;
    allTagIds.forEach((tagId) => event.remove(tagId, item));
    event.add(HIDE_TAG, item);
  });
});

ServerEvents.recipes((event) => {
  removeRecipeId.forEach((recipeID) => {
    event.remove({ id: recipeID });
  });

  removeItemFromIOAndHide.forEach((item) => {
    if (typeof item === "string" && !Item.exists(item)) return;
    event.remove({ output: item, not: { type: FACADE_RECIPE_TYPE } });
    event.remove({ input: item, not: { type: FACADE_RECIPE_TYPE } });
  });

});

  RecipeViewerEvents.removeCategories((event) => {
  event.remove("power_armor:compressing");
});

// #endregion Server Events
