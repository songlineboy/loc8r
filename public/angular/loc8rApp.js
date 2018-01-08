angular.module('loc8rApp', []);

let _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//a filter
let formatDistance = function () {
  return function (distance) {
    let numDistance, unit;
    if (distance && _isNumeric(distance)) {
      if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
      } else {
        numDistance = parseInt(distance * 1000,10);
        unit = 'm';
      }
      return numDistance + unit;
    } else {
      return "?";
    }
  };
};

// a directive (html dynamic snippets)
let ratingStars = function () {
  return {
    // restrict: 'EA',
    scope: {
      thisRating : '=rating'
    },
    // template : "{{ thisRating }}"
    templateUrl: '/angular/rating-stars.html'
  };
};

let geolocation = function () {
  let getPosition = function (cbSuccess, cbError, cbNoGeo) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    }
    else {
      cbNoGeo();
    }
  };
  return {
    getPosition : getPosition
  };
};

var loc8rData = function ($http) {
  var locationByCoords = function (lat, lng) {
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20000000');
  };
  return {locationByCoords : locationByCoords};
};

let locationListCtrl = function ($scope, loc8rData, geolocation){

  $scope.message = "Checking your location";

  $scope.getData = function (position) {
    let lat = position.coords.latitude,
        lng = position.coords.longitude;
      
    $scope.message = "Searching for nearby places";

    loc8rData.locationByCoords(lat, lng)
      .then(function(d) {
        console.log($scope);
        let data = d.data;
        // dont need to push this change of scope to view as this is wrapped already by this promise returned in most angular inbuilt services like http
        $scope.message = data.length > 0 ? "" : "No locations found nearby";
        $scope.locations = data;
      })
      .catch(function (e) {
        console.log(e);
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });
  };

  $scope.showError = function (error) {
    $scope.$apply(function() {
      $scope.message = error.message;
    });
  };

  $scope.noGeo = function () {
    $scope.$apply(function() {
      $scope.message = "Geolocation is not supported by this browser.";
    });
  };

  geolocation.getPosition($scope.getData,$scope.showError,$scope.noGeo);
};


angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData)
  .service('geolocation', geolocation);
