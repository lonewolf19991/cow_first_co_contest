var Constructor = function () {
    this.init = function (co, map) {
        co.setPowerStars(4);
        co.setSuperpowerStars(3);
    };

    //added these at the top to avoid any issues with undefined functions
    //mostly copied from Cairn's code
    this.productionBuildings = ["FACTORY", "AIRPORT", "HARBOUR"];



    this.isProductionTile = function (x, y, map) {
        if (map !== null) {
            if (map.onMap(x, y)) {
                var terrain = map.getTerrain(x, y);
                var id = terrain.getID();
                if (CO_PENPEN_CONTEST.productionBuildings.includes(id)) {
                    return true;
                }
            }
        }
        return false;
    };




    this.getAiUsePower = function(co, powerSurplus, unitCount, repairUnits, indirectUnits, directUnits, enemyUnits, turnMode, map)
    {
		if (co.canUseSuperpower())
		{
			var units = co.getOwner().getUnits();
			for (var i = 0; i < units.size(); i++) {
				var unit = units.at(i);

				if (CO_PENPEN_CONTEST.isProductionTile(unit.getX(), unit.getY(), map)) {
					return GameEnums.PowerMode_Off;
				}
			}
			return GameEnums.PowerMode_Superpower;
		}
		if ((powerSurplus <= 0.5) && (turnMode === GameEnums.AiTurnMode_StartOfDay) && co.canUsePower())
		{
			return GameEnums.PowerMode_Power;
		}
		return GameEnums.PowerMode_Off;
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
            animation.writeDataInt32(unit.getX());
            animation.writeDataInt32(unit.getY());

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

            if (!CO_PENPEN_CONTEST.isProductionTile(unit.getX(), unit.getY(), map)) {
                var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
                animation.writeDataInt32(unit.getX());
                animation.writeDataInt32(unit.getY());

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
                    animation.addSprite("power5", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                    powerNameAnimation.queueAnimation(animation);
                    animations.push(animation);
                }
                else {
                    animation.addSprite("power5", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                    animations[counter].queueAnimation(animation);
                    animations[counter] = animation;
                    counter++;
                    if (counter >= animations.length) {
                        counter = 0;
                    }
                }
            }


        }
        units.remove();

        animation.setEndOfAnimationCall("CO_PENPEN_CONTEST", "unitDestruction");
    };





    this.unitDestruction = function (postAnimation, map) {

        var unit = null;

        var playerCounter = map.getPlayerCount();

        postAnimation.seekBuffer();
        var x = postAnimation.readDataInt32();
        var y = postAnimation.readDataInt32();


        for (var i2 = 0; i2 < playerCounter; i2++) {
            var enemyPlayer = map.getPlayer(i2);


            var units = enemyPlayer.getUnits();
            units.randomize();
            for (i = 0; i < units.size(); i++) {
                unit = units.at(i);

                if (CO_PENPEN_CONTEST.isProductionTile(unit.getX(), unit.getY(), map)) {


                    unit.killUnit();


                }
            }

        }
    };


    this.loadCOMusic = function (co, map) {
        // put the co music in here.
        switch (co.getPowerMode()) {
            case GameEnums.PowerMode_Power:
                audio.addMusic("resources/music/cos/power.mp3", 0, 0);
                break;
            case GameEnums.PowerMode_Superpower:
                audio.addMusic("resources/music/cos/superpower.mp3", 0, 0);
                break;
            case GameEnums.PowerMode_Tagpower:
                audio.addMusic("resources/music/cos/tagpower.mp3", 0, 0);
                break;
            default:
                audio.addMusic("mods/cow_first_co_contest/music/cos/penpen.mp3", 0, 0);
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
        return qsTr("Special Ops Penguin of Cobalt Ice");
    };
    this.getHits = function (co) {
        return qsTr("Surprises");
    };
    this.getMiss = function (co) {
        return qsTr("Spoilers");
    };
    this.getCODescription = function (co) {
        return qsTr("PenPen's units repair on enemy player's property as if theirs");
    };
    this.getPowerDescription = function (co) {
        return qsTr("Terrain Stars are negative");
    };
    this.getPowerName = function (co) {
        return qsTr("Stink Bomb");
    };
    this.getSuperPowerDescription = function (co) {
        return qsTr("All units on bases, airports and seaports are deleted(including your own)");
    };
    this.getSuperPowerName = function (co) {
        return qsTr("Bomb Bomb");
    };
    this.getPowerSentences = function (co) {
        return [qsTr("Pen Pen!"), qsTr("Pen Peeen!")];
    };
    this.getVictorySentences = function (co) {
        return [qsTr("Pen Pen!")];
    };
    this.getDefeatSentences = function (co) {
        return [qsTr("Pen Pen...")];
    };
    this.getName = function () {
        return qsTr("PenPen");
    };
}

Constructor.prototype = CO;
var CO_PENPEN_CONTEST = new Constructor();



CO_PENPEN_CONTEST.endOfTurn = function (co, map) {
    var units = co.getOwner().getUnits();
    for (i = 0; i < units.size(); i++) {
        unit = units.at(i);

        var terrain = unit.getTerrain();
        if (terrain !== null) {
            var building = terrain.getBuilding();
			if (building !== null && building.getOwner() !== null && building.getOwner().checkAlliance(co.getOwner()) === GameEnums.Alliance_Enemy) {
				var constructionList = building.getConstructionList();
				var repairList = building.getRepairTypes();

				if ((repairList.indexOf(unit.getUnitType()) >= 0) ||
					(constructionList.indexOf(unit.getUnitID()) >= 0)) {
					var position = unit.getPosition();
					if (unit.canBeRepaired(position)) {
						CO_PENPEN_CONTEST.repairUnit(unit, building.getOwner(), 2 + unit.getRepairBonus(position), map);
					}
				}
			}
		}
    }
};







CO_PENPEN_CONTEST.getTerrainDefenseModifier = function (co, unit, posX, posY, map) {
	if (CO_PENPEN_CONTEST.testZeroTerrainStars) {
		return -1000;
	}
    return 0;
};

CO_PENPEN_CONTEST.getEnemyTerrainDefenseModifier = function (co, unit, posX, posY, map) {
	if (CO_PENPEN_CONTEST.testZeroTerrainStars) {
		return -1000;
	}
    return 0;
};

CO_PENPEN_CONTEST.getOffensiveBonus = function(co, attacker, atkPosX, atkPosY,
							 defender, defPosX, defPosY, isDefender, action, luckMode, map)
{
	if (CO_PENPEN_CONTEST.testZeroStatModifiers) {
		return 0;
	}
    if (co.getIsCO0() === true) {
        if (co.getPowerMode() === GameEnums.PowerMode_Power) {
			var value = 0;
			CO_PENPEN_CONTEST.testZeroStatModifiers = true;

			CO_PENPEN_CONTEST.testZeroTerrainStars = true;
			value += attacker.getBonusOffensive(action, Qt.point(atkPosX, atkPosY), defender, Qt.point(defPosX, defPosY), isDefender, luckMode);
			CO_PENPEN_CONTEST.testZeroTerrainStars = false;
			value -= attacker.getBonusOffensive(action, Qt.point(atkPosX, atkPosY), defender, Qt.point(defPosX, defPosY), isDefender, luckMode);

			CO_PENPEN_CONTEST.testZeroStatModifiers = false;
			return value*2;
        }
    }
	return 0;
};

CO_PENPEN_CONTEST.getOffensiveReduction = function(co, attacker, atkPosX, atkPosY,
                                 defender, defPosX, defPosY, isDefender, action, luckMode, map)
{
	if (CO_PENPEN_CONTEST.testZeroStatModifiers) {
		return 0;
	}
    if (co.getIsCO0() === true) {
        if (co.getPowerMode() === GameEnums.PowerMode_Power) {
			var value = 0;
			CO_PENPEN_CONTEST.testZeroStatModifiers = true;

			CO_PENPEN_CONTEST.testZeroTerrainStars = true;
			value += attacker.getBonusOffensive(action, Qt.point(atkPosX, atkPosY), defender, Qt.point(defPosX, defPosY), isDefender, luckMode);
			CO_PENPEN_CONTEST.testZeroTerrainStars = false;
			value -= attacker.getBonusOffensive(action, Qt.point(atkPosX, atkPosY), defender, Qt.point(defPosX, defPosY), isDefender, luckMode);

			CO_PENPEN_CONTEST.testZeroStatModifiers = false;
			return -value*2;
        }
    }
	return 0;
},

CO_PENPEN_CONTEST.getDeffensiveBonus = function(co, attacker, atkPosX, atkPosY,
                                  defender, defPosX, defPosY, isAttacker, action, luckMode, map)
{
	if (CO_PENPEN_CONTEST.testZeroStatModifiers) {
		return 0;
	}
    if (co.getIsCO0() === true) {
        if (co.getPowerMode() === GameEnums.PowerMode_Power) {
			var value = 0;
			CO_PENPEN_CONTEST.testZeroStatModifiers = true;

			CO_PENPEN_CONTEST.testZeroTerrainStars = true;
			value += defender.getBonusDefensive(action, Qt.point(defPosX, defPosY), attacker, Qt.point(atkPosX, atkPosY), isAttacker, luckMode);
			CO_PENPEN_CONTEST.testZeroTerrainStars = false;
			value -= defender.getBonusDefensive(action, Qt.point(defPosX, defPosY), attacker, Qt.point(atkPosX, atkPosY), isAttacker, luckMode);

			CO_PENPEN_CONTEST.testZeroStatModifiers = false;
			return value*2;
        }
    }
	return 0;
},

CO_PENPEN_CONTEST.getDeffensiveReduction = function(co, attacker, atkPosX, atkPosY,
                                  defender, defPosX, defPosY, isAttacker, action, luckMode, map)
{
	if (CO_PENPEN_CONTEST.testZeroStatModifiers) {
		return 0;
	}
    if (co.getIsCO0() === true) {
        if (co.getPowerMode() === GameEnums.PowerMode_Power) {
			var value = 0;
			CO_PENPEN_CONTEST.testZeroStatModifiers = true;

			CO_PENPEN_CONTEST.testZeroTerrainStars = true;
			value += defender.getBonusDefensive(action, Qt.point(defPosX, defPosY), attacker, Qt.point(atkPosX, atkPosY), isAttacker, luckMode);
			CO_PENPEN_CONTEST.testZeroTerrainStars = false;
			value -= defender.getBonusDefensive(action, Qt.point(defPosX, defPosY), attacker, Qt.point(atkPosX, atkPosY), isAttacker, luckMode);

			CO_PENPEN_CONTEST.testZeroStatModifiers = false;
			return -value*2;
        }
    }
	return 0;
},

CO_PENPEN_CONTEST.repairUnit = function (unit, enemyOwner, repairAmount, map) {
    // repair it
    var costs = unit.getUnitCosts();
    var hp = unit.getHpRounded();
    var healingDone = 0;
    if (hp + repairAmount <= 10) {
        healingDone = repairAmount;
    }
    else {
        // we could heal more than we need
        healingDone = 10 - hp;
    }
    var funds = enemyOwner.getFunds() + enemyOwner.calcIncome(1);
    var modifier = unit.getRepairCostModifier();
    // check if we can pay for all healing
    for (var i = healingDone; i >= 0; i--) {
        if (i * costs / 10 * modifier <= funds) {
            healingDone = i;
            break;
        }
        else if (i === 0) {
            healingDone = 0;
            break;
        }
    }
    // heal unit
    unit.setHp(hp + healingDone);
    // pay for healing
    enemyOwner.addFunds(-healingDone * costs / 10 * modifier);

    var x = unit.getX();
    var y = unit.getY();
    if (!unit.isStealthed(map.getCurrentViewPlayer())) {
        var animation = GameAnimationFactory.createAnimation(map, x, y);
        var width = animation.addText(qsTr("RATION"), map.getImageSize() / 2 + 25, -2, 1);
        animation.addBox("info", map.getImageSize() / 2, 0, width + 36, map.getImageSize(), 400);
        animation.addSprite("ration", map.getImageSize() / 2 + 4, 4, 400, 2);
        animation.addSound("repair_1.wav");
    }
};
