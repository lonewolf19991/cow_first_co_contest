var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("Gun");
    };
    this.getEnviromentDamage = function(enviromentId)
    {
        return 65;
    };
    this.damageTable = [["APC", 105],
                        ["FLARE", 105],
                        ["RECON", 105],

                        // tanks
                        ["FLAK", 105],
                        ["HOVERFLAK", 105],
                        ["LIGHT_TANK", 105],
                        ["HOVERCRAFT", 105],

                        // heavy tanks
                        ["HEAVY_HOVERCRAFT", 75],
                        ["HEAVY_TANK", 75],
                        ["NEOTANK", 55],

                        // very heavy tanks
                        ["MEGATANK", 35],

                        // ranged land units
                        ["ARTILLERY", 105],
                        ["ARTILLERYCRAFT", 105],
                        ["ANTITANKCANNON", 45],
                        ["MISSILE", 105],
                        ["ROCKETTHROWER", 105],
                        ["PIPERUNNER", 105],

                        ["HOELLIUM", 35],

                        // ships
                        ["BATTLESHIP", 12],
                        ["CANNONBOAT", 65],
                        ["CRUISER", 14],
                        ["DESTROYER", 14],
                        ["SUBMARINE", 14],
                        ["LANDER", 28],
                        ["BLACK_BOAT", 65],
                        ["AIRCRAFTCARRIER", 12]];

    this.getBaseDamage = function(unit)
    {
        return WEAPON.getDamageFromTable(unit, WEAPON_BEHEMOTH_GUN.damageTable, "WEAPON_BEHEMOTH_GUN");
    };
};

Constructor.prototype = WEAPON;
var WEAPON_BEHEMOTH_GUN = new Constructor();
