angular.module('gobusApp', [])

.controller('findRouteController', ['$http', function($http) {

  var route = this;
  route.submit = function() {

    console.log("depart: "+route.departure);
    console.log("destination: "+route.destination);
/*
    $http({
      method: 'GET',
      url: 'http://192.168.1.25:8002'
    }).then(function successCallback(response) {

    }, function errorCallback(response) {

    });
*/

  };
}

]);
