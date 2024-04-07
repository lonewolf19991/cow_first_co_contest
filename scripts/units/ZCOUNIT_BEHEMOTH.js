var Constructor = function()
{
    this.init = function(unit)
    {
        unit.setAmmo1(5);
        unit.setMaxAmmo1(5);
        unit.setWeapon1ID("WEAPON_BEHEMOTH_GUN");

        unit.setAmmo2(10);
        unit.setMaxAmmo2(10);
        unit.setWeapon2ID("WEAPON_BEHEMOTH_MG");

        unit.setFuel(50);
        unit.setMaxFuel(50);
        unit.setBaseMovementPoints(5);
        unit.setMinRange(1);
        unit.setMaxRange(1);
        unit.setVision(2);
    };
    this.getBaseCost = function()
    {
        return 20000;
    };
	this.postBattleActions = function(unit, damage, otherUnit, gotAttacked, weapon, action, map)
    {
		var owner = unit.getOwner();
		if (!gotAttacked)
		{
			var fields = globals.getCircle(1, 1)
			var size = fields.size();
			var uX = unit.getX();
			var uY = unit.getY();
			var defX = otherUnit.getX();
			var defY = otherUnit.getY();
			var distance = Math.abs(uX - defX) + Math.abs(uY - defY);
			
			if (distance === 1)
			{
				for (var i = 0; i < size; i++)
				{
					var x = fields.at(i).x + defX;
					var y = fields.at(i).y + defY;
					if (map.onMap(x, y))
					{
						var adjacentUnit = map.getTerrain(x,y).getUnit();
						if (adjacentUnit !== null && unit.getOwner().isEnemyUnit(adjacentUnit))
						{
							var hp = adjacentUnit.getHp();
							if (hp > 2)
							{
								adjacentUnit.setHp(hp - 2);	
							}
							else if (hp > 0)
							{
								adjacentUnit.setHp(0.1);
							}
						}
					}
				}
			}
			fields.remove();			
		}
    }
    
    this.loadSprites = function(unit)
    {
        unit.loadSpriteV2("megatank+mask", GameEnums.Recoloring_Matrix);
    };
    this.doWalkingAnimation = function(action, map)
    {
        var unit = action.getTargetUnit();
        var animation = GameAnimationFactory.createWalkingAnimation(map, unit, action);
        var unitID = unit.getUnitID().toLowerCase();
        animation.loadSpriteV2("megatank" + "+walk+mask", GameEnums.Recoloring_Matrix, 1);
        animation.setSound("moveheavytank.wav", -2);
        return animation;
    };
    this.getMovementType = function()
    {
        return "MOVE_TANK";
    };
    this.getName = function()
    {
        return qsTr("Behemoth");
    };
    this.canMoveAndFire = function()
    {
        return true;
    };
    this.getDescription = function()
    {
        return qsTr("Gina's Superweapon unit - rules the domain of Land. Powerful cannon deals splash damage to enemy units around the target.");
    };
    this.getUnitType = function()
    {
        return GameEnums.UnitType_Ground;
    };
}

Constructor.prototype = UNIT;
var ZCOUNIT_BEHEMOTH = new Constructor();
