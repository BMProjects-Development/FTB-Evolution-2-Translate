---
navigation:
    title: Hanabi
    icon: hanabi
    parent: weapons/index.md
    position: 133
---

# *Hanabi* 33/GL

<ItemImage id="hanabi" scale="3" />

## Stats

- Base damage: Varies (see below)
- Projectile: Shell Grenades
- Projectile speed: 30 m/s
- Trigger: Semi Auto
- Trigger cooldown: 0.75 sec

## Shells

Hanabi can fire several types of shells. After extensive field research, we have replaced the standard-issue explosive
shells with our new Sparkler shells. Other types must be unlocked via [Equipment Upgrade Modules](../fundamentals/upgrade_system.md).

### Sparkler

This shell creates a strong primary explosion, then splits into 14 bomblets which deal massive amounts of explosive damage
in a large circular area.

- Blast radius: 10.0
- Base damage: 30.0
- Bomblet damage: 10.0
- `#minecraft:is_explosion` damage tag.

### Flame

<UpgradeEntry id="flame_grenade_core" />

Creates a stationary flame field that lingers for **5 seconds** and continuously burns everything inside it. Not
recommended against highly mobile targets.

- Blast radius: 9.0
- Base damage: 10.0
- Flame field damage: 4.0 every 4 ticks (100.0 total damage potential)
- Damage is tagged `#minecraft:is_fire`, both impact and flames.
- 3x bonus damage against `#ltxi:weak_to_flame` enemies
  - Strays, Polar Bears, Snow Golems

### Cryo

<UpgradeEntry id="cryo_grenade_core" />

Cryo shells blast enemies in a large area with ice. Recommended for crowd control or enemies weak to ice.

- Blast radius: 12.0
- Base damage: 4.0
- 8x bonus damage against `#ltxi:weak_to_cryo` enemies
  - By default, this tag is `#minecraft:freeze_hurts_extra`: Striders, Blazes, Magma Cubes
- Applies [*Frostbite III*](../fundamentals/mob_effects.md#frostbite) for 20 seconds

### Electric

<UpgradeEntry id="electric_grenade_core" />

Electric shells' specialty is wet and underwater combat.

- Blast radius: 10.0, *20.0 if shell impacts in rain or water*
- Base damage: 30.0
- 3x bonus damage if either criteria met:
  - Target is in rain or water
  - Is tagged `#ltxi:weak_to_electric`: Turtles, Axolotls, Guardians, Elder Guardians, Fish, Dolphins, Squids, Glow Squids, Tadpoles

### Acid

<UpgradeEntry id="acid_grenade_core" />

Acid shells specialize against highly armored or high threat targets. Their blast radius is smaller, but
they deal increased damage to compensate.

- Blast radius: 5.0
- Base damage: 60.0
- Applies [*Corroding III*](../fundamentals/mob_effects.md#corroding) for 10 seconds

### Gloom Gas

<UpgradeEntry id="gloom_gas_grenade_core" />

Gloom Gas shells weaken enemy damage and abilities.

- Blast radius: 5.0
- Base damage: 4.0
- Applies [*Gloom III*](../fundamentals/mob_effects.md#gloom) for 30 seconds

## Compatible Upgrades

Installed via the [Upgrade System](../fundamentals/upgrade_system.md).

- **Hanabi Launch Boost**: Max rank 2. Raises shell projectile speed.
- **Echo Suppressor**: Max rank 1. Suppresses the vibrations this weapon emits, keeping Sculk
  Sensors and Wardens from noticing your fire.
- **//ERR~MAG-Z!!-NE//∞**: Max rank 1. Replaces the ammunition source with an infinite one.
  No recipe exists for this module.
- **Combat Yield Protocol**: Max rank 5. Applies Looting to your kills, at level 1, 2, 3, 5, or 7
  by rank.
- **Severance Algorithm**: Max rank 5. Applies the [Razor](../enchantments.md) enchantment at
  the installed rank.
- **Combat Subspace Link**: Max rank 1. Mob drops from your kills go straight into your inventory.
- **Biometric Obfuscation**: Max rank 1. Tags its damage as `minecraft:no_anger`, so striking
  neutral mobs does not provoke them.
- **Engagement Protocol: Extermination**: Max rank 1. Engages any entity, regardless of hostility.
- **Engagement Protocol: Preemption**: Max rank 1. Engages anything at Neutral Enemy hostility
  or above.
- **Engagement Protocol: Rectification**: Max rank 1. Engages Hostile entities only.

> The three Engagement Protocols share an exclusive set. Only one target filter can be
> installed at a time.

### Shell Cores

Each core unlocks one of the shell types described above. Sparkler shells need no core.

- **Acid Shells**: Max rank 1. Unlocks **Acid** shells.
- **Cryo Shells**: Max rank 1. Unlocks **Cryo** shells.
- **Electric Shells**: Max rank 1. Unlocks **Electric** shells.
- **Flame Shells**: Max rank 1. Unlocks **Flame** shells.
- **Gloom Gas Shells**: Max rank 1. Unlocks **Gloom Gas** shells.
- **ARCOIRIS Engine**: Max rank 1. Unlocks all five shell types at once. No recipe exists for this
  module.