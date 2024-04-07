var Constructor = function()
{
	this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    }

    this.init = function(co, map)
    {
        co.setPowerStars(2);
        co.setSuperpowerStars(4);
    };

    // Reset Exodia and Discount Flag
    this.startOfTurn = function(co, map)
    {
        var variables = co.getVariables();
		var ExodiaValVar = variables.createVariable("Exodia Formed");		            
		ExodiaValVar.writeDataInt32(0);
		var DiscountValVar = variables.createVariable("Discount");
		DiscountValVar.writeDataInt32(0);
    };

    this.activatePower = function(co, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

		var variables = co.getVariables();
		var ShieldValVar = variables.createVariable("Shield Value");
		ShieldValVar.writeDataInt32(100)

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
            if (i % 2 === 0)
            {
                animation.setSound("power10_1.wav", 1, delay);
            }
            else
            {
                animation.setSound("power10_2.wav", 1, delay);
            }
            if (animations.length < 5)
            {
                animation.addSprite("power10", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power10", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
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
		var DiscountValVar = variables.createVariable("Discount");
		DiscountValVar.writeDataInt32(1);

	if (co.getOwner().getUnitCount("ZCOUNIT_BEHEMOTH") > 0)
	{
		if (co.getOwner().getUnitCount("ZCOUNIT_ZIZ") > 0)
		{
			if (co.getOwner().getUnitCount("ZCOUNIT_LEVIATHAN") > 0)
			{
			    var variables = co.getVariables();
			    var ExodiaValVar = variables.createVariable("Exodia Formed");		            
			    ExodiaValVar.writeDataInt32(1);

				DiscountValVar.writeDataInt32(0);
			}
		}
	}

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

    this.loadCOMusic = function(co, map)
    {
        // put the co music in here.
        switch (co.getPowerMode())
        {
            case GameEnums.PowerMode_Power:
                audio.addMusic("resources/music/cos/bh_power.mp3", 1091 , 49930);
                break;
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("resources/music/cos/bh_superpower.mp3", 3161 , 37731);
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("resources/music/cos/bh_tagpower.mp3", 779 , 51141);
                break;
            default:
                audio.addMusic("mods/cow_first_co_contest/music/cos/gina.mp3")
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

this.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                       defender, defPosX, defPosY, isDefender, action, luckmode, map)
{
    if (co.getIsCO0() === true)
    {

	var variables = co.getVariables();
	var ExodiaValVar = variables.createVariable("Exodia Formed");
	var ExodiaVal = ExodiaValVar.readDataInt32();

        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
		if (ExodiaVal > 0)
		{
			return 40;
		}
        case GameEnums.PowerMode_Power:
            return 0;
        default:
            return 0;
        }
    }
    return 0;
};

this.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                        defender, defPosX, defPosY, isAttacker, action, luckmode, map)
{
    if (co.getIsCO0() === true)
    {

	var variables = co.getVariables();
	var ExodiaValVar = variables.createVariable("Exodia Formed");
	var ExodiaVal = ExodiaValVar.readDataInt32();

        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
		if (ExodiaVal > 0)
		{
			return 50;
		}
		else
		{
			return 10;
		}
        case GameEnums.PowerMode_Power:
            return 10;
        default:
            return 0;
        }
    }
    return 0;
};

    this.getDamageReduction = function(co, damage, attacker, atkPosX, atkPosY, attackerBaseHp,
                                       defender, defPosX, defPosY, isDefender, luckMode, map)
    {
        switch (co.getPowerMode())
        {
        case GameEnums.PowerMode_Tagpower:
        case GameEnums.PowerMode_Superpower:
            return 0;
        case GameEnums.PowerMode_Power:
		var variables = co.getVariables();
		var ShieldValVar = variables.createVariable("Shield Value");
		var ShieldVal = ShieldValVar.readDataInt32();

            if (ShieldVal > 0)
            {

		GameConsole.print("Shield value 1: " + ShieldVal, 1);
		GameConsole.print("Damage: " + damage, 1);

		var newShieldVal = ShieldVal - damage;

		GameConsole.print("New Shield Value 1: " + newShieldVal, 1);

        	    if (newShieldVal < 0)
	            {
			newShieldVal = 0;
	            }

		GameConsole.print("New Shield Value 2: " + newShieldVal, 1);

		

		return ShieldVal;
            }

            return 0;
        default:
            break;
        }
        return 0;
    };

	this.postBattleActions = function(co, attacker, atkDamage, defender, gotAttacked, weapon, action, map)
	{
		var variables = co.getVariables();
		var ShieldValVar = variables.createVariable("Shield Value");
		var SholderValVar = variables.createVariable("Shield Holder Value");		
		newShieldVal = SholderValVar.readDataInt32();

        	    if (newShieldVal < 0)
	            {
			newShieldVal = 0;
	            }

		GameConsole.print("New Shield Value 3: " + newShieldVal, 1);

		ShieldValVar.writeDataInt32(newShieldVal);		
	};

    this.getAdditionalBuildingActions = function(co, building)
    {
	if (building.getBuildingID() === "TOWN" &&
                    building.getOwner() === co.getOwner())
                {
                    return "ACTION_BUILD_SUPERWEAPON";
                }
        return "";
    };

    this.getSWIDS = function()
    {
        return  ["ZCOUNIT_BEHEMOTH", "ZCOUNIT_LEVIATHAN", "ZCOUNIT_ZIZ"];
    };

    this.getCostModifier = function(co, id, baseCost, posX, posY, map)
    {
	var unitSWIDs = CO_GINA_CONTEST.getSWIDS();

	var variables = co.getVariables();
	var DiscountValVar = variables.createVariable("Discount");
	var DiscountVal = DiscountValVar.readDataInt32();
	
	if (unitSWIDs.indexOf(id) > -1)
	{
		if (DiscountVal > 0)
		{
			return -baseCost;
		}
	}	

    	return 0;

    };

	this.buildedUnit = function(co, unit, map)
	{
		var unitSWIDs = CO_GINA_CONTEST.getSWIDS();

		var variables = co.getVariables();
		var DiscountValVar = variables.createVariable("Discount");
	
		if (unitSWIDs.indexOf(unit.getUnitID()) > -1)
		{
			DiscountValVar.writeDataInt32(0);
		}

	};

    // CO - Intel
    this.getBio = function (co) {
        return qsTr("Black Hole CO who works endlessly on her secret project to achieve dominance through the use of revolutionary superweapons. Rumoured to be the sister of a certain drone-loving witch.");
    };
    this.getHits = function (co) {
        return qsTr("Giant Robots.");
    };
    this.getMiss = function (co) {
        return qsTr("Budget cuts.");
    };
    this.getCODescription = function (co) {
        return qsTr("Has access to unique Superweapon units.");
    };
    this.getLongCODescription = function () {
        return qsTr("\nGlobal Effect: \nMay Build Superweapons at cities. Superweapons cost 20000 Funds, and only one of each superweapon can be on the field at any time.");
    };
    this.getPowerDescription = function (co) {
        return qsTr("Global defensive drones provide a shield which absorb damage from incoming attacks. The shield may absorb up to 10 HP worth of damage before falling apart.");
    };
    this.getPowerName = function (co) {
        return qsTr("Defensive Drone");
    };
    this.getSuperPowerDescription = function (co) {
        return qsTr("Gina may build one Superweapon for free this turn. If all Superweapons are already on the field, instead gain a 40%/40% firepower / defense boost.");
    };
    this.getSuperPowerName = function (co) {
        return qsTr("Project GR");
    };
    this.getPowerSentences = function(co)
    {
        return [qsTr("Black Hole, Allegiance or Death!"),
                qsTr("Can Happiness be Achieved without Sacrifice? No way! Nyahahaha!"),
        qsTr("Crush em, Behemoth!"),
        qsTr("Ziz! The skies are mine!"),
        qsTr("Rule, Leviathan! Rule the waves!")];
    };

    this.getVictorySentences = function(co)
    {
        return [qsTr("No one can defeat the might of Black Hole technology!"),
                qsTr("Now the world will know... the beautiful night!"),
                qsTr("I've achieved complete global dominance over land, air and sea!")];
    };

    this.getDefeatSentences = function(co)
    {
        return [qsTr("Project GR... in ruins..."),
                qsTr("...Sis! Helpppppp!")];
    };
    
    this.getName = function () {
        return qsTr("Gina");
    };
}

Constructor.prototype = CO;
var CO_GINA_CONTEST = new Constructor();
