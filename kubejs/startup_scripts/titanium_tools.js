const $Tool = Java.loadClass("net.minecraft.world.item.component.Tool");
const $ToolRule = Java.loadClass("net.minecraft.world.item.component.Tool$Rule");
const $ArrayList = Java.loadClass("java.util.ArrayList");
const $DataComponents = Java.loadClass("net.minecraft.core.component.DataComponents");

const TITANIUM_TOOL_DURABILITY = 3122;
const TITANIUM_MINING_SPEED = 9.6;

const TITANIUM_TOOLS = [
  { id: "stellaris:titanium_pickaxe", attackDamage: 5.0, setSpeed: true },
  { id: "stellaris:titanium_axe", attackDamage: 9.8, setSpeed: true },
  { id: "stellaris:titanium_shovel", attackDamage: 5.6, setSpeed: true },
  { id: "stellaris:titanium_hoe", attackDamage: 0.2, setSpeed: true },
  { id: "stellaris:titanium_sword", attackDamage: 7.4, setSpeed: false },
];

const withMiningSpeed = (tool, speed) => {
  const rules = new $ArrayList();
  tool.rules().forEach(rule => {
    if (rule.speed().isPresent() && rule.correctForDrops().orElse(false)) {
      rules.add($ToolRule.minesAndDrops(rule.blocks(), speed));
    } else {
      rules.add(rule);
    }
  });
  return new $Tool(rules, tool.defaultMiningSpeed(), tool.damagePerBlock(), tool.canDestroyBlocksInCreative());
};

ItemEvents.modification(event => {
  TITANIUM_TOOLS.forEach(entry => {
    event.modify(entry.id, item => {
      const tool = item.get($DataComponents.TOOL);
      item.setMaxDamage(TITANIUM_TOOL_DURABILITY);
      item.setAttackDamage(entry.attackDamage);
      if (entry.setSpeed && tool != null) {
        item.setTool(withMiningSpeed(tool, TITANIUM_MINING_SPEED));
      }
    });
  });
});
