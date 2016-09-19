angular.module('RoutingApp', ['ngRoute'])
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
			.when('/specialties', {
				templateUrl: 'template/specialties.html'
			})
			.otherwise({
				redirectTo: '/exams'
			});
	}])

	.run(function($rootScope, $http) {
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


	})

	.controller('examsController', function($scope, $rootScope, $http) {	
		$rootScope.load("exams.json");
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
			language: "",
			type: "test"
		}

		$scope.addExam = function() {
			$scope.exams.push($scope.newExam);			
			$scope.newExam = {
				name: "",
				prefix: "",
				language: "",
				type: "test"
			}
		}
		
		$scope.save = function() {						
			$rootScope.save("/exams/save", $scope.exams, $scope);
		}
	})

	.controller('specialtiesController', function ($scope, $rootScope) {
		$rootScope.load("specialties.json");
		$scope.$on('dataLoaded', function(event, data) {
			$scope.specialties = data;		
		});

		$scope.newSpec = {
			specialty: "",
			score: "",
			competition: "Общий",
			university: "",
			faculty: ""
		}

		$scope.addSpec = function(){
			$scope.specialties.push($scope.newSpec);
			$scope.newSpec = {
				specialty: "",
				score: "",
				competition: "Общий",
				university: "",
				faculty: ""
			}
		}

		$scope.save = function() {						
			$rootScope.save("/specialties/save", $scope.specialties, $scope);
		}


	})

	.controller('examsFormsController', function($scope, $rootScope) {		
		$rootScope.load("examsForms.json");
		$scope.$on('dataLoaded', function(event, data) {
			$scope.examsForms = data;	
			console.log($scope.examsForms);		
		});
		
		
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

	.controller('relationsController', function($scope, $rootScope) {		
		$rootScope.load("relations.json");
		/*$scope.$on('dataLoaded', function(event, data) {
			$scope.relations = data.relations;
			$scope.exams = data.exams;
		});*/


		$scope.$on('dataLoaded', function(event, data) {
			$scope.relations = data;
		});
		//console.log($scope.relations);

		/*$scope.editIndex = 0;

		$scope.newRelation = [];
*/
		/*
		$scope.hasExam = function(relation, exam) {
			var result = false;
			relation.forEach(function(item) {
				if (item.name == exam.name && item.type == exam.type) 
					result = true;
			})

			return result;
		}

		$scope.freeExams = function() {
			var result = [];			

			if ($scope.exams)
				$scope.exams.forEach(function(exam) {
					var free = true;
					$scope.relations.forEach(function(relation) {
						if ($scope.hasExam(relation, exam)) 
							free = false;				
					})

					if (free) {
						result.push(exam);
					}
				});

			return result;
		} */



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