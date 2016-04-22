angular.module('gobusApp', ['ui.bootstrap', 'ui-leaflet'])

.controller('findRouteController', ['$http', '$uibModal', '$log', function($http, $uibModal, $log) {

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

  route.regex = /^(\-?\d+(\.\d+)?)\s*,\s*(\-?\d+(\.\d+)?)$/;
  route.departure = undefined;
  route.arrival = undefined;

  route.open = function (arg) {

    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        position: function () {
          return route[arg];
          //return route.departure;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      if(selectedItem != undefined)
        route[arg] = selectedItem;
        //position = selectedItem;
        //route.departure = selectedItem;
    }, function () {
    });
  };

}])

// Position selection modal controller

.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, position) {

  $scope.markers = {};

  $scope.center= {
      lat: 48.1037790000,
      lng: -1.6722520000,
      zoom: 13
  };

  $scope.events = {
    map: {
      enable: ['click'],
      logic: 'emit'
    },
    markers:{
      enable: [ 'dragend' ]
    }
  };

  var previous;
  if(position) {
    var res = position.match(/^(\-?\d+(\.\d+)?)\s*,\s*(\-?\d+(\.\d+)?)$/);
    if (res.length == 5)
      previous = { lat: parseFloat(res[1]), lng: parseFloat(res[3]) };

    $scope.center = {
        lat: previous.lat,
        lng: previous.lng,
        zoom: 13
    };
  }

  $scope.setMarker = function(lat, lng) {
    $scope.markers["selectionMarker"] = {
      lat: lat,
      lng: lng,
      focus: true,
      draggable: true
    };
  };

  if(previous)
      $scope.setMarker(previous.lat, previous.lng);


  $scope.$on('leafletDirectiveMap.click', function(event, args){
    $scope.setMarker(args.leafletEvent.latlng.lat, args.leafletEvent.latlng.lng);
  });

  $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
  });


  $scope.ok = function () {
    var res = undefined;
    if("selectionMarker" in $scope.markers)
      res = $scope.markers["selectionMarker"].lat + ", " + $scope.markers["selectionMarker"].lng;
    $uibModalInstance.close(res);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})


;
