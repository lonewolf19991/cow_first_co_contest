ROCKETTHROWER.init = function(unit)
{
    unit.setAmmo1(6);
    unit.setMaxAmmo1(6);
    unit.setWeapon1ID("WEAPON_ROCKET_MISSILE");

    unit.setAmmo2(0);
    unit.setMaxAmmo2(0);
    unit.setWeapon2ID("");

    unit.setFuel(50);
    unit.setMaxFuel(50);
    unit.setBaseMovementPoints(5);
    unit.setMinRange(3);
    unit.setMaxRange(5);
    unit.setVision(1);
};
ROCKETTHROWER.getBaseCost = function()
{
    return 15000;
};
