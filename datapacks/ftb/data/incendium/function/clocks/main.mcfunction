# clock: 1t

schedule function incendium:clocks/main 1t replace

function incendium:technical/main
execute as @a at @s run function incendium:player/main
function incendium:castle/main

execute if score $ftb.java in.dummy matches 1 run scoreboard players set $ftb.dispatch in.dummy 1
execute unless score $ftb.java in.dummy matches 1 run function ftb:incendium/entity_scan
scoreboard players set $ftb.java in.dummy 0

execute if entity @a[tag=nbs_borderofli] run function incendium:border_of_life/tick

# shield cloud effect clear
execute if entity @a[scores={in.cd_shield=1..},predicate=incendium:holding/radiation_shield] run effect clear @a[scores={in.cd_shield=1..},predicate=incendium:holding/radiation_shield] poison

execute if entity @a[scores={in.cd_shield=1..},predicate=incendium:holding/necrotic_shield] run effect clear @a[scores={in.cd_shield=1..},predicate=incendium:holding/necrotic_shield] wither
