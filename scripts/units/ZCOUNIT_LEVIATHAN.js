var Constructor = function()
{

    this.getUnitDamageID = function(unit)
    {
        return "HEAVY_HOVERCRAFT";
    };

    this.init = function(unit)
    {
        unit.setAmmo1(6);
        unit.setMaxAmmo1(6);
        unit.setWeapon1ID("WEAPON_SUPERROCKET");

        unit.setAmmo2(0);
        unit.setMaxAmmo2(0);
        unit.setWeapon2ID("");

        unit.setFuel(70);
        unit.setMaxFuel(70);
        unit.setBaseMovementPoints(3);
        unit.setMinRange(1);
        unit.setMaxRange(4);
        unit.setVision(1);

    };
    this.actionList =  ["ACTION_FIRE", "ACTION_LEVIATHAN_TELEPORT", "ACTION_JOIN", "ACTION_LOAD", "ACTION_UNLOAD", "ACTION_WAIT", "ACTION_CO_UNIT_0", "ACTION_CO_UNIT_1"];
	
    this.loadSprites = function(unit)
    {
        unit.loadSpriteV2("artillerycraft+mask", GameEnums.Recoloring_Matrix);
    };
    this.getMovementType = function()
    {
        return "MOVE_HOVERCRAFT";
    };
    this.doWalkingAnimation = function(action, map)
    {
        var unit = action.getTargetUnit();
        var animation = GameAnimationFactory.createWalkingAnimation(map, unit, action);
        var unitID = unit.getUnitID().toLowerCase();
        animation.loadSpriteV2("artillerycraft" + "+walk+mask", GameEnums.Recoloring_Matrix, 2);
        animation.setSound("movehovercraft.wav", -2);
        return animation;
    };
    this.getBaseCost = function()
    {
        return 20000;
    };
    this.getName = function()
    {
        return qsTr("Leviathan");
    };

    this.getDescription = function()
    {
        return qsTr("Gina's Superweapon unit - rules the domain of Water. Indirect unit, and can move from water to ground.");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Hovercraft;
    };
    this.getTypeOfWeapon1 = function(unit)
    {
        return GameEnums.WeaponType_Indirect;
    };
}

Constructor.prototype = UNIT;
var ZCOUNIT_LEVIATHAN = new Constructor();
