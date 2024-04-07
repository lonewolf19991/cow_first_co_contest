var Constructor = function()
{
    this.init = function(co, map)
    {
        co.setPowerStars(4);
        co.setSuperpowerStars(2);
    };
	
	this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    }
	
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
	
	this.attackSequence = [-10, 0, 10, 30, 0, 20, 40, 60];
	this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckmode, map)
    {
		var variables = co.getVariables();
		var currentAttackVar = variables.createVariable("Current Attack");
		var currentAttack = currentAttackVar.readDataInt32();
		var offset = 0;
		
		if (co.getPowerMode() !== GameEnums.PowerMode_Off && currentAttack <= 3)
		{
			offset += 4;
		}
		var ret = CO_CADENZA_CONTEST.attackSequence[currentAttack + offset];
		
		return ret;
    };
	
	this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckMode, map)
    {
		var ret = 0;
		if (co.getPowerMode() !== GameEnums.PowerMode_Off)
		{
			ret = 10;
		}
		return ret;
    };
	
	this.soundEffect = ["cadenza1.wav", "cadenza2.wav", "cadenza3.wav", "cadenza4.wav"];
	this.postBattleActions = function(co, attacker, atkDamage, defender, gotAttacked, weapon, action, map)
    {
		if (attacker.getOwner() === co.getOwner())
		{
			var variables = co.getVariables();
			var currentAttackVar = variables.createVariable("Current Attack");
			var currentAttack = currentAttackVar.readDataInt32();
			
			var sound = CO_CADENZA_CONTEST.soundEffect[currentAttack];
			audio.playSound(sound);
			if (currentAttack < 3)
			{
				currentAttackVar.writeDataInt32(currentAttack + 1);
			}
			else
			{
				currentAttackVar.writeDataInt32(0);
			}		
		}
	}
	
	this.getTrueDamage = function(co, damage, attacker, atkPosX, atkPosY, attackerBaseHp,
                                  defender, defPosX, defPosY, isDefender, action, luckmode, map)
	{
		if (attacker.getOwner() === co.getOwner())
		{
			var variables = co.getVariables();
			var currentAttackVar = variables.createVariable("Current Attack");
			var currentAttack = currentAttackVar.readDataInt32();
			
			if (!isDefender)
			{
				if (currentAttack === 3 && co.getPowerMode() >= GameEnums.PowerMode_Superpower)
				{
					var attackerValue = (attacker.getUnitCosts() * attacker.getHpRounded() / 10);
					var defenderValue = (defender.getUnitCosts() * defender.getHpRounded() / 10);
					
					if (defenderValue <= attackerValue)
					{
						return 150 - damage;
					}
				}
			}
		}
		return 0;
	}

    this.loadCOMusic = function(co, map)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Power:
                audio.addMusic("mods/cow_first_co_contest/music/cos/cadenzaCOP.mp3", 0 , 0);
                break;
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("mods/cow_first_co_contest/music/cos/cadenzaSCOP.mp3", 0 , 0);
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("resources/music/cos/bh_tagpower.mp3", 779 , 51141);
                break;
            default:
                audio.addMusic("mods/cow_first_co_contest/music/cos/cadenza.mp3");
                break;
        }
    };

    this.getCOUnitRange = function(co, map)
    {
        return 0;
    };
    this.getCOArmy = function()
    {
        return "BH";
    };
    // CO - Intel
    this.getBio = function(co)
    {
        return qsTr("The last scion of House Aria, which once held power and influence across all of Wars World until they were disgraced and driven out of all four nations. Now, she seeks to reclaim their lost strength and prestige, while somberly playing the swan song of those that wronged her and her lost family.");
    };
    this.getHits = function(co)
    {
        return qsTr("Symphonies");
    };
    this.getMiss = function(co)
    {
        return qsTr("Ragtime");
    };
    this.getCODescription = function(co)
    {
        return qsTr("Each time Cadenza's units attack, their firepower changes in the following sequence: \n1st: -10% / 2nd: No change / 3rd: +10% / 4th +30%.");
    };
	this.currentAttackDescription = ["-10", "+0", "+10", "+30", "+0", "+20", "+40", "+60"];
	this.getLongCODescription = function(co, map)
    {
		var variables = co.getVariables();
		var currentAttackVar = variables.createVariable("Current Attack");
		var currentAttack = currentAttackVar.readDataInt32();
		var offset = 0;
		
		if (co.getPowerMode() !== GameEnums.PowerMode_Off && currentAttack <= 3)
		{
			offset += 4;
		}		
		
        return qsTr("\nNext Attack Bonus: "+ CO_CADENZA_CONTEST.currentAttackDescription[currentAttack + offset]);
    };
    this.getPowerDescription = function(co)
    {
        return qsTr("Changes the firepower sequence to the following: \n1st: No change / 2nd: +20% / 3rd: +40% / 4th +60%.");
	};
    this.getPowerName = function(co)
    {
        return qsTr("Crescendo");
    };
    this.getSuperPowerDescription = function(co)
    {
        return qsTr("Uses the same firepower sequence as Crescendo. Additionally, the 4th attack will destroy the target if the target's current value is equal to or less than the attacker's current value.");
    };
    this.getSuperPowerName = function(co)
    {
        return qsTr("Curtain Call");
    };
    this.getPowerSentences = function(co)
    {
		
        return [qsTr("Here, I've composed a requiem."), qsTr("Places, everyone. PLACES!"),
		qsTr("As long as I play, House Aria still stands."), qsTr("The only thing about you I can make beautiful is your death."),
		qsTr("One, two, three, four. Two, two, three, four."), qsTr("I'll play my fiddle while you burn.") ];
    };
    this.getVictorySentences = function(co)
    {
        return [qsTr("You were but a stepping stone"), qsTr("Perhaps I should have played something simpler."), qsTr("Tell everyone what happens when you oppose House Aria.") ];
    };
    this.getDefeatSentences = function(co)
    {
        return [qsTr("No, this will NOT be my legacy."), qsTr("As impossible as it seems, I underestimated you.") ];
    };
    this.getName = function()
    {
        return qsTr("Cadenza");
    };
}

Constructor.prototype = CO;
var CO_CADENZA_CONTEST = new Constructor();
