var Constructor = function()
{
    this.canBePerformed = function(action, map)
    {
        var unit = action.getTargetUnit();
        var actionTargetField = action.getActionTarget();
        var targetField = action.getTarget();
        if ((unit.getHasMoved() === true) ||
            (unit.getBaseMovementCosts(actionTargetField.x, actionTargetField.y) <= 0))
        {
            return false;
        }
        if ((actionTargetField.x === targetField.x && actionTargetField.y === targetField.y) &&
		    ACTION_LEVIATHAN_TELEPORT.getTeleportFields(action, map).length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    };
	
	this.seaTiles = ["SEA", "REAF", "ROUGH_SEA", "FOG", "LAKE", "RIVER", "BEACH", "BRIDGE", "BRIDGE1", "BRIDGE2"];
	this.seaBuildings = ["HARBOUR", "OILRIG", "TEMPORARY_HARBOUR"];
	//Not sure what counts as a water tile in this case and what doesn't, so feel free to edit.
	
    this.getTeleportFields = function(action, map)
    {
        var unit = action.getTargetUnit();
		var player = unit.getOwner();
		var warpLocations = [];
		
		var mapWidth = map.getMapWidth();
		var mapHeight = map.getMapHeight();
		
        for (var j = 0; j < mapHeight; j++)
        {
			for (var i = 0; i < mapWidth; i++)
			{
				var terrain = map.getTerrain(i,j);
				var building = terrain.getBuilding();
				var eUnit = terrain.getUnit();
				if (eUnit === null)
				{
					if ((ACTION_LEVIATHAN_TELEPORT.seaTiles.indexOf(terrain.getTerrainID()) > -1 && unit.canMoveOver(i, j)) ||
						(building !== null && ACTION_LEVIATHAN_TELEPORT.seaBuildings.indexOf(building.getBuildingID()) > -1 && unit.canMoveOver(i, j)) ||
						(building !== null && building.getOwner() === player && building.getBuildingID() === "TOWN"))
					{
						warpLocations.push(Qt.point(i,j));
					}	
				}
			}
        }
        return warpLocations;
    };

    this.getActionText = function()
    {
        return qsTr("Teleport");
    };
    this.getIcon = function()
    {
        return "swap";
    };
	
    this.isFinalStep = function(action, map)
    {
        if (action.getInputStep() === 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    this.getStepInputType = function(action, map)
    {
        return "FIELD";
    };

    this.getStepData = function(action, data, map)
    {
        var fields = ACTION_LEVIATHAN_TELEPORT.getTeleportFields(action, map);
        data.setColor("#0000FF");
        // check all fields we can attack
        for (var i = 0; i < fields.length; i++)
        {
            data.addPoint(fields[i]);
        }
    };

    this.postAnimationUnit = null;
    this.postAnimationDestX = -1;
    this.postAnimationDestY = -1;
    this.perform = function(action, map)
    {
        // we need to move the unit to the target position
        var unit = action.getTargetUnit();
        var animation = Global[unit.getUnitID()].doWalkingAnimation(action, map);
        animation.setEndOfAnimationCall("ACTION_LEVIATHAN_TELEPORT", "performPostAnimation");
        // move unit to target position
        unit.moveUnitAction(action);
        // disable unit commandments for this turn
        unit.setHasMoved(true);
		
		action.startReading();
        // read action data
        ACTION_LEVIATHAN_TELEPORT.postAnimationDestX = action.readDataInt32();
        ACTION_LEVIATHAN_TELEPORT.postAnimationDestY = action.readDataInt32();
        ACTION_LEVIATHAN_TELEPORT.postAnimationUnit = unit;
		
    };
    this.performPostAnimation = function(postAnimation, map)
    {
		var unit = ACTION_LEVIATHAN_TELEPORT.postAnimationUnit;
		var destX = ACTION_LEVIATHAN_TELEPORT.postAnimationDestX;
		var destY = ACTION_LEVIATHAN_TELEPORT.postAnimationDestY;
		var warpAnimation1 = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
		warpAnimation1.addSprite("dive", -map.getImageSize() / 2, -map.getImageSize() / 2, 0, 2, 0);
		var warpAnimation2 = GameAnimationFactory.createAnimation(map, destX, destY);
		warpAnimation2.addSprite("dive", -map.getImageSize() / 2, -map.getImageSize() / 2, 0, 2, 30);
		warpAnimation1.addSound("dive.wav", 1, 0);
        unit.moveUnitToField(destX, destY);
		
		ACTION_LEVIATHAN_TELEPORT.postAnimationUnit = null;
        ACTION_LEVIATHAN_TELEPORT.postAnimationDestX = -1;
        ACTION_LEVIATHAN_TELEPORT.postAnimationDestY = -1;
    };
}

Constructor.prototype = ACTION;
var ACTION_LEVIATHAN_TELEPORT = new Constructor();
