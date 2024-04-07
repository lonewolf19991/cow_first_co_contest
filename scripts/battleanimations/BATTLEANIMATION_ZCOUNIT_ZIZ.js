var Constructor = function()
{
    this.getMaxUnitCount = function()
    {
        return 1;
    };
    this.armyData = [["ac", "ac"],
                     ["bd", "bd"],
                     ["bm", "bm"],
                     ["bh", "bh"],
                     ["bg", "bg"],
                     ["dm", "dm"],
                     ["ge", "ge"],
                     ["gs", "gs"],
                     ["ma", "ma"],
                     ["os", "os"],
                     ["pf", "pf"],
                     ["ti", "ti"],
                     ["yc", "yc"],];
					 
    this.loadStandingAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_ZCOUNIT_ZIZ.loadSprite(sprite, unit, defender, weapon, "");
    };

    this.loadStandingFiredAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_ZCOUNIT_ZIZ.loadSprite(sprite, unit, defender, weapon, "+fire");
    };

    this.loadSprite = function(sprite, unit, defender, weapon, ending)
    {
        var player = unit.getOwner();
        // get army name
        var armyName = Global.getArmyNameFromPlayerTable(player, BATTLEANIMATION_ZCOUNIT_ZIZ.armyData);
        sprite.loadSpriteV2("fighter+" + armyName + ending + "+mask", GameEnums.Recoloring_Matrix,
                            BATTLEANIMATION_ZCOUNIT_ZIZ.getMaxUnitCount(), Qt.point(0, 20), -1);
    };

    this.loadFireAnimation = function(sprite, unit, defender, weapon)
    {
        BATTLEANIMATION_ZCOUNIT_ZIZ.loadSprite(sprite, unit, defender, weapon, "+fire");
        var player = unit.getOwner();
        // get army name
        var armyName = Global.getArmyNameFromPlayerTable(player, BATTLEANIMATION_ZCOUNIT_ZIZ.armyData);
        var count = sprite.getUnitCount(BATTLEANIMATION_ZCOUNIT_ZIZ.getMaxUnitCount());        
        sprite.loadMovingSprite("rocket", false, sprite.getMaxUnitCount(), Qt.point(-30, 30),
                                Qt.point(227, 0), 800, false,
                                -1, 1, -1);
        for (var i = 0; i < count; i++)
        {
            sprite.loadSound("missile_weapon_fire.wav", 1, i * BATTLEANIMATION.defaultFrameDelay);
        }
    };

    this.getFireDurationMS = function(sprite, unit, defender, weapon)
    {
        return 800 + BATTLEANIMATION.defaultFrameDelay * sprite.getUnitCount(BATTLEANIMATION_ZCOUNIT_ZIZ.getMaxUnitCount());
    };

    this.loadImpactUnitOverlayAnimation = function(sprite, unit, defender, weapon)
    {
        sprite.loadColorOverlayForLastLoadedFrame("#969696", 1000, 1, 300);
    };

    this.loadImpactAnimation = function(sprite, unit, defender, weapon)
    {
        var count = sprite.getUnitCount(BATTLEANIMATION_ZCOUNIT_ZIZ.getMaxUnitCount());
        sprite.loadMovingSprite("rocket_hit_air", false, sprite.getMaxUnitCount(), Qt.point(0, 30),
                                Qt.point(-50, 0), 400, false,
                                1, 1.0, 0, 400, true);
        sprite.addSpriteScreenshake(8, 0.95, 800, 500);
        sprite.loadMovingSprite("rocket", false, sprite.getMaxUnitCount(), Qt.point(127, 30),
                                Qt.point(-127, 0), 400, true,
                                -1, 1, 0, 0, true);
        for (var i = 0; i < count; i++)
        {
            sprite.loadSound("rocket_flying.wav", 1, 0);
            sprite.loadSound("rockets_explode.wav", 1, 200 + i * BATTLEANIMATION.defaultFrameDelay);
        }
    };

    this.getImpactDurationMS = function(sprite, unit, defender, weapon)
    {
        return 400 - BATTLEANIMATION.defaultFrameDelay + BATTLEANIMATION.defaultFrameDelay * sprite.getUnitCount(BATTLEANIMATION_ZCOUNIT_ZIZ.getMaxUnitCount());
    };
};

Constructor.prototype = BATTLEANIMATION;
var BATTLEANIMATION_ZCOUNIT_ZIZ = new Constructor();
