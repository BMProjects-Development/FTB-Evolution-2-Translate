ItemEvents.modifyTooltips(event => {
    event.add('ae2:meteorite_compass', [
        Text.translate('ftb.tooltip.meteorite_compass.nether_only').gray(),
        Text.translate('ftb.tooltip.meteorite_compass.buried').darkGray()
    ])

    event.add('bhc:red_heart', Text.translate('ftb.tooltip.bhc.red_heart.source'))
    event.add("bhc:yellow_heart", Text.translate("ftb.tooltip.bhc.yellow_heart.source"));
    event.add("bhc:green_heart", Text.translate("ftb.tooltip.bhc.green_heart.source"));
    event.add("bhc:blue_heart", Text.translate("ftb.tooltip.bhc.blue_heart.source"));

    event.add('ftb:coffee', Text.translate('ftb.tooltip.coffee.brewing').gray())
    event.add('ftb:oil_residue', Text.translate('ftb.tooltip.oil_residue').gray())
    event.add('ftb:blood_vial', Text.translate('ftb.tooltip.blood_vial', ['200']).gray())

    event.add('sfm:printing_press', [
        Text.translate('ftb.tooltip.sfm.printing_press.ink').gray(),
        Text.translate('ftb.tooltip.sfm.printing_press.disenchant').gray()
    ])

    // Best Y level per ore
    const y = n => Text.translate('ftb.tooltip.ore_y.y', [String(n)])
    const range = (a, b) => Text.translate('ftb.tooltip.ore_y.range', [y(a), y(b)])

    // JAMD
    const nether = () => y(66)
    const end = () => range(10, 128)

    const both = (ns, ore) => [`${ns}:${ore}_stone_ore`, `${ns}:${ore}_deepslate_ore`]
    const vanilla = ore => [`minecraft:${ore}_ore`, `minecraft:deepslate_${ore}_ore`]
    const netherEnd = ore => [`ftbmaterials:${ore}_nether_ore`, `ftbmaterials:${ore}_end_ore`]

    // [items, overworld, mining dimension, nether mining dimension, end mining dimension]
    const ORE_Y = [
        [vanilla('coal'), y(96), y(64), null, null],
        [vanilla('copper').concat(netherEnd('copper')), y(48), y(48), nether(), end()],
        [vanilla('iron').concat(netherEnd('iron')), y(16), y(16), nether(), end()],
        [vanilla('gold').concat(netherEnd('gold')), y(-16), range(32, 64), range(1, 128), end()],
        [vanilla('redstone').concat(netherEnd('redstone')), y(-59), y(-63), nether(), end()],
        [vanilla('lapis').concat(netherEnd('lapis_lazuli')), y(0), y(0), nether(), end()],
        [vanilla('diamond').concat(netherEnd('diamond')), y(-59), y(-63), nether(), end()],
        [vanilla('emerald').concat(netherEnd('emerald')), y(232), y(64), nether(), end()],
        [['minecraft:nether_quartz_ore'], null, null, range(10, 128), null],
        [['minecraft:ancient_debris'], null, null, y(16), null],

        [both('ftbmaterials', 'tin').concat(netherEnd('tin')), y(16), y(16), nether(), end()],
        [both('ftbmaterials', 'lead').concat(netherEnd('lead')), y(16), y(16), nether(), end()],
        [both('ftbmaterials', 'aluminum').concat(netherEnd('aluminum')), y(16), y(16), nether(), end()],
        [both('ftbmaterials', 'nickel').concat(netherEnd('nickel')), y(16), y(16), nether(), end()],
        [both('ftbmaterials', 'uranium').concat(netherEnd('uranium')), range(-48, -16), range(-48, -16), nether(), end()],
        [both('ftbmaterials', 'iridium').concat(netherEnd('iridium')), y(-24), y(-24), nether(), end()],
        [both('ftbmaterials', 'silver').concat(netherEnd('silver')), y(-7), y(-7), nether(), end()],
        [['ftbmaterials:platinum_deepslate_ore'].concat(netherEnd('platinum')), y(-40), y(-40), nether(), end()],
        [both('ftbmaterials', 'titanium').concat(netherEnd('titanium')), y(-2), y(-2), nether(), end()],
        [['ftbmaterials:cinnabar_stone_ore'].concat(netherEnd('cinnabar')), range(-64, 12), null, nether(), end()],
        [['ftbmaterials:sapphire_stone_ore'], y(48), null, null, null],

        [['colossal_reactors:boron_ore', 'colossal_reactors:deep_boron_ore'], y(0), y(0), null, null],
        [['colossal_reactors:chromium_ore', 'colossal_reactors:deep_chromium_ore'], y(-4), y(-4), null, null],
        [['powah:uraninite_ore_poor', 'powah:deepslate_uraninite_ore_poor'], range(-64, 64), range(-63, 64), null, null],
        [['powah:uraninite_ore', 'powah:deepslate_uraninite_ore'], range(-64, 20), range(-63, 20), null, null],
        [['powah:uraninite_ore_dense', 'powah:deepslate_uraninite_ore_dense'], range(-64, 0), range(-63, 0), null, null],
        [['mysticalagriculture:inferium_ore', 'mysticalagriculture:deepslate_inferium_ore', 'mysticalagradditions:nether_inferium_ore', 'mysticalagradditions:end_inferium_ore'], range(-32, 64), range(-32, 64), range(10, 100), range(10, 100)],
        [['mysticalagriculture:prosperity_ore', 'mysticalagriculture:deepslate_prosperity_ore', 'mysticalagradditions:nether_prosperity_ore', 'mysticalagradditions:end_prosperity_ore'], range(-60, 24), range(-60, 24), range(10, 100), range(10, 100)],
        [['evilcraft:dark_ore', 'evilcraft:dark_ore_deepslate'], y(-59), y(-63), null, null],
        [['dimresources:dimensional_ore', 'dimresources:deepslate_dimensional_ore'], range(-64, -16), range(-63, -16), null, null],
        [['nodeworks:celestine_ore'], y(-32), null, null, null],
        [['arsmagicalegacy:chimerite_ore', 'arsmagicalegacy:deepslate_chimerite_ore'], y(0), y(0), null, null],
        [['arsmagicalegacy:vinteum_ore', 'arsmagicalegacy:deepslate_vinteum_ore'], y(32), y(32), null, null],
        [['arsmagicalegacy:topaz_ore', 'arsmagicalegacy:deepslate_topaz_ore'], y(0), y(64), null, null],
        [both('ftbarmory', 'adamantite'), y(-59), y(-63), null, null],
        [['ftbarmory:aeternium_nether_ore'], null, null, y(66), null],
        [['ftbarmory:aurichalcum_end_ore'], null, null, null, range(16, 72)],
        [['occultism:iesnium_ore', 'occultism:iesnium_ore_natural'], null, null, y(64), null],
        [['ltxi:niobium_ore'], null, null, null, range(40, 128)],
        [['stellaris:novite_ore'], null, range(-48, 32), null, null],
        [['replication:deepslate_replica_ore'], null, y(-63), null, null]
    ]

    const xychorium = []
    for (const color of ['red', 'green', 'blue', 'light', 'dark']) {
        for (const host of ['stone', 'deepslate', 'kivi']) {
            xychorium.push(`xycraft_world:xychorium_ore_${host}_${color}`)
        }
    }
    ORE_Y.push([xychorium, y(16), y(16), null, null])

    const line = (label, value) => Text.translate('ftb.tooltip.ore_y.line', [label, value]).gray()

    const dimensionLines = (overworld, mining, netherMining, endMining) => {
        const lines = []
        if (overworld) lines.push(line(Text.translate('ftb.tooltip.ore_y.overworld').yellow(), overworld))
        if (mining) lines.push(line(Text.translate('ftb.tooltip.ore_y.mining').green(), mining))
        if (netherMining) lines.push(line(Text.translate('ftb.tooltip.ore_y.nether_mining').red(), netherMining))
        if (endMining) lines.push(line(Text.translate('ftb.tooltip.ore_y.end_mining').lightPurple(), endMining))
        return lines
    }

    for (const [items, overworld, mining, netherMining, endMining] of ORE_Y) {
        event.add(items, dimensionLines(overworld, mining, netherMining, endMining))
    }
})
