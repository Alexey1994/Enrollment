var app = angular.module('RoutingApp', ['ngRoute'])
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/exams', {
				templateUrl: 'template/exams.html'
			})
			.when('/types', {
				templateUrl: 'template/types.html'
			})
			.when('/relations', {
				templateUrl: 'template/relations.html'
			})
			.when('/specialities', {
				templateUrl: 'template/specialities.html'
			})
			.otherwise({
				redirectTo: '/exams'
			});
	}])

	.run(function($rootScope, $http) {
		$rootScope.activePage = "";

		$rootScope.load = function(url) {			
			$http({
				method: "get",				
				url: url
			}).then(function(response) {				
				$rootScope.$$listeners.dataLoaded = [];
				$rootScope.$broadcast('dataLoaded', response.data);
				console.log("data succesfully loaded" , response.data);
			}, function(error) {
				$rootScope.loadError = true;
				console.log("Loading error", error);
			});	
		} 

		$rootScope.save = function(url, data, scope) {	
			console.log(data);
			$http({
				method: "post",
				url: url,
				data: data
			}).then(function(response) {
				console.log("Save request succedded", response.data);
				if (response.data.status != "Ok")
					scope.saveError = true;
				else 
					scope.saveSuccess = true;

			}, function(error) {
				scope.sendError = true;
				console.log("Some error occured", error);
			});
		}
	});