
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var engine = require('ejs-locals');
var _ = require('underscore');

var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.engine('ejs', engine);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var products = [{
	sku: 341223,
	name: 'Caixa Artística Roxa',
	artist: 'Alaor',
	description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat vero porro commodi architecto eligendi magnam doloremque voluptate fugit eos nulla. Enim unde adipisci quia molestiae soluta quo consequuntur odit dolor?',
	price:{
		brute: 300,
		tax: 100,
		fare: 100
	},
	pics:{
		thumb:['https://lorempixum.com/90/90?1','https://lorempixum.com/90/90?2','https://lorempixum.com/90/90?3','https://lorempixum.com/90/90?4'],
		real:['https://lorempixum.com/1920/1080?1','https://lorempixum.com/1920/1080?2','https://lorempixum.com/1920/1080?3','https://lorempixum.com/1920/1080?4']
	}
}];

app.get('/', routes.index);

var total = 0;
io.sockets.on('connection', function(socket){
	total+=1;
	socket.emit('news', {total:total, product:_(products).first()});
	socket.broadcast.emit('news', {total:total});
	socket.on('disconnect', function () { 
		total-=1;
		socket.broadcast.emit('news', {total:total});
	});
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
