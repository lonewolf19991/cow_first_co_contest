WEAPON_LIGHT_TANK_GUN.getEnviromentDamage = function(enviromentId)
{
    return 15;
};
var idx = 0;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "APC");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 75;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "FLARE");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 80;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "RECON");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 85;

// tanks
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "FLAK");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 65;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "HOVERFLAK");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 65;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "LIGHT_TANK");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 55;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "HOVERCRAFT");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 55;

// heavy tanks
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "HEAVY_HOVERCRAFT");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 15;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "HEAVY_TANK");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 15;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "NEOTANK");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 15;

// very heavy tanks
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "MEGATANK");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 10;

idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "HOELLIUM");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 20;

// ranged land units
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "ARTILLERY");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 70;
idx = getIndexOf1(WEAPON_A_TANK_CANNON.damageTable, "ARTILLERYCRAFT");
WEAPON_A_TANK_CANNON.damageTable[idx][1] = 70;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "ANTITANKCANNON");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 30;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "MISSILE");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 85;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "ROCKETTHROWER");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 85;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "PIPERUNNER");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 55;

// ships
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "BATTLESHIP");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 1;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "CANNONBOAT");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 10;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "CRUISER");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 5;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "DESTROYER");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 5;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "SUBMARINE");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 1;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "LANDER");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 10;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "BLACK_BOAT");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 10;
idx = getIndexOf1(WEAPON_LIGHT_TANK_GUN.damageTable, "AIRCRAFTCARRIER");
WEAPON_LIGHT_TANK_GUN.damageTable[idx][1] = 1;
