var Constructor = function () {
	this.init = function (co, map) {
		co.setPowerStars(3);
		co.setSuperpowerStars(3);
	};
	
	this.getAiCoUnitBonus = function(co, unit, map)
    {
        return 1;
    }

	this.startOfTurn = function (co, map) {
		var variables = co.getVariables();
		var waitingUnitsVar = variables.createVariable("Waiting Units");
		var emptyArray = [];

		waitingUnitsVar.writeDataListInt32(emptyArray);
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
			if (unit.getHasMoved() === false) {
				animation.writeDataInt32(unit.getX());
				animation.writeDataInt32(unit.getY());
				animation.writeDataInt32(unit.getUniqueID());
				animation.writeDataInt32(4);
				animation.writeDataBool(false);
				animation.setEndOfAnimationCall("CO_BILL_CONTEST", "healUnwaitedUnits");
			}
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
			if (unit.getHasMoved() === false) {
				animation.writeDataInt32(unit.getX());
				animation.writeDataInt32(unit.getY());
				animation.writeDataInt32(unit.getUniqueID());
				animation.writeDataInt32(10);
				animation.writeDataBool(true);
				animation.setEndOfAnimationCall("CO_BILL_CONTEST", "healUnwaitedUnits");
			}
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

	this.healUnwaitedUnits = function (postAnimation, map) {
		postAnimation.seekBuffer();
		var uX = postAnimation.readDataInt32();
		var uY = postAnimation.readDataInt32();
		var unitID = postAnimation.readDataInt32();
		var value = postAnimation.readDataInt32();
		var scop = postAnimation.readDataBool();

		var unit = map.getUnit(unitID);
		var hp = Math.ceil(unit.getHp());


		unit.setHp(hp + value);
		if (scop) {
			CO_BILL_CONTEST.moveRandomly(unit, uX, uY, map);
		}
		unit.setHasMoved(true);
	};

	this.getPerfectHpView = function (co, unit, posX, posY, map) {
        
        return true;
    };


	this.moveRandomly = function (unit, uX, uY, map) {
		var validSpaces = [];
		var fields = globals.getCircle(0, 2);
		var fieldsSize = fields.size();
		for (var i = 0; i < fieldsSize; i++) {
			var x = fields.at(i).x + uX;
			var y = fields.at(i).y + uY;
			var terrain = map.getTerrain(x, y);

			if (map.onMap(x, y) && unit.canMoveOver(x, y) === true && terrain.getUnit() === null) {
				validSpaces.push([x, y]);
			}
		}
		fields.remove();

		var randomIndex = globals.randInt(0, validSpaces.length - 1);
		if (validSpaces.length > 0) {
			unit.moveUnitToField(validSpaces[randomIndex][0], validSpaces[randomIndex][1]);
		}
		else {
			unit.setHasMoved(true);
		}
	}


	this.getDeffensiveBonus = function (co, attacker, atkPosX, atkPosY,
		defender, defPosX, defPosY, isDefender, action, luckMode, map) {
		var ret = 0;
		if (defender.getOwner() === co.getOwner()) {
			var variables = co.getVariables();
			var waitingUnitsVar = variables.createVariable("Waiting Units");
			var waitingUnits = waitingUnitsVar.readDataListInt32();

			var unitID = defender.getUniqueID();

			if (waitingUnits.indexOf(unitID) > -1) {
				ret -= 30;
			}
		}

		if (co.getPowerMode() === GameEnums.PowerMode_Power) {
			ret += 10;
		}
		if(co.getPowerMode() === GameEnums.PowerMode_Superpower)
		{
			ret +=30; 
		}

		return ret;
	};

	this.postAction = function (co, action, map) {
		if (action.getActionID() === "ACTION_WAIT") {
			var path = action.getMovePath();
			if (path.length === 0) {
				var unit = action.getPerformingUnit();

				var variables = co.getVariables();
				var waitingUnitsVar = variables.createVariable("Waiting Units");
				var waitingUnits = waitingUnitsVar.readDataListInt32();

				var unitID = unit.getUniqueID();
				if (waitingUnits.indexOf(unitID) === -1) {
					waitingUnits.push(unitID);
				}
				waitingUnitsVar.writeDataListInt32(waitingUnits);

				var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
				animation.writeDataInt32(unit.getX());
				animation.writeDataInt32(unit.getY());
				animation.writeDataInt32(2);
				animation.addSprite("power9", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2);
				animation.setSound("power9_1.wav", 1, 0);
				animation.setEndOfAnimationCall("ANIMATION", "postAnimationHeal");
			}
		}
	};

	this.loadCOMusic = function (co, map) {
		// put the co music in here.
		switch (co.getPowerMode()) {
			case GameEnums.PowerMode_Power:
				audio.addMusic("mods/cow_first_co_contest/music/cos/billcop.mp3", 0, 0);
				break;
			case GameEnums.PowerMode_Superpower:
				audio.addMusic("mods/cow_first_co_contest/music/cos/billscop.mp3", 0, 0);
				break;
			case GameEnums.PowerMode_Tagpower:
				audio.addMusic("mods/cow_first_co_contest/music/cos/billscop.mp3", 0, 0);
				break;
			default:
				audio.addMusic("mods/cow_first_co_contest/music/cos/bill.mp3", 0, 0);
				break;
		}
	};

	this.getCOUnitRange = function (co, map) {
		return 0;
	};
	this.getCOArmy = function () {
		return "OS";
	};
	// CO - Intel
	this.getBio = function (co) {
		return qsTr("A relaxed commander, prone to falling asleep on duty. This causes his men to fall asleep, too.");
	};
	this.getHits = function (co) {
		return qsTr("Bird Song");
	};
	this.getMiss = function (co) {
		return qsTr("Coffee");
	};
	this.getCODescription = function (co) {
		return qsTr("If a unit has not moved, upon selecting wait the unit regains 2HP, but loses 30% defense until your next turn.");
	};
	this.getPowerDescription = function (co) {
		return qsTr("Any unwaited units are immediately waited and regain 4HP, no defense penalty.");
	};
	this.getPowerName = function (co) {
		return qsTr("Power Nap");
	};
	this.getSuperPowerDescription = function (co) {
		return qsTr("Any unwaited units are restored to full health. They move randomly for the rest of the turn, get 30% defense.");
	};
	this.getSuperPowerName = function (co) {
		return qsTr("Sleepwalking");
	};
	this.getPowerSentences = function (co) {
		return [qsTr("I have strategically decided it's time for a tactical nap."),
		qsTr("Don't underestimate the power of a well-rested soldier.")];
	};
	this.getVictorySentences = function (co) {
		return [qsTr("That's all for today's orders, let's go to sleep."),
		qsTr("All this fighting has made me exhausted.")];
	};
	this.getDefeatSentences = function (co) {
		return [qsTr("*snore*")];
	};
	this.getName = function () {
		return qsTr("Bill");
	};
}

Constructor.prototype = CO;
var CO_BILL_CONTEST = new Constructor();
