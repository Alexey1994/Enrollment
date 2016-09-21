app.controller('relationsController', function($scope, $rootScope) {		
	$rootScope.activePage = "relations";
	$scope.relations = ($rootScope.relations) ? $rootScope.relations : [];

	var dataLoadedCallback = function(event, data) {
		if (data instanceof Array && $rootScope.loaded.relations) {
			// Значит, это пришли экзамены
			console.log('exams', JSON.parse(JSON.stringify(data)));
			$rootScope.exams = JSON.parse(JSON.stringify(data));
			$scope.exams = $rootScope.exams;
			$rootScope.loaded.exams = true;
		} else if (data instanceof Array) {
			// Значит пришли relations
			console.log('relations', JSON.parse(JSON.stringify(data)));
			$rootScope.relations = JSON.parse(JSON.stringify(data));
			$scope.relations = $rootScope.relations;
			$rootScope.loaded.relations = true;

			if (!$rootScope.loaded.exams) {
				$rootScope.load("/exams");
				$scope.$on('dataLoaded', dataLoadedCallback);
			} else {
				$scope.exams = $rootScope.exams;
			}
		}
	}

	if (!$rootScope.loaded.relations) {
		$rootScope.load("/relations");
		$scope.$on('dataLoaded', dataLoadedCallback);
	}	

	$scope.newRelation = [];
	$scope.editRelation = function(index) {
		$scope.editIndex = index;
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
		$rootScope.save("/relations/save", $scope.relations, $scope);
	}
})	