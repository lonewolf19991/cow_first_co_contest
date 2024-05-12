var Constructor = function()
{
    this.postAnimationUnit = null;
    this.postAnimationTargetX = -1;
    this.postAnimationTargetY = -1;
    this.deployedPillar = false; 


    this.canBePerformed = function(action, map)
    {
        if(ACTION_DEPLOYPILLAR.deployedPillar === false)
        {
        
            return true; 
        }

       
    };
    this.getActionText = function(map)
    {
        return qsTr("Deploy Pillar");
    };
    this.getIcon = function(map)
    {
        return "build";
    };

    this.xOffset = -1;
    this.yOffset = -1;

    this.getStepCursor = function(action, cursorData, map)
    {
        cursorData.setCursor("cursor+attack");
        
    };


    this.isFinalStep = function(action, map)
    {
        if (action.getInputStep() === 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    

    this.perform = function(action, map)
    {


	var animation = GameAnimationFactory.createAnimation(map, action.readDataInt32(), action.readDataInt32());
        animation.addSprite("power0", -map.getImageSize() * 1.27, -map.getImageSize() * 1.27, action.readDataInt32(), action.readDataInt32(), 0);
        animation.setSound("power0.wav");
        animation.setEndOfAnimationCall("ACTION_DEPLOYPILLAR", "performPostAnimation");

        action.startReading();
        // read action data
        ACTION_DEPLOYPILLAR.postAnimationTargetX = action.readDataInt32();
        ACTION_DEPLOYPILLAR.postAnimationTargetY = action.readDataInt32();


    };
   
    

  
    this.getStepInputType = function(action, map)
    {
        return "FIELD";
    };

    this.getStepData = function(action, data, map)
    {
        data.setAllFields(true);
        data.setShowZData(false);
    };


    this.getActionTargetFields = function(building)
    {
        return globals.getShotFields(1, 4, 1);
    };


    this.getName = function()
    {
        return qsTr("Build a pillar");
    };


    this.getDescription = function()
    {
        return qsTr("Lets Trundle build a Pillar");
    };
}

Constructor.prototype = ACTION;
var ACTION_DEPLOYPILLAR = new Constructor();