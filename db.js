var path = require('path');
var express = require('express');
var jsonServer = require('json-server');
var demodata = require('./db.json');
// var routes = require('./routes.json');

var router = jsonServer.router(demodata); // Express router
var server = jsonServer.create(); // Express server

server.use('/static', express.static(path.join(__dirname, 'public')));

// Avoid CORS issue
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// server.use(jsonServer.rewriter(routes));
server.use(router);

server.listen(4000);
