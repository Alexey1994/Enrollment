app.controller('specialitiesController', function ($scope, $rootScope) {
	$rootScope.activePage = "specialities";
	$scope.specialities = ($rootScope.specialities) ? $rootScope.specialities : [];

	if (!$rootScope.loaded.specialities) {
		$rootScope.load("/specialties");
		$scope.$on('dataLoaded', function(event, data) {
			if (data.type == 'specialties') {
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
		$rootScope.save("/specialties/save", $scope.specialities, $scope);
	}
})