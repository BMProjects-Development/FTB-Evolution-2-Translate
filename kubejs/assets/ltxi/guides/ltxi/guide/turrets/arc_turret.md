---
navigation:
    title: Ionos
    icon: arc_turret
    parent: turrets/index.md
    position: 0
item_ids:
  - arc_turret
---

# *Ionos* A/DS Turret

<GameScene zoom={4} interactive={false}>
<Block id="mesh_block" y="0" />
<Block id="arc_turret" y="-1" />
<BlockAnnotation x="0" y="-1" z="0" color="#8bd1f0">
Items and Energy can only be connected to this block!
</BlockAnnotation>
</GameScene>

## Stats
- Horizontal search radius: 30.0
- Vertical search radius: 20.0
- Target search interval: 1.5 sec
- Base damage: 2.0 / tick

## Default targets

Any entity with **Neutral Enemy** hostility or higher.

## About

The *Ionos* will select up to 16 targets on a **Search** operation. It will select the closest as the primary target,
which it will then continuously attack until the target dies or goes out of range. It will then select the next valid
target from the queue or else it will return to **Search** mode.

## Compatible Upgrades

Installed via the [Upgrade System](../fundamentals/upgrade_system.md).

- **Combat Yield Protocol**: Max rank 5. Applies Looting to its kills, at level 1, 2, 3, 5, or 7
  by rank.
- **Severance Algorithm**: Max rank 5. Applies the [Razor](../enchantments.md) enchantment at
  the installed rank.
- **Combat Subspace Link**: Max rank 1. Mob drops from its kills go into the turret's output inventory.
- **Biometric Obfuscation**: Max rank 1. Tags its damage as `minecraft:no_anger`, so striking
  neutral mobs does not provoke them.
- **Engagement Protocol: Extermination**: Max rank 1. Engages any entity, regardless of hostility.
- **Engagement Protocol: Preemption**: Max rank 1. Engages anything at Neutral Enemy hostility
  or above.
- **Engagement Protocol: Rectification**: Max rank 1. Engages Hostile entities only.

> The three Engagement Protocols share an exclusive set. Only one target filter can be
> installed at a time.

> Turrets are not part of `#ltxi:upgradable/standard`, so the Σ/VM3 Power Supply Unit does not
> fit them.