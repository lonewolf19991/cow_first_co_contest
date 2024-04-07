var Constructor = function()
{

    this.getUnitDamageID = function(unit)
    {
        return "FIGHTER";
    };


    this.init = function(unit)
    {
    unit.setAmmo1(6);
    unit.setMaxAmmo1(6);
    unit.setWeapon1ID("WEAPON_SUPERROCKET");

    unit.setAmmo2(0);
    unit.setMaxAmmo2(0);
    unit.setWeapon2ID("");

    unit.setVisionHigh(999);
    unit.setFuel(100);
    unit.setMaxFuel(100);
    unit.setBaseMovementPoints(9);
    unit.setMinRange(1);
    unit.setMaxRange(1);
    unit.setVision(2);
    };
    
    this.loadSprites = function(unit)
    {
        unit.loadSpriteV2("fighter+mask", GameEnums.Recoloring_Matrix);
    };
    this.getBaseCost = function()
    {
        return 20000;
    };
    this.getMovementType = function()
    {
        return "MOVE_AIR";
    };
    this.getName = function()
    {
        return qsTr("Ziz");
    };
    this.startOfTurn = function(unit, map)
    {
        if (unit.getTerrain() !== null)
        {
            // pay unit upkeep
            var fuelCosts = 5 + unit.getFuelCostModifier(Qt.point(unit.getX(), unit.getY()), 5);
            if (fuelCosts < 0)
            {
                fuelCosts = 0;
            }
            unit.setFuel(unit.getFuel() - fuelCosts);
        }
    };
    this.createExplosionAnimation = function(x, y, unit, map)
    {
        var animation = GameAnimationFactory.createAnimation(map, x, y);
        animation.addSprite("explosion+air", -map.getImageSize() / 2, -map.getImageSize(), 0, 2);
        animation.setSound("explosion+air.wav");
        return animation;
    };
    this.doWalkingAnimation = function(action, map)
    {
        var unit = action.getTargetUnit();
        var animation = GameAnimationFactory.createWalkingAnimation(map, unit, action);
        var unitID = unit.getUnitID().toLowerCase();
        animation.loadSpriteV2("fighter" + "+walk+mask", GameEnums.Recoloring_Matrix, 1);
        animation.setSound("moveair.wav", -2);
        return animation;
    };
    this.canMoveAndFire = function()
    {
        return true;
    };
    this.useTerrainDefense = function()
    {
        return false;
    };
    this.useTerrainHide = function()
    {
        return false;
    };

    this.getTerrainAnimationBase = function(unit, terrain, defender, map)
    {
        var weatherModifier = TERRAIN.getWeatherModifier(map);
        return "base_" + weatherModifier + "air";
    };

    this.getTerrainAnimationForeground = function(unit, terrain, defender, map)
    {
        return "";
    };

    this.getTerrainAnimationBackground = function(unit, terrain, defender, map)
    {
        return "";
    };

    this.getTerrainAnimationMoveSpeed = function()
    {
        return 1;
    };

    this.getDescription = function()
    {
        return qsTr("Gina's Superweapon Unit - rules the domain of Air. Can attack all units, and possesses unparallaled mobility.");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Air;
    };
}

Constructor.prototype = UNIT;
var ZCOUNIT_ZIZ = new Constructor();
