---
navigation:
  title: Energy Rectifiers
  icon: ftbic:mv_rectifier
  parent: energy/index.md
  position: 4
item_ids:
  - ftbic:lv_rectifier
  - ftbic:mv_rectifier
  - ftbic:hv_rectifier
  - ftbic:ev_rectifier
  - ftbic:iv_rectifier
---

# <Color id="gold">Energy Rectifiers</Color>

<Column alignItems="center" fullWidth={true}>
  <ItemImage id="hv_rectifier" scale="2" />

  **You do not need rectifiers in this pack.** FTBIC runs in FE mode here: every FTBIC generator pushes FE and every FTBIC machine accepts FE on every side, so power from any mod goes straight in.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>
***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">How They Work</Color>
</Column>

Rectifiers are still craftable. A rectifier is directional: its **FE face** accepts power from an adjacent cable, generator, or storage block, and the remaining faces pass it on at the matching voltage transfer rate:

| Rectifier | FE rate |
|-----------|----------|
| LV | 1,024 FE/t |
| MV | 4,096 FE/t |
| HV | 16,384 FE/t |
| EV | 65,536 FE/t |
| IV | 262,144 FE/t |


<ItemImage id="minecraft:air" scale="0.25"/>
***

<Row>
  <ItemImage id="lv_rectifier" />
  ### <Color id="aqua">LV Energy Rectifier</Color>
</Row>

<RecipeFor id="lv_rectifier" />

<Row>
  <ItemImage id="mv_rectifier" />
  ### <Color id="aqua">MV Energy Rectifier</Color>
</Row>

<RecipeFor id="mv_rectifier" />

<Row>
  <ItemImage id="hv_rectifier" />
  ### <Color id="aqua">HV Energy Rectifier</Color>
</Row>

<RecipeFor id="hv_rectifier" />

<Row>
  <ItemImage id="ev_rectifier" />
  ### <Color id="aqua">EV Energy Rectifier</Color>
</Row>

<RecipeFor id="ev_rectifier" />

<Row>
  <ItemImage id="iv_rectifier" />
  ### <Color id="aqua">IV Energy Rectifier</Color>
</Row>

<RecipeFor id="iv_rectifier" />
