---
navigation:
  title: Cooling
  position: 1
  icon: "oritech:reactor_heat_vent"
  parent: oritech:nuclear_reactor.md
item_ids:
  - oritech:reactor_heat_vent
  - oritech:reactor_heat_pipe
  - oritech:reactor_heat_absorber
  - oritech:reactor_coolant_absorber_port
---
# <Color id="red">Cooling</Color>

<Column alignItems="center" fullWidth={true}>
  # <Color id="red">Cooling</Color>

  <ItemImage id="oritech:reactor_heat_vent" scale="2"/>

  Burning fuel generates heat inside the reactor. If heat is not properly removed, fuel rods will overheat and eventually trigger a <Color id="red">nuclear meltdown</Color>. The explosion scales with reactor size and rod count.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

> <Color id="yellow">Warning sirens will engage before temperatures reach dangerous levels, giving you time to react.</Color> The **Safe Reactors** config option makes overheating reactors enter a cooldown period instead of exploding. Highly recommended when testing new designs.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Passive Cooling</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

Passive cooling uses no consumables and requires no supply chain. It is a good fit for early reactors or builds using single and double rods.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_heat_pipe"/>
  ### <Color id="aqua">Reactor Heat Pipe</Color>
</Row>

<Color id="aqua">Reactor Heat Pipes</Color> absorb heat from neighboring fuel rods and spread it to adjacent vents. Use them to bridge the distance between hot rod stacks and the vents around them.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_heat_vent"/>
  ### <Color id="aqua">Reactor Heat Vent</Color>
</Row>

<Color id="aqua">Reactor Heat Vents</Color> remove heat from the hottest neighboring component: a fuel rod, heat pipe, or absorber. They become <Color id="yellow">more effective at higher temperatures</Color>, so letting the reactor run a little warm can actually improve vent efficiency. No consumables needed.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Active Cooling</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

Active cooling is more powerful than passive, but requires a steady supply of ice. It is necessary for dense quad-rod configurations or large, high-output reactors.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_heat_absorber"/>
  ### <Color id="aqua">Reactor Heat Absorber</Color>
</Row>

<Color id="gold">Reactor Heat Absorbers</Color> remove a fixed <Color id="aqua">16 heat/tick</Color> from <Color id="yellow">each</Color> neighboring component simultaneously. Unlike vents, their output does not vary with temperature, and the coolant cost stays the same regardless of how many sides are being cooled, making them very efficient when surrounded on multiple sides.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_coolant_absorber_port"/>
  ### <Color id="aqua">Coolant Absorber Port</Color>
</Row>

The <Color id="gold">Reactor Coolant Absorber Port</Color> is placed on the **outer ceiling** directly above a heat absorber stack. Insert <Color id="aqua">Ice</Color>, <Color id="aqua">Blue Ice</Color>, or <Color id="aqua">Packed Ice</Color> here to keep the absorbers running. Ice can be produced using an <Color id="green">Industrial Chiller</Color>.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Which Should You Use?</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

| Cooling Type | Components | Consumable | Best For |
|---|---|---|---|
| Passive | Vents + Heat Pipes | None | Early game, single/double rod reactors |
| Active | Absorbers + Coolant Port | Ice | Late game, quad rod or large reactors |

A common approach is to combine both: use heat pipes to distribute heat from the rods outward, then surround absorbers with pipes on all sides for maximum heat removal.

<ItemImage id="minecraft:air" scale="0.25"/>

> <Color id="yellow">At high throughput, absorbers can fill their internal buffer quickly.</Color> Make sure your energy network is draining them continuously.
