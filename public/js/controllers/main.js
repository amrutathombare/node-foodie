angular.module('foodController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Foods', function($scope, $http, Foods) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Foods.get()
			.success(function(data) {
				$scope.foods = data;
				$scope.loading = false;
        });
        //TOTAL=====================================================================    
        $scope.total = function(data){
                Foods.total()
                    .success(function(data){
                       // console.log(data);
				        $scope.sum = data;
				        $scope.loading = false;
                }); 
        };
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.food_name != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Foods.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.foods = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Foods.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.foods = data; // assign our new list of todos
				});
		};
        
	}]);