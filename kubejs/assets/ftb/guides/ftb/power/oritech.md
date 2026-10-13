---
navigation:
  parent: index.md
  title: Oritech
  position: 40
  icon: oritech:fuel_generator
---
<Column alignItems="center" fullWidth={true}>
  # <Color id="light_purple">Oritech</Color>

  <ItemImage id="oritech:fuel_generator" scale="2"/>

  Oritech's small generators are stronger than default, the fission reactor is much weaker, and its early parts no longer need steel.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Generators</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

| Generator | Output |
|---|:---:|
| <ItemImage id="oritech:basic_generator"/> Basic Generator | 64 RF/t (32) |
| <ItemImage id="oritech:bio_generator"/> Bio Generator | 256 RF/t (64) |
| <ItemImage id="oritech:fuel_generator"/> Fuel Generator | 8,192 RF/t (256) |
| <ItemImage id="oritech:lava_generator"/> Lava Generator | 64 RF/t, unchanged |
| <ItemImage id="oritech:big_solar_panel"/> Big Solar Panel | 128 RF/t (32) |

The Lava Generator burns lava much faster than default: 128 mB per second. A bucket is worth 10,000 RF (76,800).

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:steam_engine"/>
  ### <Color id="aqua">Steam Engine</Color>
</Row>

* A Steam Boiler Addon makes twice the steam per RF (ratio 4, was 2). The Steam Engine's own RF per mB is unchanged.
* The boiler holds 128 buckets (8).
* It burns the same steam Colossal Reactors make.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:nuclear_reactor_controller"/>
  ### <Color id="aqua">Fission Reactor</Color>
</Row>

* Each fuel pulse makes 38 RF (64).
* Each energy port outputs up to 75,000 RF/t (25,000).
* The reactor stores up to 500,000,000 RF (50,000,000).
* Max heat is 4,000 (2,000), but it goes critical after 400 unstable ticks (600).
* Reactors can be at most 16 blocks across (64).

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Energy Storage</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

Portable Energy Storage and Large Energy Storage hold 25% more and transfer 25% faster:

* <ItemImage id="oritech:portable_energy_storage"/> Portable Energy Storage: 1,250,000 RF, 6,250 RF/t
* <ItemImage id="oritech:large_storage"/> Large Energy Storage: 25,000,000 RF, 12,500 RF/t

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Easier Early Parts</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:magnetic_coil"/>
  ### <Color id="aqua">Magnetic Coil</Color>
</Row>

Nickel ingots around iron ingots and a block of iron, no steel. Makes four.

<RecipeFor id="oritech:magnetic_coil"/>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:motor"/>
  ### <Color id="aqua">Motor</Color>
</Row>

Nickel, iron plates, one Magnetic Coil and a block of iron, no steel.

<RecipeFor id="oritech:motor"/>
