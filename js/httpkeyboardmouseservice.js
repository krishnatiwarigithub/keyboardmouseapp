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

angular.module('starter.httpkeyboardservice', [])
    .factory('HttpKeyboardService', function($rootScope, $http){

        var service={};

        var modifiers=[];
        var modifiersMap={};

        service.sendGetRequest=function(pathWithQStr){
            try{

                $http.get("http://"+$rootScope.rootobj.serverurl+":"+KM_SERVER_PORT+pathWithQStr).then(function(r){
                   // alert(r);
                })
                    .catch(function(err){
                        //alert(err);
                    });

            }catch(e){
                //alert("Exception");

            }

        }

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
                if(key=="="){
                    key="equals";
                }else if(key=="\\"){
                    key="bslash";
                }
                service.sendGetRequest("/keyboard?command=hold&keyt="+key+"&modifiers="+modifiers.join(","));
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
                if(key=="="){
                    key="equals";
                }else if(key=="\\"){
                    key="bslash";
                }
                service.sendGetRequest("/keyboard?command=release&keyt="+key+"&modifiers="+modifiers.join(","));

            }

            //$cordovaVibration.vibrate(100);

        }

        service.clickKey = function(key){
            // click this key, and if previously hold then release
            if(key=="ctrl" || key=="alt" || key=="win" || key=="shift"){

            }else{
                if(key=="="){
                    key="equals";
                }else if(key=="\\"){
                    key="bslash";
                }
                service.sendGetRequest("/keyboard?command=type&keyt="+key+"&modifiers="+modifiers.join(","));

            }

        }










        service.leftClick=function(){
            service.sendGetRequest("/mouse?command=lclick&modifiers="+modifiers.join(","));
        }

        service.rightClick=function(){
            service.sendGetRequest("/mouse?command=rclick&modifiers="+modifiers.join(","));

        }

        service.holdLeftClick = function(){
            service.sendGetRequest("/mouse?command=lhold&modifiers="+modifiers.join(","));

        }

        service.holdRightClick = function(){
            service.sendGetRequest("/mouse?command=rhold&modifiers="+modifiers.join(","));

        }

        service.releaseLeftClick = function(){
            service.sendGetRequest("/mouse?command=lrelease&modifiers="+modifiers.join(","));

        }

        service.releaseRightClick = function(){
            service.sendGetRequest("/mouse?command=rrelease&modifiers="+modifiers.join(","));

        }

        service.doubleClick = function(){
            service.sendGetRequest("/mouse?command=ldclick&modifiers="+modifiers.join(","));

        }


        service.scrollDown = function(){
            service.sendGetRequest("/mouse?command=scrolldown&modifiers="+modifiers.join(","));

        }

        service.scrollUp = function(){
            service.sendGetRequest("/mouse?command=scrollup&modifiers="+modifiers.join(","));

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

                service.sendGetRequest("/mouse?command=move&xcd="+xcd+"&ycd="+ycd+"&maxx="+maxx+"&maxy="+maxy+"&modifiers="+modifiers.join(","));
            }
        }


        return service;


    })
