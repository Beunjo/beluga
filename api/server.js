'use strict';

//---
var logger = require('./logger.js');
var config = require('./config.json');

//---
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);  

var bodyParser = require('body-parser');

//---
var core = require('./app/core')(io);
var routes = require('./routes')(core);


// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.set('json spaces', '  ');

/*app.use('/', express.static('./..'));
app.use('/api', routes);*/
app.use('/', routes);


//---
var port = process.env.PORT || config.port || 8080;

//---
server.listen(port, function () {
    logger.info('[server] listening on port', port);
    core.init();
});

/*
var logger = require('./logger.js');

var express = require('express');
var io = require('socket.io');
var app = express();
var core = require('./app/core');
var routes = require('./routes')(core);

var bodyParser = require('body-parser');

var config = require('./config.json');

// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.set('json spaces', '  ');

//---
app.use('/', express.static('./../client'));
app.use('/api', routes);

//---
var port = process.env.PORT || config.port || 8080;

//---
core.init().then(
    function (data) {
        app.listen(port, function () {
            logger.info('Server listening on port ' + port);
        });
    },
    function (err) {
        logger.error("initialisation failed");
        process.exit(-1);
    });*/


