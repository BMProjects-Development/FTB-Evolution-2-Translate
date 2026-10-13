# clock: 1t

schedule function incendium:clocks/main 1t replace

function incendium:technical/main
execute as @a at @s run function incendium:player/main
function incendium:castle/main

# mob init
execute as @e[type=#incendium:mobs_no_player, tag=!in.checked] at @s run function incendium:entity/mob/init

execute as @e[type=#incendium:mobs_no_player] unless score @s in.eid matches 0..32767 run function incendium:technical/entity_id/check
execute as @e[type=#incendium:mobs_no_player, tag=in.ticking_entity] at @s run function incendium:entity/mob/main

execute as @e[type=#incendium:mobs,scores={in.frozen=1..}] at @s run function ftb:incendium/frozen

# other
execute as @e[type=#incendium:other, tag=!in.checked] at @s run function incendium:entity/other/init

execute as @e[type=#incendium:other, tag=in.ticking_entity] at @s run function incendium:entity/other/main

execute if entity @a[tag=nbs_borderofli] run function incendium:border_of_life/tick

# shield cloud effect clear
execute if entity @a[scores={in.cd_shield=1..},predicate=incendium:holding/radiation_shield] run effect clear @a[scores={in.cd_shield=1..},predicate=incendium:holding/radiation_shield] poison

execute if entity @a[scores={in.cd_shield=1..},predicate=incendium:holding/necrotic_shield] run effect clear @a[scores={in.cd_shield=1..},predicate=incendium:holding/necrotic_shield] wither
