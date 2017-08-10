/**
 * Created with JetBrains WebStorm.
 * User: krishna1
 * Date: 24/4/16
 * Time: 1:41 PM
 * To change this template use File | Settings | File Templates.
 */
var GLOBAL_SOCKET=null;

angular.module('starter.controllers', [])

.controller('SettingsCtrl', function($state, $scope,$http, $rootScope){
        $scope.actions={};
        $scope.header={};

        if($rootScope.rootobj && $rootScope.rootobj.serverurl){
            $scope.header.serverip=$rootScope.rootobj.serverurl;
        }

        $scope.actions.save=function(){
            $rootScope.isConnected=false;
            if($scope.header.serverip && $scope.header.serverip.length>0){
               /* if(GLOBAL_SOCKET){
                    GLOBAL_SOCKET._onDisconnect();
                }*/
                /*GLOBAL_SOCKET= io.connect("http://"+$scope.header.serverip+":8080/")
                GLOBAL_SOCKET.on('connect',function(){
                    console.log("connected");
                    if(!$rootScope.rootobj){
                        $rootScope.rootobj={};
                    }
                    $rootScope.rootobj.isConnected=true;

                    $rootScope.rootobj.serverurl=$scope.header.serverip;
                    try{

                        $rootScope.$apply();
                    }catch(e){}
                })*/

                $http.get("http://"+$scope.header.serverip+":"+KM_SERVER_PORT+"/connectstatus").then(function(res){
                    if(!$rootScope.rootobj){
                        $rootScope.rootobj={};
                    }
                    $rootScope.rootobj.isConnected=true;

                    $rootScope.rootobj.serverurl=$scope.header.serverip;
                    try{

                        $rootScope.$apply();
                    }catch(e){}
                }).catch(function(err){

                    })

            }
        }

        $scope.actions.gotoBack=function(){
            $state.go('keybaordmouse');
        }


    })

    .controller('KeyboardMouseCtrl', function($state, $scope, $rootScope, $ionicPosition,$cordovaVibration, HttpKeyboardService){

        var VIBTRATE_AMT=30;
        var KeyboardService=HttpKeyboardService;


        $scope.keyboard={};
        $scope.keyboard.show=true;
        $scope.keyboard.mode=2;//2 for alpha, 1 for numeric, 3, for symbol

        $scope.actions = {};

        $scope.actions.buttonUp=function(key){
            console.log("button Up:"+key);
            KeyboardService.releaseKey(key);
        }
        $scope.actions.buttonClick=function(key){
            console.log("button Click:"+key);
            KeyboardService.clickKey(key);
            $cordovaVibration.vibrate(VIBTRATE_AMT);


        }
        $scope.actions.buttonHold=function(key){
            console.log("button Hold:"+key);
            KeyboardService.holdKey(key);
            $cordovaVibration.vibrate(VIBTRATE_AMT);

        }

        $scope.actions.switchToAbc=function(){
            $scope.keyboard.mode=2;
            $cordovaVibration.vibrate(VIBTRATE_AMT);

        }

        $scope.actions.switchToNum=function(){
            $scope.keyboard.mode=1;
            $cordovaVibration.vibrate(VIBTRATE_AMT);

        }
        $scope.actions.hide=function(){
            $scope.keyboard.show=false;
            $cordovaVibration.vibrate(VIBTRATE_AMT);

        }

        $scope.actions.show=function(){
            $scope.keyboard.show=true;
            $cordovaVibration.vibrate(VIBTRATE_AMT);

        }




        $scope.mouse={};
        $scope.mouse.lefthold=false;

        $scope.actions.mouseLeftToggle = function(event){
            //console.log("mouseLeftRelease ");
            //console.log(event);
            $scope.mouse.lefthold=!$scope.mouse.lefthold;
            if($scope.mouse.lefthold){
                KeyboardService.holdLeftClick(event);

            }else{
                KeyboardService.releaseLeftClick(event);

            }
        }

        $scope.actions.mouseLeftRelease = function(){
            KeyboardService.releaseLeftClick();
        }

        $scope.actions.mouseLeftRelease();

        $scope.actions.mouseLeftClick=function(){
            KeyboardService.leftClick();
        }
        $scope.actions.mouseRightClick=function(){
            KeyboardService.rightClick();
        }

        $scope.actions.scrollUp = function(){
            KeyboardService.scrollUp();

        }
        $scope.actions.scrollDown = function(){
            KeyboardService.scrollDown();

        }
        $scope.actions.mouseRelease = function(event){
            //console.log("mouseLeftRelease ");
            //console.log(event);
            KeyboardService.dragEnd(event);
        }

        $scope.actions.mouseHold = function(event){
            //console.log("mouseLeftHold ");
            //console.log(event);
            KeyboardService.dragStart(event);

        }
        $scope.actions.mouseLeftClick = function(event){
            //console.log("mouseLeftClick ");
            //console.log(event);
            KeyboardService.leftClick();


        }
       /* $scope.actions.mouseLeftDoubleClick = function(event){
            console.log("mouseLeftDoubleClick ");
            console.log(event);
        }*/
        $scope.actions.mouseDrag = function(event){
            //console.log("mouseDrag ");
            //console.log(event.gesture.deltaX, event.gesture.deltaY);

            try{

                var maxx=angular.element(document.getElementById('canv'))[0].clientWidth;
                var maxy=angular.element(document.getElementById('canv'))[0].clientHeight;
                KeyboardService.moveTo(event, maxx, maxy);

            }catch(e){

            }
            //console.log(angular.element(document.getElementById('canv'))[0].clientHeight);
            //console.log(angular.element(document.getElementById('canv'))[0].clientWidth);


        }

    })
