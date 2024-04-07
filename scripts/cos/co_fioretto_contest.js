var Constructor = function () {
    this.init = function (co, map) {
        co.setPowerStars(3);
        co.setSuperpowerStars(3);
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
                audio.addMusic("mods/cow_first_co_contest/music/cos/fioretto.mp3", 0, 0);
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
        return qsTr("A former fencing instructor from a neighbouring country, Fioretto was recruited to join Green Earth's ranks as a CO. He values precise strikes and a clear distinction between attacking and defending.");
    };
    this.getHits = function (co) {
        return qsTr("Honor and duty");
    };
    this.getMiss = function (co) {
        return qsTr("Unrefined tactics");
    };
    this.getCODescription = function (co) {
        return qsTr("Units have +10/-10 on his turn, and -10/+10 otherwise");
    };
    this.getPowerDescription = function (co) {
        return qsTr("Fioretto doubles his day to day (+30/-10 on his turn, and -10/+30 otherwise),enemy units get the inverse of Fioretto's day to day (-10/+10 on their turn, +10/-10 otherwise)");
    };
    this.getPowerName = function (co) {
        return qsTr("En Garde!");
    };
    this.getSuperPowerDescription = function (co) {
        return qsTr("Direct units have +2 move, all other units have +1 move on his turn, attacks deal 1 bonus true damage and ignore half of the opponents defense boosts (terrain and innate); If Fioretto's units do not destroy the enemy, Fioretto's units also take 1 true damage.");
    };
    this.getSuperPowerName = function (co) {
        return qsTr("Flèche");
    };
    this.getPowerSentences = function (co) {
        return [qsTr("The time to strike is now!"), qsTr("Who wants to pick a duel?!"), qsTr("They do not stand a chance!"), qsTr("Step up your efforts, the dance of battle awaits!")];
    };
    this.getVictorySentences = function (co) {
        return [qsTr("The obvious outcome. We were well prepared!"), qsTr("You've fallen before our blades... and wits!"), qsTr("Not half bad. We stand victorious!")];
    };
    this.getDefeatSentences = function (co) {
        return [qsTr("Most unfortunate. I hope this will not hurt our cooperation."), qsTr("We lost our rhythm. There is no victory without it."),qsTr("They broke our focus! This can not happen again!")];
    };
    this.getName = function () {
        return qsTr("Fioretto");
    };
}

Constructor.prototype = CO;
var CO_FIORETTO_CONTEST = new Constructor();



CO_FIORETTO_CONTEST.postBattleActions = function (co, attacker, atkDamage, defender, gotAttacked, weapon, action, map) {

    if (co.getPowerMode() >= GameEnums.PowerMode_Superpower) {

        if (!gotAttacked && defender.getOwner() === co.getOwner() && attacker.getHp() >= 0) {
            defender.setHp(Math.ceil(defender.getHp()) - 1);

        }


    }
};








