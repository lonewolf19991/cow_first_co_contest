var Constructor = function () {
	this.init = function (co, map) {
		co.setPowerStars(3);
		co.setSuperpowerStars(5);
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

	this.postBattleActions = function (co, attacker, atkDamage, defender, gotAttacked, weapon, action, map) {
		if (attacker.getOwner() === co.getOwner() && !gotAttacked && attacker.getUnitType() !== GameEnums.UnitType_Infantry) {
			var defX = defender.getX();
			var defY = defender.getY();
			var distX = defX - attacker.getX();
			var distY = defY - attacker.getY();

			if (attacker.getBaseMaxRange() === 1) {
				var newPosition = Qt.point(defX + Math.sign(distX), defY + Math.sign(distY));
				if (map.onMap(newPosition.x, newPosition.y)) {
					CO_RALPH_CONTEST.pushUnit(co, defender, newPosition, map);
				}
				else {
					CO_RALPH_CONTEST.damageUnit(co, defender, 1, map);
				}
			}
			else if (co.getPowerMode() >= GameEnums.PowerMode_Power) {
				// indirect push
				var fields = globals.getCircle(0, 1);
				var size = fields.size();
				for (var i = 0; i < size; i++) {
					var x = fields.at(i).x + defX;
					var y = fields.at(i).y + defY;
					if (map.onMap(x, y)) {
						var unit = map.getTerrain(x, y).getUnit();
						if (unit !== null) {
							distX = x - defX;
							distY = y - defY;
							var newPosition = Qt.point(x + distX, y + distY);
							if (map.onMap(newPosition.x, newPosition.y)) {
								CO_RALPH_CONTEST.pushUnit(co, unit, newPosition, map);
							}
						}
					}
				}
				fields.remove();
			}
		}
	};

	this.pushUnit = function (co, unit, newPosition, map) {
		var terrain = map.getTerrain(newPosition.x, newPosition.y);
		var terrainUnit = terrain.getUnit();

		if (terrainUnit === null &&
			unit.canMoveOver(newPosition.x, newPosition.y) === true) {
			unit.moveUnitToField(newPosition.x, newPosition.y);
		}
		else {
			CO_RALPH_CONTEST.damageUnit(co, unit, 1, map);
			if (terrainUnit !== null) {
				CO_RALPH_CONTEST.damageUnit(co, terrainUnit, 1, map);
			}
		}
	};

	this.damageUnit = function (co, unit, damage, map) {
		if (unit.getHp() > damage) {
			unit.setHp(unit.getHp() - damage);
		}
		else if (unit.getHp() > 0) {
			unit.setHp(0.1);
		}
	};

	this.getDeffensiveBonus = function (co, attacker, atkPosX, atkPosY,
		defender, defPosX, defPosY, isDefender, action, luckMode, map) {
		var ret = 0;
		if (co.getPowerMode() !== GameEnums.PowerMode_Off) {
			ret += 10;
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
				audio.addMusic("mods/cow_first_co_contest/music/cos/ralph.mp3");
				break;
		}
	};

	this.getFirerangeModifier = function (co, unit, posX, posY, map) {
		if (unit.getBaseMaxRange() === 1 && unit.getUnitType() !== GameEnums.UnitType_Infantry) {
			if (co.getPowerMode() >= GameEnums.PowerMode_Superpower) {
				return 2;
			}
		}
		return 0;
	}

	this.getCOUnitRange = function (co, map) {
		return 0;
	};
	this.getCOArmy = function () {
		return "GE";
	};
	// CO - Intel
	this.getBio = function (co) {
		return qsTr("A mysterious veteran claiming to be from a flooded world overrun by giant bugs, with an unusual penchant for positioning over firepower. Knows no life other than hopeless, brutal war, making him a stranger to the optimism of the Allied Nations.");
	};
	this.getHits = function (co) {
		return qsTr("Insect Taxidermy");
	};
	this.getMiss = function (co) {
		return qsTr("Loss of Innocent Life");
	};
	this.getCODescription = function (co) {
		return qsTr("Titan Munitions:\nNon-footsoldier direct combat units push enemy units they attack one space directly away from the attacker's space, even if destroyed by counterattack. Units which would be pushed into invalid terrain or into another unit remain in place and lose 1 HP. If a unit prevented the push, that unit also loses 1 HP.");
	};
	this.getPowerDescription = function (co) {
		return qsTr("When an indirect combat unit attacks, it pushes all units adjacent to the target one space directly away from the target's space.");
	};
	this.getPowerName = function (co) {
		return qsTr("Artemis Munitions");
	};
	this.getSuperPowerDescription = function (co) {
		return qsTr("In addition to CO Power's effects, non-footsoldier direct combat units may attack at 2-3 range, allowing them to engage in indirect combat. They may still move prior to attacking in this way, and will push the unit they attack as normal, however they may only make an indirect attack in the cardinal directions.");
	};
	this.getSuperPowerName = function (co) {
		return qsTr("Taurus Munitions");
	};
	this.getPowerSentences = function (co) {
		if (co.getPowerMode() >= GameEnums.PowerMode_Superpower) {
			return [qsTr("Didn't go down to the Vek. No way in Hell I'm going down to you."),
			qsTr("Better a localized breach, but this should still work to our advantage.")];
		}
		return [qsTr("Don't have my mech anymore, but I can still fight like I do!"),
		qsTr("All right, Green Earth. Let's use what I taught you.")];
	};
	this.getVictorySentences = function (co) {
		return [qsTr("We won. Come on, Green Earth, let's turn the tide everywhere."),
		qsTr("This could be my last timeline. So I'll hold it.")];
	};
	this.getDefeatSentences = function (co) {
		return [qsTr("Open a breach! I mean, fall back!... Damn force of habit..."),
		qsTr("I have to be more careful. There are no takebacks here.")];
	};
	this.getName = function () {
		return qsTr("Ralph");
	};
}

Constructor.prototype = CO;
var CO_RALPH_CONTEST = new Constructor();
