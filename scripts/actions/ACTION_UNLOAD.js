ACTION_UNLOAD.canBePerformed = function(action, map)
    {
        var unit = action.getTargetUnit();
        var actionTargetField = action.getActionTarget();
        var targetField = action.getTarget();
        var transportTerrain = map.getTerrain(actionTargetField.x, actionTargetField.y);
        if (unit.getBaseMovementCosts(actionTargetField.x, actionTargetField.y) <= 0)
        {
            return false;
        }


        if (ACTION_UNLOAD.isUnloadTerrain(unit, transportTerrain, map) &&
            (actionTargetField.x === targetField.x) && (actionTargetField.y === targetField.y) ||
            (action.getMovementTarget() === null))
        {
            var size = unit.getLoadedUnitCount();
            for (var i = 0; i < size; i++)
            {
                if (ACTION_UNLOAD.getUnloadFields(action, i, map).length > 0)
                {
                    return true;
                }
            }
        }
        return false;

    };
	
ACTION_UNLOAD.perform = function(action, map)
    {
        // we need to move the unit to the target position
        ACTION_UNLOAD.postAnimationUnit = action.getTargetUnit();
        var animation = Global[ACTION_UNLOAD.postAnimationUnit.getUnitID()].doWalkingAnimation(action, map);
        animation.setEndOfAnimationCall("ACTION_UNLOAD", "performPostAnimation");
        // move unit to target position
        ACTION_UNLOAD.postAnimationUnit.moveUnitAction(action);
        // disable unit commandments for this turn
		var path = action.getMovePath();
		if (path.length > 0)
		{
			ACTION_UNLOAD.postAnimationUnit.setHasMoved(true);
		}
        action.startReading();
        var step = action.getInputStep();
        for (var i = 0; i < step; i += 2)
        {
            var dataString = action.readDataString();
            if (i === step - 1)
            {
            }
            else
            {
                var x = action.readDataInt32();
                var y = action.readDataInt32();
                ACTION_UNLOAD.postAnimationTransportUnits.push(ACTION_UNLOAD.postAnimationUnit.getLoadedUnit(parseInt(dataString)));
                ACTION_UNLOAD.postAnimationTransportUnitsPosX.push(x);
                ACTION_UNLOAD.postAnimationTransportUnitsPosY.push(y);
            }
        }
    };