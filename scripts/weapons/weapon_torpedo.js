var idx = 0;
idx = getIndexOf1(WEAPON_TORPEDO.damageTable, "BATTLESHIP");
WEAPON_TORPEDO.damageTable[idx][1] = 65;
idx = getIndexOf1(WEAPON_TORPEDO.damageTable, "CANNONBOAT");
WEAPON_TORPEDO.damageTable[idx][1] = 95;

idx = getIndexOf1(WEAPON_TORPEDO.damageTable, "CRUISER");
WEAPON_TORPEDO.damageTable[idx][1] = 25;
idx = getIndexOf1(WEAPON_TORPEDO.damageTable, "DESTROYER");
WEAPON_TORPEDO.damageTable[idx][1] = 95;
idx = getIndexOf1(WEAPON_TORPEDO.damageTable, "SUBMARINE");
WEAPON_TORPEDO.damageTable[idx][1] = 55;

idx = getIndexOf1(WEAPON_TORPEDO.damageTable, "LANDER");
WEAPON_TORPEDO.damageTable[idx][1] = 95;
idx = getIndexOf1(WEAPON_TORPEDO.damageTable, "BLACK_BOAT");
WEAPON_TORPEDO.damageTable[idx][1] = 95;
idx = getIndexOf1(WEAPON_TORPEDO.damageTable, "AIRCRAFTCARRIER");
WEAPON_TORPEDO.damageTable[idx][1] = 75;
