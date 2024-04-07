var Constructor = function () {
    this.init = function (co, map) {
        co.setPowerStars(1);
        co.setSuperpowerStars(5);
    };

    this.getAiCoUnitBonus = function (co, unit, map) {
        return 1;
    }

    this.loadCOMusic = function (co, map) {
        // put the co music in here.
        switch (co.getPowerMode()) {
            case GameEnums.PowerMode_Power:
                audio.addMusic("mods/cow_first_co_contest/music/cos/harbingerPower.mp3", 0, 0);
                break;
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("mods/cow_first_co_contest/music/cos/harbingerSuperpower.mp3", 0, 0);
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("mods/cow_first_co_contest/music/cos/harbingerSuperpower.mp3", 0, 0);
                break;
            default:
                audio.addMusic("mods/cow_first_co_contest/music/cos/harbinger.mp3", 0, 0);
                break;
        }
    };

    this.activatePower = function (co, map) {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++) {
            var unit = units.at(i);

            var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
            var delay = globals.randInt(135, 265);
            if (animations.length < 5) {
                delay *= i;
            }
            animation.setSound("power0.wav", 1, delay);
            if (animations.length < 5) {
                animation.addSprite("power0", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else {
                animation.addSprite("power0", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length) {
                    counter = 0;
                }
            }
        }
    };

    this.activateSuperpower = function (co, powerMode, map) {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        powerNameAnimation.queueAnimationBefore(dialogAnimation);


        var variables = co.getVariables();
        var firepowerBonusVar = variables.createVariable("Firepower Bonus");
        var firepowerBonus = firepowerBonusVar.readDataInt32();
        var defenseBonusVar = variables.createVariable("Defense Bonus");
        var defenseBonus = defenseBonusVar.readDataInt32();

        var existingFirepowerBonusVar = variables.createVariable("Existing Firepower Bonus");
        var existingDefenseBonusVar = variables.createVariable("Existing Defense Bonus");

        existingFirepowerBonusVar.writeDataInt32(firepowerBonus);
        existingDefenseBonusVar.writeDataInt32(defenseBonus);

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++) {
            var unit = units.at(i);

            var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
            var delay = globals.randInt(135, 265);
            if (animations.length < 7) {
                delay *= i;
            }
            if (i % 2 === 0) {
                animation.setSound("power12_1.wav", 1, delay);
            }
            else {
                animation.setSound("power12_2.wav", 1, delay);
            }
            if (animations.length < 7) {
                animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 2, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else {
                animation.addSprite("power12", -map.getImageSize() * 2, -map.getImageSize() * 2, 0, 2, delay);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length) {
                    counter = 0;
                }
            }
        }
    };

    this.postBattleActions = function (co, attacker, atkDamage, defender, gotAttacked, weapon, action, map) {
        if (CO.isActive(co)) {
            if (attacker.getOwner() === co.getOwner() && defender !== null) {
                if (Math.ceil(defender.getHp()) <= 0) {
                    var variables = co.getVariables();
                    var firepowerBonusVar = variables.createVariable("Firepower Bonus");
                    var firepowerBonus = firepowerBonusVar.readDataInt32();

                    if (firepowerBonus < 30) {
                        firepowerBonus++;
                        if (co.getPowerMode() !== GameEnums.PowerMode_Off && firepowerBonus < 30) {
                            firepowerBonus++;
                        }
                        if (co.getPowerMode() >= GameEnums.PowerMode_Superpower && firepowerBonus < 30) {
                            firepowerBonus++;
                        }
                        firepowerBonusVar.writeDataInt32(firepowerBonus);
                    }
                }
            }
            else if (defender.getOwner() === co.getOwner() && defender !== null) {
                if (Math.ceil(defender.getHp()) <= 0) {

                    var variables = co.getVariables();
                    var defenseBonusVar = variables.createVariable("Defense Bonus");
                    var defenseBonus = defenseBonusVar.readDataInt32();
                    if (defenseBonus < 30) {
                        defenseBonus++;
                        if (co.getPowerMode() !== GameEnums.PowerMode_Off && defenseBonus < 30) {
                            defenseBonus++;
                        }
                        if (co.getPowerMode() >= GameEnums.PowerMode_Superpower && defenseBonus <30) {
                            defenseBonus++;
                        }
                        defenseBonusVar.writeDataInt32(defenseBonus);
                    }
                }
            }
        }
    };

    this.getOffensiveBonus = function (co, attacker, atkPosX, atkPosY,
        defender, defPosX, defPosY, isDefender, action, luckMode, map) {
        if (CO.isActive(co)) {
            var ret = 10;

            var variables = co.getVariables();
            var firepowerBonusVar = variables.createVariable("Firepower Bonus");
            var firepowerBonus = firepowerBonusVar.readDataInt32();

            var existingFirepowerBonusVar = variables.createVariable("Existing Firepower Bonus");
            var existingFirepowerBonus = existingFirepowerBonusVar.readDataInt32();

            ret += firepowerBonus;
            if (co.getPowerMode() >= GameEnums.PowerMode_Superpower) {
                ret += existingFirepowerBonus; //double bonuses without doubling any gained during the power
            }
            
            if (ret >= 40)
            {
                ret = 40;
                return ret; 
            }


            return ret;
        }
        return 0;
    };

    this.getDeffensiveBonus = function (co, attacker, atkPosX, atkPosY,
        defender, defPosX, defPosY, isAttacker, action, luckMode, map) {
        if (CO.isActive(co)) {
            var ret = -20;

            var variables = co.getVariables();
            var defenseBonusVar = variables.createVariable("Defense Bonus");
            var defenseBonus = defenseBonusVar.readDataInt32();

            var existingDefenseBonusVar = variables.createVariable("Existing Defense Bonus");
            var existingDefenseBonus = existingDefenseBonusVar.readDataInt32();


            ret += defenseBonus;
            if (co.getPowerMode() >= GameEnums.PowerMode_Superpower) {
                ret += existingDefenseBonus; //double bonuses without doubling any gained during the power
            }
            
            if (ret >= 10)
            {
                ret = 10;
                return ret; 
            }


            return ret;
        }
        return 0;
    };

    this.getCOUnitRange = function (co, map) {
        return 0;
    };
    this.getCOArmy = function () {
        return "BH";
    };

    // CO - Intel
    this.getBio = function (co, map) {
        return qsTr("Harbinger is a relentless vanguard commander. Harbinger's army grows in power with each kill and sacrifice.");
    };
    this.getHits = function (co, map) {
        return qsTr("Sacrifice");
    };
    this.getMiss = function (co, map) {
        return qsTr("Inaction");
    };
    this.getCODescription = function (co, map) {
        return qsTr("Harbinger's units start off at 110%/80%. For every kill, Harbinger's units gain +1% Firepower. For every death, Harbinger's units gain +1% Defense. Max stats: 140%/110%.");
    };
    this.getPowerDescription = function (co, map) {
        return qsTr("Kills and deaths during this turn will grant +2% Firepower/Defense bonuses instead of 1%.");
    };
    this.getPowerName = function (co, map) {
        return qsTr("Gathering Storm");
    };
    this.getSuperPowerDescription = function (co, map) {
        return qsTr("Kills and deaths during this turn will grant +3% Firepower/Defense bonuses instead of 1%. All existing Firepower/Defense bonuses are doubled.");
    };
    this.getSuperPowerName = function (co, map) {
        return qsTr("Maelstrom of Chaos");
    };
    this.getPowerSentences = function (co, map) {
        return [qsTr("The end is near"),
        qsTr("Die for me")];
    };
    this.getVictorySentences = function (co, map) {
        return [qsTr("My victory was foretold."),
        qsTr("Salvation has come")];
    };
    this.getDefeatSentences = function (co, map) {
        return [qsTr("You only delay the inevitable."),
        qsTr("This is not over")];
    };
    this.getName = function (co, map) {
        return qsTr("Harbinger");
    };
}

Constructor.prototype = CO;
var CO_HARBINGER_CONTEST = new Constructor();