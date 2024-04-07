var Constructor = function()
{
    this.init = function(co, map)
    {
        co.setPowerStars(5);
        co.setSuperpowerStars(3);
    };
	
	this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    }
	
	
	
	this.getFirstStrike = function(co, unit, posX, posY, attacker, isDefender, map, atkPosX, atkPosY)
    {
		var terrainStars = map.getTerrain(posX, posY).getDefense(unit);
		var enemyTerrainStars = map.getTerrain(atkPosX, atkPosY).getDefense(attacker);
		if (terrainStars > enemyTerrainStars)
		{
			return true;
		};
		return false;
	};
	
	
	this.postBattleActions = function(co, attacker, atkDamage, defender, gotAttacked, weapon, action, map)
	{
		if (gotAttacked && attacker.getOwner() === co.getOwner())
		{
			var atkPosX = attacker.getX();
			var atkPosY = attacker.getY();
			var defPosX = defender.getX();
			var defPosY = defender.getY();
			
			var terrainStars = map.getTerrain(atkPosX, atkPosY).getDefense(attacker);
			var enemyTerrainStars = map.getTerrain(defPosX, defPosY).getDefense(defender);
			if (terrainStars > enemyTerrainStars)
			{
				if (weapon === 0)
				{
					if (attacker.hasAmmo1())
					{
						var ammo1 = attacker.getAmmo1();
						attacker.setAmmo1(ammo1 - 1);
					}
				}
				else
				{
					if (attacker.hasAmmo2())
					{
						var ammo2 = attacker.getAmmo2();
						attacker.setAmmo2(ammo2 - 1);
					}
				}
			};
			
		};
		if (co.getPowerMode() >= GameEnums.PowerMode_Superpower)
		{
           
			if (!gotAttacked && defender.getOwner() === co.getOwner() && defender.getHp() <= 0)
			{
				defender.setHp(1);
				var variables = defender.getVariables();
				var delayedDeathVar = variables.createVariable("Delayed Death");
				var delayedDeath = delayedDeathVar.writeDataBool(true);
				var playerId = defender.getOwner().getPlayerID();
				defender.loadIcon("delayed_death", map.getImageSize() / 2, map.getImageSize() / 2, 1, playerId)
			}
           
          
		}
	};
	
	
   this.endOfTurn = function(co, map)
	{
		var units = co.getOwner().getUnits();
		var size = units.size();
		for (var i = 0; i < size; i++)
		{
			var unit = units.at(i);
			var variables = unit.getVariables();
			var delayedDeathVar = variables.createVariable("Delayed Death");
			var delayedDeath = delayedDeathVar.readDataBool();
			
			if (delayedDeath)
			{
				unit.killUnit();
			}
		}
	};
	
    this.activatePower = function(co, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

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

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);
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
	
	this.getAttackHpBonus = function(co, unit, posX, posY)
	{
		if (co.getPowerMode() >= GameEnums.PowerMode_Superpower)
		{
			return 10 - unit.getHpRounded();
		}
		return 0;
	};

    this.loadCOMusic = function(co, map)
    {
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
                audio.addMusic("mods/cow_first_co_contest/music/cos/nadiyah.mp3");
                break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 0;
    };
    this.getCOArmy = function()
    {
        return "BM";
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("Nadiyah would have faded into obscurity had Blue Moon not invaded her home country all those years ago. A capable, defense-oriented Commanding Officer serving with great distinction.");
    };
    this.getHits = function(co)
    {
        return qsTr("Peace");
    };
    this.getMiss = function(co)
    {
        return qsTr("War");
    };
    this.getCODescription = function(co)
    {
        return qsTr("If Nadiyah's units occupy a tile that provides more defense than a tile from which an enemy is attacking from, Nadiyah's units counterattack first. This costs an additional ammo per use.");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Enemy units may only move or attack this turn, not both.");
	};
    this.getPowerName = function(co)
    {
        return qsTr("Cruel Ultimatum");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Units this turn attacks as if they were full health regardless of their health. Units that would die to counterattacks from the enemy instead delay their deaths until the end of the turn.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Heroic Surge");
    };
    this.getPowerSentences = function(co)
    {
		if (co.getPowerMode() >= GameEnums.PowerMode_Superpower)
		{
			return [qsTr("Dirt cleans off a lot easier than blood."), qsTr("The true soldiers fight not because of what's in front of them, but because they love what's behind them.")]; 
		}
        return [qsTr("Artillery, the last argument of Officers."), qsTr("We must greet those who enter our homeland")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("Only the dead have seen the end of war.")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Pull back, this salient is lost!")];
    };
    this.getName = function()
    {
        return qsTr("Nadiyah");
    };
}

Constructor.prototype = CO;
var CO_NADIYAH_CONTEST = new Constructor();
