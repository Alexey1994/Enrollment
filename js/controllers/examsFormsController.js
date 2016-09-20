app.controller('examsFormsController', function($scope, $rootScope) {		
	$rootScope.activePage = "types";
	$scope.examsforms = $rootScope.examsForms;

	if (!$rootScope.loaded.exams) {
		$rootScope.load("/examsForms");		
		$scope.$on('dataLoaded', function(event, data) {
			$rootScope.examsForms = data;
			$scope.examsforms = $rootScope.examsForms;
			$rootScope.loaded.exams = true;
		});				
	}
	
	
	$scope.newExamsForm = {
		tests: 0,
		exams: 0
	}

	$scope.addExamForm = function() {
		$scope.examsForms.push($scope.newExamsForm);			
		$scope.newExamsForm = {
			tests: 0,
			exams: 0
		}
	}		

	$scope.examsFormName = function(form) {
		var name = "";
		if (form.tests > 0)
			name += form.tests + " ЦТ";

		if (form.tests > 0 && form.exams > 0)
			name += ", ";

		if (form.exams > 0)
			name += form.exams + " экз.";			

		if (name.length == 0) 
			name += "Только аттестат";
		else 
			name += " и аттестат";

		return name;
	}

	$scope.save = function() {
		$rootScope.save("/examsforms/save", $scope.examsForms, $scope);
	}
})