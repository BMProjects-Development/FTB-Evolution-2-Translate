execute as @e[type=minecraft:iron_golem,tag=target_dummy.dummy.hitbox,nbt=!{DeathLootTable:"ftb:empty"}] run data modify entity @s DeathLootTable set value "ftb:empty"
