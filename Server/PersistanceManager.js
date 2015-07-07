/**
 * @author Jonathan Wiemers
 */

'use strict';

var PersistanceManager = function PersistanceManager() {


    var jsonfile = require('jsonfile');
    var util = require('util');

    jsonfile.spaces = 4;


    /**
     * read all savegems from filesystem
     * @param callback
     */
    this.getAllSaveGames = function (callback) {
        var file = __dirname + '/games/savegames.json';
        jsonfile.readFile(file, function (err, obj) {
            console.dir(obj);
            callback(obj);
        });
    };

    /**
     * Saves new savegame to the filesystem
     * @param newGame
     */
    this.saveGame = function (newGame) {
        var file = __dirname + '/games/savegames.json';
        jsonfile.readFile(file, function (err, obj) {
            obj.push(newGame);
            jsonfile.writeFile(file, obj, function (err) {
                console.error(err)
            })
        });
    };
};

PersistanceManager.instance = null;

/**
 * PersistanceManager getInstance definition
 * @return PersistanceManager class
 */
PersistanceManager.getInstance = function () {
    if (this.instance === null) {
        this.instance = new PersistanceManager();
    }
    return this.instance;
};

module.exports = PersistanceManager.getInstance();