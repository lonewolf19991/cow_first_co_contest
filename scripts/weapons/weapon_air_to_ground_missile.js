WEAPON_AIR_TO_GROUND_MISSILE.getEnviromentDamage = function(enviromentId)
{
    return 25;
};
var idx = 0;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "APC");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 60;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "FLARE");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 55;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "RECON");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 55;

idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "FLAK");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "HOVERFLAK");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "LIGHT_TANK");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 55;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "HOVERCRAFT");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 55;

idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "HEAVY_HOVERCRAFT");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "HEAVY_TANK");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "NEOTANK");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 20;

idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "MEGATANK");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 10;

idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "ARTILLERY");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 65;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "ARTILLERYCRAFT");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 65;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "ANTITANKCANNON");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 35;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "MISSILE");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 65;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "ROCKETTHROWER");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 65;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "PIPERUNNER");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 55;

idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "HOELLIUM");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;

// ships
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "BATTLESHIP");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "CANNONBOAT");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "CRUISER");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "DESTROYER");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "SUBMARINE");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "LANDER");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "BLACK_BOAT");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_AIR_TO_GROUND_MISSILE.damageTable, "AIRCRAFTCARRIER");
WEAPON_AIR_TO_GROUND_MISSILE.damageTable[idx][1] = 25;
