app.controller('relationsController', function($scope, $rootScope) {		
	$rootScope.activePage = "relations";
	$scope.relations = $rootScope.relations;
	console.log($scope.relations);

	if (!$rootScope.loaded.relations) {
		$rootScope.load("/relations");		
		$scope.$on('dataLoaded', function(event, data) {
			$rootScope.relations = data;
			$scope.relations = $rootScope.relations;
			$rootScope.loaded.relations = true;

			console.log(data, $scope.relations);
		});		
	}

	$scope.addRelation = function() {	
		var validated = true;

		for (var i = 0; i < $scope.newRelation.length; i++) 
			for (var j = 0; j < $scope.newRelation.length; j++) 
				if (j != i && 
					$scope.newRelation[i].name == $scope.newRelation[j].name &&
					$scope.newRelation[i].type == $scope.newRelation[j].type) 
					validated = false;

		if ($scope.newRelation.length < 2)
			validated = false;

		if (!validated) {
			$scope.inputError = true;
			return;
		}

		$scope.relations.push($scope.newRelation);			
		$scope.newRelation = [];			
	}
	
	$scope.save = function() {						
		$rootScope.save("/realtions/save", $scope.relations, $scope);
	}
})	