---
navigation:
  title: 核反应堆
  position: 4
  icon: "oritech:nuclear_reactor_controller"
item_ids:
  - oritech:nuclear_reactor_controller
  - oritech:reactor_wall
  - oritech:reactor_fuel_port
  - oritech:reactor_rod
  - oritech:reactor_double_rod
  - oritech:reactor_quad_rod
  - oritech:reactor_neutron_reflector
  - oritech:reactor_energy_port
---
# <Color id="green">核反应堆</Color>

<Column alignItems="center" fullWidth={true}>
  # <Color id="green">核反应堆</Color>

  <ItemImage id="oritech:nuclear_reactor_controller" scale="2"/>

  <Color id="green">核反应堆</Color>通过消耗<Color id="yellow">铀</Color>或<Color id="light_purple">钚</Color>球来产生大量<Color id="gold">RF</Color>。其输出功率取决于内部燃料棒和中子反射器的数量。反应堆必须保持充足的冷却，否则会发生堆芯熔毁。
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">搭建结构</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

反应堆是由<Color id="green">反应堆墙</Color>搭建而成的**中空长方体**。搭建时需遵循以下规则：

- 单方向最大尺寸为**64格**。
- <Color id="green">核反应堆控制器</Color>必须放置在**墙**的任意位置。
- <Color id="green">能量端口</Color>与<Color id="green">红石端口</Color>同样可放置在墙上。
- <Color id="green">燃料口</Color>与<Color id="green">冷却剂口</Color>必须放置在**顶部墙**上，且需位于内部对应堆叠组件的正上方。
- 所有其他组件（燃料棒、管道、散热片、吸收器等）都安装在**内部**。
- 内部结构在每个垂直层级上必须**完全一致**。因此，可先设计好2D平面布局，再根据需要向上堆叠高度。能量输出、燃料消耗和冷却剂用量都会随高度按比例增加。

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">组件</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:nuclear_reactor_controller"/>
  ### <Color id="aqua">反应堆控制器</Color>
</Row>

<Color id="green">反应堆控制器</Color>是反应堆的核心。将其放置在墙的任意位置后，与其交互即可组装或更新反应堆结构。其GUI会显示当前运行状态、各组件温度以及输出统计数据。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_wall"/>
  ### <Color id="aqua">反应堆墙</Color>
</Row>

<Color id="green">反应堆墙</Color>构成了反应堆防爆的外壳。它们组成了反应堆的完整框架：顶部、底部和四周侧面。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_rod"/>
  ### <Color id="aqua">反应堆燃料棒</Color>
</Row>

<Color id="gold">反应堆燃料棒</Color>是内部燃烧燃料的组件。它们有<Color id="green">单联</Color>、<Color id="yellow">双联</Color>和<Color id="red">四联</Color>三种变体，层级越高，每刻产生的热量和RF就越多。每个燃料棒堆叠的顶部墙正上方，都需要配备一个<Color id="green">燃料口</Color>。

<ItemGrid>
  <ItemIcon id="oritech:reactor_rod"/>
  <ItemIcon id="oritech:reactor_double_rod"/>
  <ItemIcon id="oritech:reactor_quad_rod"/>
</ItemGrid>

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_neutron_reflector"/>
  ### <Color id="aqua">中子反射器</Color>
</Row>

将<Color id="green">中子反射器</Color>放置在燃料棒旁，可以将中子反射回去。这样无需增加燃料棒即可提升其工作效率，是紧凑型布局中提高输出强度的绝佳选择。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_fuel_port"/>
  ### <Color id="aqua">反应堆燃料口</Color>
</Row>

<Color id="green">反应堆燃料口</Color>必须安装在燃料棒堆叠正对的**顶部墙**上。在此处输入<Color id="yellow">铀燃料丸</Color>或<Color id="light_purple">钚球</Color>，以维持燃料棒的持续燃烧。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_energy_port"/>
  ### <Color id="aqua">反应堆能量端口</Color>
</Row>

<Color id="green">反应堆能量端口</Color>安装在墙上，用于输出反应堆产生的RF电能。每个端口的最高输出功率可达<Color id="gold">50,000,000 RF/t</Color>。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_redstone_port"/>
  ### <Color id="aqua">反应堆红石端口</Color>
</Row>

<Color id="green">反应堆红石端口</Color>同样安装在墙上。输入红石信号可以阻止反应堆装载新燃料（当前正在燃烧的球会先燃烧完毕）。右击红石端口可以循环切换其红石比较器的输出模式：<Color id="gold">能量</Color>、<Color id="aqua">工作燃料棒数量</Color>、<Color id="red">温度</Color>。

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">更多信息</Color>
</Column>

<SubPages icons={true} />