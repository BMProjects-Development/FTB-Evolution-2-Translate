// priority: 790
const allaySettings = {
  despawnInSeconds: 60,
  staleTradeSeconds: 60,
};

const resolveTradeText = (value) => {
  let text = String(value);
  return text.startsWith("translate:") ? Text.translate(text.substring("translate:".length)) : value;
};

const serializeTradeText = (value) => {
  let key = null;
  try {
    key = value.getContents().getKey();
  } catch (ignored) {}
  return key ? "translate:" + key : String(value);
};

allTrades.forEach((trade) => {
  before_cobble.trades.push(trade);
  after_cobble.trades.push(trade);
  after_iron.trades.push(trade);
});
after_iron.trades.forEach((trade) => after_diamond.trades.push(trade));
after_diamond.trades.forEach((trade) => after_netherite.trades.push(trade));
after_netherite.trades.forEach((trade) => after_wither.trades.push(trade));
after_wither.trades.forEach((trade) => after_dragon.trades.push(trade));

const allayTradeTables = {
  before_cobble: before_cobble,
  after_cobble: after_cobble,
  after_iron: after_iron,
  after_diamond: after_diamond,
  after_netherite: after_netherite,
  wither_killed: after_wither,
  dragon_killed: after_dragon,
};

const highestTradeTable = (stages) => {
  let best = "before_cobble";
  let bestValue = allayTradeTables[best].value;
  stages.forEach((stage) => {
    let table = allayTradeTables[stage];
    if (table && table.value > bestValue) {
      best = stage;
      bestValue = table.value;
    }
  });
  return best;
};

const buildAllayTrade = (source) => {
  let trade = {
    buy: source.buy,
    sell: source.sell ?? null,
    action: source.action ?? null,
    success_message: source.success_message ?? null,
    spawn_message: source.spawn_message ?? null,
    name: source.name ?? null,
  };

  if (!trade.buy) throw new Error("Buy item is required for Allay Trade");
  if (!trade.sell && !trade.action) throw new Error("Sell item or action is required for Allay Trade");

  const buyName = Item.of(trade.buy).getItemName().getString();
  if (!trade.name) {
    trade.name = trade.sell
      ? "Allay Trade: " + buyName + " for " + Item.of(trade.sell).getItemName().getString()
      : "Allay Trade: " + buyName;
  }
  if (!trade.spawn_message) {
    trade.spawn_message = Text.translate("ftb.event_system.allay.spawned", [
      Text.of(Item.of(trade.buy).displayName),
      Text.of(Item.of(trade.sell ?? trade.buy).displayName),
    ]);
  }
  return trade;
};

const storeAllayTrade = (allay, trade) => {
  let stored = {
    buy: String(trade.buy),
    isTrading: false,
    fairy: false,
    spawnTime: Utils.getSystemTime(),
  };
  if (trade.sell) stored.sell = String(trade.sell);
  if (trade.action) stored.action = String(trade.action);
  if (trade.success_message) stored.success_message = serializeTradeText(trade.success_message);
  if (trade.spawn_message) stored.spawn_message = serializeTradeText(trade.spawn_message);
  if (trade.name) stored.name = serializeTradeText(trade.name);
  allay.persistentData.trade = stored;
};

const readAllayTrade = (allay) => {
  let data = allay.persistentData.getCompoundOrEmpty("trade");
  let read = (key) => {
    let value = data.getStringOr(key, "");
    return value ? value : null;
  };
  return {
    buy: read("buy"),
    sell: read("sell"),
    action: read("action"),
    success_message: read("success_message"),
    spawn_message: read("spawn_message"),
    name: read("name"),
  };
};

const returnAllayHeldItem = (level, allay) => {
  let held = allay.getMainHandItem().copy();
  if (held.isEmpty()) return;
  allay.setItemInHand("MAIN_HAND", Item.of("minecraft:air"));
  let dropped = level.createEntity("minecraft:item");
  dropped.setItem(held);
  dropped.setPos(allay.x, allay.y + 0.5, allay.z);
  dropped.spawn();
};

const event_allay = {
  name: "ftb:allay",
  displayName: "Allay Trade Event",
  description: "A random Allay spawns, having a special trade for the player, based on their game stage.",
  chance: 1,
  stage: null,
  disableStage: null,
  size: 0,
  minDistance: 4,
  maxDistance: 8,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: false,

  execute(event, player, location) {
    let level = player.level;
    let server = level.server;

    let table = allayTradeTables[highestTradeTable(EventLib.playerStages(player))];
    let picked = EventLib.weightedPick(table.trades);
    if (!picked) {
      Statistics().addFailure("No Allay Trade");
      return;
    }

    let trade = buildAllayTrade(picked);
    let allay = level.createEntity("minecraft:allay");
    storeAllayTrade(allay, trade);
    allay.setGlowing(true);
    allay.setPos(location.pos.x, location.pos.y + 1, location.pos.z);
    allay.setInvulnerable(true);
    allay.setCustomName(resolveTradeText(trade.name));
    allay.spawn();

    player.tell(resolveTradeText(trade.spawn_message));
    server.scheduleInTicks(20, () => EventLib.lowerTimer(player, 10));

    [20, 40].forEach((seconds) => {
      server.scheduleInTicks(20 * seconds, () => {
        if (!allay.isAlive() || !player.isAlive()) return;
        allay.getNavigation().moveTo(player, 1.5);
      });
    });
  },
};

