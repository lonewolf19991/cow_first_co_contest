var Constructor = function()
{
    this.init = function(co, map)
    {
        co.setPowerStars(3);
        co.setSuperpowerStars(4);
    };
	
	this.windDirectionSprites = ["", "aoi_wind+n", "aoi_wind+e", "aoi_wind+s", "aoi_wind+w"];
	
	this.startOfTurn = function(co, map)
	{
		var variables = co.getVariables();
		var windVar = variables.createVariable("Wind Direction");
		var wind = windVar.readDataInt32();
		
		if (wind !== 0)
		{
			if (wind < 4)
			{
				wind++;
			}
			else
			{
				wind = 1;
			}
			windVar.writeDataInt32(wind);
		}
		
		CO_AOI_KAZE_CONTEST.loadWindSprites(co, wind, map);
		// 1 = north, 2 = east, 3 = south, 4 = west
		var units = co.getOwner().getUnits();
		var size = units.size();
		for (var i = 0; i < size; i++)
		{
			var unit = units.at(i)
			var IUC = unit.getIgnoreUnitCollision();
			
			if (IUC && unit.getUnitID() !== "HOELLIUM")
			{
				unit.setIgnoreUnitCollision(false);
			}
		}
	};
	
	this.loadWindSprites = function(co, wind, map)
	{
		var windSpritesArray = CO_AOI_KAZE_CONTEST.windDirectionSprites;
		var windSprite = windSpritesArray[wind];
		var arrayLength = windSpritesArray.length;
		
		var color = "#FFFFFF";
		if (co.getPowerMode() !== GameEnums.PowerMode_Off)
		{
			color = "#FF6060";
		}
		
		var cornerTerrainArray = CO_AOI_KAZE_CONTEST.getCorners(map);
		var cornerTerrainArrayLength = cornerTerrainArray.length;
		
		for (var i = 0; i < cornerTerrainArrayLength; i++)
		{
			var terrain = map.getTerrain(cornerTerrainArray[i][0], cornerTerrainArray[i][1]);
			if (terrain !== null)
			{
				for (var j = 1; j < arrayLength; j++)
				{
					terrain.removeTerrainOverlay(windSpritesArray[j]);
				}
				if (windSprite !== "")
				{
					terrain.addTerrainOverlay(windSprite, cornerTerrainArray[i][2], cornerTerrainArray[i][3], color);
				}
			}
		}
	};
	
	this.getCorners = function(map)
	{
		return [[0, 0, -48, -48],
			   [map.getMapWidth() - 1, map.getMapHeight() - 1, 48, 48],
			   [0, map.getMapHeight() - 1, -48, 48],
			   [map.getMapWidth() - 1, 0, 48, -48]];
	}

	this.postBattleActions = function(co, attacker, atkDamage, defender, gotAttacked, weapon, action, map)
	{
		if (!gotAttacked && attacker.getOwner() === co.getOwner() && attacker.getBaseMaxRange() === 1)
		{
			var variables = co.getVariables();
			var windVar = variables.createVariable("Wind Direction");
			var wind = windVar.readDataInt32();
			var changeDirectionVar = variables.createVariable("Next Unit Changes Direction")
			var changeDirection = changeDirectionVar.readDataBool();
			
			if (wind === 0 || changeDirection)
			{
				var atkX = attacker.getX();
				var atkY = attacker.getY();
				var defX = defender.getX();
				var defY = defender.getY();
				var distance = Math.abs(atkX - defX) + Math.abs(atkY - defY);
				
				if (distance === 1)
				{
					if (atkX < defX)
					{
						wind = 2;
					}
					else if (atkX > defX)
					{
						wind = 4;
					}
					else if (atkY > defY)
					{
						wind = 1;
					}
					else if (atkY < defY)
					{
						wind = 3;
					}
				}
				windVar.writeDataInt32(wind);
				CO_AOI_KAZE_CONTEST.loadWindSprites(co, wind, map);
				
				changeDirectionVar.writeDataBool(false);
			}
		}
	}
	
	this.getTrueDamage = function(co, damage, attacker, atkPosX, atkPosY, attackerBaseHp,
                                  defender, defPosX, defPosY, isDefender, action, luckmode, map)
	{
		var variables = co.getVariables();
		var windVar = variables.createVariable("Wind Direction");
		var wind = windVar.readDataInt32();
		
		var damage = 15;
		if (co.getPowerMode() !== GameEnums.PowerMode_Off)
		{
			damage = 25;
		};
		switch (wind)
		{
			case 1:
			if (atkPosY > defPosY)
			{
				return damage;
			}
			break;
			case 2:
			if (atkPosX < defPosX)
			{
				return damage;
			}
			break;
			case 3:
			if (atkPosY < defPosY)
			{
				return damage;
			}
			break;
			case 4:
			if (atkPosX > defPosX)
			{
				return damage;
			}
			break;
		}
		return 0;
	}
	
	this.getMovementpointModifier = function(co, unit, posX, posY, map)
    {
        if (co.getPowerMode() >= GameEnums.PowerMode_Superpower)
        {
            return 1;
        }
        return 0;
    };
	
    this.activatePower = function(co, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);
		
		var variables = co.getVariables();
		var changeDirectionVar = variables.createVariable("Next Unit Changes Direction")
		changeDirectionVar.writeDataBool(true);
			
        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
			var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
			var delay = globals.randInt(135, 265);
			if (animations.length < 5)
			{
				delay *= i;
			}
			animation.setSound("power1.wav", 1, delay);
			if (animations.length < 5)
			{
				animation.addSprite("power1", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 1.5, delay);
				powerNameAnimation.queueAnimation(animation);
				animations.push(animation);
			}
			else
			{
				animation.addSprite("power1", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 1.5, delay);
				animations[counter].queueAnimation(animation);
				animations[counter] = animation;
				counter++;
				if (counter >= animations.length)
				{
					counter = 0;
				}
			}
        }
        units.remove();
    };

    this.activateSuperpower = function(co, powerMode, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        powerNameAnimation.queueAnimationBefore(dialogAnimation);
		
		var variables = co.getVariables();
		var changeDirectionVar = variables.createVariable("Next Unit Changes Direction")
		changeDirectionVar.writeDataBool(true);

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
			unit.setIgnoreUnitCollision(true);
			
			var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
			var delay = globals.randInt(135, 265);
			if (animations.length < 7)
			{
				delay *= i;
			}
			if (i % 2 === 0)
			{
				animation.setSound("power12_1.wav", 1, delay);
			}
			else
			{
				animation.setSound("power12_2.wav", 1, delay);
			}
			if (animations.length < 7)
			{
				animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 2, delay);
				powerNameAnimation.queueAnimation(animation);
				animations.push(animation);
			}
			else
			{
				animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 2, delay);
				animations[counter].queueAnimation(animation);
				animations[counter] = animation;
				counter++;
				if (counter >= animations.length)
				{
					counter = 0;
				}
			}
        }
        units.remove();
    };
	
	this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckMode, map)
    {
		var ret = 0;
		if (co.getPowerMode() !== GameEnums.PowerMode_Off)
		{
			ret += 10;
		}
		return ret;
    };
	
	this.postAction = function(co, action, map)
    {
		if (co.getPowerMode() >= GameEnums.PowerMode_Superpower)
		{
			var damage = 1;
			var path = action.getMovePath();
			
			for (var i = 0; i < path.length; ++i)
			{
				var pos = path[i];
				
				var animation = GameAnimationFactory.createAnimation(map, pos.x, pos.y);
				var delay = (50 * path.length) - (50 * i);
				animation.addSprite("stealth", -map.getImageSize() / 2, -map.getImageSize() / 2, 0, 2, delay);
				animation.setSound("power1.wav", 1, delay);
				
				var eUnit = map.getTerrain(pos.x, pos.y).getUnit();
				
				if (eUnit !== null && eUnit.getOwner().isAlly(co.getOwner()) === false)
				{
					animation.writeDataInt32(eUnit.getX());
                    animation.writeDataInt32(eUnit.getY());
                    animation.writeDataInt32(1);
                    animation.setEndOfAnimationCall("CO_AOI_KAZE_CONTEST", "postAnimationDamage");
				}
			}
        }
    };

    this.postAnimationDamage = function(postAnimation, map)
    {
        postAnimation.seekBuffer();
        var x = postAnimation.readDataInt32();
        var y = postAnimation.readDataInt32();
        var damage = postAnimation.readDataInt32();
        if (map.onMap(x, y))
        {
            var unit = map.getTerrain(x, y).getUnit();
            if (unit !== null)
            {
                var hp = unit.getHpRounded();
                if (hp <= damage)
                {
                    // set hp to very very low
                    unit.setHp(0.1);
                }
                else
                {
                    unit.setHp(hp - damage);
                }
            }
        }
    };
	
    this.loadCOMusic = function(co, map)
    {
		if (co.getPowerMode() >= GameEnums.PowerMode_Superpower)
		{
			var units = co.getOwner().getUnits();
			var size = units.size();
			
			for (var i = 0; i < size; i++)
			{
				var unit = units.at(i);
				unit.setIgnoreUnitCollision(true);
			}
		}// hacky workaround to restore the ability to pass through units when reloading from a save.
		
        // put the co music in here.
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Power:
                audio.addMusic("resources/music/cos/power.mp3", 992, 45321);
                break;
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("resources/music/cos/superpower.mp3", 1505, 49515);
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("resources/music/cos/tagpower.mp3", 14611, 65538);
                break;
            default:
                audio.addMusic("mods/cow_first_co_contest/music/cos/aoi_kaze.mp3");
                break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 0;
    };
    this.getCOArmy = function()
    {
        return "YC";
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("A kunoichi from Yellow Comet. Sweet and ladylike during the day, but a cold, ruthless assassin at night who couldn't care less about \"moral codes\".");
    };
    this.getHits = function(co)
    {
        return qsTr("Moonlit nights");
    };
    this.getMiss = function(co)
    {
        return qsTr("Honor codes");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Attacking in a specific direction (which changes every turn), grants a fixed 15% damage boost that ignores unit type and health. \n\nHer first ever DIRECT attack of the match deals no extra damage, but it starts the \"wind\" in that direction. This wind then rotates 90 degrees clockwise every turn.");
    };
	this.currentWindDescription = ["None", "North", "East", "South", "West"];
	this.getLongCODescription = function(co, map)
    {
		var variables = co.getVariables();
		var currentWindVar = variables.createVariable("Wind Direction");
		var currentWind = currentWindVar.readDataInt32();
		
        return qsTr("\nCurrent Wind Direction: "+ CO_AOI_KAZE_CONTEST.currentWindDescription[currentWind]);
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("The next direct unit to attack changes the wind direction to the attack direction. Fixed bonus damage is now 25%.");
	};
    this.getPowerName = function(co)
    {
        return qsTr("Night Breeze");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Both effects from Night Breeze apply. All units receive +1 Movement and can pass through enemies. Enemies take 1 HP splash damage each time they're passed through.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Blood Gust");
    };
    this.getPowerSentences = function(co)
    {
		if (co.getPowerMode() >= GameEnums.PowerMode_Superpower)
		{
			return [qsTr("The bushido will not hold me back! Let's take the enemy by storm!"),
			        qsTr("When the night falls, we'll blow right through them!")];
		}
        return [qsTr("May the wind guide me to victory tonight!"),
		        qsTr("The wind direction is in our favor. It's now or never!")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("Fate has it that I would emerge victorious!"),
		        qsTr("I fight not for honor, but to win!")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Doesn't seem like fate looked upon me favorably today..."),
		        qsTr("Watch out for windy days, for that's when I'll return!")];
    };
    this.getName = function()
    {
        return qsTr("Aoi Kaze");
    };
}

Constructor.prototype = CO;
var CO_AOI_KAZE_CONTEST = new Constructor();
