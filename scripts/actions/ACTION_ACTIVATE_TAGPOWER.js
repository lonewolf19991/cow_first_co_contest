ACTION_ACTIVATE_TAGPOWER.canBePerformed = function(action, map)
    {
		if (CO.minaSCOpower(map))
		{
		    return false;
		}
		
        var player = map.getCurrentPlayer();
        var co0 = player.getCO(0);
        var co1 = player.getCO(1);
        if ((co0 !== null) && co0.canUseSuperpower() &&
            (co1 !== null) && co1.canUseSuperpower())
        {
            return true;
        }
        return false;
    };