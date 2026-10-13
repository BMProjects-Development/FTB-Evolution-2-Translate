---
navigation:
  title: Particle Accelerator
  position: 3
  icon: "oritech:particle_accelerator"
item_ids:
  - oritech:particle_accelerator
  - oritech:accelerator_ring
  - oritech:accelerator_motor
---
# <Color id="aqua">Particle Accelerator</Color>

<Column alignItems="center" fullWidth={true}>
  # <Color id="aqua">Particle Accelerator</Color>

  <GameScene zoom="2.5" interactive={true}>
    <ImportStructure src="oritech:assets/basic_accelerator.nbt"/>
    <IsometricCamera yaw="225" pitch="30"/>
    <DiamondAnnotation pos="0.5 0.5 1.5" color="#ff6d6d">
    Each setup requires 2 Particle Accelerators. Used to insert items to accelerate.
    </DiamondAnnotation>
    <DiamondAnnotation pos="5.5 0.5 2.5" color="#ff6d6d">
    The Linear Motor is placed within the Accelerator Ring. When powered, this will accelerate the particle.
    </DiamondAnnotation>
    <DiamondAnnotation pos="2.5 0.5 4.5" color="#ff6d6d">
    Guide Rings help guide the particle around the ring. They can be Right-clicked once placed to change the angle of entry.
    </DiamondAnnotation>
  </GameScene>
  #### *Basic Particle Accelerator Setup*
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Components</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:particle_accelerator"/>
  ### <Color id="aqua">Particle Accelerator</Color>
</Row>

The <Color id="aqua">Particle Accelerator</Color> is the main machine in any accelerator setup. This is where items will be inserted into the particle acceleration ring. A basic setup requires at least 2 <Color id="aqua">Particle Accelerators</Color>, both attached to a <Color id="green">Particle Accelerator Guide Ring</Color>.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:accelerator_ring"/>
  ### <Color id="aqua">Accelerator Guide Ring</Color>
</Row>

<Color id="green">Particle Accelerator Guide Rings</Color> are used to guide the particle around in a circle. Once placed, they can be Right-clicked to change the angle of entry. You'll want to use these to guide the particle around the ring, but you may want to use more depending on your setup.

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:accelerator_motor"/>
  ### <Color id="aqua">Linear Motor</Color>
</Row>

The <Color id="green">Particle Accelerator Linear Motor</Color> is used to accelerate the particles around the ring. These must be powered. While only 1 is required, having more will accelerate the particle faster.
