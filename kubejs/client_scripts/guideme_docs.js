const $DocsModRegistry = Java.loadClass("dev.ftb.mods.ftblibrary.integration.docsmod.DocsModRegistry");
const $GuidesCommon = Java.loadClass("guideme.GuidesCommon");
const $PageAnchor = Java.loadClass("guideme.PageAnchor");

$DocsModRegistry.INSTANCE.registerDocsMod("guideme", (player, guide, page, anchor) => {
    if (page == null) {
        $GuidesCommon.openGuide(player, guide);
    } else {
        $GuidesCommon.openGuide(player, guide, anchor ? new $PageAnchor(page, anchor) : $PageAnchor.page(page));
    }
});
