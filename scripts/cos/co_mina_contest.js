var Constructor = function () {
    this.init = function (co, map) {
        co.setPowerStars(2);
        co.setSuperpowerStars(3);
    };

    this.getAiCoUnitBonus = function (co, unit, map) {
        return 1;
    }

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
            animation.setSound("power1.wav", 1, delay);
            if (animations.length < 5) {
                animation.addSprite("power1", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 1.5, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else {
                animation.addSprite("power1", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 1.5, delay);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length) {
                    counter = 0;
                }
            }
        }
        units.remove();
    };

    this.activateSuperpower = function (co, powerMode, map) {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(powerMode);
        powerNameAnimation.queueAnimationBefore(dialogAnimation);

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
        units.remove();
    };

    this.getDeffensiveBonus = function (co, attacker, atkPosX, atkPosY,
        defender, defPosX, defPosY, isAttacker, action, luckmode, map) {

        switch (co.getPowerMode()) {

            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Superpower:
            case GameEnums.PowerMode_Power:



                return 10;





            default:




            break;
        }

        return 0;
    };



    this.getMovementcostModifier = function (co, unit, posX, posY, map) {
        if (unit.getOwner() === co.getOwner()) {
            if (map.getGameRules().getCurrentWeather().getWeatherId() === "WEATHER_RAIN") {
                return 1;
            }
        }
        return 0;
    };

    this.getOffensiveReduction = function (co, attacker, atkPosX, atkPosY,
        defender, defPosX, defPosY, isDefender, action, luckMode, map) {
        var owner = co.getOwner();
        var ret = 0;
        if (attacker !== null) {
            var enemyPlayer = attacker.getOwner();
            if ((enemyPlayer !== owner) && owner.checkAlliance(enemyPlayer) === GameEnums.Alliance_Enemy) {
                //Gets stars from enemy COs, but only front ones
                var enemyCO = enemyPlayer.getCO(0);
                if(enemyCO.getPowerMode() === GameEnums.PowerMode_Power)
                {
                   ret = Math.ceil(enemyCO.getPowerStars() * 3);
                }
              else if(enemyCO.getPowerMode() === GameEnums.PowerMode_Superpower || enemyCO.getPowerMode() === GameEnums.PowerMode_Tagpower)
                {
                    ret = Math.ceil( (enemyCO.getPowerStars() + enemyCO.getSuperpowerStars()) * 3);
                }
                else
                {
                    ret = Math.ceil(enemyCO.getPowerFilled() * 3);
                }

                
            }
        }
        return ret;
    };

    this.getDeffensiveReduction = function (co, attacker, atkPosX, atkPosY,
        defender, defPosX, defPosY, isDefender, action, luckMode, map) {
        var owner = co.getOwner();
        var ret = 0;
        var amount = 3;
        if (co.getPowerMode() >= GameEnums.PowerMode_Power) {
            if (co.getPowerMode() >= GameEnums.PowerMode_Superpower) {
                amount = 6;
            }
            if (defender !== null) {
                var enemyPlayer = defender.getOwner();
                if ((enemyPlayer !== owner) && owner.checkAlliance(enemyPlayer) === GameEnums.Alliance_Enemy) {
                    //Gets stars from enemy COs, but only front ones
                    var enemyCO = enemyPlayer.getCO(0);
                    
                    if(enemyCO.getPowerMode() === GameEnums.PowerMode_Power)
                    {
                        ret = Math.ceil(enemyCO.getPowerStars() * amount);
                    }
                    else if(enemyCO.getPowerMode() === GameEnums.PowerMode_Superpower || enemyCO.getPowerMode() === GameEnums.PowerMode_Tagpower)
                    {
                        ret = Math.ceil( (enemyCO.getPowerStars() + enemyCO.getSuperpowerStars()) * amount);
                    }
                    else
                    {
                        ret = Math.ceil(enemyCO.getPowerFilled() * amount);
                    }
                   
                }
            }
        }
        return ret;
    };

    this.loadCOMusic = function (co, map) {
        // put the co music in here.
        switch (co.getPowerMode()) {
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
                audio.addMusic("mods/cow_first_co_contest/music/cos/mina.mp3");//, 12441, 91528);
                break;
        }
    };

    this.getCOUnitRange = function (co, map) {
        return 0;
    };
    this.getCOArmy = function () {
        return "BM";
    };
    // CO - Intel
    this.getBio = function (co) {
        return qsTr("A well known Blue Moon therapist. She made it her job to treat anyone that was affected by Black Hole especially by Lash");
    };
    this.getHits = function (co) {
        return qsTr("Books");
    };
    this.getMiss = function (co) {
        return qsTr("Lash");
    };
    this.getCODescription = function (co) {
        return qsTr("Enemy COs' units have -3% atk per star filled up in their power meter. Mina's have the snow weather movement cost penalty in the rain.");
    };
    this.getPowerDescription = function (co) {
        return qsTr("Until your next turn, enemy COs' power meter charge 30% slower and their units have -3% defense, per star filled up in their power meter.");
    };
    this.getPowerName = function (co) {
        return qsTr("Cognitive Therapy");
    };
    this.getSuperPowerDescription = function (co) {
        return qsTr("Until your next turn, enemy COs cannot use either of their CO powers, their units have -3% attack and -6% defense, per star filled up in their power meter.");
    };
    this.getSuperPowerName = function (co) {
        return qsTr("Recovery Process");
    };
    this.getPowerSentences = function (co) {
        return [qsTr("Your therapy session starts now!"),
        qsTr("This session is on the house!"),
        qsTr("Words hurt harder than you think!"),
        qsTr("Change will only happen if you embrace it!"),
        qsTr("Let's change the mood, shall we?"),
        qsTr("Avoiding help will only hurt you in the long run!"),
        qsTr("Your troops will need more than one session when this is over!")];
    };
    this.getVictorySentences = function (co) {
        return [qsTr("As long as I am around, Black Hole will not harm another soul!"),
        qsTr("Shine bright Blue Moon, my sweet homeland"),
        qsTr("Your tricks mean nothing if you aren't in the right mental state")];
    };
    this.getDefeatSentences = function (co) {
        return [qsTr("Maybe I am the one who needs a therapy session?"),
        qsTr("Olaf, I have failed our hometown yet again"), qsTr("I have failed my people, both as a therapist and a CO")];
    };
    this.getName = function () {
        return qsTr("Mina");
    };
}

Constructor.prototype = CO;
var CO_MINA_CONTEST = new Constructor();

