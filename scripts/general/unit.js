UNIT.transporterRefilling = function (unit)
{
    // carrier refilling and unmoving is done here
    for (var i = 0; i < unit.getLoadedUnitCount(); i++)
    {
        var transportUnit = unit.getLoadedUnit(i);
        transportUnit.refill();
    }
};


UNIT.moveUnit= function(unit,action,map)
{
    unit.moveUnitAction(action);
}

UNIT.canAttackStealthedUnit = function(attacker, defender, map)
    {
        var attackerType = attacker.getUnitType();
        attackerType = UNIT.unitTypeToGround(attackerType);
        var defenderType = defender.getUnitType();
        defenderType = UNIT.unitTypeToGround(defenderType);
        if (attacker.getBaseMaxRange() === 1)
        {
            if (attackerType === defenderType)
            {
                return true;
            }
        }
        if (defender.getCloaked() && !defender.getHidden())
        {
            return true;
        }
        return false;
    };
