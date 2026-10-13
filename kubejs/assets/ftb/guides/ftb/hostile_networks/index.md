---
navigation:
  title: Hostile Neural Networks
  icon: hostilenetworks:deep_learner
  position: 0
item_ids:
  - hostilenetworks:deep_learner
  - hostilenetworks:blank_data_model
  - hostilenetworks:sim_chamber
  - hostilenetworks:prediction_matrix
---

<Column alignItems="center" fullWidth={true}>
  # <Color id="gold">Hostile Neural Networks</Color>

  <ItemImage id="hostilenetworks:deep_learner" scale="2"/>

  Teach a Data Model how a mob fights or how an ore forms, then let a Data Center turn that knowledge into loot and ore.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">The Loop</Color>
</Column>

1. Right-click a mob or an ore block with a <ItemLink id="hostilenetworks:blank_data_model"/> to attune it. Only mobs and ores with a model can be attuned; [Data Models](data_models.md) lists the ones this pack adds.
2. Put the model in a <ItemLink id="hostilenetworks:deep_learner"/> (4 slots). The learner counts while it is anywhere in your main inventory, your offhand or a Curios slot.
3. Kill the mob, or mine the ore without Silk Touch. Each kill or ore broken adds data to every matching model in the learner.
4. Once the model reaches <Color id="green">Basic</Color> (6 data), a <ItemLink id="hostilenetworks:sim_chamber"/> can train it further without fighting. Chambers refuse Faulty models.
5. Once the model reaches <Color id="gold">Self Aware</Color>, move it into a [Data Center](data_center.md). That is where resources come from.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Model Tiers</Color>
</Column>

| Tier | Data needed | Data per kill or ore |
|---|:---:|:---:|
| <Color id="dark_gray">Faulty</Color> | 0 | 1 |
| <Color id="green">Basic</Color> | 6 | 4 |
| <Color id="blue">Advanced</Color> | 54 | 10 |
| <Color id="light_purple">Superior</Color> | 354 | 18 |
| <Color id="gold">Self Aware</Color> | 1,254 | maxed |

Bosses follow the same table as every other mob. The model's tooltip shows how many more kills it needs.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Simulation Chamber</Color>
</Column>

<Row>
  <ItemImage id="hostilenetworks:sim_chamber"/>
  ### <Color id="aqua">Training only</Color>
</Row>

In FTB Evolution 2 the chamber runs in <Color id="aqua">Training</Color> mode and cannot be switched. Each 15 second run uses one <ItemLink id="hostilenetworks:prediction_matrix"/>, adds 1 data to the model and produces nothing. Power per tick is the model's simulation cost plus 20%.

Training is slow on its own: a Basic model needs 1,248 more runs, about 5.2 hours, to become Self Aware. Kill or mine with the Deep Learner to get there faster. The chamber stops once the model is Self Aware.

> <Color id="yellow">Note</Color>: The Loot Fabricator and Fabrication Directive are disabled in this pack. The Data Center picks its own outputs.
