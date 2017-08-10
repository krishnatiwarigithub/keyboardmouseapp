// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var KM_SERVER_PORT=8059;

angular.module('starter', ['ionic','ngCordova', 'starter.controllers', 'starter.httpkeyboardservice', 'starter.keyboardservice'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });


      /*  $rootScope.sendText=function(t){
            GLOBAL_SOCKET.emit("command",{ctype:"keyboard", command:"type", keyt:"a"});
        }

        $rootScope.downEvent = function(event){
            console.log("touchstart");
            console.log("1   "+event.x+","+event.y);


        }
        $rootScope.dragEvent = function(event){
            console.log("2   "+event.x+","+event.y);

        }
        $rootScope.upEvent = function(event){
            console.log("touchend");

            console.log("3   "+event.x+","+event.y);

        }*/

})
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {          //$ionicConfigProvider   //add ngCordova plugin also
        $ionicConfigProvider.views.maxCache(0);
        $stateProvider

            .state('settings', {
                url: "/settings",
                templateUrl: "templates/settings.html",
                controller: 'SettingsCtrl'
            })
            .state('keybaordmouse',{
                url: "/keyboardmouse",
                templateUrl: "templates/keyboardmouse.html",
                controller: 'KeyboardMouseCtrl'
            })
        ;



        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/settings');

    });
