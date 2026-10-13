---
navigation:
  parent: index.md
  title: Coolant, Steam and Fuel
  position: 15
  icon: powah:dry_ice
---
<Column alignItems="center" fullWidth={true}>
  # <Color id="light_purple">Coolant, Steam and Fuel</Color>

  <ItemImage id="powah:dry_ice" scale="2"/>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Coolant and Heat</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="ftb:industrial_coolant_bucket"/>
  ### <Color id="aqua">Industrial Coolant</Color>
</Row>

Industrial Coolant replaces water wherever a reactor needs cooling. Drop **Dry Ice** into a still water source block and it turns into Industrial Coolant.

* **Powah:** the only fluid coolant for Thermo Generators and Reactors. Water does nothing.
* **Colossal Reactors:** works as a heat sink inside the reactor. See [Colossal Reactors](colossal_reactors.md).

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="auroral:shimmering_ice"/>
  ### <Color id="aqua">Powah Solid Coolants</Color>
</Row>

The usual solid coolants still work: snowballs, snow blocks, ice, packed ice, blue ice and Dry Ice. The pack adds one:

| Coolant | Amount | Temperature |
|---|:---:|:---:|
| <ItemImage id="auroral:shimmering_ice"/> Shimmering Ice | 712 | -32 |

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="powah:blazing_crystal_block"/>
  ### <Color id="aqua">Powah Heat Sources</Color>
</Row>

Thermo Generators under these blocks run hotter or cooler than before:

| Block | Heat |
|---|:---:|
| <ItemImage id="powah:blazing_crystal_block"/> Block of Blazing Crystal | 1,500 (2,800) |
| <ItemImage id="oritech:manhattan_module"/> Manhattan Module | 4,000 (new) |
| <ItemImage id="ftbic:nuke"/> Nuke | 4,000 (new) |
| <ItemImage id="justdirethings:coalblock_t4"/> Eclipse Ember Block | 3,000 (new) |

Magma blocks and lava are unchanged.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Steam</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

Oritech steam is the only steam in the pack. Colossal Reactors cooled with water produce it, Colossal Reactors turbines burn it, and the Oritech Steam Engine burns it. Pipe steam from one mod into the other freely.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Fuel</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="minecraft:lava_bucket"/>
  ### <Color id="aqua">Lava</Color>
</Row>

A bucket of lava is worth **10,000 FE** in every generator that burns it as fuel:

* Oritech Lava Generator: 10,000 (76,800)
* Energized Power Thermal Generator: 10,000 (50,000)
* Powah Magmator: 10,000 (already the default)

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="ftbmaterials:charcoal_block"/>
  ### <Color id="aqua">New Furnace Fuels</Color>
</Row>

These burn in furnaces and every machine that takes furnace fuel:

| Fuel | Burn time |
|---|:---:|
| <ItemImage id="ftbmaterials:charcoal_block"/> Block of Charcoal | 16,000 ticks |
| <ItemImage id="mysticalagradditions:inferium_coal"/> Inferium to Insanium Coal | 2,400 to 76,800 ticks |
| Inferium to Insanium Coal Blocks | 21,600 to 691,200 ticks |

Each tier of Mystical Agradditions coal burns twice as long as the one before it.
