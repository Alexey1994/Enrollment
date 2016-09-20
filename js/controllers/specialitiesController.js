app.controller('specialitiesController', function ($scope, $rootScope) {
	$rootScope.activePage = "specialities";
	$scope.specialities = $rootScope.specialities;
	$rootScope.load("/specialities");
	$scope.$on('dataLoaded', function(event, data) {
		$rootScope.specialities = data;
		$scope.specialities = $rootScope.specialities;
	});

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