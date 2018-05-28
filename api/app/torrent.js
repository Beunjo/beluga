
    //---
    var promise = require('promise');

    //---
    var logger = require('../logger.js');
    var config = require('../config.json');

    //---
const TorrentSearchApi = require('torrent-search-api');
const torrentSearch = new TorrentSearchApi();
torrentSearch.enableProvider('YggTorrent', 'beuuun', '5mars4');

console.log(torrentSearch.getActiveProviders());

exports.search = function (category, name, season, episode) {
    
    var promise = new Promise(function (resolve, reject) {
        logger.info("[torrent] search");
        // Search '1080' in 'Movies' category and limit to 20 results
        torrentSearch.search(name, 'TV', 200)
            .then(torrents => {
                logger.info("[torrent] search successfull");
                resolve(torrents);
            })
            .catch(err => {
                logger.error("[torrent] search failed", err);
                reject(err);
            });
    });

    return promise;
 }