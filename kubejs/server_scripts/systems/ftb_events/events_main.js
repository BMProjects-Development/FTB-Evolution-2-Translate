// priority: 100
const ftbEvents = [event_allay, event_goat, event_frog, event_trader, event_fairy, event_phantom, event_gunslinger];

const ftbEventsInactive = [event_creeper, event_apoth_boss, event_treasure_goblin];

let ftbEventsReady = true;

const defaultEventSettings = {
  timer: 0,
  timerDelay: 1000,
  debug: false,
  maxAttempts: 50,
  timeCooldown: 12000,
};

const eventSettingsOf = (server) => {
  let pData = server.persistentData;
  if (!pData.contains("eventSettings")) pData.eventSettings = defaultEventSettings;
  return pData.getCompoundOrEmpty("eventSettings");
};

ServerEvents.loaded((event) => {
  try {
    eventSettingsOf(event.server);
    EventStats.attach(event.server);
  } catch (e) {
    console.error("[ftb_events] disabled, setup failed: " + e);
    ftbEventsReady = false;
  }
});

ServerEvents.unloaded(() => {
  EventStats.detach();
});

PlayerEvents.tick((event) => {
  if (!ftbEventsReady) return;
  let player = event.player;
  if (player.tickCount % 20 !== 0) return;
  const pData = player.persistentData;
  try {
    pData.putInt("timer", pData.getIntOr("timer", 0) + 20);
  } catch (e) {
    console.error("[ftb_events] disabled, player timer failed: " + e);
    ftbEventsReady = false;
  }
});

ServerEvents.tick((event) => {
  if (!ftbEventsReady) return;
  let server = event.server;
  if (!server.persistentData.contains("eventSettings")) return;

  let settings = eventSettingsOf(server);
  let timer = settings.getIntOr("timer", 0) + 1;
  settings.putInt("timer", timer);
  if (timer <= settings.getIntOr("timerDelay", defaultEventSettings.timerDelay)) return;

  try {
    eventSystem(event, false, server);
  } catch (e) {
    console.error("[ftb_events] event system failed: " + e);
    Statistics().addFailure("Event System Error");
  } finally {
    settings.putInt("timer", 0);
  }
});

function eventSystem(event, forceEvent, server) {
  forceEvent = forceEvent ?? false;
  server = server ?? (event && event.server);
  if (!server && event && event.getSource) server = event.getSource().getServer();
  if (!server) throw new Error("Unable to resolve server for event system");

  let settings = eventSettingsOf(server);
  let debug = settings.getBooleanOr("debug", false);
  let maxAttempts = settings.getIntOr("maxAttempts", defaultEventSettings.maxAttempts);
  let timeCooldown = settings.getIntOr("timeCooldown", defaultEventSettings.timeCooldown);
  let startTime = server.getTickCount();

  let chosenPlayer = checks.player.getRandomPlayer(server.players);
  if (!chosenPlayer) return;
  if (debug) console.log("[ftb_events] chosen player: " + chosenPlayer.username);

  let disabledEvents = [];
  if (!forceEvent) {
    if (checks.player.isCreativeOrSpectator(chosenPlayer)) return;
    if (!checks.player.isAlive(chosenPlayer)) return;
    if (!checks.player.hasTimer(chosenPlayer)) return;
    if (checks.player.isOnCooldown(chosenPlayer, timeCooldown)) return;
    if (checks.player.isInSpawn(chosenPlayer)) return;
    if (checks.player.isInSpace(chosenPlayer)) return;
    disabledEvents = checks.player.getDisabledEvents(chosenPlayer);
  }

  let filteredEvents = checks.event.filterEvents(ftbEvents, chosenPlayer);
  if (filteredEvents.length === 0) return;

  let chosenEvent = checks.event.getRandomEvent(filteredEvents);
  if (!chosenEvent) return;

  if (!forceEvent && disabledEvents.indexOf(chosenEvent.name) !== -1) {
    if (debug) console.log("[ftb_events] " + chosenEvent.name + " disabled by player, skipping");
    Statistics().addFailure("Disabled by Player");
    return;
  }

  if (!checks.event.inBiome(chosenEvent, chosenPlayer)) return;

  let locationInfo = null;
  if (chosenEvent.size >= 0) {
    locationInfo = checks.event.findSpawnLocation(chosenEvent, chosenPlayer, maxAttempts);
    if (!locationInfo) return;
  }

  chosenEvent.execute(event, chosenPlayer, locationInfo);
  Statistics().addSuccess(chosenEvent.displayName);
  chosenPlayer.persistentData.putInt("timer", 0);
  if (debug) {
    console.log(
      "[ftb_events] " + chosenEvent.name + " triggered for " + chosenPlayer.username +
      " after " + (server.getTickCount() - startTime) + " ticks"
    );
  }
}
