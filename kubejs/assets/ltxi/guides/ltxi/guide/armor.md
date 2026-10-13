---
navigation:
    title: AL/1C Armor
    icon: wonderland_head
    position: 29
item_ids:
  - wonderland_head
  - wonderland_body
  - wonderland_legs
  - wonderland_feet
---

# AL/1C Armor

<ItemGrid>
<ItemIcon id="wonderland_head" />
<ItemIcon id="wonderland_body" />
<ItemIcon id="wonderland_legs" />
<ItemIcon id="wonderland_feet" />
</ItemGrid>

The AL/1C bodysuit is the wearable half of the *Wonderland* project. Its four segments, Seg.H, Seg.B,
Seg.L, and Seg.F, run on <Color id="energy">Energy</Color> and are
[upgradable](fundamentals/upgrade_system.md) like the rest of our equipment. Each segment is assembled
in the [Fabricator](machines/processing/fabricators.md).

## Pre-installed units

A freshly fabricated segment already carries an **Active Protection Unit**, a **Bubble Projection
Unit**, and its own intrinsic unit. The intrinsics are what give each segment its character.

- **AL/1C [H] Unit**: Seg.H. Blocks vision debuff effects, spending energy per block.
- **AL/1C [B] Unit**: Seg.B. Immunity to fire damage, plus 1 extra block and entity interaction range.
- **AL/1C [L] Unit**: Seg.L. Blocks movement debuff effects and adds 10% movement speed and full
  water movement efficiency.
- **AL/1C [F] Unit**: Seg.F. Immunity to hot floor damage, cancels fall damage for energy, and adds
  1 step height and 5 safe fall distance.

> Intrinsic units can be removed at an Upgrade Station, and a replacement can be fabricated if you
> change your mind.

## Compatible Upgrades

### Any segment

- **Active Protection Unit**: Max rank 4. Each rank adds 6.25% non-void damage reduction and knockback
  resistance, up to 25% at rank 4. Absorbing a hit draws energy.
- **Bubble Projection Unit**: Max rank 4. Adds 5 [Bubble Shield](fundamentals/bubble_shield.md)
  capacity per rank, up to 20 at rank 4.
- **Augmented Equipment Battery**: Max rank 4. Multiplies energy capacity by 4 at rank 1, doubling
  each rank up to 32x at rank 4. Also fits the [ε-Series tools](tools.md).

### Seg.H only

- **Atmospheric Regulator**: Max rank 1. Keeps Water Breathing applied for as long as it has energy.
- **NV Visor**: Max rank 1. Keeps Night Vision applied for as long as it has energy.
- **Neural Training Link**: Max rank 1. Captures experience from mob kills without needing to walk
  over the orbs.

### Seg.B only

- **Fantasia Rulebook**: Max rank 1. Grants creative flight.
- **Metabolic Synthesizer**: Max rank 1. Keeps Saturation applied and grants immunity to Hunger.

### Seg.L and Seg.F

Neither segment has upgrades of its own. Both still take the three modules listed under **Any
segment**, and both are worth wearing for their intrinsic units.