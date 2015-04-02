(function () {
	function _NewsService($q, config, $http) {

		function getOne(id) {
			var deferred = $q.defer();

			$http.get(config.server + '/news/' + id)
				.success(function (data) {
					if (data.error || !data.news) {
						deferred.reject(data.error);
					}

					deferred.resolve(data.news);
				})
				.error(function () {
					deferred.reject('error');
				});
			return deferred.promise;
		}

		function getAll() {
			var deferred = $q.defer();

			$http.get(config.server + '/news')
				.success(function (data) {
					console.log(data);
					if (data.error || !data.news) {
						deferred.reject(data.error);
					}

					deferred.resolve(data.news);
				})
				.error(function () {
					deferred.reject('error');
				});
			return deferred.promise;
		}

		return {
			one: getOne,
			all: getAll
		};
	}

	_NewsService.$inject = ['$q', 'Config', '$http'];

	angular.module('app.services')
		.factory('NewsService', _NewsService);
})();
