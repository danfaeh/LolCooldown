angular.module('lolcooldown.controllers', ['lolcooldown.services'])

.controller('HomeCtrl', function($rootScope, $scope, $http, User) {
	$scope.champs = [];
	getChamps();

	$scope.$on('xyz', function(event, data) { 
		$scope.champs = $scope.champs.concat(User.replaceChamps);
	});

	$scope.addToTeam = function(champ){
    var index = $scope.champs.indexOf(champ);
		$scope.champs.splice(index,1);
		User.addChampToGame(champ);
  };

  // Get champs info from riot api
  function getChamps(){
  	// $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key=5b0779a8-6a96-4ca0-ad88-95deb2561b41')
  	// 	.then(function(response){
  	// 		window.gp = response.data.data;
  	// 	});

    $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=enemytips,passive,spells&api_key=5b0779a8-6a96-4ca0-ad88-95deb2561b41')
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

          var tips = value.enemytips;
          var qInfo = value.spells[0].sanitizedDescription;
         
          $scope.champs.push({
            "name": value.name, 
            "img": champImgUrl,
            "tips": tips,
            "qName": value.spells[0].name, 
            "qCost": value.spells[0].cooldownBurn,
            "qImg": qImgUrl,
            "qInfo": value.spells[0].sanitizedDescription,
            "wName": value.spells[1].name, 
            "wCost": value.spells[1].cooldownBurn, 
            "wImg": wImgUrl,
            "wInfo": value.spells[1].sanitizedDescription,
            "eName": value.spells[2].name, 
            "eCost": value.spells[2].cooldownBurn,
            "eImg": eImgUrl,
            "eInfo": value.spells[2].sanitizedDescription, 
            "rName": value.spells[3].name, 
            "rCost": value.spells[3].cooldownBurn,
            "rImg": rImgUrl,
            "rInfo": value.spells[3].sanitizedDescription
          });
				});			
	      window.z = $scope.champs;  
      });
  }
})


.controller('GameCtrl', function($scope, User) {
	$scope.myGame = User.gameChamps;

	$scope.removeChamp = function(champ, index){
		User.removeChampFromGame(champ, index);
	};

  $scope.toggleChamp = function(champ) {
    if ($scope.isChampShown(champ)) {
      $scope.shownChamp = null;
    } else {
      $scope.shownChamp = champ;
    }
  };
  $scope.isChampShown = function(champ) {
    return $scope.shownChamp === champ;
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
  	$scope.$broadcast('xyz', User.replaceChamps);
  };

});






