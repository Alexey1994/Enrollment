app.controller('examsController', function($scope, $rootScope, $http) {	
	app.controller('examsController', function($scope, $rootScope, $http) {	
	$rootScope.activePage = "exams";
	$rootScope.load("/exams");
	$scope.exams = $rootScope.exams;
	$scope.$on('dataLoaded', function(event, data) {
		$rootScope.exams = data;
		$scope.exams = $rootScope.exams;
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