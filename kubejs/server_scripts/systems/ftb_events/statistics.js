// priority: 150
const EventStats = {
  server: null,
  cache: null,

  attach: (server) => {
    EventStats.server = server;
    EventStats.cache = null;
    EventStats.data();
  },

  detach: () => {
    EventStats.server = null;
    EventStats.cache = null;
  },

  data: () => {
    if (EventStats.cache) return EventStats.cache;
    const raw = EventStats.server ? EventStats.server.persistentData.getStringOr("eventStatistics", "") : "";
    let parsed = { success: {}, failure: {} };
    if (raw) {
      try {
        parsed = JSON.parse(raw);
      } catch (e) {
        console.warn("[ftb_events] unreadable statistics, starting fresh: " + e);
        parsed = { success: {}, failure: {} };
      }
    }
    parsed.success = parsed.success || {};
    parsed.failure = parsed.failure || {};
    EventStats.cache = parsed;
    return parsed;
  },

  save: () => {
    if (!EventStats.server) return;
    EventStats.server.persistentData.putString("eventStatistics", JSON.stringify(EventStats.data()));
  },

  addSuccess: (name) => {
    let data = EventStats.data();
    data.success[name] = (data.success[name] || 0) + 1;
    EventStats.save();
  },

  removeSuccess: (name) => {
    let data = EventStats.data();
    if (!data.success[name]) return;
    data.success[name]--;
    if (data.success[name] <= 0) delete data.success[name];
    EventStats.save();
  },

  addFailure: (reason) => {
    let data = EventStats.data();
    data.failure[reason] = (data.failure[reason] || 0) + 1;
    EventStats.save();
  },

  totalEvents: () => {
    let data = EventStats.data();
    let total = 0;
    Object.keys(data.success).forEach((key) => (total += data.success[key]));
    Object.keys(data.failure).forEach((key) => (total += data.failure[key]));
    return total;
  },

  reset: () => {
    EventStats.cache = { success: {}, failure: {} };
    EventStats.save();
  },
};

const Statistics = () => EventStats;
