module.exports = function (io) {
    'use strict';

    //---
    var logger = require('../logger.js');
    var config = require('../config.json');

    //---
    var promise = require('promise');

    //---
    var initComplete = false;

    //---
    io.on('connection', function (socket) {
        //console.log('connection');
        logger.debug("[core] socket.io connection");

        if (initComplete) {
            socket.emit('init:complete');
        }

        socket.on('disconnect', function () {
            //console.log('disconnect');
        });
    });

    //---
    var init = function () {
        var promise = Promise.all([
            
        ]).then(function () {
            initComplete = true;
            logger.info("[core] init successfull");
            io.emit('init:complete');
        });
        return promise;
    };

    //---
    return {
        init: init
    };
};