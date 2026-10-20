---
navigation:
    title: Tools
    icon: epsilon_drill
    position: 30
---

# ε-Series tools

The ε (epsilon) series is our standard tool product line. All tools are unbreakable, run on <Color id="energy">Energy</Color>,
and are [upgradable](fundamentals/upgrade_system.md).

## Modular Mining Tools

<ItemGrid>
<ItemIcon id="epsilon_drill" />
<ItemIcon id="epsilon_shovel" />
<ItemIcon id="epsilon_axe" />
<ItemIcon id="epsilon_hoe" />
</ItemGrid>

### Default upgrades

<Row>
<UpgradeEntry id="default/epsilon_shovel" />
<UpgradeEntry id="tree_vein_mine" />
</Row>

The Drill, Shovel, Axe and Hoe are designated *modular mining tools*. Switching equipment mode cycles through the 5
available base mining speeds:

- **Off**: Block breaking disabled, including in creative mode.
- **Slow**: 3.0
- **Normal**: 9.0
- **Fast**: 20.0
- **Turbo**: 75.0

The upgrade system can raise the mining level (limit) and expand the set of blocks the tool is effective on. The Shovel,
Axe, and Hoe are effective on their respective materials. The Drill is effective on both *pickaxe* and *shovel*
harvestable materials for mining convenience.

> ε-Series Shovel's default upgrade module grants Silk Touch.

## Other Mining Tools

<ItemGrid>
<ItemIcon id="epsilon_shears" />
<ItemIcon id="epsilon_wrench" />
</ItemGrid>

### Default upgrades

<UpgradeEntry id="default/epsilon_wrench" />

The Wrench and Shears do not have the variable speed or the ability to change effective blocks via the upgrade system.
They still support the enchantment upgrade modules.

## Melee weapons

<ItemGrid>
<ItemIcon id="epsilon_sword" />
<ItemIcon id="epsilon_axe" />
</ItemGrid>

### Default upgrades

<UpgradeEntry id="default/epsilon_melee" />

The Sword and Axe are designated *melee weapons*. They share certain upgrade modules with the [signature series weapons](weapons/index.md)
including enchantment modules (Razor and Looting) and target filters.

> The [Equipment Damage Modifier](fundamentals/damage_modifiers.md) system applies to all ε-Series melee weapons.

## Miscellaneous tools

<ItemGrid>
<ItemIcon id="epsilon_fishing_rod" />
<ItemIcon id="epsilon_brush" />
<ItemIcon id="epsilon_lighter" />
</ItemGrid>

These tools do not currently provide extra capabilities beyond their baseline. It is still recommended to obtain them,
given their cheaper Fabrication cost.

## Compatible Upgrades

### All ε-Series tools

- **Resonance-Tuned Servos**: Max rank 1. Suppresses the vibrations the held tool emits.
- **Augmented Equipment Battery**: Max rank 4. Multiplies energy capacity by 4 at rank 1, doubling
  each rank up to 32x at rank 4. Also fits [AL/1C armor](armor.md).

### Mining tools

The Drill, Shovel, Axe, Hoe, Shears, and Wrench.

- **Overclocked Harvest Matrix**: Max rank 5. Applies Fortune at level 1, 2, 3, 5, or 7 by rank.
- **Stabilized Harvest Matrix**: Max rank 1. Applies Silk Touch.
- **Mining Subspace Link**: Max rank 1. Sends broken block drops straight into your inventory.

> The two Harvest Matrices share an exclusive set. A tool can carry Fortune or Silk Touch, never both.

### Modular mining tools

The Drill, Shovel, Axe, and Hoe.

- **ε Cutter Rev.000**: Max rank 1. Makes the tool effective on every block, on top of its own
  material set.

### Single tool modules

- **Prospector Nanites**: Max rank 1. ε Drill. Vein-mines up to 64 ores at once, spending extra
  energy per additional block.
- **Lumber Felling Unit**: Max rank 1. ε Axe. Fells up to 256 logs at once along with the
  surrounding leaves, at no extra energy cost.
- **ε Anglers' Kit**: Max rank 5. ε Fishing Rod. Applies Lure and Luck of the Sea at the installed
  rank.

### Melee weapons

The ε Sword and ε Axe are also part of `#ltxi:weapons`, so they take the weapon-side modules:
Combat Yield Protocol, Severance Algorithm, Combat Subspace Link, Biometric Obfuscation, and the
three Engagement Protocols. See [Weapons](weapons/index.md) for what each one does.