var Constructor = function () {
    this.init = function (co, map) {
        co.setPowerStars(2);
        co.setSuperpowerStars(3);
    };


    this.startOfTurn = function (co, map) {
        var variables = co.getVariables();
        var bitteUnitsVar = variables.createVariable("Bitten Units");
        var emptyArray = [];

        bitteUnitsVar.writeDataListInt32(emptyArray);
        var selectTargetVar = variables.createVariable("Select Target");

        selectTargetVar.writeDataBool(false);


    };


    this.isNearPillars = function (co, posX, posY, range, map) {
        var nearPillars = false;
        var fields = globals.getCircle(0, range);
        if (map !== null) {
            for (var i = 0; i < fields.size(); i++) {
                var x = fields.at(i).x + posX;
                var y = fields.at(i).y + posY;
                if (map.onMap(x, y)) {
                    var pillar = map.getTerrain(x, y).getBuilding();
                    if (pillar !== null && pillar.getBuildingID() === "PILLAR" && pillar.getOwner() === co.getOwner()) {
                        fields.remove();
                        return true;
                    }
                }
            }
        }

        fields.remove();
        return false;
    }


    this.deployPillar =  function(co,posX, posY, map)
    {
        var terrainId = map.getTerrain(posX, posY).getBaseTerrainID();

        var buildingId = map.getTerrain(posX, posY).getBuilding();


        var invalidTerrains = ["FOREST", "FOREST1", "FOREST2", "FOREST3", "LAKE", "METEOR", "MOUNTAIN", "PIPELINE", "PLAINS_DESTROYED",
        "PLAINS_PLASMA", "PLASMA", "REAF", "RIVER", "ROUGH_SEA", "RUIN", "SNOW_DESTROYEDWELD", "SNOW_FOREST", "SNOW_FOREST1", "SNOW_FOREST2", "SNOW_MOUNTAIN", "SNOW_PIPELINE", "SNOW_RUIN", "SNOW_WASTELAND", "SNOW_WELD", "TELEPORTTILE", "WALL", "WASTE", "WASTELAND", "WASTE_DESTROYEDWELD",
        "WASTE_FOREST", "WASTE_MOUNTAIN", "WASTE_PIPELINE", "WASTE_RUIN", "WASTE_WASTELAND", "WASTE_WELD", "WEAK_WALL", "WELD" ];

        //terrainId
       
        if(!invalidTerrains.includes(terrainId) && buildingId === null)
       { 

        

        map.replaceTerrainOnly("PLAINS", posX, posY);
        map.replaceBuilding("PILLAR", posX, posY);
        var terrain = map.getTerrain(posX, posY);
        terrain.getBuilding().setOwner(map.getCurrentPlayer());
        terrain.loadSprites();
       }


    }



    this.setContaminationArea = function (co, posX, posY, range, map) {
        var nearContamination = false;
        var fields = globals.getCircle(0, range);
        if (map !== null) {

            var variables = co.getVariables();

            var contaminationXVar = variables.createVariable("Contamination X");
            var contaminationYVar = variables.createVariable("Contamination Y");

            var contaminationX = contaminationXVar.readDataListInt32();
            var contaminationY = contaminationYVar.readDataListInt32();
            for (var i = 0; i < fields.size(); i++) {
                var x = fields.at(i).x + posX;
                var y = fields.at(i).y + posY;
                if (map.onMap(x, y)) {




                    contaminationX.push(x);
                    contaminationY.push(y);

                    if (i === 12) {
                        contaminationXVar.writeDataListInt32(contaminationX);
                        contaminationYVar.writeDataListInt32(contaminationY);

                        GameConsole.print("Reached writing of the arrays at value:  " + i, 1);


                    }

                    var pillar = map.getTerrain(x, y).addTerrainOverlay("trundle_contaminate", x, y);

                    GameConsole.print("Position of the contamination x: " + x + " y: " + y + " and i value of " + i, 1);
                    fields.remove();
                    //return true;
                }
            }
            var contaminationXB = contaminationXVar.readDataListInt32();
            for (w = 0; w < contaminationXB.length; w++)
                GameConsole.print("ContaminationX value " + contaminationXB[w], 1);


            return true;
        }

        fields.remove();
        return false;



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
                audio.addMusic("mods/cow_first_co_contest/music/cos/trundle.mp3", 0, 0);
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
        return qsTr("Trundle is a hulking and devious troll with a particularly vicious streak, and there is nothing he cannot bludgeon into submission.");
    };
    this.getHits = function (co) {
        return qsTr("Trolling");
    };
    this.getMiss = function (co) {
        return qsTr("Hakolin");
    };
    this.getCODescription = function (co) {
        return qsTr(" Enemies attacked by a unit heal for 1 less on their next turn (not stacking)");
    };
    this.getPowerDescription = function (co) {
        return qsTr("Erect an immobile but destructible and rather tanky pillar on an empty location, adjacent enemies gain -10 def, adjacent allies gain +10 attack (Click on an owned city or HQ to activate)");
    };
    this.getPowerName = function (co) {
        return qsTr("Pillar of Filth");
    };
    this.getSuperPowerDescription = function (co) {
        return qsTr("Choose a missile-radius area to infect: enemies in that area gain -10/-10, allies in that area gain +20/+10 (Click on an owned city or HQ to activate)");
    };
    this.getSuperPowerName = function (co) {
        return qsTr("Contaminate");
    };
    this.getPowerSentences = function (co) {
        return [qsTr("Time to troll!"), qsTr("King of trolls, coming through!")];
    };
    this.getVictorySentences = function (co) {
        return [qsTr("Troll with the biggest club gets to be king. That's the rule!"),
        qsTr("If you want me to hit you less, die sooner!")];
    };
    this.getDefeatSentences = function (co) {
        return [qsTr("But I... Troll king...")];
    };
    this.getName = function () {
        return qsTr("Trundle");
    };
}

