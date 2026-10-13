// priority: 450

const $Registries = Java.loadClass("net.minecraft.core.registries.Registries");
const $UUIDUtil = Java.loadClass("net.minecraft.core.UUIDUtil");
const $JavaUUID = Java.loadClass("java.util.UUID");
const $BlockPos = Java.loadClass("net.minecraft.core.BlockPos");
const $ShopPermissions = Java.loadClass("net.minecraft.server.permissions.Permissions");
const $KeeperAABB = Java.loadClass("net.minecraft.world.phys.AABB");

const uuidIntArray = (s) => {
  let a = $UUIDUtil.uuidToIntArray($JavaUUID.fromString(s));
  return "[I;" + a[0] + "," + a[1] + "," + a[2] + "," + a[3] + "]";
};

const randomIntArray = () => {
  let a = $UUIDUtil.uuidToIntArray($JavaUUID.randomUUID());
  return "[I;" + a[0] + "," + a[1] + "," + a[2] + "," + a[3] + "]";
};

const KEEPER_TAG = "echoshop_keeper";
const POP_KEY = "echoKeepersPopulated";
const LEDGER_SEP = "##";
const COOLDOWN_MS = 1 * 60 * 60 * 1000;

const DEBUG_IGNORE_STAGE = false;

const keeperDefs = {
  broker_early:    { id: "ftb:broker_early",    name: "ftb.shopkeeper.broker_early",    color: "gold",         stage: null,
                     skin: "4ad8f82b-0572-4c1e-98d1-9db29482d235", skinName: "Jake_Evans", spawnOffset: { x: 0, y: 0, z: 20 }, guarded: true },
  broker_mid:      { id: "ftb:broker_mid",      name: "ftb.shopkeeper.broker_mid",      color: "gold",         stage: "ftb:broker_mid_wares",
                     skin: "e6aef4a5-48b8-475b-af37-c64d813d1790", skinName: "Gaz492", spawnOffset: { x: -6, y: 0, z: 29 }, guarded: true },
  broker_late:     { id: "ftb:broker_late",     name: "ftb.shopkeeper.broker_late",     color: "gold",         stage: "ftb:broker_late_wares",
                     skin: "d2839efc-727a-4263-97ce-3c73cdee5013", skinName: "slowpoke101", spawnOffset: { x: 7, y: 0, z: 30 }, guarded: true },
  village_storage: { id: "ftb:village_storage", name: "ftb.shopkeeper.village_storage", color: "aqua",         stage: "ftb:village_storage_wares",
                     skin: "83fb4aa0-e056-46f3-bcec-31de8b67d3fc", skinName: "Artpoke_" },
  village_tech:    { id: "ftb:village_tech",    name: "ftb.shopkeeper.village_tech",    color: "red",          stage: "ftb:village_tech_wares",
                     skin: "4143306a-84e5-44aa-8d15-74ba2fe88c58", skinName: "desht" },
  village_food:    { id: "ftb:village_food",    name: "ftb.shopkeeper.village_food",    color: "green",        stage: "ftb:village_food_wares",
                     skin: "bb5029b7-9381-4d99-aaa9-106da41aa659", skinName: "OfficialyAwsome" },
  village_apiarist:{ id: "ftb:village_apiarist",name: "ftb.shopkeeper.village_apiarist",color: "gold",         stage: "ftb:village_apiarist_wares",
                     skin: "2d583fc7-7fe8-45d0-9c35-f29451a2a2a5", skinName: "ErrorMikey",
                     biomes: ["minecraft:plains", "minecraft:sunflower_plains", "minecraft:meadow",
                              "minecraft:savanna", "minecraft:savanna_plateau", "minecraft:windswept_savanna"] },
  fishmonger:      { id: "ftb:fishmonger",      name: "ftb.shopkeeper.fishmonger",      color: "aqua",         stage: "ftb:fishmonger_wares",
                     skin: "adb151e1-ccae-4fd6-8a57-513bdb6a0bd4", skinName: "Everlipse" },
  wayfarer:        { id: "ftb:wayfarer",        name: "ftb.shopkeeper.wayfarer",        color: "yellow",       stage: "ftb:wayfarer_wares",
                     skin: "ae9c317a-cf2e-43c5-9b32-37a6ae83879f", skinName: "UnRealDinnerbone" },
  jewler:          { id: "ftb:jewler",          name: "ftb.shopkeeper.jewler",          color: "light_purple", stage: "ftb:jewler_wares",
                     skin: "b03e2454-7ce6-4973-a5de-df366f9318df", skinName: "DemonLlama69" },
  beastmaster:     { id: "ftb:beastmaster",     name: "ftb.shopkeeper.beastmaster",     color: "red",          stage: "ftb:beastmaster_wares",
                     skin: "a77837bb-be6e-4423-9e55-da0da80fbc27", skinName: "DinnerBeef" },
  gatekeeper:      { id: "ftb:gatekeeper",      name: "ftb.shopkeeper.gatekeeper",      color: "yellow",       stage: "ftb:gatekeeper_wares",
                     skin: "7d15a862-c93d-494a-830f-dac2b2276785", skinName: "WunutWonder" },
  arcanist:        { id: "ftb:arcanist",        name: "ftb.shopkeeper.arcanist",        color: "light_purple", stage: "ftb:arcanist_wares",
                     customSkin: "7a55ee37-8d67-4c7d-b898-6a658092474f" },
  hedge_witch:     { id: "ftb:hedge_witch",     name: "ftb.shopkeeper.hedge_witch",     color: "dark_green",   stage: "ftb:hedge_witch_wares",
                     customSkin: "90c75238-d5cb-40bc-ba03-e85507125a5a", entityType: "easy_npc:humanoid_slim" },
  sanguine_merchant:{ id: "ftb:sanguine_merchant", name: "ftb.shopkeeper.sanguine_merchant", color: "dark_red", stage: "ftb:sanguine_merchant_wares",
                     skin: "a2d74ce4-3e79-4f7e-a2c8-04efd45109d4", skinName: "TheonlyTazz" },
  swashbuckler:    { id: "ftb:swashbuckler",    name: "ftb.shopkeeper.swashbuckler",    color: "blue",         stage: "ftb:swashbuckler_wares",
                     skin: "5af4ba16-5311-4ae3-9772-c6fb798ac2cf", skinName: "kSunekaer" },
  gambler:         { id: "ftb:gambler",         name: "ftb.shopkeeper.gambler",         color: "gold",         stage: "ftb:gambler_wares",
                     customSkin: "28301969-3093-353a-9cb8-0b728244d614" },
  wandering_merchant:{ id: "ftb:wandering_merchant", name: "ftb.shopkeeper.wandering_merchant", color: "green",       stage: null,
                     skin: "cc828980-f19c-454d-9505-e8f24402e369", skinName: "AlfredGG" },
  black_market:    { id: "ftb:trader_black_market", name: "ftb.shopkeeper.black_market", color: "dark_red",     stage: null,
                     skin: "4ecf6284-b1e8-45bb-b2b3-151c95c3b10f", skinName: "Saereth" },
};

