angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http) {
	$scope.champs = [];
	getChamps();

  // Get champs from riot api
  function getChamps(){
    $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=spells&api_key=5b0779a8-6a96-4ca0-ad88-95deb2561b41')
      .then(function(response) {
        var champObj = response.data.data;      
	  		var champImg= 'http://www.mobafire.com/images/champion/icon/'; 
	  		window.x = champObj;

	  		//loop through each champ object saving name, img, and ability cooldowns
	      angular.forEach(champObj, function(value, key) {
	      	// console.log(value.spells[0].cooldownBurn);
	      	var imgUrl = champImg + value.name + ".png";
	      	imgUrl = imgUrl.replace(/\s+/g, '-').replace(/'/,'').toLowerCase();

          if (value.name === "Dr. Mundo"){
          	imgUrl = "http://www.mobafire.com/images/champion/icon/dr-mundo.png";
          }	
         
          $scope.champs.push({"name": value.name, "img": imgUrl, "qName": value.spells[0].name, "qCost": value.spells[0].cooldownBurn, "wName": value.spells[1].name, "wCost": value.spells[1].cooldownBurn, "eName": value.spells[2].name, "eCost": value.spells[2].cooldownBurn, "rName": value.spells[3].name, "rCost": value.spells[3].cooldownBurn,});

				});
      					
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

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('SummonersCtrl', function($scope) {
});
