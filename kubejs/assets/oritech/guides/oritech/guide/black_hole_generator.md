---
navigation:
  title: The Black Hole
  position: 2
  icon: "oritech:black_hole"
item_ids:
  - oritech:black_hole
  - oritech:tachyon_absorber
---
# <Color id="light_purple">The Black Hole</Color>

<Column alignItems="center" fullWidth={true}>
  # <Color id="light_purple">The Black Hole</Color>

  <ItemImage id="oritech:black_hole" scale="1"/>

  #### *Black Hole Power Generation*
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

The <Color id="light_purple">Black Hole</Color> is used in FTB Evolution 2 to generate <Color id="gold">Power</Color>. The setup requires three core components: a <Color id="light_purple">Black Hole</Color>, a Block <Color id="green">Source</Color>, and a Block <Color id="dark_green">Placer</Color>.

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Components</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:black_hole"/>
  ### <Color id="light_purple">Black Hole</Color>
</Row>

The <Color id="light_purple">Black Hole</Color> is the core of the setup. It pulls in and consumes blocks within range, emitting tachyon particles with each consumption. The direction the block was consumed from determines where the tachyon energy exits.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="minecraft:cobblestone"/>
  ### <Color id="green">Block Source</Color>
</Row>

You will need a steady supply of cheap blocks, ideally 1 every tick, feeding into an inventory. A fast cobblestone generator is the classic choice; anything that can keep up with the <Color id="light_purple">Black Hole's</Color> consumption rate will do.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="justdirethings:blockplacert1"/>
  ### <Color id="dark_green">Block Placer</Color>
</Row>

You will also need a machine that can place blocks once a tick. The <Color id="dark_green"><ItemLink id="justdirethings:blockplacert1"/></Color> is a very cheap way to accomplish this, but many other mods such as <Color id="yellow">Integrated Dynamics</Color>, <Color id="yellow">LaserIO</Color>, or <Color id="yellow">Modular Routers</Color> have the capabilities to place blocks at this speed. The <Color id="dark_green"><ItemLink id="justdirethings:blockplacert1"/></Color> specifically, can place a block in the direction it is facing, and can be configured using Left-Click or Right-Click to increase or decrease the speed at which it places blocks.

<ItemImage id="minecraft:air" scale="0.25"/>

### <Color id="aqua">How to Set Up</Color>

1. Set up your <Color id="green">Block Source</Color> and <Color id="dark_green">Block Placer</Color> on one side of where the <Color id="light_purple">Black Hole</Color> will sit.
2. Place the <Color id="light_purple">Black Hole</Color> next to the block source.
3. Place the <Color id="aqua">Tachyon Absorber</Color> 2 blocks away on the **opposite side** of the Black Hole.
4. Connect the <Color id="aqua">Tachyon Absorber</Color> to your energy network.

<ItemImage id="minecraft:air" scale="0.25"/>

><Color id="red">WARNING!</Color> The Black Hole keeps pulling in the nearest block within 16 blocks. If you cannot keep up with this demand it WILL eat away at your setup.

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Power Generation</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<GameScene zoom="3" interactive={true}>
  <ImportStructure src="oritech:assets/black_hole_power_gen.nbt"/>
  <IsometricCamera yaw="225" pitch="30"/>
</GameScene>

The <Color id="light_purple">Black Hole</Color> pulls in and consumes its nearest block, and each block it eats fires up to five tachyon rays. Every ray that reaches a <Color id="green">Tachyon Absorber</Color> gives it <Color id="gold">50,000 RF</Color>, so one block is worth 50,000 to 250,000 RF. To capture that energy, a <Color id="green">Tachyon Absorber</Color> must be placed on the **opposite side** of the Black Hole from where the block was consumed. The farther the <Color id="green">Tachyon Absorber</Color> is placed, the less efficient it will be at collecting particles so leaving a block or 2 at most between it and the <Color id="light_purple">Black Hole</Color> is recommended for maximum efficiency.
<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:tachyon_absorber"/>
  ### <Color id="aqua">Tachyon Absorber</Color>
</Row>

The <Color id="aqua">Tachyon Absorber</Color> captures the tachyon particles emitted by the Black Hole and converts them into <Color id="gold">RF</Color>. It must be placed on the **opposite side** of the Black Hole from the block that was consumed. If a block to the <Color id="aqua">North</Color> is consumed, the absorber must be to the <Color id="aqua">South</Color>. Each absorber holds up to <Color id="gold">1,000,000 RF</Color>.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="powah:energy_cell_nitro"/>
  ### <Color id="red">Energy Network</Color>
</Row>

Lastly, you'll want to connect an energy network to this setup. In the example build above a <Color id="red"><ItemLink id="powah:energy_cell_nitro"/></Color> is used, but any energy storage method will work. The <Color id="aqua">Tachyon Absorber</Color> will only output energy through the back of the block.