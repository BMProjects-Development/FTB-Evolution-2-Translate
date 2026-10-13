---
navigation:
  parent: index.md
  title: Industrial Contraptions
  position: 20
  icon: ftbic:basic_generator
---
<Column alignItems="center" fullWidth={true}>
  # <Color id="light_purple">Industrial Contraptions</Color>

  <ItemImage id="ftbic:basic_generator" scale="2"/>

  Industrial Contraptions uses FE directly. Its generators push FE into any mod's cables, and its machines take FE on every side, so Energy Rectifiers are no longer needed. Generators, solar panels, cables and machine buffers are up to four times stronger than default.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Generators</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

| Generator | Output |
|---|:---:|
| <ItemImage id="ftbic:basic_generator"/> Basic Generator | 320 FE/t (80) |
| <ItemImage id="ftbic:geothermal_generator"/> Geothermal Generator | 320 FE/t (160) |
| <ItemImage id="ftbic:wind_mill"/> Wind Mill | 9.6 to 104 FE/t (2.4 to 52) |
| <ItemImage id="ftbic:lv_solar_panel"/> LV Solar Panel | 32 FE/t (8) |
| <ItemImage id="ftbic:mv_solar_panel"/> MV Solar Panel | 256 FE/t (64) |
| <ItemImage id="ftbic:hv_solar_panel"/> HV Solar Panel | 2,048 FE/t (512) |
| <ItemImage id="ftbic:ev_solar_panel"/> EV Solar Panel | 16,384 FE/t (4,096) |

The Wind Mill still makes nothing below y64 and the most at y320, with a bonus in rain and thunder.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="ftbic:nuclear_reactor"/>
  ### <Color id="aqua">Nuclear Reactor</Color>
</Row>

* Output is **four times** the default.
* Water cooling is **five times** as strong (multiplier 10, was 2).
* The internal buffer is twice as large.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Cables and Buffers</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

### <Color id="aqua">Cables</Color>

| Tier | Transfer |
|---|:---:|
| LV | 1,024 FE/t (256) |
| MV | 4,096 FE/t (1,024) |
| HV | 16,384 FE/t (4,096) |
| EV | 65,536 FE/t (16,384) |
| IV | 262,144 FE/t (65,536) |

> <Color id="red">Machines still burn out when a higher tier is fed into them.</Color>

<ItemImage id="minecraft:air" scale="0.25"/>

### <Color id="aqua">Machine Buffers</Color>

Every machine holds four times as much energy as default. Machines use the same amount of power per operation as before. Battery and Battery Box capacities are unchanged.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Basic Generator Fuels</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

The Basic Generator burns its usual fuels (coal, charcoal, logs, planks, saplings, sticks, sugar cane, cactus and Scrap) and also:

| Fuel | Burn time |
|---|:---:|
| Tiny coal and tiny charcoal | 200 ticks |
| <ItemImage id="ftbmaterials:charcoal_block"/> Block of Charcoal | 16,000 ticks |
| <ItemImage id="justdirethings:coal_t1"/> Just Dire Things coals | 4,800 to 129,600 ticks |
| Just Dire Things coal blocks | 48,000 to 1,296,000 ticks |
| <ItemImage id="mysticalagradditions:inferium_coal"/> Mystical Agradditions coals | 2,400 to 76,800 ticks |
| Mystical Agradditions coal blocks | 21,600 to 691,200 ticks |
| EvilCraft Blood Waxed Coal | 3,200 ticks, 32,000 as a block |
| Mob Flow Utilities Infused Coal and Charcoal | 12,800 ticks |
| Compressium compressed coal | 144,000 ticks and up |

Anything that isn't a fuel stays out of the slot.

> <Color id="yellow">At 320 FE/t, one piece of coal is worth 512,000 FE.</Color>
