ACTION_FIRE.getActionText = function(map)
{
	var player = map.getCurrentPlayer();
	var co1 = player.getCO(0);
	var co2 = player.getCO(1);
	var bonus = "";


	if (co1 !== null && co1.getCoID() === "CO_HARBINGER_CONTEST")
	{
		var variables = co1.getVariables();
		var firepowerBonusVar = variables.createVariable("Firepower Bonus");
		var firepowerBonus = firepowerBonusVar.readDataInt32();
		var defenseBonusVar = variables.createVariable("Defense Bonus");
		var defenseBonus = defenseBonusVar.readDataInt32();
		var totalFirepower = firepowerBonus +110;
		var totalDefense = defenseBonus +80; 


		var bonus = " (" +totalFirepower+ "%Atk/ "+totalDefense+"%Def)";
	
	
	}
	else if(co2 !== null && co2.getCoID() === "CO_HARBINGER_CONTEST")
	{
		var variables = co2.getVariables();
		var firepowerBonusVar = variables.createVariable("Firepower Bonus");
		var firepowerBonus = firepowerBonusVar.readDataInt32();
		var defenseBonusVar = variables.createVariable("Defense Bonus");
		var defenseBonus = defenseBonusVar.readDataInt32();
		var totalFirepower = firepowerBonus +110;
		var totalDefense = defenseBonus +80; 


		var bonus = " (" +totalFirepower+ "%Atk/ "+totalDefense+"%Def)";
	

	}

	
	else if (co1 !== null && co1.getCoID() === "CO_CADENZA_CONTEST")
	{
		var variables = co1.getVariables();
		var currentAttackVar = variables.createVariable("Current Attack");
		var currentAttack = currentAttackVar.readDataInt32();
		var offset = 0;
		
		if (co1.getPowerMode() !== GameEnums.PowerMode_Off && currentAttack <= 3)
		{
			offset += 4;
		}
		var bonus = " (" + CO_CADENZA_CONTEST.currentAttackDescription[currentAttack + offset] + " Atk)";
	}
	else if (co2 !== null && co2.getCoID() === "CO_CADENZA_CONTEST")
	{
		var variables = co2.getVariables();
		var currentAttackVar = variables.createVariable("Current Attack");
		var currentAttack = currentAttackVar.readDataInt32();
		var offset = 0;
		
		if (co2.getPowerMode() !== GameEnums.PowerMode_Off && currentAttack <= 3)
		{
			offset += 4;
		}
		var bonus = " (" + CO_CADENZA_CONTEST.currentAttackDescription[currentAttack + offset] + " Atk)";
	}
	return qsTr("Fire" + bonus);
};

ACTION_FIRE.isRalphUsingSCOP = function(unit, x, y, actionTargetField)
{
	if (unit.getBaseMaxRange() === 1)
	{
		var owner = unit.getOwner();
		var co1 = owner.getCO(0);
		var co2 = owner.getCO(1);
		var scop = false;
		if (co1 !== null && co1.getCoID() === "CO_RALPH_CONTEST" && co1.getPowerMode() >= GameEnums.PowerMode_Superpower)
		{
			scop = true;
		}
		else if (co2 !== null && co2.getCoID() === "CO_RALPH_CONTEST" && co2.getPowerMode() >= GameEnums.PowerMode_Superpower)
		{
			scop = true;
		}
		
		if (scop)
		{
			var distance = Math.abs(x - actionTargetField.x) + Math.abs(y - actionTargetField.y);
			if (distance > 1 && actionTargetField.x !== x && actionTargetField.y !== y)
			{
				return true;
			}
		}
	}
	return false;
}
	
