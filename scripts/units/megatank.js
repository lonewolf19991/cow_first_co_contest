MEGATANK.init = function(unit)
{
    unit.setAmmo1(3);
    unit.setMaxAmmo1(3);
    unit.setWeapon1ID("WEAPON_MEGATANK_GUN");

    unit.setAmmo2(-1);
    unit.setMaxAmmo2(-1);
    unit.setWeapon2ID("WEAPON_MEGATANK_MG");

    unit.setFuel(50);
    unit.setMaxFuel(50);
    unit.setBaseMovementPoints(4);
    unit.setMinRange(1);
    unit.setMaxRange(1);
    unit.setVision(1);
};
MEGATANK.getBaseCost = function()
{
    return 28000;
};
