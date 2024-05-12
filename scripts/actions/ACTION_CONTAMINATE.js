var Constructor = function()
{
    
    this.canBePerformed = function(action, map)
    {
        return true;
    };

    this.getActionText = function(map)
    {
        return qsTr("Contaminate");
    };
    this.getIcon = function(map)
    {
        return "icon_ac";
    };

    this.xOffset = -1;
    this.yOffset = -1;

    this.getStepCursor = function(action, cursorData, map)
    {
        cursorData.setCursor("cursor+missile");
        cursorData.setXOffset(- map.getImageSize() * 2);
        cursorData.setYOffset(- map.getImageSize() * 2);

        ACTION_CONTAMINATE.xOffset = cursorData.getXOffset();

        ACTION_CONTAMINATE.yOffset = cursorData.getYOffset();
        

        cursorData.setScale(2);
    };
    this.getStepData = function(action, data, map)
    {
        data.setAllFields(true);
        data.setShowZData(false);
    };
    this.getStepInputType = function(action, map)
    {
        return "FIELD";
    };

    this.isFinalStep = function(action, map)
    {
        if (action.getInputStep() === 1)
        {
            action.writeDataInt32(ACTION_CONTAMINATE.xOffset);
            action.writeDataInt32(ACTION_CONTAMINATE.yOffset);

            return true;
        }
        else
        {
            return false;
        }
    };
    this.postAnimationUnit = null;
    this.postAnimationTargetX = -1;
    this.postAnimationTargetY = -1;
    this.perform = function(action, map)
    {

        var building = action.getTargetBuilding();
        var x = building.getX();
        var y = building.getY();

	var animation = GameAnimationFactory.createAnimation(map, x, y);
        animation.addSprite("silo+launch", map.getImageSize() / 4, -map.getImageSize() / 2, 0, 2, 0);
        animation.setSound("missile_launch.wav");
        animation.setEndOfAnimationCall("ACTION_CONTAMINATE", "performPostAnimation");

        action.startReading();
        // This information is read from the CO code, in order, without a named variable
        ACTION_CONTAMINATE.postAnimationTargetX = action.readDataInt32();
        ACTION_CONTAMINATE.postAnimationTargetY = action.readDataInt32();
//        ACTION_CONTAMINATE.postAnimationUnit = unit;

    };
    this.performPostAnimation = function(postAnimation, map)
    {
        var radius = 2;
        var damage = 3;
        var fields = globals.getCircle(0, radius);
        // check all fields we can attack
        var size = fields.size();
        for (var i = 0; i < size; i++)
        {
            var x = fields.at(i).x + ACTION_CONTAMINATE.postAnimationTargetX;
            var y = fields.at(i).y + ACTION_CONTAMINATE.postAnimationTargetY;
            // check with which weapon we can attack and if we could deal damage with this weapon
            if (map.onMap(x, y))
            {

                ACTION_CONTAMINATE.postAnimationTargetX;
                ACTION_CONTAMINATE.postAnimationTargetY;
            }
        }
        fields.remove();
        var animation = GameAnimationFactory.createAnimation(map, ACTION_CONTAMINATE.postAnimationTargetX - radius, ACTION_CONTAMINATE.postAnimationTargetY - radius - 1);
        animation.addSprite("explosion+silo", -map.getImageSize() / 2, 0, 0, 2, 0);
        animation.setSound("missle_explosion.wav");

        ACTION_CONTAMINATE.postAnimationTargetX = -1;
        ACTION_CONTAMINATE.postAnimationTargetY = -1;
        ACTION_CONTAMINATE.postAnimationUnit = null;
    };
    this.getDescription = function()
    {
        return qsTr("Contaminates the targetted area. Enemy units get -10%/-10%. Trundle's units get +20%/+10%");
    };
}

Constructor.prototype = ACTION;
var ACTION_CONTAMINATE = new Constructor();
