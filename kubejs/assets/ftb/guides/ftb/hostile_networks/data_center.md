---
navigation:
  title: Data Center
  icon: hostilenetworks:data_center
  position: 1
  parent: index.md
item_ids:
  - hostilenetworks:data_center
  - hostilenetworks:data_center_io_port
---

<Column alignItems="center" fullWidth={true}>
  # <Color id="gold">Data Center</Color>

  <ItemImage id="hostilenetworks:data_center" scale="2"/>

  Runs up to 25 Self Aware Data Models at once, and is the only place in this pack where Data Models produce items.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">The Shell</Color>
</Column>

<Column alignItems="center" fullWidth={true}>
  <GameScene zoom="2" interactive={true} background="#333333">
    <ImportStructure src="data_center.nbt"/>
    <IsometricCamera yaw="-45" pitch="30"/>
    <BoxAnnotation min="1 1 1" max="6 6 6" color="#ff5555">
      The 5x5x5 inside must be empty air.
    </BoxAnnotation>
    <BlockAnnotation x="3" y="1" z="6" color="#ffaa00">
      The controller, facing **out** of the shell.
    </BlockAnnotation>
    <BlockAnnotation x="5" y="1" z="6" color="#55ffff">
      IO Ports are optional and can replace any wall or ceiling block.
    </BlockAnnotation>
  </GameScene>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

* The shell is 7x7x7. The floor is <ItemLink id="minecraft:obsidian"/> (anything in the obsidian tag).
* The walls and ceiling are <ItemLink id="minecraft:black_stained_glass"/> or <ItemLink id="hostilenetworks:data_center_io_port"/>.
* The <ItemLink id="hostilenetworks:data_center"/> replaces a wall block in the first row above the floor, facing outwards. Any position along that wall works, corners included.
* When the shell is wrong, the controller's screen lists the missing blocks with their coordinates.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Running Models</Color>
</Column>

* Put Self Aware models in the 5x5 grid. Lower tiers are refused.
* Put <ItemLink id="hostilenetworks:prediction_matrix"/> in the four input slots. Each model uses one per cycle.
* <Color id="red">Right-click a model slot to choose what it makes.</Color> A model with nothing chosen does not run. <Color id="aqua">Fixed</Color> repeats one drop; <Color id="aqua">Queue</Color> works through a list.
* A cycle is 15 seconds. It gives the model's <Color id="green">Generalized Prediction</Color> plus one chosen drop, into a 16 slot output buffer.
* Power per tick for each model is its simulation cost plus 25%. The buffer holds 20,000,000 FE.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">IO Ports</Color>
</Column>

<Row>
  <ItemImage id="hostilenetworks:data_center_io_port"/>
  ### <Color id="aqua">Data Center IO Port</Color>
</Row>

The controller accepts power and items on its own. Ports let pipes and cables reach the Data Center from other faces of the shell. Right-click a port to cycle its mode.

| Mode | What it connects to |
|---|---|
| <Color id="aqua">Energy</Color> | The power buffer |
| <Color id="aqua">Models</Color> | The 5x5 model grid |
| <Color id="aqua">Inputs</Color> | The four input slots |
| <Color id="aqua">Outputs</Color> | The output buffer, extract only |

Each port can be in one mode at a time. Use as many as you need.
