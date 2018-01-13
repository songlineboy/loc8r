// IIFE immediately invokes function expression - hides content from global scope 
// cleaner and encapsulates away to its own space - and we connect everything our angular. var
(function () {

  angular
    .module('loc8rApp')
    .service('geolocation', geolocation);

  function geolocation () {
    var getPosition = function (cbSuccess, cbError, cbNoGeo) {
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
  }


})();