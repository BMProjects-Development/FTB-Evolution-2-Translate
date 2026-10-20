const BLOOD_VIAL = "ftb:blood_vial";
const BLOOD_VIAL_ALTAR = "neovitae:ara_vitae";
const BLOOD_VIAL_ESSENCE = 200;

BlockEvents.rightClicked(BLOOD_VIAL_ALTAR, (event) => {
  const held = event.item;
  if (String(held.id) !== BLOOD_VIAL) return;

  const altar = event.block.entity;
  if (!altar) return;

  const player = event.player;
  if (altar.getMainTank() >= altar.getMainCapacity()) {
    player.setStatusMessage(Text.translate("ftb.blood_vial.altar_full").red());
    altar.syncToClients();
    player.containerMenu.sendAllDataToRemote();
    event.cancel();
  }

  altar.addSacrificeEV(BLOOD_VIAL_ESSENCE, false);
  if (!player.isCreative()) held.shrink(1);
  player.playSound("minecraft:item.bottle.empty");
  event.cancel();
});
