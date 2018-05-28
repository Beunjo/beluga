module.exports = function (io) {
    'use strict';

    //---
    var promise = require('promise');

    //---
    var logger = require('../logger.js');
    var config = require('../config.json');
    
    var torrent = require('./torrent.js');


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
    
    var search = function (category, title, season, episode) {

        logger.info("[core] search");
        var promise = new Promise(function (resolve, reject) {
            var results = torrent.search(category, title, season, episode);
            
            resolve(results);
            /*t411.search(category, title, season, episode).then(
                function (results) {
                    return transmission.list().then(function (torrents) {

                        results.forEach(function (result) {
                            torrents.forEach(function (torrent) {
                                if (torrent.t411 == result.id) {
                                    result.torrent = torrent;
                                    result.isDownloaded = true;
                                    result.t411 = search.id;
                                }
                            });
                        });

                        resolve(results);
                    });
                },
                function (err) {
                    logger.error("[core] search failed", err);
                    reject();
                });*/
        });

        return promise;
    };
    //---
    return {
        init: init,
        search: search
    };
};