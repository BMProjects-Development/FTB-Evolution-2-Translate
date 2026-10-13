---
navigation:
    title: "Energy Cell Array"
    parent: energy/index.md
    position: 1
    icon: energy_cell_array
item_ids:
  - energy_cell_array
---

# Energy Cell Array

<BlockImage id="energy_cell_array" scale="4" />

The **Energy Cell Array** is the primary energy storage block. It features configurable side IO for items and energy.
It has 1 energy input item slot and 4 charging slots.

Smart automation tech prevents items from being removed via pipes/cables/etc. until they are fully charged. They can always
be removed manually by the player though.

## Compatible Upgrades

Installed via the [Upgrade System](../fundamentals/upgrade_system.md).

- **Auxiliary Energy Cells**: Max rank 5. Multiplies energy capacity and transfer rate by 8 at
  rank 1, doubling each rank up to 128x at rank 5.

> The Energy Cell Array is not part of `#ltxi:upgradable/standard`, so the Σ/VM3 Power Supply
> Unit does not fit it.