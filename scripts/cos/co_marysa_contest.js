var Constructor = function () {
    this.init = function (co, map) {
        co.setPowerStars(2);
        co.setSuperpowerStars(4);
    };



    this.buildedUnit = function (co, unit, map) {

        var variables = co.getVariables();
        var hybridNavals = variables.createVariable("hybridNavals");

        var restrictedUnits = ["SUBMARINE", "DESTROYER", "WATERMINE", "BLACK_BOAT", "ZCOUNIT_MISSILE_SUB"];

        var aiTypes = [GameEnums.AiTypes_VeryEasy, GameEnums.AiTypes_Normal,
             GameEnums.AiTypes_NormalOffensive, GameEnums.AiTypes_NormalDefensive];



        if (((co.getPowerMode() === GameEnums.PowerMode_Superpower || co.getPowerMode() === GameEnums.PowerMode_Tagpower)
            && unit.getUnitType() === GameEnums.UnitType_Naval) || hybridNavals.readDataBool() === true) {
            var moveType = unit.getMovementType();
            if ((moveType === "MOVE_BOAT" || moveType === "MOVE_SHIP" || moveType === "MOVE_SMALL_BOAT") 
            && (restrictedUnits.indexOf(unit.getUnitID()) == -1 && aiTypes.indexOf(co.getOwner().getControlType()) == -1)) {
                var playerId = co.getOwner().getPlayerID();
                unit.loadIcon("amphibious3", map.getImageSize() / 2, map.getImageSize() / 2, 999, playerId);
                unit.setMovementType(moveType + "_ENHANCED");

                //set unique variable to check against every start on turn in case of a desync
                var uniqueVariable = variables.createVariable(unit.getUniqueID().toString());

                uniqueVariable.writeDataBool(true);



            }
        }

    };

    this.activatePower = function (co, map) {
        var dialogAnimation = co.createPowerSentence();
        var powerNameAnimation = co.createPowerScreen(GameEnums.PowerMode_Power);
        dialogAnimation.queueAnimation(powerNameAnimation);


        var owner = co.getOwner();
        var variables = co.getVariables();

        

        var units = co.getOwner().getUnits();
        var animations = [];
        var counter = 0;
        units.randomize();


        var restrictedUnits = ["SUBMARINE", "DESTROYER", "WATERMINE", "BLACK_BOAT", "ZCOUNIT_MISSILE_SUB"];



        var aiTypes = [GameEnums.AiTypes_VeryEasy, GameEnums.AiTypes_Normal, GameEnums.AiTypes_NormalOffensive, GameEnums.AiTypes_NormalDefensive];


        for (var i = 0; i < units.size(); i++) {
            var unit = units.at(i);

            if (unit.getUnitType() === GameEnums.UnitType_Naval) {
                var moveType = unit.getMovementType();
                if ((moveType === "MOVE_BOAT" || moveType === "MOVE_SHIP" || moveType === "MOVE_SMALL_BOAT") && (restrictedUnits.indexOf(unit.getUnitID()) == -1 && aiTypes.indexOf(co.getOwner().getControlType()) == -1)) {
                    var playerId = co.getOwner().getPlayerID();
                    unit.loadIcon("amphibious3", map.getImageSize() / 2, map.getImageSize() / 2, 999, playerId);
                    unit.setMovementType(moveType + "_ENHANCED");
                    

                    
                   //var uniqueUnitID = "Unit " +unit.getUniqueID(); 

                    //set unique variable to check against every start on turn in case of a desync
                    
                    var uniqueVariable = variables.createVariable(unit.getUniqueID().toString());

                   uniqueVariable.writeDataBool(true);


                }
            }

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
		
		var variables = co.getVariables();
		var hybridNavals = variables.createVariable("hybridNavals");
        hybridNavals.writeDataBool(true);

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
                audio.addMusic("mods/cow_first_co_contest/music/cos/marysa.mp3", 0, 0);
                break;
        }
    };

    this.getCOUnitRange = function (co, map) {
        return 0;
    };
    this.getCOArmy = function () {
        return "PF";
    };
    // CO - Intel
    this.getBio = function (co) {
        return qsTr("Maryssa was a naval CO, however due to some conflicts she had, she had to be moved to inland battlefields.Despite the lack of water, she still manages to bring her ships to every battle.");
    };
    this.getHits = function (co) {
        return qsTr("Amphibians");
    };
    this.getMiss = function (co) {
        return qsTr("Long, dry deserts");
    };
    this.getCODescription = function (co) {
        return qsTr("Her naval units get +10% firepower and defense and have a special lower price.\nHer units with Tread Movement Type get 10% defense, and her air units get -10% firepower and defense.");
    };
    this.getPowerDescription = function (co) {
        return qsTr("All allied navals on the battle, get a permanent naval/treaded movement(shown with an icon), allowing them to move on land like tanks. All units with treads get +1 movement.");
    };
    this.getPowerName = function (co) {
        return qsTr("Treads Enhance");
    };
    this.getSuperPowerDescription = function (co) {
        return qsTr("All units get +15% firepower and defense, increased to 25% when in battle against vehicles. All factories and ports can build hybrid naval units.");
    };
    this.getSuperPowerName = function (co) {
        return qsTr("Out of Land Push");
    };
    this.getPowerSentences = function (co) {


        if (co.getPowerMode() == GameEnums.PowerMode_Power) {
            return [qsTr("Sometimes a \"Just add it!\" or a \"Go faster!\" does the thing."), qsTr("All ships, to the front!"), qsTr("Battlefrog! Schreeech!")];
        }
        else if (co.getPowerMode() == GameEnums.PowerMode_Superpower || co.getPowerMode() == GameEnums.PowerMode_Tagpower) {
            return [qsTr("Now we are going even!"), qsTr("Prepare the ships for the frontline!"), qsTr("This land dominance ends now!"), qsTr("Battlefrog! Schreeech!")];
        }

    };
    this.getVictorySentences = function (co) {
        return [qsTr("It really does work after all."), qsTr("Have you ever seen the battleship of the lake?"), qsTr("Im going home (Maybe!).")];
    };
    this.getDefeatSentences = function (co) {
        return [qsTr("Even after all of this, it wasnt enough..."), qsTr("Ughh... Crab."), qsTr("Like fish out of the water...")];
    };
    this.getName = function () {
        return qsTr("Marysa L.");
    };
}

