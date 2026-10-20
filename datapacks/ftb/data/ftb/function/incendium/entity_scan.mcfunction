scoreboard players add $ftb.eid_check in.dummy 1
execute if score $ftb.eid_check in.dummy matches 20.. run scoreboard players set $ftb.eid_check in.dummy 0

execute if score $toggle in.constants matches 1 as @e[type=#incendium:mobs_no_player, tag=!in.checked] at @s run function incendium:entity/mob/init

execute if score $ftb.eid_check in.dummy matches 0 as @e[type=#incendium:mobs_no_player] unless score @s in.eid matches 0..32767 run function incendium:technical/entity_id/check
execute as @e[type=#incendium:mobs_no_player, tag=in.ticking_entity] at @s run function incendium:entity/mob/main

execute as @e[type=#incendium:mobs,scores={in.frozen=1..}] at @s run function ftb:incendium/frozen

execute if score $toggle in.constants matches 1 as @e[type=#incendium:other, tag=!in.checked] at @s run function incendium:entity/other/init

execute as @e[type=#incendium:other, tag=in.ticking_entity] at @s run function incendium:entity/other/main