ItemEvents.entityInteracted((event) => {
  let { player, target, level, server, item } = event;
  if (!target || target.type !== "minecraft:allay") return;

  let data = target.persistentData.getCompoundOrEmpty("trade");
  if (!data.contains("buy")) return;
  if (data.getBooleanOr("fairy", false)) return;
  if (data.getBooleanOr("isTrading", false)) {
    event.cancel();
    return;
  }

  let trade = readAllayTrade(target);
  if (item.id !== trade.buy) {
    player.sendSystemMessage(Text.translate("ftb.event_system.text.dont_want").red().bold());
    server.scheduleInTicks(2, () => {
      if (target.isAlive()) returnAllayHeldItem(level, target);
    });
    return;
  }

  data.putBoolean("isTrading", true);
  server.scheduleInTicks(2, () => {
    if (!target.isAlive()) return;
    if (!player.isAlive()) {
      data.putBoolean("isTrading", false);
      returnAllayHeldItem(level, target);
      return;
    }
    if (target.getMainHandItem().id !== trade.buy) {
      data.putBoolean("isTrading", false);
      player.sendSystemMessage(Text.translate("ftb.event_system.text.dont_want").red().bold());
      returnAllayHeldItem(level, target);
      return;
    }

    target.setDancing(true);
    server.scheduleInTicks(20, () => {
      if (!target.isAlive()) return;
      if (!player.isAlive()) {
        data.putBoolean("isTrading", false);
        target.setDancing(false);
        returnAllayHeldItem(level, target);
        return;
      }
      let successMessage = trade.success_message
        ? resolveTradeText(trade.success_message)
        : Text.translate("ftb.event_system.allay.trade.success", [Text.of(Item.of(trade.sell ?? trade.buy).displayName)]);
      player.tell(successMessage);
      target.setGlowing(false);

      server.scheduleInTicks(20, () => {
        if (!target.isAlive()) return;
        if (target.getMainHandItem().id !== trade.buy) {
          data.putBoolean("isTrading", false);
          target.setDancing(false);
          target.setGlowing(true);
          return;
        }
        target.setItemInHand("MAIN_HAND", Item.of("minecraft:air"));
        if (trade.sell) {
          let reward = level.createEntity("minecraft:item");
          reward.setItem(Item.of(trade.sell));
          reward.setPos(target.x, target.y, target.z);
          reward.setGlowing(true);
          reward.setNoGravity(true);
          reward.spawn();
          server.scheduleInTicks(20 * 5, () => {
            if (!reward.isAlive()) return;
            reward.setNoGravity(false);
            reward.setGlowing(false);
          });
        }
        if (trade.action) {
          let command = "execute as " + player.username + " at @s run " + trade.action;
          if (server.runCommandSilent(command) <= 0) console.warn("[ftb_events] allay action failed: " + command);
        }
        level.spawnParticles("minecraft:smoke", true, target.x, target.y, target.z, 0.25, 0.5, 0.25, 25, 0.01);
        level.spawnParticles("minecraft:heart", true, target.x, target.y, target.z, 0.5, 0.5, 0.5, 10, 0.5);
        grantEvoAdvancement(player, "helping_hands");
        target.discard();
      });
    });
  });
});

LevelEvents.tick((event) => {
  let { level, server } = event;
  if (server.getTickCount() % 200 !== 0) return;

  level.getEntities().forEach((entity) => {
    if (entity.type !== "minecraft:allay") return;
    let data = entity.persistentData.getCompoundOrEmpty("trade");
    if (!data.contains("spawnTime")) return;
    let spawnTime = Number(data.getLongOr("spawnTime", 0));
    let now = Utils.getSystemTime();
    if (spawnTime + allaySettings.despawnInSeconds * 1000 >= now) return;
    if (data.getBooleanOr("isTrading", false) && spawnTime + (allaySettings.despawnInSeconds + allaySettings.staleTradeSeconds) * 1000 >= now) return;
    returnAllayHeldItem(level, entity);
    level.spawnParticles("minecraft:smoke", true, entity.x, entity.y, entity.z, 0.35, 0.75, 0.35, 50, 0.01);
    entity.discard();
  });
});
