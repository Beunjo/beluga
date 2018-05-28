module.exports = function (core) {
    'use strict';

    //---
    var express = require('express');
    var router = express.Router();
    var path = require('path');

    //---
    router.get('/', function (req, res) {
        res.json({ message: 'welcome to beluga api' });
    });
    
    //---
    router.route('/search/:category/:title/:season?/:episode?')
    .get(function (req, res) {
        core.search(req.params.category, req.params.title, req.params.season, req.params.episode).then(
            function (data) {
                res.json(data);
            },
            function (err) {
                res.status(500).send(err);
            });
    });

    //---
    return router;
};