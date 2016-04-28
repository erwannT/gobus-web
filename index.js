angular.module('gobusApp', ['ui.bootstrap', 'ui-leaflet'])

.controller('findRouteController', ['$http', '$uibModal', '$log', function($http, $uibModal, $log) {

  var route = this;
  route.submit = function() {
    var dep = route.departure.replace(/ /g, "");
    var dest = route.departure.replace(/ /g, "");
    console.log("depart: "+dep);
    console.log("destination: "+dest);

    $http({
      method: 'GET',
      url: '/findroute?from='+dep+'&to='+dest+'&time=now'
    }).then(
      function successCallback(response) {
        route.results = response.data;
      },
      function errorCallback(response) {
        console.log("Request failed.");
        //route.results = route.sampleResults;
      }
    );

  };

  route.routeColors = {
    C4: { type: "bus", color: "6F2282", textColor: "FFFFFF" },
    a:  { type: "metro", color: "FFFFFF", textColor: "EE1D23" },
    1:  { type: "bus", color: "95C11E", textColor: "1A171B" },
    50: { type: "bus", color: "8CA5D6", textColor: "1A171B" }
  };

  route.sampleResults = [
    {

      Steps:
      [
          {
              StartPoint:
              {
                  StopID: 1484,
                  StopName: "ZA Saint-Sulpice",
                  Xpos: "48.1318749048",
                  Ypos: "-1.6358956396",
                  Departuretime: "14:09:00",
                  Arrivaltime: "14:09:00"
              },
              EndPoint:
              {
                  StopID: 1006,
                  StopName: "Turmel",
                  Xpos: "48.1222899582",
                  Ypos: "-1.6507418227",
                  Departuretime: "14:14:00",
                  Arrivaltime: "14:14:00"
              },
              Tripid: "14121",
              Headsign: "50 | Rennes République",
              RouteId: 50,
              Route: "50"
          },
          {
              StartPoint:
              {
                  StopID: 1006,
                  StopName: "Turmel",
                  Xpos: "48.1222899582",
                  Ypos: "-1.6507418227",
                  Departuretime: "14:18:00",
                  Arrivaltime: "14:18:00"
              },
              EndPoint:
              {
                  StopID: 1477,
                  StopName: "Gares",
                  Xpos: "48.1038386084",
                  Ypos: "-1.6728603636",
                  Departuretime: "14:41:00",
                  Arrivaltime: "14:41:00"
              },
              Tripid: "20286",
              Headsign: "1 | Chantepie Rosa Parks",
              RouteId: 1,
              Route: "1"
          }
      ]

  },
  {

      Steps:
      [
          {
              StartPoint:
              {
                  StopID: 1484,
                  StopName: "ZA Saint-Sulpice",
                  Xpos: "48.1318749048",
                  Ypos: "-1.6358956396",
                  Departuretime: "14:09:00",
                  Arrivaltime: "14:09:00"
              },
              EndPoint:
              {
                  StopID: 1006,
                  StopName: "Turmel",
                  Xpos: "48.1222899582",
                  Ypos: "-1.6507418227",
                  Departuretime: "14:14:00",
                  Arrivaltime: "14:14:00"
              },
              Tripid: "14121",
              Headsign: "50 | Rennes République",
              RouteId: 50,
              Route: "50"
          },
          {
              StartPoint:
              {
                  StopID: 1006,
                  StopName: "Turmel",
                  Xpos: "48.1222899582",
                  Ypos: "-1.6507418227",
                  Departuretime: "14:26:00",
                  Arrivaltime: "14:26:00"
              },
              EndPoint:
              {
                  StopID: 1477,
                  StopName: "Gares",
                  Xpos: "48.1038386084",
                  Ypos: "-1.6728603636",
                  Departuretime: "14:49:00",
                  Arrivaltime: "14:49:00"
              },
              Tripid: "20291",
              Headsign: "1 | Chantepie Rosa Parks",
              RouteId: 1,
              Route: "1"
          }
      ]

  },
  {

      Steps:
      [
          {
              StartPoint:
              {
                  StopID: 1484,
                  StopName: "ZA Saint-Sulpice",
                  Xpos: "48.1318749048",
                  Ypos: "-1.6358956396",
                  Departuretime: "14:09:00",
                  Arrivaltime: "14:09:00"
              },
              EndPoint:
              {
                  StopID: 1004,
                  StopName: "Donzelot",
                  Xpos: "48.1252440547",
                  Ypos: "-1.6426764031",
                  Departuretime: "14:12:00",
                  Arrivaltime: "14:12:00"
              },
              Tripid: "14121",
              Headsign: "50 | Rennes République",
              RouteId: 50,
              Route: "50"
          },
          {
              StartPoint:
              {
                  StopID: 1004,
                  StopName: "Donzelot",
                  Xpos: "48.1252440547",
                  Ypos: "-1.6426764031",
                  Departuretime: "14:16:00",
                  Arrivaltime: "14:16:00"
              },
              EndPoint:
              {
                  StopID: 1477,
                  StopName: "Gares",
                  Xpos: "48.1038386084",
                  Ypos: "-1.6728603636",
                  Departuretime: "14:41:00",
                  Arrivaltime: "14:41:00"
              },
              Tripid: "20286",
              Headsign: "1 | Chantepie Rosa Parks",
              RouteId: 1,
              Route: "1"
          }
      ]

  }
  ]
;

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
    console.log("Selected position: "+res);
    $uibModalInstance.close(res);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})


;
