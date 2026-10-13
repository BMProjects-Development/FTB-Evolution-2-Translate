---
navigation:
  title: Wind Mill
  icon: ftbic:wind_mill
  parent: generators/index.md
  position: 4
item_ids:
  - ftbic:wind_mill
---

# <Color id="gold">Wind Mill</Color>

<Column alignItems="center" fullWidth={true}>
  <ItemImage id="wind_mill" scale="2" />

  A height-dependent generator that makes about **60 FE/t** at Y=64 and about **260 FE/t** at Y=320.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<RecipeFor id="wind_mill" />

<ItemImage id="minecraft:air" scale="0.25"/>
***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Placement Rules</Color>
</Column>

* Minimum effective **Y=64** — any lower and it produces nothing.
* Output scales linearly from Y=64 to **Y=320**.
* Every block that isn't air within 5 blocks of it (from 2 below to 5 above) lowers its effective height by one, so keep the space around it clear.
* **Rain** multiplies output by 1.2×.
* **Thunderstorms** multiply output by 1.5×.

<ItemImage id="minecraft:air" scale="0.25"/>
***

Useful as a passive top-up and as a reason to build tall. Spread several wind mills out on high ground instead of stacking them, since each one counts the others as obstructions.