const exactStructureMap = {
  "ftb:spawn_pyramid": [keeperDefs.broker_early, keeperDefs.broker_mid, keeperDefs.broker_late],
  "explorify:tavern": [keeperDefs.wayfarer, keeperDefs.jewler, keeperDefs.beastmaster],
  "ati_structures:manor": [keeperDefs.gatekeeper, keeperDefs.gambler],
  "ati_structures:marble_chateau": [keeperDefs.gatekeeper, keeperDefs.gambler],
  "underwater_village:temple": [keeperDefs.fishmonger],
  "underwater_village:temple_broken": [keeperDefs.fishmonger],
  "underwater_village:temple_ruins": [keeperDefs.fishmonger],
  "mvs:small_ship": [keeperDefs.swashbuckler],
  "ati_structures:ancient_vessel": [keeperDefs.swashbuckler],
  "terralith:mage_tower": [keeperDefs.arcanist],
  "terralith:mage_tower_spring": [keeperDefs.arcanist],
  "terralith:mage_tower_summer": [keeperDefs.arcanist],
  "terralith:mage_tower_autumn": [keeperDefs.arcanist],
  "terralith:mage_tower_winter": [keeperDefs.arcanist],
  "terralith:mage_complex": [keeperDefs.arcanist],
  "terralith:witch_hut": [keeperDefs.hedge_witch],
  "explorify:mangrove_hut": [keeperDefs.hedge_witch],
  "mvs:small_swamp_house": [keeperDefs.hedge_witch],
  "explorify:dark_forest_settlement": [keeperDefs.hedge_witch],
  "explorify:mausoleum": [keeperDefs.sanguine_merchant],
  "explorify:black_spiral": [keeperDefs.sanguine_merchant],
  "ati_structures:haunted_ruin": [keeperDefs.sanguine_merchant],
  "ati_structures:wither_cavern": [keeperDefs.sanguine_merchant],
  "ati_structures:rotting_temple": [keeperDefs.sanguine_merchant],
  "ati_structures:rotting_temple_underground": [keeperDefs.sanguine_merchant],
};

