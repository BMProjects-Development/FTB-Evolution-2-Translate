# Collapsible Groups Guide

Group files live in `config/collapsiblegroups/groups/`. Each file collapses a set of JEI items into a single expandable group.

---

## File Structure

```json
{
  "id": "snake_case_id",
  "name": {
    "translate": "collapsible_groups.group.snake_case_id",
    "fallback": "Mod Name: Category"
  },
  "enabled": true,
  "filter": { ... }
}
```

The `translate` key must match the `id` field with the prefix `collapsible_groups.group.`.

---

## Naming Convention

Fallback strings follow `"Mod Display Name: Category Noun"` — no possessives, colon + space separator.

| Correct | Wrong |
|---|---|
| `"GeOre: Clusters"` | `"GeOre's Clusters"` |
| `"Silent Gear: Example Gear"` | `"Silent Gear's Example Gear"` |
| `"Productive Bees: Spawn Eggs"` | `"Productivebees: Spawn Eggs"` |

When the mod's official name contains an apostrophe (Farmer's Delight, Steve's Carts 2, Fargo's Talismans), keep it — those are proper nouns, not possessives applied by us.

---

## Filter Rule Syntax

All confirmed-working rule types:

```json
{ "type": "item", "namespace": "modid" }
{ "type": "item", "id": "modid:item_path" }
{ "item_path_starts_with": "prefix_" }
{ "item_path_ends_with": "_suffix" }
{ "item_path_contains": "substring" }
{ "not": { ... } }
{ "all": [ ... ] }
{ "any": [ ... ] }
```

For multi-namespace mods, wrap namespace checks in `any`:
```json
{ "any": [
  { "type": "item", "namespace": "oritech" },
  { "type": "item", "namespace": "oritechthings" }
]}
```

---

## Rule Preference Order

Prefer rules over explicit item lists whenever possible:

1. **Single item ID** — use when all variation is NBT/component-only (e.g., `obtrophies:trophy`).
2. **Namespace + path rule** — use for all other cases. Prefer `starts_with` or `ends_with`; fall back to `contains` when items share a substring but not a clean prefix/suffix.
3. **Explicit stack list** — only when tier/classification is modpack-defined and no path pattern exists (e.g., Ars Nouveau glyph tiers, suspicious stew NBT variants).

---

## Mod Display Names

Namespaces this pack's groups actually use.

| Namespace | Display name |
|---|---|
| `advanced_ae` | `Advanced AE` |
| `agritechevolved` | `Agritech Evolved` |
| `animal_pen` | `Animal Pen` |
| `apothic_enchanting` | `Apothic Enchanting` |
| `arsmagicalegacy` | `Ars Magica Legacy` |
| `betterblockz` | `Better Blockz` |
| `betterfishtanks` | `Better Fishtanks` |
| `cabletiers` | `Cabletiers` |
| `chisel` | `Chisel` |
| `comforts` | `Comforts` |
| `compressium` | `Compressium` |
| `computercraft` | `Computer Craft` |
| `connectedglass` | `Connected Glass` |
| `cookingforblockheads` | `Cooking For Blockheads` |
| `decorativewoodenlattices` | `Decorative Wooden Lattices` |
| `decorz` | `DecorZ` |
| `energizedpower` | `Energized Power` |
| `evilcraft` | `EvilCraft` |
| `framedblocks` | `Framed Blocks` |
| `ftbquests` | `FTB Quests` |
| `geore` | `GeOre` |
| `glassential` | `Glassential Renewed` |
| `hephaestus` | `Hephaestus Foundry` |
| `hephaestus_tools` | `Hephaestus Tools` |
| `holosigns` | `HoloSigns` |
| `hostilenetworks` | `Hostile Neural Networks` |
| `ironfurnaces` | `Iron Furnaces` |
| `justdirethings` | `Just Dire Things` |
| `little_big_redstone` | `Little Big Redstone` |
| `ltxi` | `LTX Industries` |
| `mffs` | `Modular Force Field System` |
| `mininggadgets` | `Mining Gadgets` |
| `modularrouters` | `Modular Routers` |
| `mysticalagriculture` | `Mystical Agriculture` |
| `nautec` | `NauTec` |
| `neovitae` | `Neovitae` |
| `occultism` | `Occultism` |
| `oritech` | `Oritech` |
| `oritechthings` | `Oritech` |
| `powah` | `Powah` |
| `productivebees` | `Productive Bees` |
| `productivelib` | `Productive Lib` |
| `reliquary` | `Reliquary` |
| `rootsclassic` | `Roots Classic` |
| `sophisticatedbackpacks` | `Sophisticated Backpacks` |
| `sophisticatedstorage` | `Sophisticated Storage` |
| `sophisticatedstorageinmotion` | `Sophisticated Storage In Motion` |
| `stellaris` | `Stellaris` |
| `stepcrafter` | `Refined Storage` |
| `utilitarian` | `Utilitarian` |
| `waystones` | `Waystones` |
| `witchery` | `Witchery` |

---

## Powah Type Groups

Powah items follow `powah:<type>_<tier>`. Groups are organised by type (all tiers in one group), not by tier. Confirmed types:

| File | Filter |
|---|---|
| `powah_batteries.json` | `starts_with "battery_"` |
| `powah_capacitors.json` | `starts_with "capacitor_"` |
| `powah_ender_cells.json` | `starts_with "ender_cell_"` |
| `powah_ender_gates.json` | `starts_with "ender_gate_"` |
| `powah_energizing_rods.json` | `starts_with "energizing_rod_"` |
| `powah_energy_cables.json` | `starts_with "energy_cable_"` |
| `powah_energy_cells.json` | `starts_with "energy_cell_"` |
| `powah_energy_dischargers.json` | `starts_with "energy_discharger_"` |
| `powah_energy_hoppers.json` | `starts_with "energy_hopper_"` |
| `powah_furnators.json` | `starts_with "furnator_"` |
| `powah_magmators.json` | `starts_with "magmator_"` |
| `powah_player_transmitters.json` | `starts_with "player_transmitter_"` |
| `powah_reactors.json` | `starts_with "reactor_"` |
| `powah_solar_panels.json` | `starts_with "solar_panel_"` |
| `powah_thermo_generators.json` | `starts_with "thermo_generator_"` |

Non-tiered Powah items (`energizing_orb`, `binding_card`, crystals, etc.) are intentionally ungrouped.

---

## Known Legitimate Stack-List Files

These cannot be converted to rules; leave them as explicit lists.

| File | Reason |
|---|---|
| `minecraft_suspicious_stew.json` | Same item ID, differentiated by NBT components only |

---

## Chisel Groups

One `chisel_<family>.json` per Chisel variant family, 254 in all. Generated by `questkit/skills/collapsible-groups/gen_chisel.py` from the families in the Chisel jar (`data/chisel/chisel/variant_families/`); rerun it after a Chisel update and never edit these files by hand.

The mod's built-in Chisel groups filter on `chisel:carving/*` item tags, which Chisel 26.1 no longer ships, so they match nothing. Packs disable them with `disabledCategories = ["chisel"]` in `collapsiblegroups.toml`.
