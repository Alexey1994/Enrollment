app.controller('relationsController', function($scope, $rootScope) {		
	$rootScope.activePage = "relations";
	$scope.relations = ($rootScope.relations) ? $rootScope.relations : [];

	var dataLoadedCallback = function(event, data) {
		if (data.type == 'exams') {
			// Значит, это пришли экзамены
			if (!$rootScope.loaded.exams) {
				console.log('exams', JSON.parse(JSON.stringify(data)));
				$rootScope.exams = JSON.parse(JSON.stringify(data));
				$scope.exams = $rootScope.exams;
				$rootScope.loaded.exams = true;
			}
		} else if (data.type == 'relations') {
			// Значит пришли relations
			if (!$rootScope.loaded.relations) {
				console.log('relations', JSON.parse(JSON.stringify(data)));
				$rootScope.relations = JSON.parse(JSON.stringify(data));
				$scope.relations = $rootScope.relations;
				$rootScope.loaded.relations = true;
			}

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
		$scope.editingIndex = index;
		$scope.editingRelation = JSON.parse(JSON.stringify($scope.relations[index]));
	}

	$scope.updateRelation = function() {
		var validated = true;

		if ($scope.updateRelation.length != 3)
			validated = false;
		

		for (var i = 0; i < $scope.editingRelation.length; i++) 
			for (var j = 0; j < $scope.editingRelation.length; j++) 
				if (j != i && 
					$scope.editingRelation[i].name == $scope.editingRelation[j].name &&
					$scope.editingRelation[i].type == $scope.editingRelation[j].type) 
					validated = false;

		if ($scope.editingRelation.length < 2)
			validated = false;

		if (!validated) {
			$scope.inputError = true;
			return;
		}

		$scope.relations[$scope.editingIndex] = JSON.parse(JSON.stringify($scope.editingRelation));
		$scope.editingRelation = [];
	}

	$scope.addRelation = function() {	
		var validated = true;

		if ($scope.newRelation.length != 3)
			validated = false;

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