// priority: 98
const $SpawnPermissions = Java.loadClass("net.minecraft.server.permissions.Permissions");

const spawnPyramidCanManage = (src) => {
  try {
    return src.permissions().hasPermission($SpawnPermissions.COMMANDS_ADMIN);
  } catch (e) {
    SpawnPyramid.warn("permission check unavailable: " + e);
    return false;
  }
};

const spawnPyramidTemplates = (server) => {
  let manager = server.overworld().getStructureManager();
  let listed = manager.listTemplates().toList();
  let entries = [];
  let i = 0;
  let id = null;
  let template = null;
  for (i = 0; i < listed.size(); i++) {
    id = listed.get(i);
    if (String(id.getNamespace()) !== SpawnPyramid.NAMESPACE) continue;
    template = manager.get(id);
    if (!template.isPresent()) continue;
    entries.push({
      id: String(id),
      x: template.get().getSize().getX(),
      y: template.get().getSize().getY(),
      z: template.get().getSize().getZ(),
    });
  }
  entries.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return entries;
};

const spawnPyramidLayout = (entries, base) => {
  let placements = [];
  let cursor = base.x;
  let i = 0;
  for (i = 0; i < entries.length; i++) {
    placements.push({ entry: entries[i], x: cursor, y: base.y, z: base.z });
    cursor += entries[i].x + SpawnPyramid.SHOWCASE_GAP;
  }
  return placements;
};

const spawnPyramidShowcaseBlock = (server, placement) => {
  let entry = placement.entry;
  let fits =
    entry.x <= SpawnPyramid.STRUCTURE_BLOCK_LIMIT &&
    entry.y <= SpawnPyramid.STRUCTURE_BLOCK_LIMIT &&
    entry.z <= SpawnPyramid.STRUCTURE_BLOCK_LIMIT;
  let mode = fits ? "save" : "load";
  let at = placement.x + " " + (placement.y - 1) + " " + placement.z;
  let nbt = "{name:\"" + entry.id + "\",mode:\"" + mode.toUpperCase() + "\",posX:0,posY:1,posZ:0,showboundingbox:1b,ignoreEntities:0b";
  if (fits) nbt += ",sizeX:" + entry.x + ",sizeY:" + entry.y + ",sizeZ:" + entry.z;
  nbt += "}";
  try {
    server.runCommandSilent("setblock " + at + " minecraft:structure_block[mode=" + mode + "]");
    server.runCommandSilent("data merge block " + at + " " + nbt);
  } catch (e) {
    SpawnPyramid.error("could not set up the structure block for " + entry.id + ": " + e);
    return false;
  }
  return fits;
};

const spawnPyramidShowcasePlace = (server, placements, range, source) => {
  try {
    spawnPyramidShowcaseRun(server, placements, source);
  } catch (e) {
    SpawnPyramid.error("showcase aborted: " + e);
  }
  spawnPyramidRelease(server, range);
  spawnPyramidBusy = false;
};

const spawnPyramidShowcaseRun = (server, placements, source) => {
  let i = 0;
  let placement = null;
  let oversized = 0;
  for (i = 0; i < placements.length; i++) {
    placement = placements[i];
    try {
      server.runCommandSilent(
        "place template " + placement.entry.id + " " + placement.x + " " + placement.y + " " + placement.z
      );
    } catch (e) {
      SpawnPyramid.error("could not place " + placement.entry.id + ": " + e);
      spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.showcase.piece_failed", [placement.entry.id]).red());
      continue;
    }
    if (!spawnPyramidShowcaseBlock(server, placement)) oversized++;
    spawnPyramidTell(
      source,
      Text.translate("ftb.spawn_pyramid.showcase.piece", [
        placement.entry.id,
        placement.x + " " + placement.y + " " + placement.z,
      ])
    );
  }
  spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.showcase.done", [placements.length]).green());
  if (oversized > 0) {
    spawnPyramidTell(
      source,
      Text.translate("ftb.spawn_pyramid.showcase.oversized", [oversized, SpawnPyramid.STRUCTURE_BLOCK_LIMIT]).yellow()
    );
  }
};

const spawnPyramidShowcaseWait = (server, placements, range, polls, source) => {
  let missing = 0;
  try {
    missing = SpawnPyramid.missingChunks(server, range);
  } catch (e) {
    SpawnPyramid.error("showcase chunk check threw: " + e);
    spawnPyramidRelease(server, range);
    spawnPyramidBusy = false;
    spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.showcase.chunks_failed").red());
    return;
  }
  if (missing === 0) {
    spawnPyramidShowcasePlace(server, placements, range, source);
    return;
  }
  if (polls >= SpawnPyramid.POLL_LIMIT) {
    spawnPyramidRelease(server, range);
    spawnPyramidBusy = false;
    spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.showcase.chunks_failed").red());
    return;
  }
  server.scheduleInTicks(SpawnPyramid.POLL_TICKS, () =>
    spawnPyramidShowcaseWait(server, placements, range, polls + 1, source)
  );
};

