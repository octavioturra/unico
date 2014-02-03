var mongoose = require('mongoose');

var db = function () {
    var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/unico');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
	  // yay!
	});

	return db;
};

module.exports = db();