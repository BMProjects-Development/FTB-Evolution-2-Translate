const $CapacitorData = Java.loadClass("com.enderio.enderio.api.capacitor.CapacitorData");
const $EIODataComponents = Java.loadClass("com.enderio.enderio.init.EIODataComponents");

StartupEvents.registry("item", (event) => {
  const capacitors = [
    { name: "adamantite_capacitor", display: "Adamantite Capacitor", base: 10.0 },
    { name: "aeternium_capacitor", display: "Aeternium Capacitor", base: 15.0 },
    { name: "aurichalcum_capacitor", display: "Aurichalcum Capacitor", base: 20.0 },
  ];

  capacitors.forEach((cap) => {
    event
      .create(`ftb:${cap.name}`)
      .displayName(cap.display)
      .texture(`ftb:item/${cap.name}`)
      .component($EIODataComponents.CAPACITOR_DATA, $CapacitorData.simple(cap.base));
  });
});
