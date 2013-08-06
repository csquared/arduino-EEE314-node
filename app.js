/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var ledState = 'on';

app.get('/', function(req, res){
  res.render('index', { led: ledState, title: "Arduino EEE314"});
});

app.get('/led', function(req, res){
  res.send(ledState);
})

app.post('/led', function(req, res){
  ledState = '';
  req.on('data', function(data){
    ledState += data;
  });
  req.on('end', function(){
    console.log("Led state: ", ledState);
    res.send(200);
  })
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
