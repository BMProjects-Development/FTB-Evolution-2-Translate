---
navigation:
  title: Energy Network
  icon: ftbic:lv_cable
  position: 10
---

# <Color id="gold">Energy Network</Color>

<Column alignItems="center" fullWidth={true}>
  <ItemImage id="lv_cable" scale="2" />

  In this pack FTBIC runs on **FE**. Generators push FE out of every side, machines accept FE on every side, and any FE cable or conduit from any mod connects to them. No <ItemLink id="lv_rectifier" /> is needed.

  When FTBIC pushes into an FE consumer through a cable, the flow is capped at the cable tier's transfer rate. An LV cable running into an FE machine that would happily drink thousands of FE per tick still only delivers 1,024 FE per tick, keeping the cable safe instead of burning it out.
</Column>

<ItemImage id="minecraft:air" scale="0.25"/>
***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Voltage Tiers</Color>
</Column>

Every cable and every block is rated for one of five voltage tiers. Feed more into a block than its tier allows and it **burns out**.

| Tier | Abbrev | Transfer rate | Typical use |
|------|--------|---------------|-------------|
| Low     | **LV** | 1,024 FE/t    | First generator, first machines |
| Medium  | **MV** | 4,096 FE/t   | Alloy Smelter, Reprocessor, advanced machines |
| High    | **HV** | 16,384 FE/t   | Quarry, Pump, Teleporter |
| Extreme | **EV** | 65,536 FE/t | Nuclear reactors, large battery boxes |
| Insane  | **IV** | 262,144 FE/t | Antimatter Constructor, Charge Pad |

**Rule of thumb:** match the cable tier to the highest producer or consumer connected to it. Use <ItemLink id="lv_transformer" />-family blocks to step voltage up or down between tiers.

<ItemImage id="minecraft:air" scale="0.25"/>
***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Burn-out and Fuses</Color>
</Column>

A cable that receives too high a voltage collapses into a <ItemLink id="burnt_cable" />. A machine will also melt — its block entity becomes a burnt shell until repaired with a <ItemLink id="fuse" />.

Burnt cables can be recycled for <ItemLink id="scrap" />.

<ItemImage id="minecraft:air" scale="0.25"/>
***

<Column alignItems="center" fullWidth={true}>
  ## <Color id="gold">Subsections</Color>
</Column>

<SubPages icons={true} />
