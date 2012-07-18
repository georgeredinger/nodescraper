
/**
 * Module dependencies.
 */

var express = require('express')
, jsdom = require('jsdom')
, request = require('request')
, url = require('url')
, app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


app.get('/', function(req, res){
	request({uri: 'http://www.verizonwireless.com/b2c/index.html'}, function(err, response, body){
		var self = this;
		self.items = new Array();//I feel like I want to save my results in an array

		if(err && response.statusCode !== 200){console.log('Request error.');}
		jsdom.env({
			html: body,
			scripts: ['http://code.jquery.com/jquery-1.6.min.js']
		}, function(err, window){
			var $ = window.jQuery;

		console.log($('div.headline signin').text());
		});
	});
});

app.listen(3000);
console.log("Express server listening on port  in %s mode",  app.settings.env);

