angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http) {
	$scope.names = [];
	$scope.champs = [];
	getChamps();
  // Get champs from riot api
  function getChamps(){
    $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=spells&api_key=5b0779a8-6a96-4ca0-ad88-95deb2561b41')
      .then(function(response) {
        var champObj = response.data.data;
	  		window.x = champObj;      

	      angular.forEach(champObj, function(key) {
				  $scope.names.push({"name": key.name}); 
				});
      		
	      // loop through all champs & grab image URLs
	      var champImg= 'http://www.mobafire.com/images/champion/icon/';  
	      var length = $scope.names.length;
	        for (var i=0;i<length;i++) {
	          var imgUrl = champImg + $scope.names[i].name + ".png";
	          imgUrl = imgUrl.replace(/\s+/g, '-').replace(/'/,'').toLowerCase();
	          if ($scope.names[i].name === "Dr. Mundo"){
	          	imgUrl = "http://www.mobafire.com/images/champion/icon/dr-mundo.png";
	          	$scope.champs.push({"name": $scope.names[i].name, "img": imgUrl});
	          }else{
	          	$scope.champs.push({"name": $scope.names[i].name, "img": imgUrl});
	        	}
	        }
	      window.z = $scope.champs;  
      });
  }

  //   function getChamps(){
  // 	$.getJSON( "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=spells&api_key=5b0779a8-6a96-4ca0-ad88-95deb2561b41", function( data ) {
  //     var champs = data.data;
  // 		window.x = champs;

  //     $.each( champs, function( key ) { 
  //       $( "#champ_container").append( '<a href="'+key+'"><div class="col-xs-offset-1 col-xs-10 row champ btn btn-default btn-lg">' + key + '</div><a>' );
  //     });
  //     console.log('finished append');
  //   });
  // }


})

.controller('CooldownsCtrl', function($scope) {
  // $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('SummonersCtrl', function($scope) {
});