CO_FIORETTO_CONTEST.getTrueDamage = function (co, damage, attacker, atkPosX, atkPosY, attackerBaseHp,
    defender, defPosX, defPosY, isDefender, action, luckmode, map) {
    if (co.getIsCO0() === true) {
        if (co.getPowerMode() === GameEnums.PowerMode_Superpower ||
            co.getPowerMode() === GameEnums.PowerMode_Tagpower) {
            var attackerPosition = Qt.point(atkPosX, atkPosY);
            var defenderPosition = Qt.point(defPosX, defPosY);

            var baseDamage1 = -1;
            var baseDamage2 = -1;
            var weaponID1 = attacker.getWeapon1ID();
            if (attacker.hasAmmo1() && weaponID1 !== "" &&
                attacker.canAttackWithWeapon(0, atkPosX, atkPosY, defPosX, defPosY, 0)) {
                baseDamage1 = Global[weaponID1].getBaseDamage(defender);
            }
            var weaponID2 = attacker.getWeapon2ID();
            if (attacker.hasAmmo2() && weaponID2 !== "" &&
                attacker.canAttackWithWeapon(1, atkPosX, atkPosY, defPosX, defPosY, 0)) {
                baseDamage2 = Global[weaponID2].getBaseDamage(defender);
            }
            var attackerWeapon = weaponID1;
            var baseDamage = baseDamage1;
            if (baseDamage2 > baseDamage1) {
                attackerWeapon = weaponID2;
                baseDamage = baseDamage2;
            }

            var offensive = 100 + attacker.getBonusOffensive(action, attackerPosition, defender, defenderPosition, isDefender, luckmode);
            var defensive = 100 + defender.getBonusDefensive(action, defenderPosition, attacker, attackerPosition, isDefender, luckmode);
            var attackerHp = attackerBaseHp + attacker.getAttackHpBonus(attackerPosition);
            var luckDamage = 0;
            if (luckmode !== GameEnums.LuckDamageMode_Off) {
                var luck = 10 + attacker.getBonusLuck(attackerPosition);
                var misfortune = attacker.getBonusMisfortune(attackerPosition);
                // only roll if we have valid luck misfortune pair
                if (luck > -misfortune) {
                    if (luckmode === GameEnums.LuckDamageMode_On) {
                        var luckValue = 0;
                        // roll luck?
                        if (luck > 0) {
                            // roll against zero or against negative misfortune?
                            if (misfortune < 0) {
                                luckValue = globals.randInt(-misfortune, luck);
                            }
                            else {
                                luckValue = globals.randInt(0, luck);
                            }
                        }
                        var misfortuneValue = 0;
                        // roll misfortune?
                        if (misfortune > 0) {
                            // roll against zero or against luck?
                            if (luck < 0) {
                                misfortuneValue = globals.randInt(-misfortune, luck);
                            }
                            else {
                                misfortuneValue = globals.randInt(-misfortune, 0);
                            }
                        }
                        luckDamage += (luckValue + misfortuneValue);
                    }
                    else if (luckmode === GameEnums.LuckDamageMode_Average) {
                        luckDamage += (-misfortune + luck) / 2;
                    }
                    else if (luckmode === GameEnums.LuckDamageMode_Min) {
                        luckDamage -= misfortune;
                    }
                    else if (luckmode === GameEnums.LuckDamageMode_Max) {
                        luckDamage += luck;
                    }
                }
            }
            var normalDamage = Global[attackerWeapon].calculateDamage(attackerHp, baseDamage, offensive, defensive, luckDamage, map);
            var fixedDamage = Global[attackerWeapon].calculateDamage(attackerHp, baseDamage, offensive, (100 + defensive) / 2, luckDamage, map);
            return 10 + fixedDamage - normalDamage;
        }
    }
    return 0;
}




CO_FIORETTO_CONTEST.getMovementpointModifier = function (co, unit, posX, posY, map) {
    if (co.getIsCO0() === true) {
        if (co.getPowerMode() === GameEnums.PowerMode_Superpower ||
            co.getPowerMode() === GameEnums.PowerMode_Tagpower) {
            var isDirect = (unit.getBaseMaxRange() === 1 && unit.getUnitType() !== GameEnums.UnitType_Infantry);

            if (isDirect) {
                return 2;
            }
            else {
                return 1;
            }
        }

    }
    return 0;
};





CO_FIORETTO_CONTEST.getOffensiveBonus = function (co, attacker, atkPosX, atkPosY,
    defender, defPosX, defPosY, isDefender, action, luckMode, map) {

    if (co.getIsCO0() === true) {
        switch (co.getPowerMode()) {



            case GameEnums.PowerMode_Power:
                if (map.getCurrentPlayer() === co.getOwner()) {
                    return 30;
                }
                else {
                    return -10;
                }

            default:
                if (map.getCurrentPlayer() === co.getOwner()) {
                    return 10;
                }
                else {
                    return -10;
                }

                break;
        }
    }
    return 0;

};

CO_FIORETTO_CONTEST.getDeffensiveBonus = function (co, attacker, atkPosX, atkPosY,
    defender, defPosX, defPosY, isDefender, action, luckMode, map) {
    if (co.getIsCO0() === true) {
        switch (co.getPowerMode()) {

            case GameEnums.PowerMode_Superpower:
            case GameEnums.PowerMode_Tagpower:
                return 10;

            case GameEnums.PowerMode_Power:
                if (map.getCurrentPlayer() === co.getOwner()) {
                    return -10;
                }
                else {
                    return 30;
                }


            default:
                if (map.getCurrentPlayer() === co.getOwner()) {
                    return -10;
                }
                else {
                    return 10;
                }
                break;
        }
    }
    return 0;
};
