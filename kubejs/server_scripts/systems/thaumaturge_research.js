const thaumResearchSetup = () => {
  const $ThaumResearchKnowledge = Java.loadClass("com.leclowndu93150.thaumaturge.api.capability.KnowledgeAccess");
  const $ThaumResearchIdentifier = Java.loadClass("net.minecraft.resources.Identifier");

  const THAUM_RESEARCH_INTERVAL = 100;

  const THAUM_RESEARCH_COMPLETE = [
    "thaumaturge:thaumatorium",
    "thaumaturge:infernal_furnace",
    "thaumaturge:infusion_enchantment",
    "thaumaturge:runic_shielding",
    "thaumaturge:unlock_golemancy",
    "thaumaturge:golem_logistics",
    "thaumaturge:unlock_eldritch",
    "appliedthaumaturge:unlock_energistics",
  ];

  const THAUM_RESEARCH_KNOWN = [
    "thaumaturge:scanned/fluxrift",
  ];

  const thaumResearchIds = (list) => list.map((id) => ({ stage: id, key: $ThaumResearchIdentifier.parse(id) }));

  const THAUM_RESEARCH_COMPLETE_KEYS = thaumResearchIds(THAUM_RESEARCH_COMPLETE);
  const THAUM_RESEARCH_KNOWN_KEYS = thaumResearchIds(THAUM_RESEARCH_KNOWN);

  const thaumResearchSync = (player) => {
    const knowledge = $ThaumResearchKnowledge.of(player);
    THAUM_RESEARCH_COMPLETE_KEYS.forEach((entry) => {
      if (!player.stages.has(entry.stage) && knowledge.isResearchComplete(entry.key)) player.stages.add(entry.stage);
    });
    THAUM_RESEARCH_KNOWN_KEYS.forEach((entry) => {
      if (!player.stages.has(entry.stage) && knowledge.isResearchKnown(entry.key)) player.stages.add(entry.stage);
    });
  };

  PlayerEvents.tick((event) => {
    const player = event.player;
    if (!player || player.tickCount % THAUM_RESEARCH_INTERVAL !== 37) return;
    try {
      thaumResearchSync(player);
    } catch (e) {
      console.error(`Thaumaturge research sync failed for ${player.username}: ${e}`);
    }
  });
};

if (Platform.isLoaded("thaumaturge")) thaumResearchSetup();