const spawnPyramidShowcase = (ctx, base) => {
  let source = ctx.getSource();
  let server = source.getServer();
  let entries = null;
  let placements = null;
  let last = null;
  let range = null;
  let depth = 0;

  if (spawnPyramidBusy) {
    spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.busy").yellow());
    return 0;
  }

  try {
    entries = spawnPyramidTemplates(server);
  } catch (e) {
    SpawnPyramid.error("could not list templates: " + e);
    spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.showcase.chunks_failed").red());
    return 0;
  }

  if (entries.length === 0) {
    spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.showcase.empty").yellow());
    return 0;
  }

  placements = spawnPyramidLayout(entries, base);
  last = placements[placements.length - 1];
  depth = entries.reduce((acc, entry) => (entry.z > acc ? entry.z : acc), 1);
  range = SpawnPyramid.chunkRange(base, last.x + last.entry.x - base.x, depth, SpawnPyramid.LOAD_MARGIN);

  spawnPyramidBusy = true;
  SpawnPyramid.forceChunks(server, range, true);
  spawnPyramidTell(source, Text.translate("ftb.spawn_pyramid.showcase.start", [entries.length]).green());
  server.scheduleInTicks(SpawnPyramid.POLL_TICKS, () => spawnPyramidShowcaseWait(server, placements, range, 0, source));
  return 1;
};

const spawnPyramidStatus = (ctx) => {
  let source = ctx.getSource();
  let server = source.getServer();
  let data = SpawnPyramid.data(server);
  let origin = SpawnPyramid.storedOrigin(server);
  let lines = [
    "state: " + data.getStringOr("state", "pending"),
    "attempts: " + data.getIntOr("attempts", 0),
    "origin: " + origin.x + " " + origin.y + " " + origin.z,
    "claimed: " + data.getBooleanOr("claimed", false),
    "verifies: " + SpawnPyramid.verify(server, origin),
  ];
  source.sendSuccess(Text.of(lines.join("\n")), false);
  return 1;
};

ServerEvents.commandRegistry((event) => {
  let { commands: Commands, arguments: Arguments } = event;

  let resolvePos = (ctx, named) => {
    let raw = Arguments.BLOCK_POS.getResult(ctx, named);
    if (raw && typeof raw.getBlockPos === "function") return raw.getBlockPos(ctx.getSource());
    return raw;
  };

  event.register(
    Commands.literal("ftbevolution2")
      .requires(spawnPyramidCanManage)
      .then(
        Commands.literal("showcase")
          .executes((ctx) => {
            let pos = ctx.getSource().getPlayerOrException().blockPosition();
            return spawnPyramidShowcase(ctx, { x: pos.getX(), y: pos.getY(), z: pos.getZ() });
          })
          .then(
            Commands.argument("pos", Arguments.BLOCK_POS.create(event)).executes((ctx) => {
              let pos = resolvePos(ctx, "pos");
              return spawnPyramidShowcase(ctx, { x: pos.getX(), y: pos.getY(), z: pos.getZ() });
            })
          )
      )
      .then(
        Commands.literal("place").executes((ctx) => {
          spawnPyramidAttempt(ctx.getSource().getServer(), ctx.getSource());
          return 1;
        })
      )
      .then(
        Commands.literal("claim").executes((ctx) => {
          let source = ctx.getSource();
          let result = SpawnPyramid.claim(source.getServer(), SpawnPyramid.storedOrigin(source.getServer()));
          if (result === null) {
            source.sendSuccess(Text.translate("ftb.spawn_pyramid.claim_unavailable").red(), false);
            return 0;
          }
          source.sendSuccess(Text.translate("ftb.spawn_pyramid.claimed", [result.claimed, result.needed]).green(), false);
          return 1;
        })
      )
      .then(Commands.literal("status").executes(spawnPyramidStatus))
      .then(
        Commands.literal("reset").executes((ctx) => {
          let source = ctx.getSource();
          let data = SpawnPyramid.data(source.getServer());
          data.putString("state", "pending");
          data.putInt("attempts", 0);
          data.putBoolean("claimed", false);
          spawnPyramidBusy = false;
          source.sendSuccess(Text.translate("ftb.spawn_pyramid.reset").green(), false);
          return 1;
        })
      )
  );
});
