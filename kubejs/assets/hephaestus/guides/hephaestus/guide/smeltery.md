---
navigation:
  parent: index.md
  title: Smeltery
  position: 10
  icon: hephaestus:smeltery_controller
item_ids:
  - hephaestus:smeltery_controller
---

# Smeltery

The Smeltery is a multiblock furnace. It melts ores and metals into liquid, many at once, and the Drain lets you pour the result into casts.

<GameScene zoom="4" interactive={true}>
  <ImportStructure src="smeltery.nbt" />
  <IsometricCamera yaw="225" pitch="30" />

  <BoxAnnotation min="1.97 0.97 0.97" max="3.03 2.03 2.03" color="#ffd83a" thickness="0.06" alwaysOnTop={true}>
    **Smeltery Controller.** Faces out, away from the middle.
  </BoxAnnotation>

  <BoxAnnotation min="0.97 0.97 0.97" max="2.03 2.03 2.03" color="#ff7043" thickness="0.06" alwaysOnTop={true}>
    **Seared Fuel Tank.** Fill it with lava.
  </BoxAnnotation>

  <BoxAnnotation min="2.97 0.97 0.97" max="4.03 2.03 2.03" color="#4fc3f7" thickness="0.06" alwaysOnTop={true}>
    **Seared Drain.** Faces out. Put a Seared Faucet on it to pour.
  </BoxAnnotation>

  <BoxAnnotation min="2.97 0.97 -0.03" max="4.03 2.03 1.03" color="#81c784" thickness="0.06" alwaysOnTop={true}>
    **Seared Faucet.** Goes on the front of the Drain. Right-click it to pour.
  </BoxAnnotation>

  <BoxAnnotation min="2.97 -0.03 -0.03" max="4.03 1.03 1.03" color="#ce93d8" thickness="0.06" alwaysOnTop={true}>
    **Seared Casting Table.** Sits under the Faucet and catches the metal.
  </BoxAnnotation>
</GameScene>

This example has a 3x3 middle and one layer of wall: 9 floor blocks and 12 wall blocks, 21 in all. The Faucet and Casting Table in front aren't part of the Smeltery, but they're how you get the metal out. Drag the scene to turn it.

## Shape

- **Floor:** one seared block under every block of the middle. It doesn't go under the walls.
- **Walls:** a ring of blocks around the middle, level with it, so one block higher than the floor. Leave the four corners out, because the Smeltery never checks them.
- **Middle:** air or liquid only, from 1x1 up to 15 blocks wide along the Controller's wall and 8 blocks deep away from it. The Smeltery measures from the block behind the Controller, up to 7 blocks to each side, so put the Controller in the middle of its wall to get the full width.
- **Height:** stack more rings on top to make it taller, up to 64 layers. Every layer must be a **complete** ring, or the Smeltery won't form at all.

## Components

- <ItemImage id="hephaestus:smeltery_controller" scale="0.5" /> **Smeltery Controller**: goes in the wall, not a corner, facing out. The block behind it must be part of the middle.
- <ItemImage id="hephaestus:seared_fuel_tank" scale="0.5" /> **Seared Fuel Tank**: goes anywhere in the wall. The Smeltery burns fuel from it. Lava works, and JEI shows the hotter fuels that tougher metals need.
- <ItemImage id="hephaestus:seared_drain" scale="0.5" /> **Seared Drain**: goes anywhere in the wall, facing out. Molten metal leaves through it.

## Pouring

- <ItemImage id="hephaestus:seared_faucet" scale="0.5" /> **Seared Faucet**: place it on the outside face of the Drain. It pulls from the block behind it and pours into the block below it.
- <ItemImage id="hephaestus:seared_table" scale="0.5" /> **Seared Casting Table**: place it right under the Faucet. Right-click the Faucet to pour.

## Allowed blocks

- **Floor:** any seared stone or seared brick block, such as <ItemImage id="hephaestus:seared_bricks" scale="0.5" /> **Seared Bricks** or <ItemImage id="hephaestus:seared_stone" scale="0.5" /> **Seared Stone**.
- **Walls:** any floor block, plus <ItemImage id="hephaestus:seared_glass" scale="0.5" /> **Seared Glass**, <ItemImage id="hephaestus:clear_glass" scale="0.5" /> **Clear Glass**, <ItemImage id="hephaestus:seared_chute" scale="0.5" /> **Seared Chute**, <ItemImage id="hephaestus:seared_ladder" scale="0.5" /> **Seared Ladder**, tanks, and the three components above.

## Size

The smallest Smeltery that forms has a 1x1 middle: 1 floor block and 4 wall blocks (Controller, Drain, Fuel Tank and one brick), so **5 blocks**.

Every block of the middle holds **1 item** and **8,000 mB** of liquid. The 3x3 example above melts 9 items at a time and holds 72,000 mB.
