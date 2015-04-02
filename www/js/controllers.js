angular.module('app.controllers')

	.controller('NewsCtrl', function ($scope, NewsService, $ionicLoading) {
		$ionicLoading.show({
			template: 'Loading...'
		});
		NewsService.all().then(function (news) {
			$scope.news = news;
			$ionicLoading.hide();
		});

		$scope.refresh = function () {
			NewsService.all().then(function (news) {
				$scope.news = news;
				$scope.$broadcast('scroll.refreshComplete');
			});
		};
	})

	.controller('DetailsCtrl', function ($scope, $state, NewsService, $ionicLoading) {
		$ionicLoading.show({
			template: 'Loading...'
		});
		var id = $state.params.id;
		NewsService.one(id).then(function (news) {
			$scope.news = news;
			$ionicLoading.hide();
		});
	})

	.controller('ProfileCtrl', function ($scope) {

	})

	.controller('LoginCtrl', function ($scope, $state, $cordovaOauth, UserService, Config, $ionicPlatform, $ionicLoading, $cordovaPush) {
		if (UserService.current()) {
			$state.go('tab.news');
		}
		$scope.twitter = function () {
			$ionicPlatform.ready(function () {
				$cordovaOauth.twitter(Config.twitterKey, Config.twitterSecret).then(function (result) {
					$ionicLoading.show({
						template: 'Loading...'
					});
					UserService.login(result).then(function (user) {
						if (user.deviceToken) {
							$ionicLoading.hide();
							$state.go('tab.news');
							return;
						}

						$ionicPlatform.ready(function () {
							$cordovaPush.register({
								badge: true,
								sound: true,
								alert: true
							}).then(function (result) {
								UserService.registerDevice({user: user, token: result}).then(function () {
									$ionicLoading.hide();
									$state.go('tab.news');
								}, function (err) {
									console.log(err);
								});
							}, function (err) {
								console.log('reg device error', err);
							});
						});
					});
				}, function (error) {
					console.log('error', error);
				});
			});
		};
	});
