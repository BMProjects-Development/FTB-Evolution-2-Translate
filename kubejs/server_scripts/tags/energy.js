const energyTags = [
  {
    tagName: "ftb:generator",
    blockIDs: {
      powah: [
        "furnator_basic", "furnator_blazing", "furnator_hardened", "furnator_niotic", "furnator_nitro",
        "furnator_spirited", "furnator_starter", "magmator_basic", "magmator_blazing", "magmator_hardened",
        "magmator_niotic", "magmator_nitro", "magmator_spirited", "magmator_starter", "reactor_basic",
        "reactor_blazing", "reactor_hardened", "reactor_niotic", "reactor_nitro", "reactor_spirited",
        "reactor_starter", "solar_panel_basic", "solar_panel_blazing", "solar_panel_hardened", "solar_panel_niotic",
        "solar_panel_nitro", "solar_panel_spirited", "solar_panel_starter", "thermo_generator_basic",
        "thermo_generator_blazing", "thermo_generator_hardened", "thermo_generator_niotic", "thermo_generator_nitro",
        "thermo_generator_spirited", "thermo_generator_starter"
      ],
      oritech: [
        "basic_generator", "big_solar_panel", "bio_generator", "fuel_generator", "lava_generator",
        "nuclear_reactor_controller", "reactor_energy_port", "steam_engine"
      ],
      enderio: [
        "energetic_photovoltaic_module", "pulsating_photovoltaic_module", "soul_engine", "stirling_generator",
        "vibrant_photovoltaic_module"
      ],
      enderio_evolution: [
        "basic_infinity_generator", "crystalline_infinity_generator", "simple_stirling_generator",
        "stellar_infinity_generator"
      ],
      energizedpower: [
        "coal_engine", "heat_generator", "lightning_generator", "solar_panel_1", "solar_panel_2", "solar_panel_3",
        "solar_panel_4", "solar_panel_5", "solar_panel_6", "solar_panel_7", "thermal_generator"
      ],
      ftbic: [
        "basic_generator", "ev_solar_panel", "geothermal_generator", "hv_solar_panel", "lv_solar_panel",
        "mv_solar_panel", "nuclear_reactor", "wind_mill"
      ],
      justdirethings: ["generatorfluidt1", "generatort1"],
      justdynathings: [
        "blazegold_solar_panel", "celestigem_solar_panel", "eclipse_alloy_solar_panel", "ferricore_solar_panel"
      ],
      ltxi: ["portable_generator", "solar_panel"],
      ae2: ["crystal_resonance_generator", "vibration_chamber"],
      colossal_reactors: [
        "high_cond_power_port", "power_port", "reactor_controller", "turbine_controller",
        "turbine_high_cond_power_port", "turbine_power_port"
      ],
      integrateddynamics: ["coal_generator"],
      nautec: ["bacterial_fuel_cell", "creative_power_source"],
      agritechevolved: ["biomass_burner"],
      horsepowered: ["generator"],
      productivebees: ["honey_generator"],
    },
    itemOnlyIDs: {
      justdirethings: ["pocket_generator"],
    },
  },
  {
    tagName: "ftb:energystorage",
    blockIDs: {
      powah: [
        "energy_cell_basic", "energy_cell_blazing", "energy_cell_creative", "energy_cell_hardened",
        "energy_cell_niotic", "energy_cell_nitro", "energy_cell_spirited", "energy_cell_starter"
      ],
      oritech: ["creative_storage", "large_storage", "portable_energy_storage"],
      energizedpower: ["advanced_battery_box", "battery_box", "creative_battery_box", "elite_battery_box"],
      ftbic: ["ev_battery_box", "hv_battery_box", "lv_battery_box", "mv_battery_box"],
      ltxi: ["energy_cell_array", "infinite_energy_cell_array"],
      ae2: ["creative_energy_cell", "dense_energy_cell", "energy_cell"],
      refinedtypes: [
        "1024k_energy_storage_block", "1048576k_energy_storage_block", "256k_energy_storage_block",
        "262144k_energy_storage_block", "64k_energy_storage_block", "65536k_energy_storage_block",
        "8192k_energy_storage_block", "8388608k_energy_storage_block", "creative_energy_storage_block",
        "infinite_energy_storage_block"
      ],
      integrateddynamics: ["energy_battery", "energy_battery_creative"],
      agritechevolved: ["capacitor_tier1", "capacitor_tier2", "capacitor_tier3"],
      horsepowered: ["creative_battery"],
    },
    itemOnlyIDs: {
      powah: [
        "battery_basic", "battery_blazing", "battery_hardened", "battery_niotic", "battery_nitro",
        "battery_spirited", "battery_starter"
      ],
      energizedpower: [
        "battery_1", "battery_10", "battery_2", "battery_3", "battery_4", "battery_5", "battery_6", "battery_7",
        "battery_8", "battery_9", "creative_battery"
      ],
      ftbic: ["creative_battery", "ev_battery", "hv_battery", "lv_battery", "mv_battery", "single_use_battery"],
      appflux: [
        "fe_16k_cell", "fe_16k_portable_cell", "fe_16m_cell", "fe_16m_portable_cell", "fe_1k_cell",
        "fe_1k_portable_cell", "fe_1m_cell", "fe_1m_portable_cell", "fe_256k_cell", "fe_256k_portable_cell",
        "fe_256m_cell", "fe_256m_portable_cell", "fe_4k_cell", "fe_4k_portable_cell", "fe_4m_cell",
        "fe_4m_portable_cell", "fe_64k_cell", "fe_64k_portable_cell", "fe_64m_cell", "fe_64m_portable_cell"
      ],
      refinedtypes: [
        "1024k_energy_storage_disk", "1048576k_energy_storage_disk", "256k_energy_storage_disk",
        "262144k_energy_storage_disk", "64k_energy_storage_disk", "65536k_energy_storage_disk",
        "8192k_energy_storage_disk", "8388608k_energy_storage_disk", "creative_energy_storage_disk",
        "infinite_energy_storage_disk"
      ],
      nautec: ["prismatic_battery"],
    },
  },
];

const collectIDs = (groups) => {
  const ids = [];
  Object.entries(groups).forEach(([modID, paths]) => {
    if (!Platform.isLoaded(modID)) return;
    paths.forEach((path) => ids.push(`${modID}:${path}`));
  });
  return ids;
};

ServerEvents.tags("block", (event) => {
  energyTags.forEach((tag) => event.add(tag.tagName, collectIDs(tag.blockIDs)));
});

ServerEvents.tags("item", (event) => {
  energyTags.forEach((tag) => {
    event.add(tag.tagName, collectIDs(tag.blockIDs));
    event.add(tag.tagName, collectIDs(tag.itemOnlyIDs));
  });
});
