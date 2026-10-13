---
navigation:
  parent: multiblock/multiblock-index.md
  title: Heat sinks
  icon: colossal_reactors:graphite_block
  position: 15
item_ids:
  - colossal_reactors:graphite_block
---

# Heat sinks

**Heat sinks** are the **passive** blocks and stationary fluids you place inside the reactor shell, next to the fuel rods (see [Shell, faces & rods](shell_and_rods.md)). What you fill the interior with changes three things about how the reactor runs:

- **Fuel efficiency** — how long your fuel lasts. The reactor's fuel burn is *divided* by this value, so higher means slower burn.
- **Energy** — how much **RF** the reactor produces.
- **Overheating** — how hard the block pushes the reactor toward instability. This only matters when **reactor instability** is enabled (see [Reactor instability](reactor_instability.md)). Instability is **off** in this pack, so this column currently has no effect.

Each value is a **multiplier**. `1.0` is neutral; the same as an empty (air) cell for that stat. Higher **Fuel efficiency** means fuel lasts longer; higher **Energy** means more RF; a **negative** Energy value means that material actively *suppresses* output. Higher **Overheating** means the reactor runs hotter and destabilises faster.

## Materials

Place the **storage block** (or fill the interior cell with the **fluid**) to apply its values. Solid blocks and stationary liquids both count as interior fill.

| Material | Fuel efficiency | Energy | Overheating |
|---|:---:|:---:|:---:|
| Empty cell (air) | 1.0 | 1.0 | 0.75 |
| <ItemImage id="minecraft:water_bucket"/> Water | 1.0 | 1.0 | 1.0 |
| <ItemImage id="minecraft:gold_block"/> Gold block | 1.25 | 1.25 | 1.7 |
| <ItemImage id="ftbmaterials:ruby_block"/> Ruby block | 1.3 | 1.3 | 1.75 |
| <ItemImage id="ftbmaterials:sapphire_block"/> Sapphire block | 1.3 | 1.3 | 1.75 |
| <ItemImage id="minecraft:diamond_block"/> Diamond block | 1.5 | 1.3 | 1.8 |
| <ItemImage id="minecraft:emerald_block"/> Emerald block | 1.4 | 1.4 | 1.8 |
| <ItemImage id="minecraft:netherite_block"/> Netherite block | 1.5 | 1.75 | 1.7 |
| <ItemImage id="colossal_reactors:graphite_block"/> Graphite block / Ice | 2.0 | −5.0 | 2.5 |
| <ItemImage id="colossal_reactors:ender_goo_bucket"/> Ender molten | 1.5 | 2.0 | 3.0 |
| <ItemImage id="ftb:industrial_coolant_bucket"/> Industrial coolant | 1.75 | 2.15 | 3.2 |
| <ItemImage id="colossal_reactors:gelid_breezium_bucket"/> Gelid breezium | 1.5 | 3.0 | 5.0 |

## Reading the table

- **Empty air** is the baseline. Every listed sink makes your fuel last **longer** and (except graphite/ice) produces **more** RF, so the real cost of a sink is the material itself.

- **Cheap tiers** — Gold, Ruby, and Sapphire give a modest RF bump and stretch fuel by 25–30%.

- **High output** — Netherite and the exotic fluids push RF the hardest: **Ender molten** ×2.0, **Industrial coolant** ×2.15 and **Gelid breezium** ×3.0 energy. Industrial coolant also has the best fuel efficiency of the fluids (×1.75).

- **Industrial coolant** is made by dropping **Dry Ice** into a still water source block. Fill interior cells with source blocks of it.

- **Graphite block / Ice** is the odd one out: it has the best fuel efficiency (×2.0, roughly halving fuel burn) but an energy multiplier of **−5.0**, which wipes out RF. Only use it where stretching fuel matters more than output. The `#minecraft:ice` tag counts here too (ice, packed ice, blue ice).

- **Fluids** are placed as stationary liquid inside the shell. **Water** applies even when it isn't a source block; treat the molten fluids as source-block fills.

- The recipe data also lists a **Peridot block** sink (Fuel efficiency 1.4 / Energy 1.4 / Overheating 1.76), but no block is bound to the `#c:storage_blocks/peridot` tag in this pack, so it has no effect until a mod provides one.

Datapack recipes can retune these values, so the exact numbers your pack uses may differ so check the reactor recipe data or **JEI** if in doubt.
