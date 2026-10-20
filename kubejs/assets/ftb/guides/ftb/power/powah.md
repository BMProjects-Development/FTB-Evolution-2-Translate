---
navigation:
  parent: index.md
  title: Powah
  position: 30
  icon: powah:reactor_hardened
---
<Column alignItems="center" fullWidth={true}>
  # <Color id="light_purple">Powah</Color>

  <ItemImage id="powah:reactor_hardened" scale="2"/>

  Every Powah generator makes less power than default, and the top tiers lose the most. Reactors and Thermo Generators start at Hardened. See [Removed Generators](removed.md).
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

> <Color id="yellow">All values are FE/t, in tier order:</Color> Starter, Basic, Hardened, Blazing, Niotic, Spirited, Nitro.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Generators</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="powah:furnator_starter"/>
  ### <Color id="aqua">Furnator</Color>
</Row>

* <Color id="green">Now:</Color> 16, 64, 128, 256, 512, 1,024, 4,096
* <Color id="gray">Default:</Color> 20, 80, 200, 800, 2,000, 8,000, 40,000

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="powah:magmator_starter"/>
  ### <Color id="aqua">Magmator</Color>
</Row>

* <Color id="green">Now:</Color> 16, 64, 128, 256, 512, 1,024, 4,096
* <Color id="gray">Default:</Color> 20, 80, 200, 800, 2,000, 8,000, 40,000

Output transfer runs from 80 FE/t for Starter up to 160,000 FE/t for Nitro. Lava gives 10,000 FE per bucket.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="powah:reactor_hardened"/>
  ### <Color id="aqua">Reactor</Color>
</Row>

* <Color id="green">Now:</Color> 128, 512, 2,560, 12,800, 64,000 (Hardened to Nitro)
* <Color id="gray">Default:</Color> 2,500, 10,000, 25,000, 100,000, 500,000

The buffer is a tenth of default: 250,000 FE for Hardened up to 50,000,000 FE for Nitro.

Hardened Reactors have their own recipe: Uraninite, a Hardened Capacitor and Dielectric Casing make four.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="powah:thermo_generator_hardened"/>
  ### <Color id="aqua">Thermo Generator</Color>
</Row>

* <Color id="green">Now:</Color> 64, 128, 256, 512, 2,048 (Hardened to Nitro)
* <Color id="gray">Default:</Color> 100, 200, 400, 800, 2,000

Thermo Generators cool with Industrial Coolant, not water. Some heat sources changed too. See [Coolant, Steam and Fuel](coolant_and_fuel.md).

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="powah:solar_panel_starter"/>
  ### <Color id="aqua">Solar Panel</Color>
</Row>

* <Color id="green">Now:</Color> 8, 16, 32, 64, 128, 256, 1,024
* <Color id="gray">Default:</Color> 20, 60, 100, 200, 400, 800, 2,000

Panel buffers are much smaller as well: 1,000 FE for Starter up to 20,000,000 FE for Nitro.
