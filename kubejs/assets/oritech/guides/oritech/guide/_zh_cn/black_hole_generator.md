---
navigation:
  title: 黑洞发电机
  position: 2
  icon: "oritech:black_hole"
item_ids:
  - oritech:black_hole
  - oritech:tachyon_absorber
---
# <Color id="light_purple">黑洞发电机</Color>

<Column alignItems="center" fullWidth={true}>
  # <Color id="light_purple">黑洞发电机</Color>

  <GameScene zoom="3" interactive={true}>
    <ImportStructure src="oritech:assets/black_hole_power_gen.nbt"/>
    <IsometricCamera yaw="225" pitch="30"/>
  </GameScene>

  #### *黑洞发电配置*
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Color id="light_purple">黑洞</Color>每刻都会吸入并吞噬距离最近的方块，每吞噬一个方块可产生<Color id="gold">50,000 RF</Color>能量。要收集这些能量，必须将<Color id="green">速子吸收器</Color>放置在黑洞吞噬方块方向的**正对面**。<Color id="green">速子吸收器</Color>的摆放距离越远，收集粒子的效率就越低。因此，建议在它与<Color id="light_purple">黑洞</Color>之间最多留出1至2格的距离，以确保最大发电效率。


<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">组件</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:black_hole"/>
  ### <Color id="light_purple">黑洞</Color>
</Row>

<Color id="light_purple">黑洞</Color>是该结构的核心。它会吸入并吞噬范围内的方块，并在每次吞噬时释放速子粒子。黑洞吞噬方块的方向决定了速子能量排出的位置。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:tachyon_absorber"/>
  ### <Color id="aqua">速子吸收器</Color>
</Row>

<Color id="aqua">速子吸收器</Color>用于捕获黑洞释放的速子粒子并将其转化为<Color id="gold">RF</Color>。它必须放置在黑洞吞噬方块方向的**正对面**。例如：若黑洞吞噬了<Color id="aqua">北方</Color>的方块，则吸收器必须放置在<Color id="aqua">南方</Color>。每个吸收器最多可存储<Color id="gold">1,000,000 RF</Color>能量。

<ItemImage id="minecraft:air" scale="0.25"/>

<Column>
  ### <Color id="green">其他需求</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.5"/>

<Row>
  <ItemImage id="minecraft:cobblestone"/>
  ### <Color id="green">方块来源</Color>
</Row>

你需要稳定供应廉价方块（最好每刻1个）并将其输出到容器中。高速造石机是经典选择——任何能够跟上<Color id="light_purple">黑洞</Color>吞噬速度的方案都可以。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="justdirethings:blockplacert1"/>
  ### <Color id="dark_green">方块放置器</Color>
</Row>

此外，还需要一台能够每刻放置方块的机器。使用<Color id="dark_green"><ItemLink id="justdirethings:blockplacert1"/></Color>是一种极低成本的实现方案。不过，像<Color id="yellow">动态联合</Color>、<Color id="yellow">LaserIO</Color>或<Color id="yellow">模块化路由器</Color>等许多其他模组同样能以此速度放置方块。具体到<Color id="dark_green"><ItemLink id="justdirethings:blockplacert1"/></Color>，它会朝其朝向放置方块，并且可以通过左击或右击来配置并加减其放置方块的速度。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="powah:energy_cell_nitro"/>
  ### <Color id="red">能源网络</Color>
</Row>

最后，需要将能源网络接入此结构。虽然上述示例中使用了<Color id="red"><ItemLink id="powah:energy_cell_nitro"/></Color>，但任何储能设备均可适用。需要注意的是，<Color id="aqua">速子吸收器</Color>仅会从方块背面输出能量。

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">搭建步骤</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

1. 在<Color id="light_purple">黑洞</Color>的一侧架设方块放置源。
2. 在距离方块放置位置2至3个方块远的地方放置一个<Color id="aqua">速子吸收器</Color>，并使其朝向该放置源。
3. 将<Color id="light_purple">黑洞</Color>紧邻方块放置源放置。
4. 将<Color id="aqua">速子吸收器</Color>连接至能源网络以导出电能。

<ItemImage id="minecraft:air" scale="0.25"/>

><Color id="red">警告！</Color>黑洞会**每刻**吞噬距离最近的方块。如果方块供应不足，它**必定**会开始吞噬你的设备！