Constructor.prototype = CO;
var CO_MARYSA_CONTEST = new Constructor();

CO_MARYSA_CONTEST.getNavalIDS = function () {
    return ["CANNONBOAT", "BATTLECRUISER", "FRIGATE", "GUNBOAT", "TORPEDOBOAT", "LANDER", "CRUISER", "SUBMARINE", "DESTROYER", "BATTLESHIP", "AIRCRAFTCARRIER", "ZCOUNIT_MISSILE_SUB"];
}

CO_MARYSA_CONTEST.getCostModifier = function (co, id, baseCost, posX, posY, map) {
    var unitNavalIDs = CO_MARYSA_CONTEST.getNavalIDS();





    if (unitNavalIDs.indexOf(id) > -1) {
        if (baseCost > 5000)
            return -3000;
    }








    return 0;

};


CO_MARYSA_CONTEST.startOfTurn = function (co, map) {

    //code intended to check for the hybrid navals again
    var variables = co.getVariables();
    if (variables.getVariable("hybridNavals")) {
        if (variables.getVariable("hybridNavals").readDataBool() === true) {

            var units = co.getOwner().getUnits();
        var aiTypes = [GameEnums.AiTypes_VeryEasy, GameEnums.AiTypes_Normal, GameEnums.AiTypes_NormalOffensive, GameEnums.AiTypes_NormalDefensive];


            for (var i = 0; i < units.size(); i++) {
                var unit = units.at(i);

                var uniqueVariable = variables.createVariable(unit.getUniqueID().toString()); 

                if(uniqueVariable.readDataBool() === true)
                {
                   
                    var moveType = unit.getMovementType();
                 if(unit.getMovementType() !== moveType + "_ENHANCED") 
                 {
                    if ((moveType === "MOVE_BOAT" || moveType === "MOVE_SHIP" || moveType === "MOVE_SMALL_BOAT") &&   aiTypes.indexOf(co.getOwner().getControlType()) == -1) {
                        var playerId = co.getOwner().getPlayerID();
                        unit.loadIcon("amphibious3", map.getImageSize() / 2, map.getImageSize() / 2, 999, playerId);
                        unit.setMovementType(moveType + "_ENHANCED");
                      
    
                    }
                 }
                 
                

            }

            }



        }
    }


};



/*function copied from the backup */ 

CO_MARYSA_CONTEST.getCOUnits = function (co, building, map) {
    var buildingId = building.getBuildingID();
    if ((buildingId === "FACTORY" && (co.getPowerMode() === GameEnums.PowerMode_Superpower
        || co.getPowerMode() === GameEnums.PowerMode_Tagpower))) {


        

        var aiTypes = [GameEnums.AiTypes_VeryEasy, GameEnums.AiTypes_Normal,  GameEnums.AiTypes_NormalOffensive,   GameEnums.AiTypes_NormalDefensive];


         if (aiTypes.indexOf(co.getOwner().getControlType()) > -1)
        {
         return [];
         
        }

        else
        {
            return ["CRUISER", "LANDER", "BATTLESHIP", "AIRCRAFTCARRIER"];

        }
		

        
    }
    return [];
};







