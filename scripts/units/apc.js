APC.init = function(unit)
{
    unit.setAmmo1(0);
    unit.setMaxAmmo1(0);
    unit.setWeapon1ID("");

    unit.setAmmo2(0);
    unit.setMaxAmmo2(0);
    unit.setWeapon2ID("");

    unit.setFuel(70);
    unit.setMaxFuel(70);
    unit.setBaseMovementPoints(6);
    unit.setMinRange(1);
    unit.setMaxRange(1);
    unit.setVision(1);
};
APC.actionList = ["ACTION_LOAD", "ACTION_UNLOAD", "ACTION_JOIN", "ACTION_SUPPORTALL_RATION", "ACTION_WAIT", "ACTION_CO_UNIT_0", "ACTION_CO_UNIT_1"];
