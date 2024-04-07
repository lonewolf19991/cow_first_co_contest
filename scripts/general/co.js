CO.minaCOpower = function(co, map)
{
	//this function returns true as long as there's at least one other player using Mina's CO power. If there are two Mina players using the CO power at the same time, this should apply to everyone on the map (since both Minas should logically affect each other as well).
	var minaPower = false;
	for (var i = 0; i < map.getPlayerCount(); i++)
	{
		var player = map.getPlayer(i);
		if (player !== map.getCurrentPlayer() && player.checkAlliance(map.getCurrentPlayer()) === GameEnums.Alliance_Enemy)
		{
			var co1 = player.getCO(0);
			var co2 = player.getCO(1);
			
			if (co1 !== null && co1.getCoID() === "CO_MINA_CONTEST" && co1.getPowerMode() === GameEnums.PowerMode_Power)
			{
				minaPower = true;
				break;
			}
			if (co2 !== null && co2.getCoID() === "CO_MINA_CONTEST" && co2.getPowerMode() === GameEnums.PowerMode_Power)
			{
				minaPower = true;
				break;
			}
		}
	}
	return minaPower;
}

CO.minaSCOpower = function(map)
{
	var minaPower = false;
	for (var i = 0; i < map.getPlayerCount(); i++)
	{
		var player = map.getPlayer(i);
		if (player !== map.getCurrentPlayer() && player.checkAlliance(map.getCurrentPlayer()) === GameEnums.Alliance_Enemy)
		{
			var co1 = player.getCO(0);
			var co2 = player.getCO(1);
			
			if (co1 !== null && co1.getCoID() === "CO_MINA_CONTEST" && co1.getPowerMode() >= GameEnums.PowerMode_Superpower)
			{
				minaPower = true;
				break;
			}
			if (co2 !== null && co2.getCoID() === "CO_MINA_CONTEST" && co2.getPowerMode() >= GameEnums.PowerMode_Superpower)
			{
				minaPower = true;
				break;
			}
		}
	}
	return minaPower;
}

if (settings.getMods().indexOf("mods/Force_AW2_Rules") > -1 || settings.getMods().indexOf("mods/Force_AW2_Rules_AWBW") > -1) // if force AW2 rules is enabled
{
	CO.getStarGain = function(co, fundsDamage, x, y, hpDamage, defender, counterAttack, map)
	{
		var gamerules = map.getGameRules();
		var powerCostIncrease = gamerules.getPowerUsageReduction();
		var multiplier = 1 / (1.0 + co.getPowerUsed() * powerCostIncrease);
		var gainMode = gamerules.getPowerGainMode();
		var gainZone = gamerules.getPowerGainZone();
		var baseValue = 0;
		// select gain value
		baseValue = fundsDamage / CO.starFundsCost;
			if (!defender)
			{
				// reduce damage for attacker
				baseValue *= 0.5;
			}
		var powerGain = baseValue * multiplier;
		
		if (CO.minaCOpower(co, map))
		{
			powerGain = powerGain * 0.7;
		}
		return powerGain;
	};
}
else
{
	CO.getStarGain = function(co, fundsDamage, x, y, hpDamage, defender, counterAttack, map)
	{
		var gamerules = map.getGameRules();
		var powerCostIncrease = gamerules.getPowerUsageReduction();
		var multiplier = 1 / (1.0 + co.getPowerUsed() * powerCostIncrease);
		var gainMode = gamerules.getPowerGainMode();
		var gainZone = gamerules.getPowerGainZone();
		var baseValue = 0;
		// select gain value
		if (gainMode === GameEnums.PowerGainMode_Money)
		{
			baseValue = fundsDamage / CO.starFundsCost;
			if (!defender)
			{
				// reduce damage for attacker
				baseValue *= 0.5;
			}
		}
		else if (gainMode === GameEnums.PowerGainMode_Money_OnlyAttacker)
		{
			if (!defender)
			{
				// only charge for attacker
				baseValue = fundsDamage / CO.starFundsCost;
			}
		}
		else if (gainMode === GameEnums.PowerGainMode_Hp)
		{
			baseValue = hpDamage / CO.starHpCost;
			if (!defender)
			{
				// reduce damage for attacker
				baseValue *= 0.5;
			}
		}
		else if (gainMode === GameEnums.PowerGainMode_Hp_OnlyAttacker)
		{
			if (!defender)
			{
				// only charge for attacker
				baseValue = hpDamage / CO.starHpCost;
			}
		}
		var powerGain = baseValue * multiplier;
		if (gainZone === GameEnums.PowerGainZone_Global)
		{
			// do nothing
		}
		else if (gainZone === GameEnums.PowerGainZone_GlobalCoZoneBonus)
		{
			if (!co.inCORange(Qt.point(x, y), null))
			{
				// reduce power meter gain when not in co range
				powerGain *= 0.5;
			}
		}
		else if (gainZone === GameEnums.PowerGainZone_OnlyCoZone)
		{
			if (!co.inCORange(Qt.point(x, y), null))
			{
				// no power gain outside co-zone
				powerGain = 0;
			}
		}
		
		if (CO.minaCOpower(co, map))
		{
			powerGain = powerGain * 0.7;
		}
		return powerGain;
	};
}

