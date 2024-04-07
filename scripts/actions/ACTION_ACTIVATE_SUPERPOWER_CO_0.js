ACTION_ACTIVATE_SUPERPOWER_CO_0.canBePerformed = function(action, map)
    {
	    if (CO.minaSCOpower(map))
		{
		    return false;
		}
		
        var co = map.getCurrentPlayer().getCO(0);
        if ((co !== null) && co.canUseSuperpower())
        {
            return true;
        }
        else
        {
            return false;
        }
    };