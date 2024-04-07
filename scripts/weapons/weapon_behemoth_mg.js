var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("MG");
    };
    this.getEnviromentDamage = function(enviromentId)
    {
        return 1;
    };
    this.damageTable = [["INFANTRY", 105],
                        ["MECH", 95],
                        ["MOTORBIKE", 95],
                        ["SNIPER", 95],

                        // supporter
                        ["APC", 45],
                        ["FLARE", 40],
                        ["RECON", 45],

                        // tanks
                        ["FLAK", 10],
                        ["HOVERFLAK", 10],
                        ["LIGHT_TANK", 10],
                        ["HOVERCRAFT", 10],

                        // heavy tanks
                        ["HEAVY_HOVERCRAFT", 10],
                        ["HEAVY_TANK", 10],
                        ["NEOTANK", 10],

                        // very heavy tanks
                        ["MEGATANK", 1],

                        ["HOELLIUM", 20],

                        // heli copter
                        ["T_HELI", 45],
                        ["K_HELI", 35],

                        // ranged land units
                        ["ARTILLERY", 45],
                        ["ARTILLERYCRAFT", 45],
                        ["ANTITANKCANNON", 1],
                        ["MISSILE", 65],
                        ["ROCKETTHROWER", 65],
                        ["PIPERUNNER", 6]];

    this.getBaseDamage = function(unit)
    {
        return WEAPON.getDamageFromTable(unit, WEAPON_BEHEMOTH_MG.damageTable, "WEAPON_BEHEMOTH_MG");
    };
};

Constructor.prototype = WEAPON;
var WEAPON_BEHEMOTH_MG = new Constructor();
