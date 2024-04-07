var Constructor = function()
{
    this.getName = function()
    {
        return qsTr("Ship");
    };
    this.movementpointsTable = [["HARBOUR", 1],
                                ["TEMPORARY_HARBOUR", 1],
                                ["OILRIG", 1],
                                ["SEA", 1],
                                ["LAKE", 1],
                                ["FOG", 1],
                                ["ROUGH_SEA", 2],
                                ["REAF", 2],
                                ["TELEPORTTILE", 0],["PLAINS", 1],
                                ["PLAINS_DESTROYED", 1],
                                ["PLAINS_PLASMA", 1],
                                ["BEACH", 1],
                                ["BRIDGE", 1],
                                ["BRIDGE1", 1],
                                ["DESTROYEDWELD", 1],
                                ["RUIN", 1],
                                ["STREET", 1],
                                ["SNOW_STREET", 1],
                                ["STREET1", 1],
                                ["FOREST", 2],
                                ["FOREST1", 2],
                                ["FOREST2", 2],
                                ["FOREST3", 2],
                                ["WASTELAND", 2],
                                ["AIRPORT", 1],
                                ["FACTORY", 1],
                                ["HARBOUR", 1],
                                ["HQ", 1],
                                ["PIPESTATION", 1],
                                ["RADAR", 1],
                                ["TOWER", 1],
                                ["TOWN", 1],
                                ["SILO", 1],
                                ["SILO_ROCKET", 1],
                                ["TEMPORARY_AIRPORT", 1],
                                ["TEMPORARY_HARBOUR", 1],
                                ["LABOR", 1],
                                ["DESERT", 1],
                                ["DESERT_DESTROYEDWELD", 1],
                                ["DESERT_PATH", 1],
                                ["DESERT_PATH1", 1],
                                ["DESERT_TRY_RIVER", 2],
                                ["DESERT_RUIN", 1],
                                ["SNOW", 2],
                                ["SNOW_DESTROYEDWELD", 2],
                                ["DESERT_FOREST", 2],
                                ["DESERT_FOREST1", 2],
                                ["DESERT_WASTELAND", 2],
                                ["SNOW_FOREST", 3],
                                ["SNOW_FOREST1", 3],
                                ["SNOW_FOREST2", 3],
                                ["SNOW_WASTELAND", 3],
                                ["SNOW_RUIN", 2],
                                ["WASTE",  1],
                                ["WASTE_PATH", 1],
                                ["WASTE_FOREST", 2],
                                ["WASTE_WASTELAND", 2],
                                ["WASTE_RUIN", 1],
                                ["WASTE_DESTROYEDWELD", 1],
                                ["CREEPER", 1],
                                ["TELEPORTTILE", 0],["RIVER", 1]];

    this.getMovementpoints = function(terrain, unit, currentTerrain, trapChecking = false, map)
    {
        var shipBridges = true;
        if (map !== null)
        {
            shipBridges = map.getGameRules().getShipBridges();
        }
        if (shipBridges &&
            terrain.getID() === "BRIDGE" &&
            (terrain.getBaseTerrainID() === "SEA" || terrain.getBaseTerrainID() === "LAKE"))
        {
            return 1;
        }
        return MOVEMENTTABLE.getMovementpointsFromTable(terrain, MOVE_SHIP_ENHANCED.movementpointsTable);
    };
};
Constructor.prototype = MOVEMENTTABLE;
var MOVE_SHIP_ENHANCED = new Constructor();