Constructor.prototype = CO;
var CO_TRUNDLE_CONTEST = new Constructor();


CO_TRUNDLE_CONTEST.getOtherRepairBonus = function(co, unit, posX, posY, map)
    {
        var unitID = unit.getUniqueID();

        var variables = co.getVariables();
            var bittenUnitsVar = variables.createVariable("Bitten Units");
            var bittenUnits = bittenUnitsVar.readDataListInt32();

            GameConsole.print("Repair bonus function ", 1);
        
            for (var i2 = 0; i2 < bittenUnits.length; i2++)
            {

                GameConsole.print("Unit unique ID: "+unit.getUniqueID() +" bitten units: " +bittenUnits[i2], 1);

                if(unit.getUniqueID() === bittenUnits[i2])
                {
                    return -1;
                }
              
            }


        return 0;
    };



CO_TRUNDLE_CONTEST.postBattleActions = function (co, attacker, atkDamage, defender, gotAttacked, weapon, action, map) {

    var player = co.getOwner();

    var playerCounter = map.getPlayerCount();

    for (var i2 = 0; i2 < playerCounter; i2++) {
        var enemyPlayer = map.getPlayer(i2);
        if ((enemyPlayer !== player) &&
            (player.checkAlliance(enemyPlayer) === GameEnums.Alliance_Enemy) && defender.getOwner() === enemyPlayer && !gotAttacked) {
            defender.loadIcon("fangs2", map.getImageSize() / 2, map.getImageSize() / 2, 1, enemyPlayer);

            var unitID = defender.getUniqueID();

            var variables = co.getVariables();
            var bittenUnitsVar = variables.createVariable("Bitten Units");
            var bittenUnits = bittenUnitsVar.readDataListInt32();

            var unitID = defender.getUniqueID();
            if (bittenUnits.indexOf(unitID) === -1) {
                bittenUnits.push(unitID);
            }
            bittenUnitsVar.writeDataListInt32(bittenUnits);

        }
    }

};



CO_TRUNDLE_CONTEST.getAdditionalBuildingActions = function (co, building, map) {

    var variables = co.getVariables();

    var selectTargetVar = variables.createVariable("Select Target");
    var targetSelected = false; 

    if (selectTargetVar.readDataBool() !== null)
    {
        targetSelected = selectTargetVar.readDataBool(); 


    }
    GameConsole.print("Target Selected value : "+targetSelected,1);





    if ((building.getBuildingID() === "HQ" || building.getBuildingID() === "TOWN") && building.getOwner() === co.getOwner() && co.getPowerMode() === GameEnums.PowerMode_Power && targetSelected === false) {

        selectTargetVar.writeDataBool(true);
        return "ACTION_DEPLOYPILLAR";
        
    }

    if ((building.getBuildingID() === "HQ" || building.getBuildingID() === "TOWN") && building.getOwner() === co.getOwner()  && co.getPowerMode() >= GameEnums.PowerMode_Superpower && targetSelected === false) {
        
        selectTargetVar.writeDataBool(true);
        return "ACTION_CONTAMINATE";
    }

};

CO_TRUNDLE_CONTEST.postAction = function (co, action, map) {



    var meteorTarget = co.getOwner().getRockettarget(1, 1);
    var aiTypes = [GameEnums.AiTypes_VeryEasy, GameEnums.AiTypes_Normal,
    GameEnums.AiTypes_NormalOffensive, GameEnums.AiTypes_NormalDefensive];


    if (action.getActionID() === "ACTION_DEPLOYPILLAR") {

        action.startReading();

        if (aiTypes.indexOf(co.getOwner().getControlType()) == -1) {
          
        CO_TRUNDLE_CONTEST.deployPillar(co, action.readDataInt32(), action.readDataInt32(), map );
         
       GameConsole.print("Deploy Pillar (human) data x: " + action.readDataInt32() + " data y: " + action.readDataInt32(), 1);
        }
        else{

            GameConsole.print("Deploy Pillar (AI) coordinate X: "+meteorTarget.x + " coordinate Y: "+meteorTarget.y,1);
            CO_TRUNDLE_CONTEST.deployPillar(co, meteorTarget.x, meteorTarget.y, map );

        }
       
    }

    if (action.getActionID() === "ACTION_CONTAMINATE") {

      

        action.startReading();

       
            CO_TRUNDLE_CONTEST.setContaminationArea(co, action.readDataInt32(), action.readDataInt32(), 2, map);
        
        
       
         
    }


};




