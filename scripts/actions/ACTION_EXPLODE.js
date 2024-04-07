ACTION_EXPLODE.performPostAnimation = function(postAnimation, map)
{
	var owner = ACTION_EXPLODE.postAnimationUnit.getOwner();
	var x = ACTION_EXPLODE.postAnimationTargetX;
	var y = ACTION_EXPLODE.postAnimationTargetY;
	var fields = globals.getCircle(1, 2);
	var size = fields.size();
	for (var i = 0; i < size; i++)
	{
		var point = fields.at(i);
		if (map.onMap(x + point.x, y + point.y))
		{
			var terrain = map.getTerrain(x + point.x, y + point.y);
			var unit = terrain.getUnit();
			if (unit !== null)
			{
				unit.setHp(unit.getHpRounded() - 5);
				if (unit.getHp() <= 0)
				{
					unit.setHp(0.1); //edited so Black Bombs don't kill.
				}
			}                
		}
	}
	fields.remove();
	var animation = GameAnimationFactory.createAnimation(map, x - 2, y - 3);
	animation.addSprite("explosion+black_bomb", 0, map.getImageSize() / 2, 0, 1.875);
	animation.setSound("explosion+land.wav");
	// we destroyed a unit
	map.getGameRecorder().destroyedUnit(owner.getPlayerID(), ACTION_EXPLODE.postAnimationUnit.getUnitID(), ACTION_EXPLODE.postAnimationUnit.getOwner().getPlayerID());
	ACTION_EXPLODE.postAnimationUnit.killUnit();
	ACTION_EXPLODE.postAnimationUnit.killUnit();
	ACTION_EXPLODE.postAnimationUnit = null;
	ACTION_EXPLODE.postAnimationTargetX = -1;
	ACTION_EXPLODE.postAnimationTargetY = -1;
};