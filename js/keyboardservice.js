/**
 * Created with JetBrains WebStorm.
 * User: krishna1
 * Date: 24/4/16
 * Time: 5:54 PM
 * To change this template use File | Settings | File Templates.
 */




/*
key - Accepts backspace, enter, up, down, left, right, escape, delete, home, end, pageup, pagedown, and a-z.
modifier (optional, string or array) - Accepts alt, command (win), control, and shift.
*/

angular.module('starter.keyboardservice', [])
    .factory('KeyboardService', function($rootScope){

        var service={};

        var modifiers=[];
        var modifiersMap={};

        service.holdKey = function(key){

            // if this key is ctrl, win, alt, shift then put in modifier arr

            if(key=="ctrl" || key=="alt" || key=="win" || key=="shift"){
                modifiers=[];
                if(key=='ctrl'){
                    modifiersMap['control']=true;
                }else if(key=="alt"){
                    modifiersMap['alt']=true;
                }else if(key=="win"){
                    modifiersMap['win']=true;
                }else if(key=="shift"){
                    modifiersMap['shift']=true;

                    if(!$rootScope.rootobj){
                        $rootScope.rootobj={};
                    }

                    $rootScope.rootobj.ishiftholded = true;
                }

                for(var k in modifiersMap){
                    if(modifiersMap[k]){
                        modifiers.push(k);
                    }
                }
            }else{
                //hold this key
                GLOBAL_SOCKET.emit("command",{ctype:"keyboard", command:"hold", keyt:key,  modifiers:modifiers});

            }



        }

        service.releaseKey = function(key){

            // if this key is ctrl, win, alt, shift then release from modifier arr
            if(key=="ctrl" || key=="alt" || key=="win" || key=="shift"){
                modifiers=[];
                if(key=='ctrl'){
                    modifiersMap['control']=false;
                }else if(key=="alt"){
                    modifiersMap['alt']=false;
                }else if(key=="win"){
                    modifiersMap['win']=false;
                }else if(key=="shift"){
                    modifiersMap['shift']=false;
                    if(!$rootScope.rootobj){
                        $rootScope.rootobj={};
                    }

                    $rootScope.rootobj.ishiftholded = false;
                }

                for(var k in modifiersMap){
                    if(modifiersMap[k]){
                        modifiers.push(k);
                    }
                }
            }else{
                // release this key
                GLOBAL_SOCKET.emit("command",{ctype:"keyboard", command:"release", keyt:key,  modifiers:modifiers});

            }

            //$cordovaVibration.vibrate(100);

        }

        service.clickKey = function(key){
            // click this key, and if previously hold then release
            if(key=="ctrl" || key=="alt" || key=="win" || key=="shift"){

            }else{
                GLOBAL_SOCKET.emit("command",{ctype:"keyboard", command:"type", keyt:key, modifiers:modifiers});
            }

        }










        service.leftClick=function(){
            GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"lclick", modifiers:modifiers});

        }

        service.rightClick=function(){
            GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"rclick", modifiers:modifiers});
        }

        service.holdLeftClick = function(){
            GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"lhold", modifiers:modifiers});
        }

        service.holdRightClick = function(){
            GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"rhold", modifiers:modifiers});
        }

        service.releaseLeftClick = function(){
            GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"lrelease", modifiers:modifiers});
        }

        service.releaseRightClick = function(){
            GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"rrelease", modifiers:modifiers});
        }

        service.doubleClick = function(){
            GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"ldclick", modifiers:modifiers});
        }


        service.scrollDown = function(){
            GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"scrolldown", modifiers:modifiers});
        }

        service.scrollUp = function(){
            GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"scrollup", modifiers:modifiers});
        }



        service.dragSX=0;
        service.dragSY=0;

        service.lastDragX=0;
        service.lastDragY=0;

        service.dragStart =function(event){

            if(event && event.x){
                service.dragSX=event.x;
            }else{
                service.dragSX=0;
            }
            if(event && event.y){
                service.dragSY=event.y;
            }else{
                service.dragSY=0;
            }
            service.lastDragX= service.dragSX;
            service.lastDragY= service.dragSY;

            //GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"lclick", modifiers:modifiers});
        }

        service.dragEnd =function(event){
            service.dragSX=0;
            service.dragSY=0;
            service.lastDragX=0;
            service.lastDragY=0;
            //GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"lclick", modifiers:modifiers});
        }

        service.moveTo =function(event, maxx, maxy){

            if(event && event.gesture && !isNaN(event.gesture.deltaX) && !isNaN(event.gesture.deltaY)){


                var xcd = service.dragSX+event.gesture.deltaX - service.lastDragX;
                var ycd = service.dragSY+event.gesture.deltaY - service.lastDragY;


                service.lastDragX=service.dragSX+event.gesture.deltaX;
                service.lastDragY=service.dragSY+event.gesture.deltaY;

                GLOBAL_SOCKET.emit("command",{ctype:"mouse", command:"move", xcd:xcd, ycd:ycd, maxx:maxx, maxy:maxy, modifiers:modifiers});

            }
        }












        return service;


    })
