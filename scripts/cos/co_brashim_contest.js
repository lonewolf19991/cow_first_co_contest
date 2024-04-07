var Constructor = function () {
    this.init = function (co, map) {
        co.setPowerStars(3);
        co.setSuperpowerStars(3);
    };


    this.getMovementpointModifier = function(co, unit, posX, posY, map)
    {
        if (CO.isActive(co))
        {
            if (co.getPowerMode() === GameEnums.PowerMode_Superpower ||
                    co.getPowerMode() === GameEnums.PowerMode_Tagpower)
            {
                return 1;
            }
           
        }
        return 0;
    };


    this.brashimDamage = function(co, value, powerNameAnimation, map)
    {

        var player = co.getOwner();
        var units = player.getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();
        for (var i = 0; i < units.size(); i++)
        {
            var unit = units.at(i);

            var animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
            animation.writeDataInt32(unit.getX());
            animation.writeDataInt32(unit.getY());
            animation.writeDataInt32(value-1);
            animation.setEndOfAnimationCall("ANIMATION", "postAnimationDamage");
            var delay = globals.randInt(135, 265);
            if (animations.length < 5)
            {
                delay *= i;
            }
            animation.setSound("power4.wav", 1, delay);
            if (animations.length < 5)
            {
                animation.addSprite("power4", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                powerNameAnimation.queueAnimation(animation);
                animations.push(animation);
            }
            else
            {
                animation.addSprite("power4", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                animations[counter].queueAnimation(animation);
                animations[counter] = animation;
                counter++;
                if (counter >= animations.length)
                {
                    counter = 0;
                }
            }
        }
        var playerCounter = map.getPlayerCount();
        for (var i2 = 0; i2 < playerCounter; i2++)
        {
            var enemyPlayer = map.getPlayer(i2);
            if ((enemyPlayer !== player) &&
                (player.checkAlliance(enemyPlayer) === GameEnums.Alliance_Enemy))
            {

                units = enemyPlayer.getUnits();
                units.randomize();
                for (i = 0; i < units.size(); i++)
                {
                    unit = units.at(i);
                    animation = GameAnimationFactory.createAnimation(map, unit.getX(), unit.getY());
                    animation.writeDataInt32(unit.getX());
                    animation.writeDataInt32(unit.getY());
                    animation.writeDataInt32(value);
                    animation.setEndOfAnimationCall("ANIMATION", "postAnimationDamage");
                    var delay = globals.randInt(135, 265);
                    if (animations.length < 5)
                    {
                        delay *= i;
                    }
                    animation.setSound("power4.wav", 1, delay);
                    if (animations.length < 5)
                    {
                        animation.addSprite("power4", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                        powerNameAnimation.queueAnimation(animation);
                        animations.push(animation);
                    }
                    else
                    {
                        animation.addSprite("power4", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, 0, 2, delay);
                        animations[counter].queueAnimation(animation);
                        animations[counter] = animation;
                        counter++;
                        if (counter >= animations.length)
                        {
                            counter = 0;
                        }
                    }
                }
            }
        }
    };


    this.activatePower = function(co, map)
    {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);

        CO_BRASHIM_CONTEST.brashimDamage(co, 2, powerNameAnimation, map);
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
            animation.writeDataInt32(unit.getX());
            animation.writeDataInt32(unit.getY());
            
            animation.writeDataInt32(1);
            animation.setEndOfAnimationCall("ANIMATION", "postAnimationHeal");

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
                audio.addMusic("mods/cow_first_co_contest/music/cos/brashim.mp3", 0, 0);
                break;
        }
    };

    this.getCOUnitRange = function (co, map) {
        return 0;
    };
    this.getCOArmy = function () {
        return "YC";
    };
    // CO - Intel
    this.getBio = function (co) {
        return qsTr("A student with a military background, who became a commander with a mixed reputation from the public. Brashim will aim for results and be honest about it in an impopular manner.");
    };
    this.getHits = function (co) {
        return qsTr("Rubber duckies");
    };
    this.getMiss = function (co) {
        return qsTr("Misunderstandings");
    };
    this.getCODescription = function (co) {
        return qsTr("Units produced with a value of 10,000G have +10% firepower. Units produced with a value of over 10,000G have +10% defense");
    };
    this.getPowerDescription = function (co) {
        return qsTr("Enemy units lose 2HP, your own units lose 1HP");
    };
    this.getPowerName = function (co) {
        return qsTr("Global Morale Drop");
    };
    this.getSuperPowerDescription = function (co) {
        return qsTr("Units restore 1HP, have +1 movement and +10% firepower");
    };
    this.getSuperPowerName = function (co) {
        return qsTr("Inspired Redemption");
    };
    this.getPowerSentences = function (co) {

        switch (co.getPowerMode()) {
            case GameEnums.PowerMode_Power:
                return [qsTr("Everyone wants to go home, but think about all the money you could get for fighting‼"), qsTr("Remember you are not here because you are idiots, we're all specialists here‼")];
                break;
            case GameEnums.PowerMode_Superpower:
            case GameEnums.PowerMode_Tagpower:
                 return [qsTr("Lets end it here,then we're going home‼"), qsTr("We have been doing our best for this, lets go‼")];
                break;
            
        }

        return [qsTr("Attack!"), qsTr("Destroy the Enemy!")];
    };
    this.getVictorySentences = function (co) {
        return [qsTr("Lets call it day, we are stronger")];
    };
    this.getDefeatSentences = function (co) {
        return [qsTr("We will retreat for now...")];
    };
    this.getName = function () {
        return qsTr("Brashim");
    };
}

Constructor.prototype = CO;
var CO_BRASHIM_CONTEST = new Constructor();




CO_BRASHIM_CONTEST.getOffensiveBonus = function (co, attacker, atkPosX, atkPosY,
    defender, defPosX, defPosY, isDefender, action, luckMode, map) {



    if (co.getIsCO0() === true) {
        
        var unitValue = (attacker.getUnitValue() / attacker.getHp()) * 10; 

        switch (co.getPowerMode()) {

           


            case GameEnums.PowerMode_Superpower:
            case GameEnums.PowerMode_Tagpower:
                if(unitValue <= 10000)
                {
                    GameConsole.print("super  unit value: "+unitValue, 1);
                return 20;
                
                }
                return 10; 

            case GameEnums.PowerMode_Power:
                if(unitValue <= 10000)
                {
                  GameConsole.print("power unit value: "+unitValue, 1);
                return 10;
                }

            default:
                if(unitValue <= 10000)
                {
                  GameConsole.print("d2d unit value: "+unitValue, 1);
                return 10;
                }
                break;
        }
    }
    return 0;

};

CO_BRASHIM_CONTEST.getDeffensiveBonus = function (co, attacker, atkPosX, atkPosY,
    defender, defPosX, defPosY, isDefender, action, luckMode, map) {
    if (co.getIsCO0() === true) {
        var unitValue = (defender.getUnitValue() / defender.getHp()) * 10; 
        switch (co.getPowerMode()) {

            case GameEnums.PowerMode_Superpower:
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Power:
                if(unitValue >10000)
                {
                    GameConsole.print("super  unit value defense: "+unitValue, 1);
                    return 20; 
                    
                }
                return 10; 

            default:
                if(unitValue >10000)
                {
                    GameConsole.print("super  unit value defense: "+unitValue, 1);
                    return 10; 
                }
                break;
        }
    }
    return 0;
};