CO_TRUNDLE_CONTEST.getOffensiveBonus = function (co, attacker, atkPosX, atkPosY,
    defender, defPosX, defPosY, isDefender, action, luckmode, map) {
    var ret = 0;


    if (CO_TRUNDLE_CONTEST.isNearPillars(co, atkPosX, atkPosY, 3, map)) {
        ret += 10;
    }

    var variables = co.getVariables();

    var contaminationXVar = variables.createVariable("Contamination X");
    var contaminationYVar = variables.createVariable("Contamination Y");

    var contaminationX = contaminationXVar.readDataListInt32();
    var contaminationY = contaminationYVar.readDataListInt32();


    for (var i = 0; i < contaminationX.length; i++) {


        if (atkPosX === contaminationX[i] && atkPosY === contaminationY[i] && attacker.getOwner() === co.getOwner()) {
            GameConsole.print("Attack Position x variable: " + contaminationX[i] + ", Unit Position X " + atkPosX + " Attack Position y variable:  " + contaminationY[i] + ", Unit Position Y: " + atkPosY, 1);
            ret += 20;
        }


    }




    GameConsole.print("Offensive bonus return " + ret, 1);
    return ret;
};



CO_TRUNDLE_CONTEST.getOffensiveReduction = function (co, attacker, atkPosX, atkPosY,
    defender, defPosX, defPosY, isAttacker, action, luckmode, map) {
    var ret = 0;

    var variables = co.getVariables();

    var contaminationXVar = variables.createVariable("Contamination X");
    var contaminationYVar = variables.createVariable("Contamination Y");

    var contaminationX = contaminationXVar.readDataListInt32();
    var contaminationY = contaminationYVar.readDataListInt32();

    for (var i = 0; i < contaminationX.length; i++) {


        if (atkPosX == contaminationX[i] && atkPosY == contaminationY[i] && attacker.getOwner() !== co.getOwner()) {
            GameConsole.print("Attack Position x variable: " + contaminationX[i] + ", Unit Position X " + atkPosX + " Attack Position y variable:  " + contaminationY[i] + ", Unit Position Y: " + atkPosY, 1);
            ret += 10;
        }


    }




    GameConsole.print("Offensive reduction return " + ret, 1);

    return ret;
};


CO_TRUNDLE_CONTEST.getDeffensiveReduction = function (co, attacker, atkPosX, atkPosY,
    defender, defPosX, defPosY, isAttacker, action, luckMode, map) {
    var ret = 0;
    var variables = co.getVariables();

    var contaminationXVar = variables.createVariable("Contamination X");
    var contaminationYVar = variables.createVariable("Contamination Y");

    var contaminationX = contaminationXVar.readDataListInt32();
    var contaminationY = contaminationYVar.readDataListInt32();

    for (var i = 0; i < contaminationX.length; i++) {


        if (defPosX == contaminationX[i] && defPosY == contaminationY[i] && defender.getOwner() !== co.getOwner()) {
            ret += 10;
        }


    }

    if (CO_TRUNDLE_CONTEST.isNearPillars(co, defPosX, defPosY, 3, map)) {
        if (co.getOwner().isEnemyUnit(defender)) {
            ret += 10;
        }
    }

    GameConsole.print("Defensive reduction return " + ret, 1);

    return ret;

};



CO_TRUNDLE_CONTEST.getDeffensiveBonus = function (co, attacker, atkPosX, atkPosY,
    defender, defPosX, defPosY, isDefender, action, luckMode, map) {
    if (co.getIsCO0() === true) {

        var ret = 0;
        var variables = co.getVariables();

        var contaminationXVar = variables.createVariable("Contamination X");
        var contaminationYVar = variables.createVariable("Contamination Y");

        var contaminationX = contaminationXVar.readDataListInt32();
        var contaminationY = contaminationYVar.readDataListInt32();

        for (var i = 0; i < contaminationX.length; i++) {


            if (defPosX == contaminationX[i] && defPosY == contaminationY[i] && defender.getOwner() === co.getOwner()) {
                ret += 10;
            }


        }


        switch (co.getPowerMode()) {

            case GameEnums.PowerMode_Superpower:
            case GameEnums.PowerMode_Tagpower:
            case GameEnums.PowerMode_Power:
                ret += 10;
                break;
        }

        GameConsole.print("Defensive Bonus return " + ret, 1);

        return ret;
    }

};