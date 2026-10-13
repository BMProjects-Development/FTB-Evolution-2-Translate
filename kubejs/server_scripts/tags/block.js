// priority: 1002
const addBlockTags = [
  {
    tagName: "c:chisel/glass",
    blockIDs: [
      "connectedglass:clear_glass",
      "connectedglass:borderless_glass",
      "hephaestus:clear_glass",
    ],
  },
  { tagName: "c:ores", blockIDs: ["#c:ores/celestine"] },
];

ServerEvents.tags("block", (event) => {
  addBlockTags.forEach((tag) => event.add(tag.tagName, tag.blockIDs));
});
