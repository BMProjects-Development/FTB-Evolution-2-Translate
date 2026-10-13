---
navigation:
  title: 粒子加速器
  position: 3
  icon: "oritech:particle_accelerator"
item_ids:
  - oritech:particle_accelerator
  - oritech:accelerator_ring
  - oritech:accelerator_motor
---
# <Color id="aqua">粒子加速器</Color>

<Column alignItems="center" fullWidth={true}>
  # <Color id="aqua">粒子加速器</Color>

  <GameScene zoom="2.5" interactive={true}>
    <ImportStructure src="oritech:assets/basic_accelerator.nbt"/>
    <IsometricCamera yaw="225" pitch="30"/>
    <DiamondAnnotation pos="0.5 0.5 1.5" color="#ff6d6d">
    每套配置都需要2个粒子加速器，用于放入待加速的物品。
    </DiamondAnnotation>
    <DiamondAnnotation pos="5.5 0.5 2.5" color="#ff6d6d">
    直线型马达需安装在导向环内部。通电后即可为粒子加速。
    </DiamondAnnotation>
    <DiamondAnnotation pos="2.5 0.5 4.5" color="#ff6d6d">
    导向环用于引导粒子沿环路运转。放置后，可通过右击改变其射入角度。
    </DiamondAnnotation>
  </GameScene>
  #### *基础粒子加速器配置*
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">组件</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:particle_accelerator"/>
  ### <Color id="aqua">粒子加速器</Color>
</Row>

<Color id="aqua">粒子加速器</Color>是任何加速器结构中的主体设备。在此处可将物品放入粒子加速环路中。一套基础配置至少需要2个<Color id="aqua">粒子加速器</Color>，且均需与<Color id="green">粒子加速器导向环</Color>相连。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:accelerator_ring"/>
  ### <Color id="aqua">加速器导向环</Color>
</Row>

<Color id="green">粒子加速器导向环</Color>用于引导粒子进行环状循环。放置后，右击即可改变射入角度。在规划粒子在环路中的运动路径时必须使用导向环，也可以根据实际搭建需要增加其使用数量。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:accelerator_motor"/>
  ### <Color id="aqua">直线型马达</Color>
</Row>

<Color id="green">粒子加速器直线型马达</Color>用于为环路中的粒子提供加速度。这些马达必须通电运行。虽然最少只需1个即可运转，但增加马达数量能让粒子加速得更快。

<ItemImage id="minecraft:air" scale="0.25"/>
