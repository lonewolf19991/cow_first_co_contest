var Constructor = function () {
    this.init = function (co, map) {
        co.setPowerStars(4);
        co.setSuperpowerStars(3);
    };
	
	this.getAiCoUnitBonus = function(co, unit, map)
    {
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
            if (unit.isTransporter()) {
                unit.setCursorInfoRange(4);
            }

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

            if (unit.isTransporter()) {
                unit.setCursorInfoRange(6);
            }

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







    this.startOfTurn = function(co, map)
    {
        var units = co.getOwner().getUnits();
        
        for (var i = 0; i < units.size(); i++) {
        
            var unit = units.at(i);
            if (unit.isTransporter()) {
                unit.setCursorInfoRange(0);
            }
            
        }
        units.remove(); 

    };



    this.getCostModifier = function (co, id, baseCost, posX, posY, map) {
        if (CO_AMY_CONTEST.cheaperUnits.indexOf(id) > -1) {
          return -baseCost * 0.2;
          
        }
        return 0;
    };
    this.cheaperUnits = ["LANDER", "SNIPER", "CRUISER", "AIRCRAFTCARRIER", "BLACK_BOAT", "APC", "T_HELI", "MISSILE", "ANTITANKCANNON", "ROCKETTHROWER", "ARTILLERY", "BATTLESHIP", "TRANSPORTPLANE", "ARTILLERYCRAFT", "PIPERUNNER"];

    this.isNearTransporters = function (co, posX, posY, range, map) {
        var nearTransporters = false;
        var fields = globals.getCircle(1, range);
        if (map !== null) {
            for (var i = 0; i < fields.size(); i++) {
                var x = fields.at(i).x + posX;
                var y = fields.at(i).y + posY;
                if (map.onMap(x, y)) {
                    var unit = map.getTerrain(x, y).getUnit();
                    if (unit !== null && unit.getOwner() === co.getOwner() && unit.isTransporter()) {
                        fields.remove();
                        return true;
                    }
                }
            }
        }

        fields.remove();
        return false;
    }
    this.getOffensiveBonus = function (co, attacker, atkPosX, atkPosY,
        defender, defPosX, defPosY, isDefender, action, luckmode, map) {
        var ret = 0;

        if (isDefender && attacker.getBaseMaxRange() ===1  && attacker.getUnitType() !== GameEnums.UnitType_Infantry) {
            ret -= 50;
        }

        if (co.getPowerMode() === GameEnums.PowerMode_Power) {
            if (CO_AMY_CONTEST.isNearTransporters(co, atkPosX, atkPosY, 4, map)) {
                ret += 30;
            }
        }
        return ret;
    };

    this.getDeffensiveBonus = function (co, attacker, atkPosX, atkPosY,
        defender, defPosX, defPosY, isDefender, action, luckmode, map) {
        var ret = 0;
        if (co.getPowerMode() >= GameEnums.PowerMode_Power) {
            ret += 10;

            if (CO_AMY_CONTEST.isNearTransporters(co, defPosX, defPosY, 4, map)) {
                ret += 30;
            }
        }
        return ret;
    };

    this.getOffensiveReduction = function (co, attacker, atkPosX, atkPosY,
        defender, defPosX, defPosY, isAttacker, action, luckmode, map) {
        // reduce enemy Atk
        if (co.getPowerMode() >= GameEnums.PowerMode_Superpower) {
            if (CO_AMY_CONTEST.isNearTransporters(co, atkPosX, atkPosY, 6, map)) {
                if (co.getOwner().isEnemyUnit(attacker)) {
                    return 50;
                }
            }
        }
        return 0;
    };

    this.getDeffensiveReduction = function (co, attacker, atkPosX, atkPosY,
        defender, defPosX, defPosY, isAttacker, action, luckmode, map) {
        // reduce enemy defense
        if (co.getPowerMode() >= GameEnums.PowerMode_Superpower) {
            if (CO_AMY_CONTEST.isNearTransporters(co, defPosX, defPosY, 6, map)) {
                if (co.getOwner().isEnemyUnit(defender)) {
                    return 50;
                }
            }
        }
        return 0;
    };

    this.getMovementpointModifier = function (co, unit, posX, posY, map) {
        if (co.getPowerMode() >= GameEnums.PowerMode_Superpower) {
            return 1;
        }
        return 0;
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
                audio.addMusic("mods/cow_first_co_contest/music/cos/amy.mp3", 0,0);
                
                break;
        }
    };

    this.getCOUnitRange = function (co, map) {
        return 0;
    };
    this.getCOArmy = function () {
        return "GE";
    };
    // CO - Intel
    this.getBio = function (co) {
        return qsTr("Heiress to a vast multi-national family business, uses her resources to help those affected by war. Though usually a pacifist, displays a 180º in her personality when insulted, or when her friends and country are threatened.");
    };
    this.getHits = function (co) {
        return qsTr("Stargazing");
    };
    this.getMiss = function (co) {
        return qsTr("Stairs");
    };
    this.getCODescription = function (co) {
        return qsTr("Using her worldwide connections, costs of all transport and indirect units are reduced by 20%. However her pacifist nature reduces direct units' counter-attack firepower by 50% ");
    };
    this.getPowerDescription = function (co) {
        return qsTr("All units near any transport units (range 1-4), will gain 30% attack and defense(Will not apply if the units end their turn outside of the transport units' range.)");
    };
    this.getPowerName = function (co) {
        return qsTr("Radiant Dawn");
    };
    this.getSuperPowerDescription = function (co) {
        return qsTr("All units get +1 movement. All enemy units within range of any transport units(range 1-6) will receive 50% less defense, attack and counter attack power.");
    };
    this.getSuperPowerName = function (co) {
        return qsTr("Die for me!");
    };
    this.getPowerSentences = function (co) {
        return [qsTr("Rage all you want, you will lose this battle"),
        qsTr("Time to tip the scales! Hello and goodbye!")
        ];
    };
    this.getVictorySentences = function (co) {
        return [qsTr("Better to fight for something than live for nothing.")];
    };
    this.getDefeatSentences = function (co) {
        return [qsTr("If my soldiers have failed... then I have failed Green Earth. I'm sorry.")];
    };
    this.getName = function () {
        return qsTr("Amy");
    };
}

Constructor.prototype = CO;
var CO_AMY_CONTEST = new Constructor();