const villageKeepers = [keeperDefs.village_storage, keeperDefs.village_tech, keeperDefs.village_food, keeperDefs.village_apiarist];

const isVillageId = (id) =>
  id.indexOf("minecraft:village") === 0 || (id.indexOf("ctov:") === 0 && id.indexOf("village") !== -1);

const resolveKeepers = (id) => {
  if (exactStructureMap[id]) return exactStructureMap[id];
  if (isVillageId(id)) return villageKeepers;
  return null;
};

const findKeeperById = (id) => {
  let found = null;
  Object.keys(keeperDefs).forEach((k) => { if (keeperDefs[k].id === id) found = keeperDefs[k]; });
  return found;
};

const keeperTag = (keeper) => "echoshop_" + keeper.id.split(":").join("_");

const KEEPER_SEARCH_MARGIN = 24;

const keeperExistsIn = (level, bb, keeper) => {
  let tag = keeperTag(keeper);
  let box = new $KeeperAABB(
    bb.minX() - KEEPER_SEARCH_MARGIN, bb.minY() - KEEPER_SEARCH_MARGIN, bb.minZ() - KEEPER_SEARCH_MARGIN,
    bb.maxX() + KEEPER_SEARCH_MARGIN + 1, bb.maxY() + KEEPER_SEARCH_MARGIN + 1, bb.maxZ() + KEEPER_SEARCH_MARGIN + 1
  );
  let found = level.getEntitiesWithin(box);
  for (let i = 0; i < found.size(); i++) {
    try {
      if (found.get(i).entityTags().contains(tag)) return true;
    } catch (e) {}
  }
  return false;
};

const readLedger = (server) => {
  let map = {};
  let list = server.persistentData.getListOrEmpty(POP_KEY);
  for (let i = 0; i < list.size(); i++) {
    let s = String(list.getStringOr(i, ""));
    if (!s) continue;
    let parts = s.split(LEDGER_SEP);
    if (parts.length < 3) continue;
    map[parts[0]] = { t: parseInt(parts[1], 10) || 0, present: parts[2] === "1" };
  }
  return map;
};

const writeLedger = (server, map) => {
  let arr = [];
  Object.keys(map).forEach((k) => {
    let e = map[k];
    arr.push(k + LEDGER_SEP + e.t + LEDGER_SEP + (e.present ? "1" : "0"));
  });
  server.persistentData[POP_KEY] = arr;
};

const canSummon = (map, key, now) => {
  let e = map[key];
  if (!e) return true;
  if (e.present) return false;
  return (now - e.t) >= COOLDOWN_MS;
};

const recordSummon = (server, map, key, now) => {
  map[key] = { t: now, present: true };
  writeLedger(server, map);
};

const recordRemoval = (server, key) => {
  let map = readLedger(server);
  let e = map[key];
  if (!e) return;
  e.present = false;
  writeLedger(server, map);
};

const isStandable = (level, x, y, z) => {
  try {
    let floor = level.getBlockState(new $BlockPos(x, y - 1, z));
    let feet = level.getBlockState(new $BlockPos(x, y, z));
    let head = level.getBlockState(new $BlockPos(x, y + 1, z));
    if (floor.isAir()) return false;
    if (!feet.isAir()) return false;
    if (!head.isAir()) return false;
    return true;
  } catch (e) {
    return false;
  }
};

const findSafeSpawns = (level, bb, anchor, count) => {
  let cx = Math.floor((bb.minX() + bb.maxX()) / 2);
  let cz = Math.floor((bb.minZ() + bb.maxZ()) / 2);
  let ay = anchor.getY();

  let offsets = [[0, 0]];
  for (let r = 1; r <= 8; r++) {
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
        offsets.push([dx, dz]);
      }
    }
  }

  let yOrder = [ay, ay - 1, ay + 1];
  let found = [];
  let used = {};
  for (let yi = 0; yi < yOrder.length && found.length < count; yi++) {
    let y = yOrder[yi];
    for (let i = 0; i < offsets.length && found.length < count; i++) {
      let x = cx + offsets[i][0];
      let z = cz + offsets[i][1];
      let tag = x + "," + z;
      if (used[tag]) continue;
      if (isStandable(level, x, y, z)) { found.push(new $BlockPos(x, y, z)); used[tag] = true; }
    }
  }
  return found;
};

