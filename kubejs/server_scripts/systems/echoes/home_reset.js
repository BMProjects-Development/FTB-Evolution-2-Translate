const HOME_RESET_INTERVAL = 2400;
const HOME_RESET_DIST = 200;
const HOME_TARGET = "@e[tag=echoshop_keeper]";
const HOME_OBJECTIVES = ["ftb_hx", "ftb_hz", "ftb_px", "ftb_pz", "ftb_dx", "ftb_dz"];

let HOME_OBJ_READY = false;

ServerEvents.tick((event) => {
  let s = event.server;
  if (s.tickCount % HOME_RESET_INTERVAL !== 0) return;
  let run = (c) => { try { s.runCommandSilent(c); } catch (e) {} };
  if (!HOME_OBJ_READY) {
    HOME_OBJECTIVES.forEach((o) => run("scoreboard objectives add " + o + " dummy"));
    HOME_OBJ_READY = true;
  }
  run("execute as " + HOME_TARGET + " store result score @s ftb_hx run data get entity @s Navigation.Home.X 1");
  run("execute as " + HOME_TARGET + " store result score @s ftb_hz run data get entity @s Navigation.Home.Z 1");
  run("execute as " + HOME_TARGET + " store result score @s ftb_px run data get entity @s Pos[0] 1");
  run("execute as " + HOME_TARGET + " store result score @s ftb_pz run data get entity @s Pos[2] 1");
  run("execute as " + HOME_TARGET + " run scoreboard players operation @s ftb_dx = @s ftb_px");
  run("execute as " + HOME_TARGET + " run scoreboard players operation @s ftb_dx -= @s ftb_hx");
  run("execute as " + HOME_TARGET + " run scoreboard players operation @s ftb_dz = @s ftb_pz");
  run("execute as " + HOME_TARGET + " run scoreboard players operation @s ftb_dz -= @s ftb_hz");
  run("execute as " + HOME_TARGET + " at @s if score @s ftb_dx matches " + HOME_RESET_DIST + ".. run easy_npc navigation set home @s ~ ~ ~");
  run("execute as " + HOME_TARGET + " at @s if score @s ftb_dx matches ..-" + HOME_RESET_DIST + " run easy_npc navigation set home @s ~ ~ ~");
  run("execute as " + HOME_TARGET + " at @s if score @s ftb_dz matches " + HOME_RESET_DIST + ".. run easy_npc navigation set home @s ~ ~ ~");
  run("execute as " + HOME_TARGET + " at @s if score @s ftb_dz matches ..-" + HOME_RESET_DIST + " run easy_npc navigation set home @s ~ ~ ~");
});