CO_MARYSA_CONTEST.getMovementpointModifier = function (co, unit, posX, posY, map) {

    if (co.getPowerMode() === GameEnums.PowerMode_Power &&
        (unit.getMovementType() === "MOVE_TANK" || unit.getUnitType() === GameEnums.UnitType_Naval)) {

        return 1;
    }
    return 0;
}

CO_MARYSA_CONTEST.getOffensiveBonus = function (co, attacker, atkPosX, atkPosY,
    defender, defPosX, defPosY, isDefender, action, luckMode, map) {

    var VersusLand = 0;

    if (co.getIsCO0() === true) {
        switch (co.getPowerMode()) {

            /*
            SCOP:
            Treads: 15/35
            Naval: 25/35 - 25 / 45 after upgrade
            Air: 5/15
            */

            case GameEnums.PowerMode_Superpower:
                if (defender != null && defender.getUnitType() === GameEnums.UnitType_Ground && !isDefender) {

                    VersusLand = 10;

                }

                if (attacker.getUnitType() === GameEnums.UnitType_Air) {
                    return 5 + VersusLand;
                }
                else if (attacker.getUnitType() === GameEnums.UnitType_Naval) {
                    return 25 + VersusLand;
                }
                else {
                    return 15 + VersusLand;
                }

            /*
            COP:
            Treads: 0/20
            Naval: 10/20 - 10/30 after upgrade
            Air: -10/0
            */
            case GameEnums.PowerMode_Power:
                if (attacker.getUnitType() === GameEnums.UnitType_Naval) { return 10; }
                else if (attacker.getUnitType() === GameEnums.UnitType_Air) {
                    return -10;
                }


            /*
            D2D:
            Treads: 0/10
            Naval: 10/10
            Air: -10/-10
            */

            default:
                if (attacker.getUnitType() === GameEnums.UnitType_Naval) { return 10; }
                else if (attacker.getUnitType() === GameEnums.UnitType_Air) {
                    return -10;
                }
                break;
        }
    }
    return 0;

};

CO_MARYSA_CONTEST.getDeffensiveBonus = function (co, attacker, atkPosX, atkPosY,
    defender, defPosX, defPosY, isDefender, action, luckMode, map) {
    if (co.getIsCO0() === true) {

        var VersusLand = 0;
        var SickTreads = 0;

        if (defender.getMovementType() === "MOVE_BOAT__ENHANCED" || defender.getMovementType() === "MOVE_SHIP_ENHANCED" || defender.getMovementType() === "MOVE_SMALL_BOAT__ENHANCED") {
            SickTreads = 10;
        }

        switch (co.getPowerMode()) {

            /*
            SCOP:
            Treads: 15/35
            Naval: 25/35 - 25 / 45 after upgrade
            Air: 5/15
            */

            case GameEnums.PowerMode_Superpower:

                if (defender.getUnitType() === GameEnums.UnitType_Ground && !isDefender) {
                    VersusLand = 10;
                }
                if (defender.getMovementType() === "MOVE_TANK") {
                    return 35 + VersusLand;
                }
                else if (defender.getUnitType() === GameEnums.UnitType_Air) {
                    return 15 + VersusLand;
                }
                else if (defender.getUnitType() === GameEnums.UnitType_Naval) {
                    return 35 + VersusLand + SickTreads;
                }
                else {
                    return 25 + VersusLand;
                }

            /*
            COP:
            Treads: 0/20
            Naval: 10/20 - 10/30 after upgrade
            Air: -10/0
            */

            case GameEnums.PowerMode_Power:
                if (defender.getMovementType() === "MOVE_TANK") {
                    return 20;
                }
                else if (defender.getUnitType() === GameEnums.UnitType_Naval) {
                    return 20 + SickTreads;
                }
                else if (defender.getUnitType() === GameEnums.UnitType_Air) {
                    return 0;
                }
                else {
                    return 10;
                }


            /*
            D2D:
            Treads: 0/10
            Naval: 10/10
            Air: -10/-10
            */

            default:
                if (defender.getMovementType() === "MOVE_TANK") {
                    return 10;
                }
                else if (defender.getUnitType() === GameEnums.UnitType_Naval) {
                    return 10 + SickTreads;
                }
                else if (defender.getUnitType() === GameEnums.UnitType_Air) {
                    return -10;
                }
                else {
                    return 0;
                }
                break;

        }
    }
    return 0;
}