const findStandableNear = (level, x, y, z) => {
  let offsets = [[0, 0]];
  for (let r = 1; r <= 6; r++) {
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
        offsets.push([dx, dz]);
      }
    }
  }
  let yOrder = [y, y - 1, y + 1, y - 2, y + 2];
  for (let yi = 0; yi < yOrder.length; yi++) {
    for (let i = 0; i < offsets.length; i++) {
      let px = x + offsets[i][0];
      let pz = z + offsets[i][1];
      if (isStandable(level, px, yOrder[yi], pz)) return new $BlockPos(px, yOrder[yi], pz);
    }
  }
  return new $BlockPos(x, y, z);
};

const applyOffset = (level, spawnPos, off) => {
  if (!off) return spawnPos;
  return findStandableNear(
    level,
    spawnPos.getX() + (off.x || 0),
    spawnPos.getY() + (off.y || 0),
    spawnPos.getZ() + (off.z || 0)
  );
};

const spawnKeeperAt = (server, who, keeper, ledgerKey, pos, extraTags) => {
  let name = "{translate:'" + keeper.name + "',color:'" + keeper.color + "'}";

  let skin = "SkinData:{Type:'DEFAULT'}";
  if (keeper.customSkin) {
    skin = "SkinData:{Type:'CUSTOM',UUID:" + uuidIntArray(keeper.customSkin) + "}";
  } else if (keeper.texture) {
    skin = "SkinData:{Type:'RESOURCE_LOCATION',Texture:'" + keeper.texture + "'}";
  } else if (keeper.skin) {
    let nm = keeper.skinName ? "Name:'" + keeper.skinName + "'," : "";
    skin = "SkinData:{Type:'PLAYER_SKIN'," + nm + "UUID:" + uuidIntArray(keeper.skin) + "}";
  }

  let home = "";
  if (pos) home = ",Navigation:{Home:{X:" + pos.getX() + ",Y:" + pos.getY() + ",Z:" + pos.getZ() + "}}";

  let objectives =
    "ObjectiveData:{ObjectiveDataSet:[" +
    "{Id:" + randomIntArray() + ",Type:'MOVE_BACK_TO_HOME',Prio:2,SpeedModifier:0.6d,StopDistance:10.0f}," +
    "{Id:" + randomIntArray() + ",Type:'RANDOM_STROLL_AROUND_HOME',Prio:5,SpeedModifier:0.5d}," +
    "{Type:'LOOK_AT_PLAYER'},{Type:'LOOK_AT_MOB'},{Type:'LOOK_AT_RESET'}]}";

  let tags = "'" + KEEPER_TAG + "','" + keeperTag(keeper) + "'";
  if (extraTags) extraTags.forEach((t) => { tags += ",'" + t + "'"; });

  let combat = keeper.guarded
    ? "EntityAttribute:{IsInvulnerable:1b,IsAttackableByPlayers:0b,IsPushable:0b}"
    : "EntityAttribute:{IsInvulnerable:0b,IsAttackableByPlayers:1b,CanBeHitByProjectile:1b}";

  let nbt =
    "{EasyNPCVersion:3,CustomName:" + name + ",CustomNameVisible:1b," +
    "PersistenceRequired:1b,Glowing:1b," +
    "VariantType:'STEVE',ModelData:{}," +
    skin + "," +
    combat + "," +
    "ActionData:{}," +
    objectives +
    home + "," +
    "Tags:[" + tags + "]," +
    "KubeJSPersistentData:{EchoShop:'" + keeper.id + "',EchoKey:'" + (ledgerKey || "") + "'}}";

  let sx = pos.getX() + 0.5;
  let sy = pos.getY();
  let sz = pos.getZ() + 0.5;
  server.runCommandSilent(
    "execute as " + who + " at @s run summon " + (keeper.entityType || "easy_npc:humanoid") + " " + sx + " " + sy + " " + sz + " " + nbt
  );
};

const structureRegistry = (level) => {
  let ra = level.registryAccess();
  try {
    return ra.lookupOrThrow($Registries.STRUCTURE);
  } catch (e) {
    return ra.registryOrThrow($Registries.STRUCTURE);
  }
};

