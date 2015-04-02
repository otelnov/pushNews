(function () {
	function _UserService() {

		return {

		};
	}

	function _ConfigService() {
		return {

		};
	}

	angular.module('app.services')
		.factory('UserService', _UserService)
		.service('Config', _ConfigService);
})();
