// priority: 800

const $GunslingerAABB = Java.loadClass("net.minecraft.world.phys.AABB");
const $GunslingerEntity = Java.loadClass("io.redspace.irons_artifice.entity.Gunslinger");
const $GunslingerEquipmentSlot = Java.loadClass("net.minecraft.world.entity.EquipmentSlot");
const $GunslingerEconomy = Java.loadClass("net.sirgrantd.sg_economy.api.SGEconomyApi");
const $GunslingerEconomyMod = Java.loadClass("net.sirgrantd.sg_economy.SGEconomyMod");

const GUNSLINGER_DUEL_TAG = "ftb_gunslinger_duel";
const GUNSLINGER_TARGET_SCAN_RADIUS = 32;
const GUNSLINGER_DUEL_TIMEOUT_TICKS = 20 * 30;

const gunslingerDuels = {};
let gunslingerGuns = null;

const gunslingerHasGunInHotbar = (player) => {
  if (!gunslingerGuns) gunslingerGuns = Ingredient.of("#irons_artifice:guns");
  let inv = player.inventory;
  for (let i = 0; i < 9; i++) {
    let stack = inv.getItem(i);
    if (stack && !stack.isEmpty() && gunslingerGuns.test(stack)) return true;
  }
  return false;
};

const gunslingerIsTargeted = (player) => {
  let box = new $GunslingerAABB(
    player.x - GUNSLINGER_TARGET_SCAN_RADIUS, player.y - GUNSLINGER_TARGET_SCAN_RADIUS, player.z - GUNSLINGER_TARGET_SCAN_RADIUS,
    player.x + GUNSLINGER_TARGET_SCAN_RADIUS, player.y + GUNSLINGER_TARGET_SCAN_RADIUS, player.z + GUNSLINGER_TARGET_SCAN_RADIUS
  );
  let uuid = String(player.getUuid());
  return player.level.getEntitiesWithin(box).some((entity) => {
    try {
      let target = entity.getTarget();
      return !!target && String(target.getUuid()) === uuid;
    } catch (e) {
      return false;
    }
  });
};

const gunslingerAnnounce = (player, title, subtitle) => {
  let server = player.server;
  let name = player.username;
  server.runCommandSilent("title " + name + " times 5 30 10");
  server.runCommandSilent("title " + name + " subtitle " + JSON.stringify(subtitle || { text: "" }));
  server.runCommandSilent("title " + name + " title " + JSON.stringify(title));
};

const gunslingerSay = (player, key) =>
  gunslingerAnnounce(player, { translate: "entity.irons_artifice.gunslinger", color: "gold", bold: true }, { translate: key, color: "yellow" });

const gunslingerFace = (entity, target) => {
  let yaw = (Math.atan2(target.z - entity.z, target.x - entity.x) * 180) / Math.PI - 90;
  entity.setRotation(yaw, 0);
  try {
    entity.setYHeadRot(yaw);
    entity.setBodyYaw(yaw);
  } catch (e) {}
};

const gunslingerVanish = (entity) => {
  if (!entity.isAlive()) return;
  entity.level.spawnParticles("minecraft:poof", true, entity.x, entity.y + 1, entity.z, 0.35, 0.6, 0.35, 25, 0.02);
  entity.discard();
};

const gunslingerReward = (player, gunslinger) => {
  let level = gunslinger.level;
  grantEvoAdvancement(player, "quick_draw");
  let bullets = level.createEntity("minecraft:item");
  bullets.setItem(Item.of("irons_artifice:bullet", event_gunslinger.bulletMin + Math.floor(Math.random() * (event_gunslinger.bulletMax - event_gunslinger.bulletMin + 1))));
  bullets.setPosition(gunslinger.x, gunslinger.y + 0.5, gunslinger.z);
  bullets.setGlowing(true);
  bullets.spawn();

  try {
    let hoursPlayed = Math.floor(player.stats.playTime / 72000);
    let money = event_gunslinger.moneyBase + event_gunslinger.moneyPerHour * hoursPlayed;
    $GunslingerEconomy.depositBalance(player, money);
    player.getData($GunslingerEconomyMod.CURRENCY_PLAYER.get()).syncToClient(player);
    player.tell(Text.translate("ftb.event_system.gunslinger.reward", [String(money)]).gold());
  } catch (e) {
    console.error("[ftb_events] gunslinger money reward failed: " + e);
  }

  grantWares(player, "ftb:swashbuckler_wares");
};

