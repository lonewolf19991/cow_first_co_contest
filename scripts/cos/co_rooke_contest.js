	var Constructor = function()
{
    this.init = function(co, map)
    {
        co.setPowerStars(2);
        co.setSuperpowerStars(5);
    };
	
	this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    };
	
	this.onUnitDeath = function(co, unit, map)
    {
		var hp = unit.getHp();
		if (hp <= 0)
		{			
			if (unit.getUnitType() !== GameEnums.UnitType_Infantry && unit.getBaseMaxRange() === 1)
			{
				var unitID = "INFANTRY";
				if (co.getPowerMode() !== GameEnums.PowerMode_Off)
				{
					if (co.getPowerMode() >= GameEnums.PowerMode_Superpower)
					{
						unitID = "MECH";
					}
					var x = unit.getX();
					var y = unit.getY();
					unit.removeUnit();
					map.spawnUnit(x, y, unitID, co.getOwner());
				};
			};
		};
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
	
	this.postBattleActions = function(co, attacker, atkDamage, defender, gotAttacked, weapon, action, map)
	{
		if (!gotAttacked)
		{
			if (co.getPowerMode() >= GameEnums.PowerMode_Superpower && attacker.getOwner() === co.getOwner())
			{
				if (defender.getHp() <= 0)
				{
					var defPosX = defender.getX();
					var defPosY = defender.getY();
					var fields = globals.getCircle(1, 1);
					for (var i = 0; i < fields.size(); i++)
					{
						var field = fields.at(i);
						var x = defPosX + field.x;
						var y = defPosY + field.y;
						var unit = map.getTerrain(x, y).getUnit();
						if (unit !== null && unit.getOwner() === co.getOwner() && unit.getBaseMaxRange() === 1 && unit.getUnitType() !== GameEnums.UnitType_Infantry && unit !== attacker)
						{
							unit.setHasMoved(false);
						}
					}
					fields.remove();
				}
			}
		}
		else // While it's possible to give the enemy a luck boost, making it apply only to units under 7 HP is much trickier unfortunately.
		     // So the next best thing I can do is "simulate" the effect here by randomly deducting 1% to 15% HP from his unit.
		{
			if (defender.getOwner() === co.getOwner())
			{
				if (defender.getBaseMaxRange() === 1 && defender.getUnitType() !== GameEnums.UnitType_Infantry && defender.getHpRounded() < 7)
				{
					var hp = defender.getHp() * 10;
					{
						var randomDamage = globals.randInt(1, 15);
						hp -= randomDamage;
						defender.setHp(hp / 10);
					}
				}
			}
		}
	}
	
	this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckMode, map)
    {
		if (attacker.getOwner() === co.getOwner() && attacker.getUnitType() !== GameEnums.UnitType_Infantry && attacker.getBaseMaxRange() === 1)
		{
			var hp = attacker.getHpRounded();
			var multiplier = 10 - hp;
			return 5 * multiplier;
		}
	}
	this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckMode, map)
    {
		var ret = 0;
		if (defender.getOwner() === co.getOwner() && defender.getUnitType() !== GameEnums.UnitType_Infantry && defender.getHpRounded() >= 5 && defender.getBaseMaxRange() === 1)
		{
			ret += 20;
		}
		if (co.getPowerMode() !== GameEnums.PowerMode_Off)
		{
			ret += 10;
		}
		return ret;
    };

    this.loadCOMusic = function(co, map)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Power:
                audio.addMusic("mods/cow_first_co_contest/music/cos/rookecop.mp3");
                break;
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("mods/cow_first_co_contest/music/cos/rookescop.mp3");
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("resources/music/cos/tagpower.mp3", 14611, 65538);
                break;
            default:
                audio.addMusic("mods/cow_first_co_contest/music/cos/rooke.mp3");
                break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 0;
    };
    this.getCOArmy = function()
    {
        return "GE";
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("A retired Mech from Green Earth's Guard battalions. His vehicles use armor from Megatank prototypes, making them unreliable but quite robust.");
    };
    this.getHits = function(co)
    {
        return qsTr("Endurance");
    };
    this.getMiss = function(co)
    {
        return qsTr("Maintenance");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Direct Vehicles have 20% more defense while at 5 HP or above, and retain 50% of their firepower from lost HP. Opponents have +15 luck against vehicles under 7HP.");
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("When a Direct vehicle is destroyed, they drop an Infantry, ready to move.");
	};
    this.getPowerName = function(co)
    {
        return qsTr("Turbo Dismount");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("When Direct vehicles are destroyed, they drop a Mech, ready to move. Direct vehicles are readied again when an adjacent enemy unit is destroyed.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Marching Fire");
    };
    this.getPowerSentences = function(co)
    {
		if (co.getPowerMode() >= GameEnums.PowerMode_Superpower)
		{
			return [qsTr("This is a Tank, we drive over and through things, move!"),
			qsTr("Advance you horrible lot, ground to take!"), qsTr("Drive! Or you'll get out and push!") ];
		}
        return [qsTr("There is a time for fight, and there is a time for flight, we're doing both!"),
	  qsTr("Brace yourselves, we're getting out!"), qsTr("Bail out! This vehicle's had it!")];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("It's not over yet, clean up every last one of them!"), qsTr("They're on the run! But retreating won't save them!")];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("Pull back! Pull back! Let the enemy have this one for a bit!"), qsTr("Damage report! Grr, we can't take much more of this....")];
    };
    this.getName = function()
    {
        return qsTr("Rooke");
    };
}

Constructor.prototype = CO;
var CO_ROOKE_CONTEST = new Constructor();
