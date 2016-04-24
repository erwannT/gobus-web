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


  route.results = [
  {
    steps: [
      {
        line: 'C4',
        type: 'bus',
        direction: 'République',
        departure: {
          time: '21:25',
          stopName: 'Za Saint-Sulpice',
          position: ''
        },
        arrival:  {
          time: '21:46',
          stopName: 'République',
          position: ''
        }
      },
      {
        line: 'a',
        type: 'metro',
        direction: 'Metro La Poterie',
        departure: {
          time: '21:52',
          stopName: 'Metro République',
          position: ''
        },
        arrival:  {
          time: '21:46',
          stopName: 'Metro Gares',
          position: ''
        }
      }
    ]
  },
  {
    steps: [
      {
        line: '1',
        type: 'bus',
        direction: 'Rosa Parks',
        departure: {
          time: '11:10',
          stopName: 'Longs Champs',
          position: ''
        },
        arrival:  {
          time: '11:36',
          stopName: 'Gares',
          position: ''
        }
      }
    ]
  },
  {
    steps: [
      {
        line: '50',
        type: 'bus',
        direction: 'République',
        departure: {
          time: '11:22',
          stopName: 'ZA Saint-Sulpice',
          position: ''
        },
        arrival:  {
          time: '11:26',
          stopName: 'Turmel',
          position: ''
        }
      },
      {
        line: '1',
        type: 'bus',
        direction: 'Rosa Parks',
        departure: {
          time: '11:51',
          stopName: 'Turmel',
          position: ''
        },
        arrival:  {
          time: '12:11',
          stopName: 'Gares',
          position: ''
        }
      }
    ]
  }
];

route.selectedResult = undefined;

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
