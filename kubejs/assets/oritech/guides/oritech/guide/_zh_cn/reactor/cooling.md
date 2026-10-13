---
navigation:
  title: 冷却
  position: 1
  icon: "oritech:reactor_heat_vent"
  parent: oritech:nuclear_reactor.md
item_ids:
  - oritech:reactor_heat_vent
  - oritech:reactor_heat_pipe
  - oritech:reactor_heat_absorber
  - oritech:reactor_coolant_absorber_port
---
# <Color id="red">冷却</Color>

<Column alignItems="center" fullWidth={true}>
  # <Color id="red">冷却</Color>

  <ItemImage id="oritech:reactor_heat_vent" scale="2"/>

  反应堆内燃烧燃料会产生热量。如果热量未得到妥善导出，燃料棒将会过热，并最终引发<Color id="red">核熔毁</Color>。爆炸的规模取决于反应堆的尺寸以及燃料棒的数量。
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

> <Color id="yellow">在温度达到危险水平前，警报器会提前鸣响，留出充足的应对时间。</Color>在配置文件中启用**安全反应堆（Safe Reactors）**选项后，过热的反应堆将进入冷却阶段而不会爆炸。在测试新设计时强烈推荐开启此项。

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">被动冷却</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

被动冷却不需要任何消耗品，也无需搭建供应链，非常适合前期过渡反应堆，或是采用单联和双联燃料棒的方案。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_heat_pipe"/>
  ### <Color id="aqua">反应堆热量管道</Color>
</Row>

<Color id="aqua">反应堆热量管道</Color>能吸收相邻燃料棒的热量，并将其传导至邻近的散热口。该组件可用于连通高温燃料棒堆叠与外围散热口，起到导热桥梁的作用。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_heat_vent"/>
  ### <Color id="aqua">反应堆散热口</Color>
</Row>

<Color id="aqua">反应堆散热口</Color>可从相邻最热的组件（如燃料棒、热量管道或吸收器）中排出热量。该组件在<Color id="yellow">温度较高时排热效率更高</Color>，因此让反应堆保持在略高的温度下运行，反而能提升散热口的排热效率。此过程无需任何消耗品。

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">主动冷却</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

主动冷却比被动冷却效果更为强劲，但需要持续供应冰。对于紧凑的四联燃料棒布局或高产出的大型反应堆，主动冷却是必不可少的。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_heat_absorber"/>
  ### <Color id="aqua">反应堆热量吸收器</Color>
</Row>

<Color id="gold">反应堆热量吸收器</Color>能同时从相邻的<Color id="yellow">每个</Color>组件中排出固定<Color id="aqua">16点热量/刻</Color>。与散热口不同，它们的排热速率不随温度而改变，且无论有多少个接触面正在散热，冷却剂消耗量都完全相同。因此，当吸收器四周被多个组件包围时，其工作效率极高。

<ItemImage id="minecraft:air" scale="0.25"/>

<Row>
  <ItemImage id="oritech:reactor_coolant_absorber_port"/>
  ### <Color id="aqua">反应堆冷却剂吸收器口</Color>
</Row>

<Color id="gold">反应堆冷却剂吸收器口</Color>必须安装在热量吸收器堆叠正对的**顶部墙**上。在此处输入<Color id="aqua">冰</Color>、<Color id="aqua">蓝冰</Color>或<Color id="aqua">浮冰</Color>以维持吸收器的正常运行。冰块可通过<Color id="green">工业冷却机</Color>进行生产。

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">如何进行选择？</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

| 冷却类型 | 所需组件 | 消耗品 | 适用场景 |
|---|---|---|---|
| 被动冷却 | 散热口+热量管道 | 无 | 前期阶段、单联/双联燃料棒反应堆 |
| 主动冷却 | 吸收器+冷却剂口 | 冰 | 后期阶段、四联燃料棒或大型反应堆 |

通常的搭建思路是将两者结合：利用热量管道将热量从燃料棒向外传导，接着在吸收器四周布满管道，从而实现最大强度的热量导出。

<ItemImage id="minecraft:air" scale="0.25"/>

> <Color id="yellow">在高吞吐量运行下，吸收器的内部缓存会迅速填满。</Color>请务必确保能源网络在持续不断地将其导出。