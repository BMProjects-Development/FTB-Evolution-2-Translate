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

  Reactors are smaller, reactors and turbines both have an output ceiling, and some inputs and outputs changed.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Steam and Coolant</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="colossal_reactors:reactor_controller"/>
  ### <Color id="aqua">Reactors</Color>
</Row>

* A reactor can be at most 32x32x32, casing included.
* Each extra rod adds less power the bigger a reactor gets (scaling exponent 0.55, was 0.9), so small reactors stay worthwhile and the largest tops out around 500K RF/t.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:still_steam_bucket"/>
  ### <Color id="aqua">Water Cooling Makes Oritech Steam</Color>
</Row>

An actively cooled reactor running on water produces Oritech steam. Colossal Reactors turbines accept Oritech steam, and so does the Oritech Steam Engine, so either one can burn a reactor's output.

* A water-cooled reactor uses 0.085 mB of water for each RF/t it would have made (0.45), and makes 0.8 mB of steam per mB of water (1.0).

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="colossal_reactors:turbine_controller"/>
  ### <Color id="aqua">Turbines</Color>
</Row>

* A turbine makes 9 RF per mB of steam (4), before coils and blades.
* A turbine can be at most 32x32x32, casing included.
* Each blade takes at most 48 mB of steam per tick (1000), so even the largest turbine tops out around 1M RF/t.
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
