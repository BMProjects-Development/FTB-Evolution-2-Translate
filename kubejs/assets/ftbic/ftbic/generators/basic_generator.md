---
navigation:
  title: Basic Generator
  icon: ftbic:basic_generator
  parent: generators/index.md
  position: 1
item_ids:
  - ftbic:basic_generator
---

# <Color id="gold">Basic Generator</Color>

<Column alignItems="center" fullWidth={true}>
  <ItemImage id="basic_generator" scale="2" />

  Your first power source — a tiny furnace-grade engine that burns solid fuel for **320 FE/t**.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<RecipeFor id="basic_generator" />

<ItemImage id="minecraft:air" scale="0.25"/>
***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Stats</Color>
</Column>

* **Tier:** LV (outputs 320 FE/t)
* **Internal buffer:** 128,000 FE
* **Fuel slot:** one stack

Place fuel in the only inventory slot. The generator keeps burning until the fuel value is exhausted — it will **not** stop when the buffer is full, so wire it straight into an <ItemLink id="lv_battery_box" /> to avoid waste.

<ItemImage id="minecraft:air" scale="0.25"/>
***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Accepted Fuels</Color>
</Column>

Only these fuels burn. Other furnace fuels, such as lava buckets and blaze rods, do nothing here. The slot will take other items, but they just sit there and block it, so filter anything that feeds it automatically.

* Coal and charcoal: 1,600 ticks
* Coal blocks: 16,000 ticks
* Logs and planks: 300 ticks
* Saplings, sticks and sugar cane: 100 ticks
* Cactus: 200 ticks
* <ItemLink id="scrap" />: 400 ticks, a strong fuel for how cheap it is

<RecipesFor id="scrap" />
