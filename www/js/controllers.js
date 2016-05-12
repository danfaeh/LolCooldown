angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $http) {

	$scope.champs = [];
	getChamps();
  // Get champs from riot api
  function getChamps(){
    $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=spells&api_key=5b0779a8-6a96-4ca0-ad88-95deb2561b41')
      .then(function(response) {
        var champObj = response.data.data;
	  		window.x = champObj;      

	      angular.forEach(champObj, function(key) {
				  $scope.champs.push({"name": key.name}); 
				});
				window.z = $scope.champs;
        // var champImg= 'http://www.mobafire.com/images/champion/icon/';

        // // loop through all champs & grab image URLs
        // for (var i=0;i<length;i++) {
        //   var imgUrl = champImg + champs[i].name + ".png";
        //   imgUrl = imgUrl.replace(/\s+/g, '-').replace(/'/,'').toLowerCase();
        //   vm.champs.push({"name": champs[i].name, "img": imgUrl, position: champs[i].position, damage: champs[i].damage,  hardcc: champs[i].hardcc, softcc: champs[i].softcc, tank: champs[i].tank, engage: champs[i].engage,   seige:champs[i].seige, waveclear:champs[i].waveclear, aram: champs[i].aram});
        // }
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
