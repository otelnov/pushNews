angular.module('app.services', []);
angular.module('app.controllers', []);

angular.module('app', [
	'ionic',
	'app.controllers',
	'app.services'
])

	.run(function ($ionicPlatform, $rootScope) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}

			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});

		$rootScope.$on('$stateChangeStart', function (event, toState) {
			if (!UserService.current() && toState.name !== 'login') {
				$state.go('login');
			}
		});
	})

	.config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'templates/login.html',
				controller: 'LoginCtrl'
			})
			.state('tab', {
				abstract: true,
				templateUrl: "templates/tabs.html"
			})
			.state('tab.news', {
				url: '/news',
				views: {
					'tab-news': {
						templateUrl: 'templates/tab-news.html',
						controller: 'NewsCtrl'
					}
				}
			})
			.state('tab.details', {
				url: '/news/:id',
				views: {
					'tab-news': {
						templateUrl: 'templates/details.html',
						controller: 'DetailsCtrl'
					}
				}
			})
			.state('tab.profile', {
				url: '/profile',
				views: {
					'tab-profile': {
						templateUrl: 'templates/tab-profile.html',
						controller: 'ProfileCtrl'
					}
				}
			});
	});
