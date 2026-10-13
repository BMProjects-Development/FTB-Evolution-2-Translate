---
navigation:
  title: Productive Farming Traits
  icon: productivefarming:pollen
  position: 3
  parent: index.md
---

<Column alignItems="center" fullWidth={true}>
  # <Color id="gold">Productive Farming Traits</Color>

  The Hydroponic Accelerators read the Growth, Yield and Mutability traits Productive Farming puts on seeds.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">What Each Trait Does</Color>
</Column>

| Trait | Levels | In the accelerator |
|---|:---:|---|
| <Color id="aqua">Growth</Color> | 0 to 3 | Divides the cycle time by the level plus one, so Growth 3 runs in a quarter of the time |
| <Color id="aqua">Yield</Color> | 0 to 3 | Adds its level to each produce stack of every harvest. Seeds are not raised |
| <Color id="aqua">Mutability</Color> | 0 to 4 | Each level adds half the base chance again, so Mutability 4 triples it |
| <Color id="aqua">Resistance</Color> | 0 to 4 | No effect in the accelerator |

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Raising Traits</Color>
</Column>

* Traits only rise in a normal growth lane. Each harvest rolls once for every seed grown, and a success raises one random trait on the planted seed.
* Mystical Agriculture seeds roll at 6% for tier 1, falling to 1% at tier 6. The elemental seeds and vanilla seeds roll at 7%.
* Returned seeds copy the planted seed's traits, so a good seed spreads as you harvest it.
* A seed that just gained a trait stops stacking with older copies still sitting in its output slot. Pull the output with a pipe or the lane waits until you empty it.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Traits in a Cross</Color>
</Column>

* The parent with the higher Mutability sets the chance. At Mutability 4 a 12% cross becomes 36%, and the 50% crosses always succeed from Mutability 2.
* The new seed takes all of that parent's traits.
* The cross runs at the pace of the parent with the lower Growth.

> <Color id="yellow">Note</Color>: the `hydroponic_crop_traits` option in FTB Industrial Contraptions' common config turns all of this off.
