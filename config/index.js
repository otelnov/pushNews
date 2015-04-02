var mongoose = require('mongoose');

module.exports = function (app) {
	'use strict';

	var conf = {
		PORT: process.env.PORT || 5000,
		MONGO_DB: 'mongodb://localhost/pushnews'
	};

	app.set('config', conf);

	mongoose.connect(conf.MONGO_DB, {
		server: {
			auto_reconnect: true
		}
	});
};

