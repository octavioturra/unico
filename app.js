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
var CEP = require('cep');

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
app.use(require('less-middleware')({
    src: path.join(__dirname, 'public')
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var products = [{
    sku: 341223,
    name: 'Caixa Artística Roxa',
    model: 'Teste',
    author: 'Alaor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat vero porro commodi architecto eligendi magnam doloremque voluptate fugit eos nulla. Enim unde adipisci quia molestiae soluta quo consequuntur odit dolor?',
    price: {
        brute: 300,
        tax: 100,
        fare: 100,
        rev: 1.7
    },
    images: [
        {
            thumb: 'http://lorempixum.com/90/90?1',
            normal: 'http://lorempixum.com/1920/1080?1'
        },
        {
            thumb: 'http://lorempixum.com/90/90?2',
            normal: 'https//lorempixum.com/1920/1080?2'
        },
        {
            thumb: 'http://lorempixum.com/90/90?3',
            normal: 'http://lorempixum.com/1920/1080?3'
        },
        {
            thumb: 'http://lorempixum.com/90/90?4',
            normal: 'http://lorempixum.com/1920/1080?4'
        }
    ]
}];

var result = {
    ok = function(data){
        return {success:true, data:data};
    },
    error = function(message){
        return {success:false, message:message};
    }
};

var validation = {
    cep : function(cep, cb){
        var cep = req.param('cep');
        if (!cep) {
            cb(result.error('CEP nulo ou vazio'));
        }
        if(!cep.match(/\d{5}-\d{3}/)){
            cb(result.error('CEP inválido'));
        }
        var address = CEP.request.data.from(cep, function(err, d){
            if(err){
                return res.end({success:false, message: err.message});
            }
            return res.end({success:true, data: d});
        })
    },
    email : function(email, cb){},
    cpf : function(cpf, cb){}
};

var list = {
    cities : function(uf, cb){}
};

app.get('/', routes.index);
app.post('/cep', function (req, res) {
    
});
app.post('/cpf', function(req, res){});
app.post('/email', function(req, res){});
app.post('/cities', function(req, res){});
app.post('/profile', function(req, res){});
app.post('/profile/:email', function(req, res){});
app.get('/callback', function(req, res){});


var total = 0;
io.sockets.on('connection', function (socket) {
    total += 1;
    var product = _(products).first();

    var price = (product.price.brute + product.price.tax + product.price.fare) * product.price.rev
    console.log(price);
    product.price = price;

    socket.emit('news', {
        total: total,
        product: product
    });
    socket.broadcast.emit('news', {
        total: total
    });
    
    socket.on('buy', function(sku){
        
    });
    socket.on('paymode', function(mode){
        
    });

    socket.on('disconnect', function () {
        total -= 1;
        socket.broadcast.emit('news', {
            total: total
        });
    });
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});