ACTION_FIRE.getStepData = function(action, data, map)
{
	var unit = action.getTargetUnit();
	var targetField = action.getTarget();
	var actionTargetField = action.getActionTarget();
	var minRange = unit.getMinRange(actionTargetField);
	var fields = globals.getCircle(minRange, unit.getMaxRange(actionTargetField));
	if (unit.hasDirectWeapon() && minRange > 1)
	{
		var minFields = globals.getCircle(1, 1);
		var size = minFields.size();
		for (var i = 0; i < size; ++i)
		{
			fields.append(minFields.at(i))
		}
		minFields.remove();
	}

	data.setColor("#FFFF0000");
	data.setZLabelColor("#ff4500");
	data.setZLabelText(qsTr("Damage"))
	data.setShowZData(true);
	var aiType = map.getCurrentPlayer().getBaseGameInput().getAiType();
	var detailedForecast = settings.getShowDetailedBattleForcast();
	var result = Qt.rect(-1, -1, -1, -1);
	var owner = unit.getOwner();
	// check all fields we can attack
	var size = fields.size();
	for (var i = 0; i < size; i++)
	{
		var field = fields.at(i)
		var x = field.x + actionTargetField.x;
		var y = field.y + actionTargetField.y;
		// generally attacks on shrouded fields are forbidden
		if (map.onMap(x, y) && owner.getFieldVisibleType(x, y) !== GameEnums.VisionType_Shrouded)
		{
			if (ACTION_FIRE.isRalphUsingSCOP(unit, x, y, actionTargetField) === false)
			{
				if ((aiType === GameEnums.AiTypes_Human || aiType === GameEnums.AiTypes_MovePlanner) && detailedForecast)
				{
					var defUnit = map.getTerrain(x, y).getUnit();
					if (defUnit !== null)
					{
						var resultNoLuckDmg = ACTION_FIRE.calcBattleDamage4(map, action, unit, 0,
																			actionTargetField.x, actionTargetField.y, null, x, y, 0,
																			GameEnums.LuckDamageMode_Off, GameEnums.LuckDamageMode_Off);
						if (resultNoLuckDmg.x >= 0.0)
						{
							var resultMaxDmg = ACTION_FIRE.calcBattleDamage4(map, action, unit, 0,
																			 actionTargetField.x, actionTargetField.y, null, x, y, 0,
																			 GameEnums.LuckDamageMode_Max, GameEnums.LuckDamageMode_Min);
							var resultMinDmg = ACTION_FIRE.calcBattleDamage4(map, action, unit, 0,
																			 actionTargetField.x, actionTargetField.y, null, x, y, 0,
																			 GameEnums.LuckDamageMode_Min, GameEnums.LuckDamageMode_Max);

							var names       = [qsTr("Dmg"),             qsTr("Min"),        qsTr("Max")];
							var ownData     = [resultNoLuckDmg.x,       resultMinDmg.x,     resultMaxDmg.x];
							var enemyData   = [resultNoLuckDmg.width,   resultMaxDmg.width, resultMinDmg.width];
							data.addPoint(Qt.point(x, y));
							data.addComplexZInformation(names, ownData, enemyData, defUnit.getOwner().getColor());
						}
					}
					else
					{
						result = ACTION_FIRE.calcBattleDamage(map, action, x, y, GameEnums.LuckDamageMode_Off);
						if (result.x >= 0.0)
						{
							data.addPoint(Qt.point(x, y));
							data.addZInformation(result.x);
						}
					}
				}
				else
				{
					if ((aiType === GameEnums.AiTypes_Human ||
						 aiType === GameEnums.AiTypes_MovePlanner))
					{
						result = ACTION_FIRE.calcBattleDamage4(map, action, unit, 0,
																   actionTargetField.x, actionTargetField.y, null, x, y, 0,
																   GameEnums.LuckDamageMode_Off, GameEnums.LuckDamageMode_Off);
					}
					else
					{
						result = ACTION_FIRE.calcBattleDamage4(map, action, unit, 0,
															   actionTargetField.x, actionTargetField.y, null, x, y, 0,
															   GameEnums.LuckDamageMode_Off, GameEnums.LuckDamageMode_Off,
															   false, true);
					}
					if (result.x >= 0.0)
					{
						data.addPoint(Qt.point(x, y));
						data.addZInformation(result.x);
					}
				}
			}
		}
	}
	fields.remove();
};
	
ACTION_FIRE.canBePerformed = function(action, map)
{
	var unit = action.getTargetUnit();
	var actionTargetField = action.getActionTarget();
	var targetField = action.getTarget();
	if ((unit.getHasMoved() === true) ||
			(unit.getBaseMovementCosts(actionTargetField.x, actionTargetField.y) <= 0))
	{
		return false;
	}
	var ret = false;
	// are we allowed to attack from this field?
	if (((actionTargetField.x === targetField.x) && (actionTargetField.y === targetField.y)) ||
		((action.getMovementTarget() === null) && unit.canMoveAndFire(targetField)) && (CO.nadiyahCOpower(map) === false))
	{
		var minRange = unit.getMinRange(actionTargetField);
		var fields = globals.getCircle(minRange, unit.getMaxRange(actionTargetField));
		if (unit.hasDirectWeapon() && minRange > 1)
		{
			var minFields = globals.getCircle(1, 1);
			var size = minFields.size();
			for (var i = 0; i < size; ++i)
			{
				fields.append(minFields.at(i))
			}
			minFields.remove();
		}

		// check all fields we can attack
		var size = fields.size();
		for (var i = 0; i < size; i++)
		{
			var field = fields.at(i);
			var x = field.x + actionTargetField.x;
			var y = field.y + actionTargetField.y;
			if (unit.getOwner().getFieldVisibleType(x, y) !== GameEnums.VisionType_Shrouded)
			{
				if (ACTION_FIRE.isRalphUsingSCOP(unit, x, y, actionTargetField) === false)
				{
					// check with which weapon we can attack and if we could deal damage with this weapon
					if (map.onMap(x, y))
					{
						var defTerrain = map.getTerrain(x, y);
						var defBuilding = defTerrain.getBuilding();
						var defUnit = defTerrain.getUnit();
						if (defUnit !== null)
						{
							if (unit.isAttackableFromPosition(defUnit, actionTargetField))
							{
								ret = true
								break;
							}
						}
						if (((defBuilding !== null) && (defBuilding.getHp() > 0) &&
							 (defBuilding.getIsAttackable(x, y) && unit.getOwner().isEnemy(defBuilding.getOwner()))) ||
								(defTerrain.getHp() > 0))
						{
							if (unit.hasAmmo1() && unit.getWeapon1ID() !== "" &&
									unit.canAttackWithWeapon(0, actionTargetField.x, actionTargetField.y, x, y))
							{
								if (Global[unit.getWeapon1ID()].getEnviromentDamage(defTerrain.getID()) > 0)
								{
									ret = true
									break;
								}
							}
							if (unit.hasAmmo2() && unit.getWeapon2ID() !== "" &&
									unit.canAttackWithWeapon(1, actionTargetField.x, actionTargetField.y, x, y))
							{
								if (Global[unit.getWeapon2ID()].getEnviromentDamage(defTerrain.getID()) > 0)
								{
									ret = true
									break;
								}
							}
						}
					}
				}
			}
		}
		fields.remove();
	}
	return ret;
};