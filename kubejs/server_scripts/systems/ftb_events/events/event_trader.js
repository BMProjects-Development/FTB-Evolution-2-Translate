// priority: 800

const $TraderAABB = Java.loadClass("net.minecraft.world.phys.AABB");

const EVENT_MERCHANT_TAG = "echoshop_event_merchant";
const BLACK_MARKET_CHANCE = 0.1;

const MERCHANT_LIFETIME_TICKS = 48000;
const MERCHANT_SCAN_INTERVAL = 100;
const MERCHANT_TRADE_RADIUS = 6;
const MERCHANT_BLOCK_RADIUS = 128;

const hasTag = (entity, tag) => {
  try { return entity.entityTags().contains(tag); } catch (e) {}
  return false;
};


const isLed = (entity) => {
  try {
    let v = entity.isLeashed;
    if (typeof v === "function") return !!entity.isLeashed();
    if (typeof v === "boolean") return v;
  } catch (e) {}
  try { if (entity.leashHolder) return true; } catch (e) {}
  return false;
};

const anyPlayerNear = (level, entity, radius) => {
  try {
    return level.hasNearbyAlivePlayer(entity.getX(), entity.getY(), entity.getZ(), radius);
  } catch (e) {
    return false;
  }
};

const isEventMerchant = (entity) => entity.type === "easy_npc:humanoid" && hasTag(entity, EVENT_MERCHANT_TAG);

const eventMerchantNearby = (level, pos, radius) => {
  let box = new $TraderAABB(
    pos.getX() - radius, pos.getY() - radius, pos.getZ() - radius,
    pos.getX() + radius + 1, pos.getY() + radius + 1, pos.getZ() + radius + 1
  );
  return level.getEntitiesWithin(box).filter(isEventMerchant).length > 0;
};

const event_trader = {
  name: "ftb:trader",
  displayName: "Wandering Trader",
  description:
    "Spawns a roaming EasyNPC merchant wired to an FTB Echoes shop. Usually the Wandering Merchant, with a 10% chance of the Black Market instead.",
  chance: 0.25,
  minDistance: 2,
  maxDistance: 20,
  size: 0,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,
  stage: null,
  disableStage: null,

  execute(event, player, location) {
    let level = player.level;
    let server = level.getServer();

    if (eventMerchantNearby(level, location.pos, MERCHANT_BLOCK_RADIUS)) {
      Statistics().addFailure(this.displayName);
      Statistics().removeSuccess(this.displayName);
      if (Math.random() < 0.5) eventSystem(event, false, server);
      return;
    }

    let isBlackMarket = Math.random() < BLACK_MARKET_CHANCE;
    let keeper = isBlackMarket ? keeperDefs.black_market : keeperDefs.wandering_merchant;

    spawnKeeperAt(server, player.username, keeper, "", location.pos, [EVENT_MERCHANT_TAG]);

    if (isBlackMarket) {
      grantEvoAdvancement(player, "no_questions_asked");
      player.tell(
        Text.translate("ftb.event_system.trader.black_market_spawned", [
          location.pos.x, location.pos.y, location.pos.z,
        ]).darkPurple()
      );
    } else {
      player.tell(
        Text.translate("ftb.event_system.trader.spawned", [
          location.pos.x, location.pos.y, location.pos.z,
        ])
      );
    }
  },
};

LevelEvents.tick((event) => {
  let { level, server } = event;
  if (server.getTickCount() % MERCHANT_SCAN_INTERVAL !== 0) return;

  let merchants = level.getEntities().filter(isEventMerchant);
  if (merchants.length === 0) return;

  merchants.forEach((merchant) => {
    try {
      if (isLed(merchant)) {
        merchant.persistentData.putInt("merchantAge", 0);
        return;
      }
      let age = merchant.persistentData.getIntOr("merchantAge", 0) + MERCHANT_SCAN_INTERVAL;
      if (age >= MERCHANT_LIFETIME_TICKS && !anyPlayerNear(level, merchant, MERCHANT_TRADE_RADIUS)) {
        level.spawnParticles(
          "minecraft:poof", true, merchant.x, merchant.y + 0.5, merchant.z, 0.35, 0.5, 0.35, 25, 0.02
        );
        merchant.discard();
      } else {
        merchant.persistentData.putInt("merchantAge", age);
      }
    } catch (e) {
      console.warn("[ftb_events] merchant despawn check failed: " + e);
    }
  });
});

EntityEvents.death((event) => {
  try {
    let { entity, source } = event;
    if (!entity || entity.type !== "easy_npc:humanoid") return;
    if (entity.persistentData.getStringOr("EchoShop", "") !== "ftb:wandering_merchant") return;
    let killer = source ? source.getActual() : null;
    if (!killer || !killer.isPlayer()) return;
    EventLib.addEffect(killer, "colorblindness:protanopia", 20 * 30, 0, false, true);
    killer.tell(Text.translate("ftb.event_system.trader.killed").red());
  } catch (e) {
    console.warn("[ftb_events] merchant death handler failed: " + e);
  }
});
