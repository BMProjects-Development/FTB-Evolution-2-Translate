---
navigation:
    title: Geo Synthesizer
    icon: geo_synthesizer
    parent: machines/resource/index.md
    position: 1
item_ids:
  - geo_synthesizer
---

# Geo Synthesizer

<BlockImage id="geo_synthesizer" scale="4" />

## About
The Geo Synthesizer specializes in the efficient mass production of geological foundation materials. In other words, rocks.

## Recipe Spec
- Base crafting time: varies, by default 3 seconds
- Inputs: 1 item, exactly 2 fluids
- Output: 1 item

## Compatible Upgrades

Installed via the [Upgrade System](../../fundamentals/upgrade_system.md).

- **Σ/VM3 Power Supply Unit**: Max rank 5. Each rank halves the time per operation and raises
  energy capacity and transfer rate. Energy usage doubles with every rank.
- **Σ/4D Hypervisor Module**: Max rank 3. Processes 4 operations per cycle at rank 1, 8 at
  rank 2, and 12 at rank 3.
- **Lithic Co-Processor**: Max rank 3. Replaces the parallel operation count outright with 16 per
  cycle at rank 1, 32 at rank 2, and 64 at rank 3.

> The Σ/4D Hypervisor Module and the Lithic Co-Processor share an exclusive set. The Geo
> Synthesizer takes one or the other, never both.