angular.module('starter.controllers', [])

.controller('HomeCtrl', function() {
})

.controller('CooldownsCtrl', function($scope) {
  // $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('SummonersCtrl', function($scope) {
});
