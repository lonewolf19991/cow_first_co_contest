WEATHER_RAIN.getVisionrangeModifier = function()
{
	return -1;
};

WEATHER_RAIN.getMovementCostModifier = function(weather, unit, terrain, map)
{
	var id = terrain.getID();
	if ((unit.getUnitType() !== GameEnums.UnitType_Air) &&
		(id === "PLAINS" ||
		 id === "PLAINS_DESTROYED" ||
		 id === "PLAINS_PLASMA" ||
		 id === "FOREST" ||
		 id === "FOREST1" ||
		 id === "FOREST2" ||
		 id === "FOREST3") &&
		terrain.getBuilding() === null)
	{
		return 1;
	}
	return 0;
};

WEATHER_RAIN.activate = function(weather, map)
{
	var animationCount = GameAnimationFactory.getAnimationCount();
	var queueAnimation = null;
	if (animationCount > 0)
	{
		queueAnimation = GameAnimationFactory.getAnimation(animationCount - 1);
	}
	var animation = GameAnimationFactory.createAnimation(map, 0, 0);
	animation.addSprite2("white_pixel", 0, 0, 3200, map.getMapWidth(), map.getMapHeight());
	animation.addTweenColor(0, "#00FFFFFF", "#FFFFFFFF", 3000, true);
	animation.setStartOfAnimationCall("ANIMATION", "preOnAnimationChangedAnimation");
	animation.setSound("rain.wav");
	var variable = weather.getVariables().createVariable("FOGMODE");
	var fogMode = map.getGameRules().getFogMode();
	variable.writeDataInt32(fogMode);
	if (queueAnimation !== null)
	{
		queueAnimation.queueAnimation(animation);
	}
};

WEATHER_RAIN.deactivate = function(weather, map)
{
	//do nothing
};