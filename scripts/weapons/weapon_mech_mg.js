WEAPON_MECH_MG.getEnviromentDamage = function(enviromentId)
{
    return 1;
};
var idx = 0;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "INFANTRY");
WEAPON_MECH_MG.damageTable[idx][1] = 65;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "MECH");
WEAPON_MECH_MG.damageTable[idx][1] = 55;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "MOTORBIKE");
WEAPON_MECH_MG.damageTable[idx][1] = 55;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "SNIPER");
WEAPON_MECH_MG.damageTable[idx][1] = 75;

idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "APC");
WEAPON_MECH_MG.damageTable[idx][1] = 20;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "FLARE");
WEAPON_MECH_MG.damageTable[idx][1] = 18;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "RECON");
WEAPON_MECH_MG.damageTable[idx][1] = 18;

idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "FLAK");
WEAPON_MECH_MG.damageTable[idx][1] = 6;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "HOVERFLAK");
WEAPON_MECH_MG.damageTable[idx][1] = 6;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "LIGHT_TANK");
WEAPON_MECH_MG.damageTable[idx][1] = 6;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "HOVERCRAFT");
WEAPON_MECH_MG.damageTable[idx][1] = 6;

idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "HEAVY_HOVERCRAFT");
WEAPON_MECH_MG.damageTable[idx][1] = 1;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "HEAVY_TANK");
WEAPON_MECH_MG.damageTable[idx][1] = 1;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "NEOTANK");
WEAPON_MECH_MG.damageTable[idx][1] = 1;

idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "MEGATANK");
WEAPON_MECH_MG.damageTable[idx][1] = 1;

idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "HOELLIUM");
WEAPON_MECH_MG.damageTable[idx][1] = 30;

idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "T_HELI");
WEAPON_MECH_MG.damageTable[idx][1] = 35;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "K_HELI");
WEAPON_MECH_MG.damageTable[idx][1] = 9;

idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "ARTILLERY");
WEAPON_MECH_MG.damageTable[idx][1] = 32;
idx = getIndexOf1(WEAPON_A_TANK_CANNON.damageTable, "ARTILLERYCRAFT");
WEAPON_A_TANK_CANNON.damageTable[idx][1] = 32;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "ANTITANKCANNON");
WEAPON_MECH_MG.damageTable[idx][1] = 45;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "MISSILE");
WEAPON_MECH_MG.damageTable[idx][1] = 35;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "ROCKETTHROWER");
WEAPON_MECH_MG.damageTable[idx][1] = 35;
idx = getIndexOf1(WEAPON_MECH_MG.damageTable, "PIPERUNNER");
WEAPON_MECH_MG.damageTable[idx][1] = 6;
