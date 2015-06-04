'use strict';

/**
 *
 *
 * @constructor
 */
function Level(){
    var _level = [],
        _chance = new Chance();

    this.create = function () {
        var result = {
            levelparts: []
        };
        for (var i = 0; i < 10; ++i){
            result.levelparts.push(_createLevelPart())
        }
        return result;
    };
    
    var _createLevelPart = function () {
        var result = [
            //{"type":"g","x":0,"y":0},
            //{"type":"g","x":1,"y":0},
            //{"type":"g","x":2,"y":1},
            //{"type":"g","x":3,"y":0},
            //{"type":"g","x":4,"y":2},
            //{"type":"g","x":5,"y":0},
            //{"type":"b","x":0,"y":1},
            //{"type":"b","x":2,"y":2},
            //{"type":"b","x":3,"y":1},
            //{"type":"b","x":5,"y":3}
        ];
        // generate ground
        for (var i = 0; i < 6; ++i){
            result.push({"type":"g","x":i,"y":_chance.integer({min:0,max:1})})
        }

        for (var i = 0; i < 6; ++i){
            if(_chance.bool({likelihood: 30})){
                result.push({"type":"b","x":i,"y":_chance.integer({min:0,max:3})});
            }

        }




        _level.push(result);

        return result //Math.floor(Math.random() * 3) + 1
    };
}



module.exports = new Level();