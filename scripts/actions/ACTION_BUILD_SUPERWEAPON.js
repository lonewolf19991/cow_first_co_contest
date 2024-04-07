var Constructor = function()
{
	this.getSuperweapons = function(map)
	{
		var units = [];
		if (map.getCurrentPlayer().getUnitCount("ZCOUNIT_BEHEMOTH") < 1)
		{
			units.push("ZCOUNIT_BEHEMOTH");
		}

		if (map.getCurrentPlayer().getUnitCount("ZCOUNIT_ZIZ") < 1)
		{
			units.push("ZCOUNIT_ZIZ");
		}

		if (map.getCurrentPlayer().getUnitCount("ZCOUNIT_LEVIATHAN") < 1)
		{
			units.push("ZCOUNIT_LEVIATHAN");
		}
		
		return units;
	}
    this.canBePerformed = function(action, map)
    {
        var unit = action.getTargetUnit();
        var building = action.getTargetBuilding();
        var unitLimit = map.getGameRules().getUnitLimit();
        var units = ACTION_BUILD_SUPERWEAPON.getSuperweapons(map);

        if ((unit === null) &&
            (building !== null) &&
            (units.length > 0))
		{
            var unitCount = building.getOwner().getUnitCount();
            if ((unitLimit <= 0 ||
                unitCount < unitLimit) &&
                ACTION_BUILD_SUPERWEAPON.canBuildUnits(building, map))
            {
                return true;
            }
		}
        return false;
    };
    this.getActionText = function(map)
    {
        return qsTr("Build");
    };
    this.getIcon = function(map)
    {
        return "build";
    };
    this.isFinalStep = function(action, map)
    {
        if (action.getInputStep() === 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    };


    this.perform = function(action, map)
    {
        action.startReading();
        var unitID = action.readDataString();
        var building = action.getTargetBuilding();
        var player = building.getOwner();
        var target = action.getTarget();
        var unit = map.spawnUnit(target.x, target.y, unitID, player, 0, true);
        // pay for the unit
        player.addFunds(-action.getCosts());
        map.getGameRecorder().buildUnit(player.getPlayerID(), unitID, player.getPlayerID());
        unit.setHasMoved(true);
        player.buildedUnit(unit);
        // achievements
        if (player.getBaseGameInput().getAiType() === GameEnums.AiTypes_Human)
        {
            ACHIEVEMENT_BUILD_UNIT.unitProduced(unitID);
        }
    };

    this.getStepInputType = function(action, map)
    {
        // supported types are MENU and FIELD
        if (action.getInputStep() === 0)
        {
            return "MENU";
        }
        return "";
    };

    this.canBuildUnits = function(building, map)
    {
        var player = building.getOwner();
        var units = ACTION_BUILD_SUPERWEAPON.getSuperweapons(map);
        var unitData = [];
        for (i = 0; i < units.length; i++)
        {
            var cost = player.getCosts(units[i], building.getPosition());
            unitData.push([cost, units[i]]);
        }
        var funds = player.getFunds();
        for (i = 0; i < unitData.length; i++)
        {
            if (unitData[i][0] <= funds)
            {
                return true;
            }
        }
        return false;
    };

    this.getStepData = function(action, data, map)
    {
        var building = action.getTargetBuilding();
        var units = ACTION_BUILD_SUPERWEAPON.getSuperweapons(map);

        var player = building.getOwner();
        var unitData = [];
        for (i = 0; i < units.length; i++)
        {
            var cost = player.getCosts(units[i], building.getPosition());
            unitData.push([cost, units[i]]);
        }
        if (map !== null)
        {
            // only sort for humans player to maintain ai speed
            if (player.getBaseGameInput().getAiType() === GameEnums.AiTypes_Human)
            {
                unitData = Global.sortDataArray(unitData);
            }
        }
        var funds = player.getFunds();
        for (i = 0; i < unitData.length; i++)
        {
            var name = Global[unitData[i][1]].getName();
            var enabled = false;
            if (unitData[i][0] <= funds)
            {
                enabled = true;
            }
            data.addData(name + " " + unitData[i][0].toString(), unitData[i][1], unitData[i][1], unitData[i][0], enabled);
        }
    };
}

Constructor.prototype = ACTION;
var ACTION_BUILD_SUPERWEAPON = new Constructor();
