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
    return router;
};