ACTION_ACTIVATE_POWER_CO_0.canBePerformed = function(action, map)
    {
	    if (CO.minaSCOpower(map))
		{
		    return false;
		}
		
        var co = map.getCurrentPlayer().getCO(0);
        if ((co !== null) && co.canUsePower())
        {
            return true;
        }
        else
        {
            return false;
        }
    };