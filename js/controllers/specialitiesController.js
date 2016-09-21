app.controller('specialitiesController', function ($scope, $rootScope) {
	$rootScope.activePage = "specialities";
	$scope.specialities = $rootScope.specialities;

	if (!$rootScope.loaded.specialities) {
		$rootScope.load("/specialities");
		$scope.$on('dataLoaded', function(event, data) {
			if (!$rootScope.loaded.specialities) {
				$rootScope.specialities = data;
				$scope.specialities = $rootScope.specialities;
				$rootScope.loaded.specialities = true;

				console.log('specialities', $scope.specialities)
			}
		});
	}

	$scope.newSpec = {
		specialty: "",
		score: "",
		competition: "Общий",
		university: "",
		faculty: ""
	}

	$scope.addSpec = function(){
		$scope.specialities.push($scope.newSpec);
		$scope.newSpec = {
			specialty: "",
			score: "",
			competition: "Общий",
			university: "",
			faculty: ""
		}
	}

	$scope.save = function() {						
		$rootScope.save("/specialities/save", $scope.specialities, $scope);
	}
})