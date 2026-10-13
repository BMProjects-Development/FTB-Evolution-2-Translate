---
navigation:
  title: 示例搭建
  position: 2
  icon: "oritech:nuclear_reactor_controller"
  parent: oritech:nuclear_reactor.md
---
# <Color id="green">示例搭建</Color>

<Column alignItems="center" fullWidth={true}>
  # <Color id="green">示例搭建</Color>

  <GameScene zoom="2.5" interactive={true}>
    <ImportStructure src="oritech:assets/oritech_reactor.nbt"/>
    <IsometricCamera yaw="125" pitch="45"/>
  </GameScene>

  采用该搭建结构，反应堆的每一层都可产生158,000 RF/t。
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">所需材料</Color>
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>

以上是上方展示单层结构所需的完整方块清单。若想提升能量产出，只需在上方堆叠更多完全相同的层级即可。

| 材料 | 数量 |
| :--- | :---: |
| <ItemImage id="oritech:reactor_wall" scale="0.5"/>反应堆墙 | 83 |
| <ItemImage id="oritech:reactor_heat_vent" scale="0.5"/>反应堆散热口 | 9 |
| <ItemImage id="oritech:reactor_heat_pipe" scale="0.5"/>反应堆热量管道 | 6 |
| <ItemImage id="oritech:reactor_heat_absorber" scale="0.5"/>反应堆热量吸收器 | 2 |
| <ItemImage id="oritech:reactor_quad_rod" scale="0.5"/>反应堆四联燃料棒 | 2 |
| <ItemImage id="oritech:reactor_coolant_absorber_port" scale="0.5"/>反应堆冷却剂吸收器口 | 2 |
| <ItemImage id="oritech:reactor_fuel_port" scale="0.5"/>反应堆燃料口 | 2 |
| <ItemImage id="oritech:reactor_redstone_port" scale="0.5"/>反应堆红石端口 | 1 |
| <ItemImage id="oritech:reactor_neutron_reflector" scale="0.5"/>反应堆中子反射器 | 1 |
| <ItemImage id="oritech:reactor_energy_port" scale="0.5"/>反应堆能量端口 | 1 |
| <ItemImage id="oritech:nuclear_reactor_controller" scale="0.5"/>反应堆控制器 | 1 |

<ItemImage id="minecraft:air" scale="0.25"/>