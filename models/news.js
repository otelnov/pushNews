var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
	'use strict';

	var NewsSchema = new Schema({
		username: String,
		text: String,
		createdAt: {type: Date, default: Date.now}
	});

	mongoose.model('News', NewsSchema, 'News');
};