const event_gunslinger = {
  name: "ftb:gun_slinger",
  displayName: "Gunslinger Duel",
  description: "A Gunslinger challenges a gun-carrying player to a duel. Hit him first after the countdown to win bullets and money.",
  chance: 0.15,
  stage: null,
  disableStage: null,
  size: 0,
  minDistance: 8,
  maxDistance: 12,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,
  bulletMin: 8,
  bulletMax: 24,
  moneyBase: 25,
  moneyPerHour: 2,
  health: 5,

  execute(event, player, location) {
    let level = player.level;
    let server = level.server;

    let fail = (reason) => {
      Statistics().addFailure(reason);
      Statistics().removeSuccess(this.displayName);
    };
    if (!gunslingerHasGunInHotbar(player)) return fail("Gunslinger: No Gun");
    if (gunslingerIsTargeted(player)) return fail("Gunslinger: Player Targeted");

    let gunslinger = level.createEntity("irons_artifice:gunslinger");
    gunslinger.setPos(location.pos.x + 0.5, location.pos.y, location.pos.z + 0.5);
    gunslinger.setItemSlot($GunslingerEquipmentSlot.MAINHAND, $GunslingerEntity.createDefaultLoadout());
    gunslinger.setNoAi(true);
    gunslinger.setInvulnerable(true);
    gunslinger.setPersistenceRequired();
    gunslinger.addTag(GUNSLINGER_DUEL_TAG);
    gunslingerFace(gunslinger, player);

    let id = String(gunslinger.getUuid());
    gunslingerDuels[id] = { player: String(player.getUuid()), drawn: false, done: false };
    gunslinger.spawn();
    server.runCommandSilent("attribute " + id + " minecraft:max_health base set " + event_gunslinger.health);
    server.runCommandSilent("data merge entity " + id + " {Health:" + event_gunslinger.health + "f}");

    let duel = gunslingerDuels[id];
    let abort = () => {
      duel.done = true;
      delete gunslingerDuels[id];
      gunslingerVanish(gunslinger);
    };

    gunslingerSay(player, "ftb.event_system.gunslinger.challenge");
    server.scheduleInTicks(20, () => EventLib.lowerTimer(player, 10));

    ["3", "2", "1"].forEach((count, i) => {
      server.scheduleInTicks(40 + i * 20, () => {
        if (duel.done) return;
        if (!player.isAlive() || !gunslinger.isAlive()) return abort();
        gunslingerFace(gunslinger, player);
        gunslingerAnnounce(player, { text: count, color: "yellow", bold: true });
      });
    });

    server.scheduleInTicks(100, () => {
      if (duel.done) return;
      if (!player.isAlive() || !gunslinger.isAlive()) return abort();
      duel.drawn = true;
      gunslinger.setInvulnerable(false);
      gunslinger.setNoAi(false);
      gunslinger.setTarget(player);
      gunslingerAnnounce(player, { translate: "ftb.event_system.gunslinger.draw", color: "red", bold: true });
    });

    server.scheduleInTicks(100 + GUNSLINGER_DUEL_TIMEOUT_TICKS, () => {
      if (duel.done) return;
      if (gunslinger.isAlive() && player.isAlive()) gunslingerSay(player, "ftb.event_system.gunslinger.timeout");
      abort();
    });
  },
};

EntityEvents.afterHurt((event) => {
  let { source, entity } = event;
  if (!entity || !source) return;
  let attacker = source.getActual();
  if (!attacker) return;

  let gunslinger = null;
  let playerWon = false;
  if (entity.type === "irons_artifice:gunslinger" && attacker.isPlayer()) {
    gunslinger = entity;
    playerWon = true;
  } else if (entity.isPlayer() && attacker.type === "irons_artifice:gunslinger") {
    gunslinger = attacker;
  } else {
    return;
  }

  let id = String(gunslinger.getUuid());
  let duel = gunslingerDuels[id];
  if (!duel || duel.done || !duel.drawn) return;
  let player = playerWon ? attacker : entity;
  if (String(player.getUuid()) !== duel.player) return;

  duel.done = true;
  delete gunslingerDuels[id];

  if (playerWon) {
    gunslingerSay(player, "ftb.event_system.gunslinger.win");
    gunslingerReward(player, gunslinger);
  } else {
    gunslingerSay(player, "ftb.event_system.gunslinger.lose");
  }
  gunslinger.setNoAi(true);
  gunslinger.level.server.scheduleInTicks(20, () => gunslingerVanish(gunslinger));
});

EntityEvents.spawned("irons_artifice:gunslinger", (event) => {
  let entity = event.entity;
  try {
    if (!entity.entityTags().contains(GUNSLINGER_DUEL_TAG)) return;
    if (gunslingerDuels[String(entity.getUuid())]) return;
    entity.level.server.scheduleInTicks(1, () => {
      if (entity.isAlive()) entity.discard();
    });
  } catch (e) {
    console.warn("[ftb_events] stale gunslinger cleanup failed: " + e);
  }
});
