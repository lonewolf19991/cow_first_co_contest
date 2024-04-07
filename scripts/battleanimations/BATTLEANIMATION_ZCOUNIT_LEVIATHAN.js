var Constructor = function()
{
    this.getMaxUnitCount = function()
    {
        return 1;
    };

    this.armyData = [["os", "os"],
                     ["bm", "bm"],
                     ["ge", "ge"],
                     ["yc", "yc"],
                     ["bh", "ma"],
                     ["bg", "ma"],
                     ["ma", "ma"],
                     ["ac", "ma"],
                     ["pf", "ma"],
                     ["ti", "ma"],
                     ["dm", "ma"],];

    this.loadStandingAnimation = function(sprite, unit, defender, weapon)
    {
        var player = unit.getOwner();
        var army = Global.getArmyNameFromPlayerTable(player, BATTLEANIMATION_ZCOUNIT_LEVIATHAN.armyData);
        sprite.loadSpriteV2("artillerycraft+" + army + "+mask", GameEnums.Recoloring_Matrix,
                            BATTLEANIMATION_ZCOUNIT_LEVIATHAN.getMaxUnitCount(), Qt.point(0, 10));
        var spriteId = "artillerycraft+" + army + "+prop+mask";
        if (sprite.existResAnim(spriteId))
        {
            sprite.loadSpriteV2(spriteId, GameEnums.Recoloring_Matrix,
                                BATTLEANIMATION_ZCOUNIT_LEVIATHAN.getMaxUnitCount(), Qt.point(64, 10 + 32),
                                -1, 1, 0, 0, false, false, 100);
        }
        BATTLEANIMATION.loadSpotterOrCoMini(sprite, unit, true);
    };

    this.loadFireAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_ZCOUNIT_LEVIATHAN.loadStandingAnimation(sprite, unit, defender, weapon);

        var player = unit.getOwner();
        var army = Global.getArmyNameFromPlayerTable(player, BATTLEANIMATION_ZCOUNIT_LEVIATHAN.armyData);
        var count = sprite.getUnitCount(BATTLEANIMATION_ZCOUNIT_LEVIATHAN.getMaxUnitCount());
        sprite.loadSprite("artillery_shot",  false, sprite.getMaxUnitCount(), Qt.point(28, 45),
                          1, 1.0, 0, 0);
        for (var i = 0; i < count; i++)
        {
            sprite.loadSound("cannon_weapon_fire.wav", 1, i * BATTLEANIMATION.defaultFrameDelay);
        }
    };

    this.getFireDurationMS = function(sprite, unit, defender, weapon)
    {
        return 500 + BATTLEANIMATION.defaultFrameDelay * sprite.getUnitCount(BATTLEANIMATION_ZCOUNIT_LEVIATHAN.getMaxUnitCount());
    };

    this.loadImpactAnimation = function(sprite, unit, defender, weapon)
    {
        var count = sprite.getUnitCount(BATTLEANIMATION.getMaxUnitCount());
        var i = 0;
        sprite.loadSprite("artillery_hit",  false, sprite.getMaxUnitCount(), Qt.point(0, 20),
                          1, 1.0, 0, 0, true);
        sprite.addSpriteScreenshake(8, 0.98, 800, 200);
        for (i = 0; i < count; i++)
        {
            sprite.loadSound("artillery_explode.wav", 1, i * BATTLEANIMATION.defaultFrameDelay);
        }
    }

    this.getImpactDurationMS = function(sprite, unit, defender, weapon)
    {
        return 400 - BATTLEANIMATION.defaultFrameDelay + BATTLEANIMATION.defaultFrameDelay * sprite.getUnitCount(BATTLEANIMATION_ZCOUNIT_LEVIATHAN.getMaxUnitCount());
    };
};

Constructor.prototype = BATTLEANIMATION;
var BATTLEANIMATION_ZCOUNIT_LEVIATHAN = new Constructor();
