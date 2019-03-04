var app = angular.module('493Search', []);
var entered = '';
var counter = 0;


app.controller('searchResult',[ '$scope', '$http', function($scope, $http) {
  $scope.keyPress = function(e){
  	counter = 0;
  	var numFound = 0;
  	if (e == 13){
  		entered = $scope.box;
  		console.log(entered);
  		entered = entered.split(' ').join('+');
  		$http.get(' https://itunes.apple.com/search?term=' + entered +'&limit=200').success(function(response){
			$scope.things = response.results;
			console.log(response);
			numFound = response.resultCount;
			$scope.found = numFound;
			// console.log(numFound);
			if (numFound > 0){
				$scope.noResults = false;
				$scope.shower = true;
			}
			else {
				alert("No results found. Please try a different keyword.")
				$scope.shower = false;
				$scope.noResults = true;
			}
		});
  	}
  }
  $scope.snippets =[];
  $scope.load = [];


  $scope.loadInfo = function(e, num){
  	console.log(e);
  	if ($scope.snippets[num] == null){
  		  	$scope.load[num] = true;
  	}

  	e = e.split(' ').join('+');
 	$http.jsonp('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='+e+'&format=json&callback=JSON_CALLBACK').then(function mySuccess(response) {
 		$scope.load[num] = false;
 		 console.log(response);

 		var html = response.data.query.search[0].snippet;
		var div = document.createElement("div");
		div.innerHTML = html;

		$scope.snippets[num]  = div.textContent || div.innerText || "";
		console.log($scope.snippets[num]);

		if ($scope.snippets[num] == null){
  		  	$scope.snippets[num] = 'Sorry! There is no information for this artist.';
  		}
  		console.log($scope.snippets[num]);
	    }, function myError(response) {
	     
  	});
  	
  }
	
	$scope.truncate = function(string){
	if (string == null){
		return "";
	}
  	else if (string.length > 25)
    	return string.substring(0,25)+'...';
  	else
     	return string;
	};

	$scope.truncateHun = function(string){
	if (string == null){
		return "";
	}
  	else if (string.length > 100)
    	return string.substring(0,100)+'...';
  	else
     	return string;
	};

	$scope.checkArt =function(thing){
		if (thing == null){
			return 'noimage.jpg';
		}
		else {
			return thing;
		}
	}

	$scope.first2words = function(str, no_words) {
    	return str.split(" ").splice(0,no_words).join(" ");
	}


}]);


