angular.module('lolcooldown.services', [])

  .factory('User', function($http, $q) {
    var o = {
      username: false,
      session_id: false,
      gameChamps: [],
      replaceChamps: [],
      newChamps: 0
    };

    o.addChampToGame = function(champ) {
      // add to gameChamps array
      o.gameChamps.push(champ);
      o.newChamps++;
      
      // persist this to the server
      // return $http.post(SERVER.url + '/favorites', {session_id: o.session_id, song_id:song.song_id });
    };

    o.removeChampFromGame = function(champ, index) {
      // remove champ from user's game
      o.replaceChamps.push(o.gameChamps.splice(index, 1));
      console.log('replaceChamps',o.replaceChamps);
      o.newChamps--;


      // persist this to the server
      // return $http({
      //   method: 'DELETE',
      //   url: SERVER.url + '/favorites',
      //   params: { session_id: o.session_id, song_id:song.song_id }
      // });
    };

    o.champCount = function() {
      return o.newChamps;
    };

    // gets the entire list of this user's favs from server
    o.populateFavorites = function() {
      return $http({
        method: 'GET',
        url: SERVER.url + '/favorites',
        params: { session_id: o.session_id }
      }).success(function(data){
        // merge data into the queue
        o.favorites = data;
      });
    };      

    // // attempt login or signup
    // o.auth = function(username, signingUp) {
    //   var authRoute;

    //   if (signingUp) {
    //     authRoute = 'signup';
    //   } else {
    //     authRoute = 'login';
    //   }
    //   return $http.post(SERVER.url + '/' + authRoute, {username: username})
    //     .success(function(data){
    //       o.setSession(data.username, data.session_id, data.favorites);
    //     });
    // };

    // // set session data
    // o.setSession = function(username, session_id, favorites) {
    //   if (username) o.username = username;
    //   if (session_id) o.session_id = session_id;
    //   if (favorites) o.favorites = favorites;

    //   // set data in localstorage object
    //   $localstorage.setObject('user', { username: username, session_id: session_id });
    // };

    // // check if there's a user session present
    // o.checkSession = function() {
    //   var defer = $q.defer();

    //   if (o.session_id) {
    //     // if this session is already initialized in the service
    //     defer.resolve(true);

    //   } else {
    //     // detect if there's a session in localstorage from previous use.
    //     // if it is, pull into our service
    //     var user = $localstorage.getObject('user');

    //     if (user.username) {
    //       // if there's a user, lets grab their favorites from the server
    //       o.setSession(user.username, user.session_id);
    //       o.populateFavorites().then(function() {
    //         defer.resolve(true);
    //       });

    //     } else {
    //       // no user info in localstorage, reject
    //       defer.resolve(false);
    //     }

    //   }

    //   return defer.promise;
    // };

    // // wipe out our session data
    // o.destroySession = function() {
    //   $localstorage.setObject('user', {});
    //   o.username = false;
    //   o.session_id = false;
    //   o.favorites = [];
    //   o.newFavorites = 0;
    // };              

    // after all o Methods defined.... Finally return o
    return o;
  });