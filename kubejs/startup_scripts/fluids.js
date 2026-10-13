StartupEvents.registry("fluid", (event) => {
  event.create("ftb:industrial_coolant", "thin")
    .displayName("Industrial Coolant")
    .tint(0x34ebd8)
    .bucketColor(0x34ebd8);

  event.create("ftb:bio_resin", "thin")
      .displayName("Bio Resin")
      .bucketColor(0xFFAAABAB)
      .tint(0xFFAAABAB)
      .type(type => type
          .renderType(2)
          .stillTexture("xycraft_machines:block/fluids/resin")
          .flowingTexture("xycraft_machines:block/fluids/resin_flowing")
      )
});