CO.nadiyahCOpower = function(map)
{
	//this function returns true as long as there's at least one other player using Nadiyah's CO power.
	var nadiyahPower = false;
	for (var i = 0; i < map.getPlayerCount(); i++)
	{
		var player = map.getPlayer(i);
		if (player !== map.getCurrentPlayer() && player.checkAlliance(map.getCurrentPlayer()) === GameEnums.Alliance_Enemy)
		{
			var co1 = player.getCO(0);
			var co2 = player.getCO(1);
			
			if (co1 !== null && co1.getCoID() === "CO_NADIYAH_CONTEST" && co1.getPowerMode() === GameEnums.PowerMode_Power)
			{
				nadiyahPower = true;
				break;
			}
			if (co2 !== null && co2.getCoID() === "CO_NADIYAH_CONTEST" && co2.getPowerMode() === GameEnums.PowerMode_Power)
			{
				nadiyahPower = true;
				break;
			}
		}
	}
	return nadiyahPower;
}

// AW2 Mod Stuff
CO.starFundsCost = 9000;
CO.starHpCost = 10.0;
CO.getStarGain = function(co, fundsDamage, x, y, hpDamage, defender, counterAttack, map)
{
	var gamerules = map.getGameRules();
	var powerCostIncrease = gamerules.getPowerUsageReduction();
	var multiplier = 1 / (1.0 + co.getPowerUsed() * powerCostIncrease);
	var gainMode = gamerules.getPowerGainMode();
	var gainZone = gamerules.getPowerGainZone();
	var baseValue = 0;
	// select gain value
	baseValue = fundsDamage / CO.starFundsCost;
		if (!defender)
		{
			// reduce damage for attacker
			baseValue *= 0.5;
		}
	var powerGain = baseValue * multiplier;
	return powerGain;
};

CO.getStarCost = function(co, map)
{
	var startCost = 9000;
	if (map !== null)
	{
		var gamerules = map.getGameRules();
		var powerCostIncrease = gamerules.getPowerUsageReduction();
		var costIncrease = 1.0 + co.getPowerUsed() * powerCostIncrease;
		var gainMode = gamerules.getPowerGainMode();
		if (gainMode === GameEnums.PowerGainMode_Money ||
				gainMode === GameEnums.PowerGainMode_Money_OnlyAttacker)
		{
			startCost = costIncrease * CO.starFundsCost;
		}
		else if (gainMode === GameEnums.PowerGainMode_Hp ||
				 gainMode === GameEnums.PowerGainMode_Hp_OnlyAttacker)
		{
			startCost = costIncrease * CO.starHpCost;
		}
	}
	return startCost;
};

CO.gainPowerstar = function(co, fundsDamage, x, y, hpDamage, defender, counterAttack, map)
{
	var powerGain = CO.getStarGain(co, fundsDamage, x, y, hpDamage, defender, counterAttack, map)
	co.setPowerFilled(co.getPowerFilled() + powerGain)
};
