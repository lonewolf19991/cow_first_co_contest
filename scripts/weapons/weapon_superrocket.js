var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("Missile");
    };
    this.getEnviromentDamage = function(enviromentId)
    {
        return 70;
    };
    this.damageTable = [["INFANTRY", 90],
                        ["MECH", 90],
                        ["MOTORBIKE", 90],
                        ["SNIPER", 90],

                        // supporter
                        ["APC", 85],
                        ["FLARE", 85],
                        ["RECON", 85],

                        // tanks
                        ["FLAK", 50],
                        ["HOVERFLAK", 50],
                        ["LIGHT_TANK", 75],
                        ["HOVERCRAFT", 75],

                        // heavy tanks
                        ["HEAVY_HOVERCRAFT", 70],
                        ["HEAVY_TANK", 70],
                        ["NEOTANK", 60],

                        // very heavy tanks
                        ["MEGATANK", 25],

                        ["HOELLIUM", 30],

                        // ranged land units
                        ["ARTILLERY", 75],
                        ["ARTILLERYCRAFT", 75],
                        ["ANTITANKCANNON", 55],
                        ["MISSILE", 85],
                        ["ROCKETTHROWER", 85],
                        ["PIPERUNNER", 80],

                        // air units
                        ["DUSTER", 65],
                        ["FIGHTER", 45],
                        ["BOMBER", 70],
                        ["STEALTHBOMBER", 55],
                        ["TRANSPORTPLANE", 120],
                        ["BLACK_BOMB", 65],
                        ["WATERPLANE", 75],
                        ["K_HELI", 85],
                        ["T_HELI", 95],


                        // ships
                        ["BATTLESHIP", 45],
                        ["CANNONBOAT", 60],
                        ["CRUISER", 35],
                        ["DESTROYER", 35],
                        ["SUBMARINE", 55],
                        ["LANDER", 60],
                        ["BLACK_BOAT", 60],
                        ["AIRCRAFTCARRIER", 60],
                        ["WATERMINE", 400]];

    this.getBaseDamage = function(unit)
    {
        return WEAPON.getDamageFromTable(unit, WEAPON_SUPERROCKET.damageTable, "WEAPON_SUPERROCKET");
    };
};

Constructor.prototype = WEAPON;
var WEAPON_SUPERROCKET = new Constructor();
