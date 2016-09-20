app.controller('examsController', function($scope, $rootScope, $http) {	
	$rootScope.activePage = "exams";
	$rootScope.load("/exams");
	$scope.$on('dataLoaded', function(event, data) {
		$scope.exams = data;			
	});

	$http.get("languages.json").then(function(data){
		$scope.languages=[];

		for(var i in data.data)
			for(var j in data.data[i])
				$scope.languages.push(j);
	})

	$scope.newExam = {
		name: "",
		prefix: "",
		language: "ru",
		type: "test"
	}

	$scope.addExam = function() {
		$scope.exams.push($scope.newExam);			
		$scope.newExam = {
			name: "",
			prefix: "",
			language: "ru",
			type: "test"
		}
	}
	
	$scope.save = function() {						
		$rootScope.save("/exams/save", $scope.exams, $scope);
	}
})	