var mongoose = require('mongoose');
var News = mongoose.model('News');
var Users = mongoose.model('Users');
var apn = require('apn');
var _ = require('lodash');

module.exports = function (app) {
	'use strict';

	var router = app.get('router');

	router.get('/news', function (req, res) {
		News.find().sort({createdAt: -1}).lean().exec(function (err, news) {
			if (err) {
				return res.json({error: err});
			}

			res.json({error: null, news: news});
		});
	});

	router.get('/news/:id', function (req, res) {
		var id = req.params.id;
		News.findById(id).lean().exec(function (err, news) {
			if (err) {
				return res.json({error: err});
			}

			res.json({error: null, news: news});
		});
	});

	router.post('/news', function (req, res) {
		var username = req.body.username;
		var text = req.body.text;

		var news = new News({
			username: username,
			text: text
		});

		news.save(function (err, news) {
			process.nextTick(function () {
				sendPush(news);
			});
			res.redirect('/add-news');
		});
	});

	function sendPush(news) {
		var text = news.text.substr(0, 100);
		Users.find({deviceRegistered: true}).lean().exec(function (err, users) {
			if (!err) {
				for (var i = 0; i < users.length; i++) {
					var user = users[i];

					var device = new apn.Device(user.deviceToken);
					var note = new apn.Notification();
					note.badge = 1;
					note.contentAvailable = 1;
					note.alert = {
						body : text
					};
					note.device = device;

					var options = {
						gateway: 'gateway.sandbox.push.apple.com',
						errorCallback: function(error){
							console.log('push error', error);
						},
						cert: 'PushNewsCert.pem',
						key:  'PushNewsKey.pem',
						passphrase: 'superpass',
						port: 2195,
						enhanced: true,
						cacheLength: 100
					};
					var apnsConnection = new apn.Connection(options);
					console.log('push sent to ', user.username);
					apnsConnection.sendNotification(note);
				}
			}
		});
	}
};