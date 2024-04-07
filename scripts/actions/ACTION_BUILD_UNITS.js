ACTION_BUILD_UNITS.getStepData = function(action, data, map)
{
	var building = action.getTargetBuilding();
	var units = building.getConstructionList();
	var unitData = [];
	for (i = 0; i < units.length; i++)
	{
		var cost = map.getCurrentPlayer().getCosts(units[i], building.getPosition());
		if (!Global[units[i]].getCOSpecificUnit(building))
		{
			unitData.push([cost, units[i]]);
		}
	}
	if (map !== null)
	{
		// only sort for humans player to maintain ai speed
		if (map.getCurrentPlayer().getBaseGameInput().getAiType() === GameEnums.AiTypes_Human)
		{
			unitData = Global.sortDataArray(unitData);
		}
	}
	var funds = map.getCurrentPlayer().getFunds();
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

ACTION_BUILD_UNITS.canBePerformed = function(action, map)
{
	var unit = action.getTargetUnit();
	var building = action.getTargetBuilding();
	var unitLimit = 50;
	var units = building.getConstructionList();
	if ((unit === null) &&
		(building !== null) &&
		(units.length > 0))
	{
		var unitCount = building.getOwner().getUnitCount();
		if ((unitLimit <= 0 ||
			unitCount < unitLimit) &&
			ACTION_BUILD_UNITS.canBuildUnits(building, map))
		{
			return true;
		}
	}
	return false;
};