const biomeAllowed = (level, pos, biomes) => {
  if (!biomes) return true;
  try {
    let keyOpt = level.getBiome(pos).unwrapKey();
    if (!keyOpt.isPresent()) return true;
    return biomes.indexOf(String(keyOpt.get().location())) !== -1;
  } catch (e) {
    return true;
  }
};

let kjsServer = null;
ServerEvents.loaded((e) => { kjsServer = e.server; });

const ensureServer = (ctx) => {
  if (!kjsServer) {
    try { kjsServer = ctx.getSource().getServer(); } catch (e) {}
  }
  return kjsServer;
};

// This also runs when existing shopkeepers load from saved chunks.
const KEEPER_ENTITY_TYPES = ["easy_npc:humanoid", "easy_npc:humanoid_slim"];

const onKeeperSpawned = (event) => {
  try {
    let entity = event.entity;
    let tags = entity.entityTags();
    if (!tags.contains(KEEPER_TAG)) return;
    let key = Object.keys(keeperDefs).find((k) => tags.contains(keeperTag(keeperDefs[k])));
    if (!key || keeperDefs[key].guarded) return;

    let attributes = entity.getEntityAttributes();
    let interaction = attributes.getInteractionAttributes();
    if (interaction.canBeHitByProjectile()) return;
    attributes.setInteractionAttributes(interaction.withCanBeHitByProjectile(true));
    entity.refreshEntityAttributes();
  } catch (e) {
    console.error("[echo_keepers] projectile attribute update failed: " + e);
  }
};

KEEPER_ENTITY_TYPES.forEach((type) => EntityEvents.spawned(type, onKeeperSpawned));

EntityEvents.death((event) => {
  try {
    let entity = event.entity;
    if (!entity || KEEPER_ENTITY_TYPES.indexOf(String(entity.type)) === -1) return;
    let key = entity.persistentData.getStringOr("EchoKey", "");
    if (!key) return;
    let server = event.server || kjsServer;
    if (server) recordRemoval(server, key);
  } catch (e) {}
});

let keepersReady = true;

PlayerEvents.tick((event) => {
  if (!keepersReady) return;
  let player = event.player;
  if (!player || player.tickCount % 40 !== 0) return;
  if (!kjsServer) {
    try { kjsServer = event.server; } catch (e) {}
    if (!kjsServer) { try { kjsServer = player.server; } catch (e) {} }
  }
  if (!kjsServer) return;
  try {
    if (player.isSpectator()) return;
  } catch (e) { return; }

  let level, sm, structReg, pos, dim;
  try {
    level = player.level;
    sm = level.structureManager();
    structReg = structureRegistry(level);
    pos = player.block.pos;
    dim = String(level.dimension);
  } catch (e) {
    console.error("[echo_keepers] disabled, level API unavailable: " + e);
    keepersReady = false;
    return;
  }

  let all;
  try {
    all = sm.getAllStructuresAt(pos);
  } catch (e) {
    console.error("[echo_keepers] disabled, getAllStructuresAt failed: " + e);
    keepersReady = false;
    return;
  }

  all.keySet().forEach((structure) => {
    let start;
    try {
      start = sm.getStructureAt(pos, structure);
    } catch (e) {
      return;
    }
    if (!start || !start.isValid()) return;

    let id;
    try {
      id = String(structReg.getKey(structure));
    } catch (e) {
      return;
    }

    let keepers = resolveKeepers(id);
    if (!keepers) return;

    let bb = start.getBoundingBox();
    let base = dim + "|" + id + "|" + bb.minX() + "," + bb.minZ();

    let spots = findSafeSpawns(level, bb, pos, keepers.length);
    let spotIdx = 0;
    let ledger = readLedger(kjsServer);
    let now = Date.now();

    keepers.forEach((keeper) => {
      try {
        let key = base + "|" + keeper.id;
        if (!canSummon(ledger, key, now)) return;
        if (!biomeAllowed(level, pos, keeper.biomes)) return;
        if (keeperExistsIn(level, bb, keeper)) return;

        let spawnPos;
        if (keeper.spawnOffset) {
          spawnPos = spots[0] || pos;
        } else {
          spawnPos = spots[spotIdx] || pos;
          spotIdx++;
        }
        spawnPos = applyOffset(level, spawnPos, keeper.spawnOffset);
        spawnKeeperAt(kjsServer, player.username, keeper, key, spawnPos);
        recordSummon(kjsServer, ledger, key, now);
        if (DEBUG_IGNORE_STAGE) unlockEcho(kjsServer, player, keeper.id);
      } catch (err) {
        console.error("[echo_keepers] spawn failed for " + keeper.id + ": " + err);
      }
    });
  });
});

