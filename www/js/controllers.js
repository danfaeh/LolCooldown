angular.module('lolcooldown.controllers', ['lolcooldown.services'])

.controller('HomeCtrl', function($rootScope, $scope, $http, User) {
	$scope.champs = [];
	getChamps();

	$scope.$on('xyz', function(event, data) { 
		console.log('got emit'); 
		console.log(data); 
		$scope.champs = $scope.champs.concat(User.replaceChamps);
	});

	$scope.addToTeam = function(champ, index){
		$scope.champs.splice(index,1);
		User.addChampToGame(champ);
  };

  	// $scope.myTeam.push(champ);
  	// $rootScope.$broadcast('update');
  	// console.log('My Team', $scope.myTeam, "team count", $scope.teamCount);

  // $scope.$on('update',function(){
  // 	$scope.teamCount ++;
  // 	$scope.myTeam = $scope.myTeam;
  // });

  // Get champs array from riot api
  function getChamps(){
  	// $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key=5b0779a8-6a96-4ca0-ad88-95deb2561b41')
  	// 	.then(function(response){
  	// 		window.gp = response.data.data;
  	// 	});


    $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=spells&api_key=5b0779a8-6a96-4ca0-ad88-95deb2561b41')
      .then(function(response) {
        var champObj = response.data.data;      
	  		var champImg= 'http://www.mobafire.com/images/champion/icon/'; 
        var spellImg = 'http://www.mobafire.com/images/ability/';
	  		window.x = champObj;

	  		//loop through each champ object saving name, img, and ability cooldowns
	      angular.forEach(champObj, function(value, key) {
	      	// console.log(value.spells[0].cooldownBurn);
          var champName = value.name;
          champName = normalize(champName);
	      	var champImgUrl = champImg + champName + ".png";

          var qImgUrl = spellImg + champName + "-" + value.spells[0].name + ".png";
          var wImgUrl = spellImg + champName + "-" + value.spells[1].name + ".png";
          var eImgUrl = spellImg + champName + "-" + value.spells[2].name + ".png";
          var rImgUrl = spellImg + champName + "-" + value.spells[3].name + ".png";

          qImgUrl = normalize(qImgUrl);
          wImgUrl = normalize(wImgUrl);
          eImgUrl = normalize(eImgUrl);
          rImgUrl = normalize(rImgUrl);

          function normalize(url){
            return url.replace(/\s+/g, '-').replace(/'/,'').toLowerCase();
          }

          if (value.name === "Dr. Mundo"){
          	champImgUrl = "http://www.mobafire.com/images/champion/icon/dr-mundo.png";
          }	
         
          $scope.champs.push({
            "name": value.name, 
            "img": champImgUrl, 
            "qName": value.spells[0].name, 
            "qCost": value.spells[0].cooldownBurn,
            "qImg": qImgUrl,
            "wName": value.spells[1].name, 
            "wCost": value.spells[1].cooldownBurn, 
            "wImg": wImgUrl,
            "eName": value.spells[2].name, 
            "eCost": value.spells[2].cooldownBurn,
            "eImg": eImgUrl, 
            "rName": value.spells[3].name, 
            "rCost": value.spells[3].cooldownBurn,
            "rImg": rImgUrl
          });
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

.controller('GameCtrl', function($scope, User) {
	$scope.myGame = User.gameChamps;

	$scope.removeChamp = function(champ, index){
		User.removeChampFromGame(champ, index);
	};

})



.controller('SummonersCtrl', function($scope, $http) {
	$scope.summoners = [];
	getSummoners();

	function getSummoners(){
    $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/summoner-spell?spellData=all&api_key=5b0779a8-6a96-4ca0-ad88-95deb2561b41')
      .then(function(response) {
        var sumObj = response.data.data;      
	  		var sumImg ='http://www.mobafire.com/images/summoner-spell/'; 
	  		window.s = sumObj;

	  		//loop through each champ object saving name, img, and ability cooldowns
	      angular.forEach(sumObj, function(value, key) {
	      	// console.log(value.spells[0].cooldownBurn);
	      	var imgUrl = sumImg + value.name + ".png";
	      	imgUrl = imgUrl.replace(/\s+/g, '-').replace(/'/,'').toLowerCase();

          if (value.name === "Poro Toss" || value.name === "Garrison" || value.name === "To the King!" || value.name === "Clairvoyance" || value.name === "Mark"){
          	//do nothing
          }	else{
          	$scope.summoners.push({"name": value.name, "img": imgUrl, "cooldown": value.cooldownBurn});
          }
				});			
	      window.d = $scope.summoners;  
      });
  }
})

.controller('TabsCtrl', function($scope, User) {
	$scope.gameChamps = User.champCount;

  // method to any champions removed from game
  $scope.enteringHome = function() {
  	console.log('entering home'); 
  	$scope.$broadcast('xyz', User.replaceChamps);
  };

});






