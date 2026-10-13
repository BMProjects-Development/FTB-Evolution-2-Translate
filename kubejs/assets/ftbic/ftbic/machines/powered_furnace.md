---
navigation:
  title: Powered Furnace
  icon: ftbic:powered_furnace
  parent: machines/index.md
  position: 2
item_ids:
  - ftbic:powered_furnace
  - ftbic:advanced_powered_furnace
---

# <Color id="gold">Powered Furnace</Color>

<Column alignItems="center" fullWidth={true}>
  <ItemImage id="powered_furnace" scale="2" />

  An electric furnace that runs any vanilla smelting recipe. 24 FE/t, 38,400 FE buffer, LV tier.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<RecipeFor id="powered_furnace" />

<ItemImage id="minecraft:air" scale="0.25"/>
***

<Row>
  <ItemImage id="advanced_powered_furnace" />
  ### <Color id="aqua">Advanced Powered Furnace</Color>
</Row>

MV version with 320,000 FE buffer and 128 FE/t throughput — same recipes, much faster.

<RecipeFor id="advanced_powered_furnace" />

Accepts all vanilla smelting recipes plus any mod-added smelting recipes. Use with <ItemLink id="overclocker_upgrade" /> to push throughput further.
