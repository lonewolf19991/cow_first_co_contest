PLAYER.startOfTurn = function(player, map)
{
	PLAYER.resetCadenzaSequence(map);
}

PLAYER.resetCadenzaSequence = function(map)
{
	for (var i = 0; i < map.getPlayerCount(); i++)
	{
		var player = map.getPlayer(i);
        var co1 = player.getCO(0);
		var co2 = player.getCO(1);
		
		if (co1 !== null && co1.getCoID() === "CO_CADENZA_CONTEST")
		{
			var variables = co1.getVariables();
			var currentAttackVar = variables.createVariable("Current Attack");
			currentAttackVar.writeDataInt32(0);
		}
		if (co2 !== null && co2.getCoID() === "CO_CADENZA_CONTEST")
		{
			var variables = co2.getVariables();
			var currentAttackVar = variables.createVariable("Current Attack");
			currentAttackVar.writeDataInt32(0);
		}
	}
}

//This reset Cadenza's sequence at the start of every player's turn. The reason I'm doing this here instead of her own startOfTurn function, is because the latter only resets at the start of HER turn, and not everyone else's.