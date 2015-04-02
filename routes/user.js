var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.exports = function (app) {
	'use strict';

	var router = app.get('router');

	router.post('/user/login', function (req, res) {
		var socialId = req.body.user_id;
		var username = req.body.screen_name;

		Users.findOne({socialId: socialId}).lean().exec(function (err, user) {
			if (err) {
				return res.json({error: err});
			}

			if (user) {
				return res.json({error: null, user: user});
			}

			var newUser = new Users({
				socialId: socialId,
				username: username
			});
			newUser.save(function (err, user) {
				if (err) {
					return res.json({error: err});
				}
				res.json({user: user, error: null})
			});
		});
	});

	router.put('/user/registerDevice', function (req, res) {
		var user = req.body.user;
		var token = req.body.token;

		Users.findByIdAndUpdate(user._id, {
			$set: {
				deviceToken: token,
				deviceRegistered: true
			}
		}).lean().exec(function (err, user) {
			if (err || !user) {
				return res.json({error: err});
			}

			res.json({error: null, user: user});
		});
	});
};