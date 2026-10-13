---
navigation:
  parent: index.md
  title: Colossal Reactors
  position: 50
  icon: colossal_reactors:reactor_controller
---
<Column alignItems="center" fullWidth={true}>
  # <Color id="light_purple">Colossal Reactors</Color>

  <ItemImage id="colossal_reactors:reactor_controller" scale="2"/>

  Reactors make less steam, turbines make far more power from it, and some inputs and outputs changed.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Steam and Coolant</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:still_steam_bucket"/>
  ### <Color id="aqua">Water Cooling Makes Oritech Steam</Color>
</Row>

An actively cooled reactor running on water produces Oritech steam. Colossal Reactors turbines accept Oritech steam, and so does the Oritech Steam Engine, so either one can burn a reactor's output.

* A water-cooled reactor makes 20% less steam: 0.8 mB per mB of water (1.0).

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="colossal_reactors:turbine_controller"/>
  ### <Color id="aqua">Turbines</Color>
</Row>

* A turbine makes 120 RF per mB of steam (4), before coils and blades.
* Any steam works, including steam from an Oritech generator fitted with a Steam Boiler Addon.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="ftb:industrial_coolant_bucket"/>
  ### <Color id="aqua">Industrial Coolant Heat Sink</Color>
</Row>

Industrial Coolant source blocks work as a heat sink inside the reactor:

| Heat sink | Fuel efficiency | Energy | Overheating |
|---|:---:|:---:|:---:|
| <ItemImage id="minecraft:water_bucket"/> Water | 1.0 | 1.0 | 1.0 |
| <ItemImage id="ftb:industrial_coolant_bucket"/> Industrial Coolant | 1.75 | 2.15 | 3.2 |

That is the best fuel efficiency of any fluid, and more energy than Ender Molten. Make it by dropping Dry Ice into a still water source.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Fuels</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="colossal_reactors:red_cake"/>
  ### <Color id="aqua">Red Cake</Color>
</Row>

Red Cake is no longer a reactor fuel. Uranium, Azurite and the other fuels are unchanged.
