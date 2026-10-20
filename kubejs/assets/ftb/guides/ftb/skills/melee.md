---
navigation:
  parent: index.md
  title: Melee
  position: 10
  icon: minecraft:iron_sword
---

<Column alignItems="center" fullWidth={true}>
  # <Color id="red">Melee</Color>

  <ItemImage id="minecraft:iron_sword" scale="2"/>

  Melee levels from fighting up close: hitting things, killing them, blocking and taking hits.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">XP Sources</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

| Action | Melee XP |
|---|---|
| Dealing damage that is not from a projectile | 0.25 per point of damage |
| Killing a mob with anything but a projectile | see Kills below |
| Blocking a hit with a shield | 5 per blocked hit |
| Taking damage from anything except a fall | 1 per point of damage |

<ItemImage id="minecraft:air" scale="0.25"/>

"Not a projectile" is wider than it sounds. Most spells, the <ItemLink id="nautec:atlantean_rifle"/> beam and LTX Industries guns and grenades all count as melee damage as well as paying their own tree. Arrows, tridents, thrown items and Iron's Arms 'n Artifice bullets do not.

Hits on a target dummy give nothing.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Kills</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

A kill pays from the mob's own experience drop and its health:

* the experience it drops, counting at most 10 of it
* plus twice the square root of any experience past 10
* plus a fifth of its maximum health, counting at most 40 from health

A Zombie (5 experience, 20 health) gives 9. A Wither (50 experience, 300 health) gives about 63.

<ItemImage id="minecraft:air" scale="0.25"/>

> <Color id="yellow">Note</Color>: only the first 15 kills in one chunk count, and the count resets after 5 minutes. A mob farm that kills everything in one spot stops paying quickly.