const canManageShops = (src) => {
  try {
    return src.permissions().hasPermission($ShopPermissions.COMMANDS_ADMIN);
  } catch (e) {
    console.warn("[echo_keepers] permission check unavailable: " + e);
    return false;
  }
};

ServerEvents.commandRegistry((event) => {
  let { commands: Commands, arguments: Arguments } = event;

  event.register(
    Commands.literal("shops")
      .requires(canManageShops)
      .then(
        Commands.literal("spawn").then(
          Commands.argument("id", Arguments.STRING.create(event))
          .suggests((ctx, builder) => {
            let remaining = String(builder.getRemaining()).toLowerCase();
            Object.keys(keeperDefs).forEach((k) => {
              if (k.toLowerCase().indexOf(remaining) === 0) builder.suggest(k);
            });
            return builder.buildFuture();
          })
          .executes((ctx) => {
            let src = ctx.getSource();
            if (!ensureServer(ctx)) { src.sendFailure(Text.of("shops not ready yet - move around for a second and retry")); return 0; }
            let vp = src.getPlayerOrException();
            let id = Arguments.STRING.getResult(ctx, "id");
         
            let keeper = keeperDefs[id] || findKeeperById(id.indexOf(":") === -1 ? "ftb:" + id : id);
            if (!keeper) { src.sendFailure(Text.of("Unknown shop id: " + id)); return 0; }
            spawnKeeperAt(kjsServer, vp.getScoreboardName(), keeper, "", vp.blockPosition());
            src.sendSuccess(Text.of("Spawned ").append(Text.translate(keeper.name)).green(), false);
            return 1;
          })
        )
      )
      .then(
        Commands.literal("clear").executes((ctx) => {
          let src = ctx.getSource();
          if (!ensureServer(ctx)) { src.sendFailure(Text.of("shops not ready yet - move around for a second and retry")); return 0; }
          let vp = src.getPlayerOrException();
          kjsServer.runCommandSilent("execute as " + vp.getScoreboardName() + " at @s run kill @e[tag=" + KEEPER_TAG + "]");
          src.sendSuccess(Text.of("Removed all shopkeepers in this dimension - they respawn on next visit once their cooldown passes (use /shops reset to force)").green(), false);
          return 1;
        })
      )
      .then(
        Commands.literal("reset").executes((ctx) => {
          if (!ensureServer(ctx)) { ctx.getSource().sendFailure(Text.of("shops not ready yet - move around for a second and retry")); return 0; }
          kjsServer.persistentData[POP_KEY] = [];
          kjsServer.getPlayerList().getPlayers().forEach((p) => resetBrokerSeen(p));
          ctx.getSource().sendSuccess(Text.of("Cleared placement ledger and broker greeting flags").green(), false);
          return 1;
        })
      )
      .then(
        Commands.literal("here").executes((ctx) => {
          let src = ctx.getSource();
          if (!ensureServer(ctx)) { src.sendFailure(Text.of("shops not ready yet - move around for a second and retry")); return 0; }
          let vp = src.getPlayerOrException();
          let level = vp.level;
          let sm, structReg, pos;
          try {
            sm = level.structureManager();
            structReg = structureRegistry(level);
            pos = vp.blockPosition();
          } catch (e) {
            src.sendFailure(Text.of("[here] detect setup error: " + e));
            return 0;
          }
          let all;
          try {
            all = sm.getAllStructuresAt(pos);
          } catch (e) {
            src.sendFailure(Text.of("[here] getAllStructuresAt error: " + e));
            return 0;
          }
          let lines = [];
          all.keySet().forEach((structure) => {
            let start;
            try {
              start = sm.getStructureAt(pos, structure);
            } catch (e) {
              return;
            }
            if (!start || !start.isValid()) return;
            let id;
            try {
              id = String(structReg.getKey(structure));
            } catch (e) {
              return;
            }
            let keepers = resolveKeepers(id);
            lines.push(id + (keepers ? " -> " + keepers.map((k) => k.id).join(", ") : " (no keeper)"));
          });
          src.sendSuccess(Text.of(lines.length === 0 ? "[here] no structures at your position" : "[here] detected:\n" + lines.join("\n")), false);
          return 1;
        })
      )
  );
});
