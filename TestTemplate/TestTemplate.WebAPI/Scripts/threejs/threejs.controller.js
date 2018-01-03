(function () {

    //todo try to load object of the following points
    //-477.67 0,70.929
    //-477.49, 0,467.432
    //-323.82,0,-489.21
    //-377.75,0,66.777
    //-371.31,0,473.11



    'use strict';

    angular.module('erp.threejs').controller('ThreejsCtrl', ThreejsCtrl);

    ThreejsCtrl.$inject = ['$q','$scope', '$http', 'config', 'tenant', 'authService', '$stateParams', 'kendoGridService'];

    function ThreejsCtrl($q, $scope, $http, config, tenant, authService, $stateParams, kendoGridService) {
        //initialise global variable


        $scope.global = [];
        $scope.tenant = tenant;

        $scope.draggedObject = [];

        $scope.mousePositionX = 0;
        $scope.mousePositionY = 0;

        $scope.selectedMachineInfo = [];

        $scope.lid = true;

        $scope.uniqueMcID = []; // to store unique McID for color
        $scope.uniqueMcIDColor = []; // to store unique McID for color

        var currentData;
        // var intOption;

        $scope.layout = {};
        $scope.layout.tenantMaster = false;
        var subscriptionSiteMap = _.find(authService.currentUser.siteMap, { 'code': 'threejs-13' });

        $scope.subMenus = _.reduce(authService.currentUser.siteMap, function (memo, siteMap) {
            if (siteMap.siteMapParentId === subscriptionSiteMap.id) {
                if (typeof siteMap.tag === 'string') {
                    siteMap.tag = JSON.parse(siteMap.tag);
                }
                memo.push(siteMap);
            }
            return memo;
        }, []);
        $scope.select_WorkCenter = "";
        var container;
        var camera, scene, renderer, controls;
        var plane;
        var sprite1;
        var sprite2;
        var canvasText;
        var effectController;

        var mouse, raycaster, isShiftDown = false;

        var cubeGeometry = new THREE.BoxGeometry(40, 40, 40);
        var color = new THREE.Color("rgb(66, 72, 244)");
        var cubeMaterial = new THREE.MeshLambertMaterial({ color, overdraw: 0.5 });


        var humancubeGeometry = new THREE.BoxGeometry(10, 40, 10);
        var humancolor = new THREE.Color("rgb(44, 166, 166)");
        var humancubeMaterial = new THREE.MeshLambertMaterial({ humancolor, overdraw: 0.5 });

        var objects = [];
        var texture1;
        var context1;
        //var context2;



        init();



        function init() {
            $('#infoBox').show();
            $("#infoBox").resizable();
            //$("#info-detail-modal").modal("show");
            $http.get(config.baseUrlApi + 'HMLVTS/populateMachineID')
            .then(function (response) {
                console.log("populateMachineID", response);
                //createSelect(response.data.result, "WorkCenter");
                var promiseArray1 = [];
                for (var i = 0; i < response.data.result.length;i++){
                    promiseArray1.push(
                    $http.post(config.baseUrlApi + 'HMLVTS/getCurrentWorkOrderByMcID', {
                        'McID': String(response.data.result[i]['mcID']).trim()
                    })
                 );


                }

                $q.all(promiseArray1).then(function (response) {
                    console.log("getCurrentWorkOrderByMcID", response);
                    $scope.info = response;
                    $http.get(config.baseUrlApi + 'HMLVTS/populateWorkCentre')
            .then(function (response) {
                //console.log("populateWorkCentre1",response);
                createSelect(response.data.result, "WorkCenter");
            });
                    $("#myModal").modal("show");

                });

            });

            

        }

        function getInfo(mcID) {
            console.log("getInfo info", $scope.info);
            console.log("getInfo","|"+mcID+"|");
            for (var i = 0; i < $scope.info.length; i++) {
                console.log("getInfo index0", $scope.info[i].data.result);
                if ($scope.info[i].data.success &&
                    $scope.info[i].data.result.length != 0 
                    //&&
                   // $scope.info[i].data.result[0]['mcID'] != undefined &&
                    // String($scope.info[i].data.result[0]['mcID']).trim() == mcID
                    ) {


                    var infoMcId = String($scope.info[i].data.result[0]['mcID']).trim();
                    console.log("getInfo infoMcId", infoMcId);
                    if (infoMcId == mcID) {
                    console.log("getInfo index", i);
                    console.log("getInfo index1", $scope.info[i].data.result);
                    return $scope.info[i].data.result[0];
                    }


                }

            }
            return [];
        }

        //'*******************************************************************
        //'Title     :  createSelect
        //'Function  :  
        //'Input     : 
        //'Output    : 
        //'Remark    : to create selector 
        //'*******************************************************************
        function createSelect(rawData, itemName) {
            var myDiv = document.getElementById("select_" + itemName);
            var array = [];
            if (itemName != "WorkCenter") {
                array.push("");
            }


            if (itemName == "WorkCenter") {
                // console.log("WorkCenter selector",rawData);
                array.push("");
                for (var i = 0; i < rawData.length; i++) {
                    //console.log(rawData[i]["workCenter"]);
                    array.push(rawData[i]["workCenter"]);

                }
                $scope.workCenters = array;
            }



            //if (itemName == "Fai") {
            //    for (var i = 0; i < rawData.length; i++) {
            //        array.push(rawData[i].remark1);
            //    }
            //}

            //array = removeDuplicate(array);
            for (var i = 0; i < array.length; i++) {
                var option = document.createElement("option");
                option.value = array[i];
                option.text = array[i];
                myDiv.appendChild(option);
            }
        }

        $scope.open = function() {
            $("#myModal").modal("toggle");
            // $('canvas').remove();
            //starting of 3js code

            var promiseArray1 = [];
            $scope.select_WorkCenter = String($('#select_WorkCenter option:selected').text()).trim();

            promiseArray1.push(
            $http.post(config.baseUrlApi + 'HMLVTS/GenerateMcIDByWorkCenter', {
                'WorkCenter': $scope.select_WorkCenter

            })
         );

         $q.all(promiseArray1).then(function (response) {
             console.log("GenerateMcIDByWorkCenter", response);
             if (response.length != 0) {
                 if (response[0].data.success) {
                     $scope.McID = response[0].data.result;

                     for (var i = 0; i < $scope.McID.length; i++){
                         var mcid = String($scope.McID[i]['mcID']).trim();;
                         if($scope.uniqueMcID.indexOf(mcid) === -1){
                             $scope.uniqueMcID.push(mcid);
                         }
                     }
                     console.log("uniqueMcID", $scope.uniqueMcID);
                     for (var i = 0; i < $scope.uniqueMcID.length;i++){
                         var color = random_rgba();
                         var item = [];
                         item['color'] = color;
                         item['mcID'] = $scope.uniqueMcID[i];
                         $scope.uniqueMcIDColor.push(item);
                     }

                     console.log("uniqueMcIDColor", $scope.uniqueMcIDColor);
                     initMotion();
                     render();
                 }
             }
             

        });


        }


        function initMotion() {
           // $("#myModal").modal("show");
            $scope.gridSize = 20;
            container = document.createElement('div');
            container.setAttribute("id","canvasBody");
             document.body.appendChild( container );
           // document.getElementById("displayBox").appendChild(container);

            //var info = document.createElement( 'div' );
            //info.style.position = 'absolute';
            //info.style.top = '10px';
            //info.style.width = '100%';
            //info.style.textAlign = 'center';
            //info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> - voxel painter<br><strong>click</strong>: add voxel, <strong>shift + click</strong>: remove voxel, <a href="javascript:save()">save .png</a>';
            //container.appendChild( info );


        //    console.log("camera", window.innerWidth / window.innerHeight);
            camera = new THREE.PerspectiveCamera( 40, (window.innerWidth / window.innerHeight), 1, 10000 );
            camera.position.set( 600, 800, 1300 );
            camera.lookAt( new THREE.Vector3() );




            scene = new THREE.Scene();
           // scene.background = new THREE.Color(0xf0f0f0);// white background#FBB06C
          //  scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);
             scene.background = new THREE.Color(0xFBB06C);

            // Grid

            var gridHelper = new THREE.GridHelper(1000, $scope.gridSize, 0xffffff, 0xffffff);
            scene.add( gridHelper );

            //

            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
            geometry.rotateX( - Math.PI / 2 );

            plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
            scene.add( plane );

            objects.push( plane );

            var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

            // Lights

            var ambientLight = new THREE.AmbientLight( 0x606060 );
            scene.add( ambientLight );

            var directionalLight = new THREE.DirectionalLight( 0xffffff );
            directionalLight.position.x = Math.random() - 0.5;
            directionalLight.position.y = Math.random() - 0.5;
            directionalLight.position.z = Math.random() - 0.5;
            directionalLight.position.normalize();
            scene.add( directionalLight );

            var directionalLight = new THREE.DirectionalLight( 0x808080 );
            directionalLight.position.x = Math.random() - 0.5;
            directionalLight.position.y = Math.random() - 0.5;
            directionalLight.position.z = Math.random() - 0.5;
            directionalLight.position.normalize();
            scene.add( directionalLight );

            renderer = new THREE.CanvasRenderer();
            console.log('renderer',renderer);
            renderer.domElement.id = 'floorCanvas';
          //  console.log("window.devicePixelRatio",window.devicePixelRatio);
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize(window.innerWidth, window.innerHeight);
           // renderer.setSize(696, 950);
            container.appendChild(renderer.domElement);

            document.addEventListener('mousedown', onDocumentMouseDown, false);
            document.addEventListener('mouseup', onDocumentMouseUp, false);
            //document.addEventListener( 'keydown', onDocumentKeyDown, false );
            //document.addEventListener('keyup', onDocumentKeyUp, false);
            document.addEventListener('mousemove', onDocumentMouseMove, false);

            //
            //controls = new THREE.OrbitControls(camera, renderer.domElement);
            //controls.addEventListener('change', render); // remove when using animation loop
            //// enable animation loop when using damping or autorotation
            ////controls.enableDamping = true;
            ////controls.dampingFactor = 0.25;
            //controls.minDistance = 1000;
            //controls.maxDistance = 5000;
            //controls.enableZoom = false;

            // controls
            var controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.maxPolarAngle = Math.PI * 0.5;
            controls.minDistance = 1000;
            controls.maxDistance = 5000;

            window.addEventListener( 'resize', onWindowResize, false );


            document.getElementById("main-container-page").setAttribute("style", "display:none;")


                //// CONTROLS
                //cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
                //cameraControls.addEventListener('change', render);

            //tooltip
            // create a canvas element
            canvasText = document.createElement('canvas');
           // canvasText.width = 400;
           // canvasText.height = 800;
            context1 = canvasText.getContext('2d');
            context1.font = "Bold 15px Arial";
            context1.fillStyle = "rgba(0,0,0,0.95)";
            context1.fillText('Hello, world!', 0, 20);



            //context2 = canvasText.getContext('2d');
            //context2.font = "Bold 15px Arial";
            //context2.fillStyle = "rgba(1,1,0,0.95)";
            //context2.fillText('Hello, world!', 0, 20);
            //context2.clearRect(0, 0, 1240, 680);
           // context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler







            // canvas contents will be used for a texture
            texture1 = new THREE.Texture(canvasText)
            texture1.needsUpdate = true;

           // var spriteMaterial = new THREE.SpriteMaterial({ map: texture1, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.topLeft });
            var spriteMaterial = new THREE.SpriteMaterial({ map: texture1, color: 0xffffff });


            sprite1 = new THREE.Sprite(spriteMaterial);
            sprite1.scale.set(300, 200, 1.0);
            sprite1.position.set(50, 50, 0);
            scene.add(sprite1);

            //var spriteMaterial2 = new THREE.SpriteMaterial({ map: texture1, color: 0x00ffff });
            //sprite2 = new THREE.Sprite(spriteMaterial2);
            //sprite2.scale.set(300, 200, 1.0);
            //sprite2.position.set(-1 * (window.innerWidth ), -1 * (window.innerHeight), 0);
            //scene.add(sprite2);


            // FLOOR
            var floorTexture = new THREE.ImageUtils.loadTexture('Content/img/7552.jpg');
            floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
            floorTexture.repeat.set(1, 1);
            var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
            var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
            var floor = new THREE.Mesh(floorGeometry, floorMaterial);
           // floor.position.y = -50.5;
            floor.position.y = 0
            floor.rotation.x = Math.PI / 2;
            scene.add(floor);

            console.log("floor", floor);


            //textures\cube\skybox
            // SKYBOX/FOG
            //var materialArray = [];
            ////materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Content/img/dawnmountain-xpos.png') }));
            ////materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Content/img/dawnmountain-xneg.png') }));
            ////materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Content/img/dawnmountain-ypos.png') }));
            ////materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Content/img/dawnmountain-yneg.png') }));
            ////materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Content/img/dawnmountain-zpos.png') }));
            ////materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('Content/img/dawnmountain-zneg.png') }));
            //materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/cube/skybox/px.jpg') }));
            //materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/cube/skybox/nx.jpg') }));
            //materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/cube/skybox/py.jpx') }));
            //materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/cube/skybox/ny.jpx') }));
            //materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/cube/skybox/pz.jpg') }));
            //materialArray.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/cube/skybox/nz.jpg') }));
            //for (var i = 0; i < 6; i++) {
            //    materialArray[i].side = THREE.BackSide;
            //}
            //var skyboxMaterial = new THREE.MeshFaceMaterial(materialArray);

            //var skyboxGeom = new THREE.CubeGeometry(15000, 15000, 15000, 1, 1, 1);

            //var skybox = new THREE.Mesh(skyboxGeom, skyboxMaterial);
            //scene.add(skybox);



            loadObject();// for testing
            setupGui();
            setupInfoBox();
        }

        function setupInfoBox() {
            $("#infoBox").show();
            
        }
        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

            render();

        }

        function onDocumentMouseMove(event) {

            event.preventDefault();

            $scope.mousePositionX = event.clientX;
            $scope.mousePositionY = event.clientY;

            // update sprite position
            sprite1.position.set(event.clientX - 800, -event.clientY+500 - 20, 0);

            // update the mouse variable
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


            //mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            //mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            //sprite1.position.set(mouse.x, mouse.y , 1);
            //sprite1.position.set(event.clientX - 500, -event.clientY , 0);
            console.log("moving", mouse.x + " " + mouse.y);
           // requestAnimationFrame(animate);
            updateTooltip();
            render();
        }

        function onDocumentMouseDown(event) {
            mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

            

            //  console.log("mouse", mouse);
            //  console.log("camera",camera);
            console.log("onDocumentMouseDown objects",objects);
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects( objects );
            console.log("onDocumentMouseDown", intersects);
            if (intersects.length > 0) {

                var intersect = intersects[0];
                
                if (intersect.object != plane && intersect.object.info != undefined) { // if is object
                    console.log("onDocumentMouseDown intersect", intersect);
                    intersect.object['isPrevious'] = true;
                    $scope.selectedMachineInfo = intersect.object.info;

                    
                    //for (var i = 0; i < objects.length;i++){
                    //    if (objects[i]['isPrevious'] != undefined && objects[i]['isPrevious']) {
                    //        console.log("onDocumentMouseDown previous", objects[i]);
                    //        objects[i]['isPrevious'] = false;
                    //        objects[i].material.color.setHex(0x00ffff);
                    //       // render();
                    //    }
                    //}
                    if ($scope.prevBox != undefined) {
                        var originalColor = $scope.prevBox.object.originalColor;
                       // $scope.prevBox.object.material.color.setHex(0x0000ff); // there is also setHSV and setRGB

                        $scope.prevBox.object.material.color.r = originalColor.r;
                        $scope.prevBox.object.material.color.g = originalColor.g;
                        $scope.prevBox.object.material.color.b = originalColor.b;

                    }
                    $scope.prevBox = intersect;
                    intersect.object.material.color.setHex(0xffffff); // there is also setHSV and setRGB
                }
            }
        }


        function updateTooltip() {


            mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

            

            //  console.log("mouse", mouse);
            //  console.log("camera",camera);
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects( objects );
            console.log("intersects", intersects);
            if (intersects.length > 0) {

                var intersect = intersects[0];
                if (intersect.object != plane && intersect.object.info != undefined) { // if is object

                    console.log("down " + mouse.x + " " + mouse.y);

                    //  var canvas1 = $('#floorCanva').get(0);

                    //   var c = document.getElementById('floorCanvas');
                    // var canvas1 = c.getContext('2d');

                    //  var canvas1 = renderer.domElement;

                    //  console.log('ctx',canvas1);
                    // console.log("canvas1 0",$('#floorCanva'));
                    //  console.log("canvas1",canvas1);
                    // var  context1 = canvas1.getContext('2d');
                    console.log("object",intersect);
                    context1.clearRect(0, 0, 1240, 680);
                    var message = JSON.stringify(intersect.object.info);
                    var metrics = context1.measureText(message);
                    var width = metrics.width; //8324
                    console.log('width',width);
                   // context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
                    //context1.fillRect(0, 0, width + 8, 20 + 8);
                   // context1.fillRect(0, 0, width + 8, 400 + 8);
                    context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
                    context1.fillRect(2, 2, 8324 + 4, 400 + 4);
                    context1.fillStyle = "rgba(0,0,0,1)"; // text color
                    console.log("context1",context1);
                    //console.log("intersect", intersect.object);
                    // context1.fillText(intersect.object["uuid"], 4, 20);


                    if (intersect.object.info != undefined && intersect.object.info.length != 0) {
                        var txt = "WOID:" + intersect.object.info['woid'] + "\n"
                                + "McID:" + intersect.object.info['mcID'] + "\n"
                                + "McType:" + intersect.object.info['mcType'] + "\n"
                                + "OperatorName:" + intersect.object.info['operatorName'];
                    var x = 30;
                    var y = 30;
                    var lineheight = 20;
                    var lines = txt.split('\n');

                    for (var i = 0; i < lines.length; i++) {
                        context1.fillText(lines[i], x, y + (i * lineheight));
                    }
                    } else {
                        context1.fillText("no work order", 8, 20)
                    }

                   // context1.fillText(textDisplay, 8, 20)
                    texture1.needsUpdate = true;
                } else if (intersect.object['operatorName'] != undefined) {
                    context1.clearRect(0, 0, 940, 480);
                    context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
                    context1.fillRect(0, 0, 8324 + 8, 400 + 8);
                    context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
                    //context1.fillRect(2, 2, 14, 20 + 4);
                    context1.fillRect(2, 2, 8324 + 4, 400 + 4);
                    context1.fillStyle = "rgba(0,0,0,1)"; // text color
                    //console.log("intersect",intersect.object);
                    context1.fillText(intersect.object["operatorName"], 4, 20);
                    texture1.needsUpdate = true;
                }
                else {
                    context1.clearRect(0, 0, 940, 480);
                    context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
                    context1.fillRect(0, 0, 8324 + 8, 400 + 8);
                    context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
                    //context1.fillRect(2, 2, 14, 20 + 4);
                    context1.fillRect(2, 2, 8324 + 4, 400 + 4);
                    context1.fillStyle = "rgba(0,0,0,1)"; // text color
                    //console.log("intersect",intersect.object);
                    context1.fillText(intersect.object["uuid"], 4, 20);
                    texture1.needsUpdate = true;
                   
                }

            } 
        }



        function onDocumentMouseUp(event) {
            console.log("onDocumentMouseUp");
            //$("#info-detail-modal").modal("show")
            //$("#infoBox").text(JSON.stringify($scope.selectedMachineInfo));
            assignSideBox(false);

        }


        function assignSideBox(isUnassign) {
            if (!isUnassign && $scope.selectedMachineInfo != undefined && $scope.selectedMachineInfo.length!= 0) {
                document.getElementById('infobox-actualRecDate').innerHTML = $scope.selectedMachineInfo['actualRecDate'];
                document.getElementById('infobox-actualRecQty').innerHTML = $scope.selectedMachineInfo['actualRecQty'];
                document.getElementById('infobox-completedDate').innerHTML = $scope.selectedMachineInfo['completedDate'];
                document.getElementById('infobox-completedQty').innerHTML = $scope.selectedMachineInfo['completedQty'];
                document.getElementById('infobox-mcID').innerHTML = $scope.selectedMachineInfo['mcID'];
                document.getElementById('infobox-woid').innerHTML = $scope.selectedMachineInfo['woid'];
                document.getElementById('infobox-partID').innerHTML = $scope.selectedMachineInfo['partID'];
            } else {
                document.getElementById('infobox-actualRecDate').innerHTML = "";
                document.getElementById('infobox-actualRecQty').innerHTML = "";
                document.getElementById('infobox-completedDate').innerHTML = "";
                document.getElementById('infobox-completedQty').innerHTML = "";
                document.getElementById('infobox-mcID').innerHTML = "";
                document.getElementById('infobox-woid').innerHTML = "";
                document.getElementById('infobox-partID').innerHTML = "";
            }

        }


        //old function
        //function onDocumentMouseUp(event) {
        //    if ($scope.draggedObject !=[] ) {
        //    event.preventDefault();
        //    console.log("up event",event);
        //    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        //    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        //    console.log("up "+mouse.x + " " + mouse.y);

        //    console.log("$scope.draggedObject", $scope.draggedObject);
        //    // raycaster.setFromCamera(mouse, camera);
        //    // var intersects = raycaster.intersectObjects(objects);

        //    $scope.draggedObject.position.copy(new THREE.Vector3(mouse.x, 0, mouse.y));//.add(intersect.face.normal);


        //    scene.add($scope.draggedObject);
        //    objects.push($scope.draggedObject);
        //    $scope.draggedObject = [];

        //    render();
        //}
        //}



        //original mousedown to add boxo
        //function onDocumentMouseDown( event ) {

        //    event.preventDefault();

        //    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        //    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        //    console.log("down "+mouse.x + " " + mouse.y);

        //  //  console.log("mouse", mouse);
        //  //  console.log("camera",camera);
        //    raycaster.setFromCamera( mouse, camera );

        //    var intersects = raycaster.intersectObjects( objects );
        //    console.log("intersects1", intersects);

        //    if ( intersects.length > 0 ) {

        //        var intersect = intersects[ 0 ];

        //        if ( isShiftDown ) {

        //            if ( intersect.object != plane ) {
        //                $scope.draggedObject = intersect.object;
        //                scene.remove( intersect.object );

        //                objects.splice( objects.indexOf( intersect.object ), 1 );

        //            }

        //        } else {
        //          //  console.log("intersect.point", intersect.point);
        //          //  intersect.point = new THREE.Vector3(intersect.point.x + 50, 0, intersect.point.z);
        //           // console.log("intersect.point2", intersect.point);
        //            var voxel = new THREE.Mesh(cubeGeometry, cubeMaterial);
        //            console.log("intersect.point", intersect.point);
        //            voxel.position.copy( intersect.point ).add( intersect.face.normal );
        //            voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        //          //  console.log(voxel);
        //            // voxel.position.x = voxel.position.x - (2 * 50);
        //            // voxel.position.copy(new THREE.Vector3(voxel.position.x - 250, voxel.position.y, voxel.position.z - 500));
        //         //   console.log("voxel position", voxel.position);
        //            scene.add( voxel );
        //          //  console.log("intersect.point", intersect.point);
        //            objects.push( voxel );

        //            console.log("objects",objects);
        //        }

        //      //  console.log("voxel",voxel);
        //        render();

        //    }

        //}

        function loadObject() {
            //-477.67 0,70.929
            //-477.49, 0,467.432
            //-323.82,0,-489.21
            //-377.75,0,66.777
            //-371.31,0,473.11


            //var loader = new THREE.JSONLoader();
            //loader.load('Content/box.json', function (geometry) {
            //    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());

            //    mesh.position.x = 500;
            //    mesh.position.y = 100;
            //    mesh.position.z = 500;
            //    scene.add(mesh);

            //});

            // instantiate a loader
            //var loader = new THREE.OBJLoader();

            // load a resource
            //loader.load(
            //     resource URL
            //    'Content/box.obj',
            //     called when resource is loaded
            //    function (object) {

            //        scene.add(object);

            //    },
            //     called when loading is in progresses
            //    function (xhr) {

            //        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            //    },
            //     called when loading has errors
            //    function (error) {

            //        console.log('An error happened');

            //    }
            //);
        //    var loader = new THREE.OBJLoader();
        //    loader.load('Content/img/box.obj', function (object) {

        //        object.traverse(function (child) {

        //            if (child instanceof THREE.Mesh) {

        //                child.material.map = texture;

        //            }

        //        });

        //        object.position.y = -95;
        //        scene.add(object);

        //   // }, onProgress, onError);
        //});


            console.log("$scope.McID", $scope.McID);

            //load box
            //  for (var i = 0; i < 2;i++){
            // var crateMaterial = new THREE.SpriteMaterial({ map: crateTexture, useScreenCoordinates: false, color: 0xff0000 });

            //add sprite dialog box
            if($scope.McID.length >=2){
                for (var i = 0; i < 2; i++) {
                    var machine = String($scope.McID[i]['mcID']).trim();
                    if (i == 0) {
                        var spritey = makeTextSprite(machine,
                        { fontsize: 24, borderColor: { r: 255, g: 0, b: 0, a: 1.0 }, backgroundColor: { r: 255, g: 100, b: 100, a: 0.8 } });
                        spritey.position.set(-477.67 + 20, 45, 70.929 + 10);
                        scene.add(spritey);

                        var voxel = makeVoxel(-477.67, 0, 70.929, machine);


                     //   var promiseArray1 = [];
                     //   promiseArray1.push(
                     //   $http.post(config.baseUrlApi + 'HMLVTS/getCurrentWorkOrderByMcID', {
                     //       'McID': machine

                     //   })
                     //);

                     //   $q.all(promiseArray1).then(function (response) {
                     //       console.log("getCurrentWorkOrderByMcID", response);
                     //       if (response.length != 0) {

                     //           if (response[0].data.success && response[0].data.result.length != 0) {
                     //               console.log("test1")
                     //               voxel.info = response[0].data.result[0];
                     //               scene.add(voxel);
                     //               objects.push(voxel);
                     //           } else {
                     //               console.log("test2")
                     //               scene.add(voxel);
                     //               objects.push(voxel);
                     //           }
                     //       } else {
                     //           console.log("test3")
                     //           scene.add(voxel);
                     //           objects.push(voxel);
                     //       }
                        //   });
                        voxel.info = getInfo(machine);

                        console.log("first machine", voxel.info);
                        scene.add(voxel);
                        objects.push(voxel);

                        if (voxel.info['operatorName'] != undefined && voxel.info['operatorName'] != null && String(voxel.info['operatorName']).trim() != "") {
                            var human = makeHuman(-477.67, 0, 70.929, String(voxel.info['operatorName']).trim());
                            scene.add(human);
                            objects.push(human);
                        }


                    }

                    if (i == 1) {
                        spritey = makeTextSprite(machine,
                        { fontsize: 24, borderColor: { r: 255, g: 0, b: 0, a: 1.0 }, backgroundColor: { r: 155, g: 100, b: 100, a: 0.8 } });
                        spritey.position.set(-477.49 + 20, 45, 467.432 + 10);
                        scene.add(spritey);

                        var voxel = makeVoxel(-477.49, 0, 467.432, machine);
                        voxel.info = getInfo(machine);
                        scene.add(voxel);
                        objects.push(voxel);

                        if (voxel.info['operatorName'] != undefined && voxel.info['operatorName'] != null && String(voxel.info['operatorName']).trim() != "") {
                            var human = makeHuman(-477.67, 0, 70.929, String(voxel.info['operatorName']).trim());
                            scene.add(human);
                            objects.push(human);
                        }
                     //   var promiseArray1 = [];
                     //   promiseArray1.push(
                     //   $http.post(config.baseUrlApi + 'HMLVTS/GenerateMcIDByWorkCenter', {
                     //       'McID': machine

                     //   })
                     //);

                     //   $q.all(promiseArray1).then(function (response) {
                     //       console.log("GenerateMcIDByWorkCenter", response);
                     //       if (response.length !=0) {
                     //           if (response[0].data.success && response[0].data.result.length != 0) {
                     //               voxel.info = response[0].data.result[0];
                     //               console.log("test4")
                     //               scene.add(voxel);
                     //               objects.push(voxel);
                     //           } else {
                     //               console.log("test5")
                     //               scene.add(voxel);
                     //               objects.push(voxel);
                     //           }
                     //       } else {
                     //           console.log("test6")
                     //           scene.add(voxel);
                     //           objects.push(voxel);
                     //       }
                     //   });


                    }
                }
            }






            //    var voxel = makeVoxel(-483.4314996186829, 0, -491.91271139593596);
            //    scene.add(voxel);
            //    objects.push(voxel);
            ////getCurrentWorkOrderByMcID
            //    console.log("voxel", voxel);

                //var voxelPlane = makeVoxelPlane(-483.4314996186829, 0, -491.91271139593596);
                //scene.add(voxelPlane);

                //voxel = makeVoxel(25.44411073386641, 1.1368683772161603e-13, 23.087223782740466);
                //scene.add(voxel);
                //objects.push(voxel);


                //voxel = makeVoxel(-477.67, 0, 70.929);
                //scene.add(voxel);
                //objects.push(voxel);
                //voxel = makeVoxel(-477.49, 0, 467.432);
                //scene.add(voxel);
                //objects.push(voxel);
                //voxel = makeVoxel(-323.82, 0, -489.21);
                //scene.add(voxel);
                //objects.push(voxel);
                //voxel = makeVoxel(-377.75, 0, 66.777);
                //scene.add(voxel);
                //objects.push(voxel);
                //voxel = makeVoxel(-371.31, 0, 473.11);
                //scene.add(voxel);
                //objects.push(voxel);






         //     }

            //load human
               var human = makeHuman(25.44411073386641, 1.1368683772161603e-13, 23.087223782740466);
                scene.add(human);
                objects.push(human);

            


            //load lines
                var material = new THREE.LineBasicMaterial({
                    color: 0x0000ff
                });

                var geometry = new THREE.Geometry();
                geometry.vertices.push(
                    new THREE.Vector3(-483.4314996186829, 0, -491.91271139593596),
                    new THREE.Vector3(25.44411073386641, 1.1368683772161603e-13, 23.087223782740466)
                );

                var line = new THREE.Line(geometry, material);
                scene.add(line);
            render();
        }

        function makeVoxel(x, y, z, machine) {
           // var color = new THREE.Color("rgb(66, 72, 244)");
            //var cubeGeometryNew = new THREE.BoxGeometry(40, 40, 40);
            // var color1 = new THREE.Color("rgb(244, 66, 66)");
            var color1 = new THREE.Color(getColor(String(machine).trim()));
            console.log("makeVoxel", color1);
            var cubeMaterialNew = new THREE.MeshLambertMaterial({ color1, overdraw: 0.5 });
            var textureCraft = new THREE.TextureLoader().load('Content/img/crate.gif');
            var cubeTestTextureMaterial = new THREE.MeshBasicMaterial({ map: textureCraft });


            console.log("makeVoxel cubeMaterialNew", cubeMaterialNew);
            console.log("makeVoxel cubeMaterialNew1", new THREE.MeshLambertMaterial({ color, overdraw: 0.5 }));
            cubeMaterialNew.color.b = color1.b;
            cubeMaterialNew.color.g = color1.g;
            cubeMaterialNew.color.r = color1.r;



            //  var voxel = new THREE.Mesh(cubeGeometry, cubeMaterialNew);
            var voxel = new THREE.Mesh(cubeGeometry, cubeTestTextureMaterial);
            voxel.position.copy(new THREE.Vector3(x, y, z));//.add(intersect.face.normal);
            voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
            voxel.McID = machine;
            voxel['originalColor'] = [];
            voxel.originalColor = color1;

            console.log("makeVoxel", voxel)





            return voxel;
        }

        //function makeVoxelPlane(x,y,z) {
        //    var VoxelPlane = new THREE.Sprite(spriteMaterial);
        //    VoxelPlane.position.copy(new THREE.Vector3(x, y, z));//.add(intersect.face.normal);
        //    VoxelPlane.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        //    VoxelPlane.position.y = VoxelPlane.position.y + 25;
        //    return VoxelPlane;
        //}

        function makeHuman(x, y, z,name) {
            var voxel = new THREE.Mesh(humancubeGeometry, humancubeMaterial);
            voxel.position.copy(new THREE.Vector3(x, y, z));//.add(intersect.face.normal);
            voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(50);
            voxel.position.x = voxel.position.x - 5;
            voxel.position.y = voxel.position.y - 25;
            voxel.position.z = voxel.position.z - 5;

            voxel.operatorName = name;
            voxel.name = "human1";
            console.log("voxel",voxel);
            return voxel;
        }

        function onDocumentKeyDown( event ) {

            switch( event.keyCode ) {

                case 16: isShiftDown = true; break;

            }

        }

        function onDocumentKeyUp( event ) {

            switch( event.keyCode ) {

                case 16: isShiftDown = false; break;

            }
        }

        function save() {

            window.open( renderer.domElement.toDataURL('image/png'), 'mywindow' );
            return false;

        }

        function render() {
            if (effectController!= undefined) {
            console.log("effectController", effectController);
            if (effectController.lid !== true) {
                $scope.lid = effectController.lid;
                console.log("Toggled");
               // alert("Toggled");
            }
        }
            renderer.render( scene, camera );

        }


        function makeTextSprite(message, parameters) {
            if (parameters === undefined) parameters = {};

            var fontface = parameters.hasOwnProperty("fontface") ?
                parameters["fontface"] : "Arial";

            var fontsize = parameters.hasOwnProperty("fontsize") ?
                parameters["fontsize"] : 18;

            var borderThickness = parameters.hasOwnProperty("borderThickness") ?
                parameters["borderThickness"] : 4;

            var borderColor = parameters.hasOwnProperty("borderColor") ?
                parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

            var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
                parameters["backgroundColor"] : { r: 255, g: 255, b: 255, a: 1.0 };
            //var spriteAlignment = THREE.SpriteAlignment.topLeft;

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            context.font = "Bold " + fontsize + "px " + fontface;

            // get size data (height depends only on font size)
            var metrics = context.measureText(message);
            console.log("metrics", metrics);//set min width to 200
            if (metrics.width < 200) {
                var textWidth = 200;
            } else {
                var textWidth = metrics.width;
            }
            

            // background color
            context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                          + backgroundColor.b + "," + backgroundColor.a + ")";
            // border color
            context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                                          + borderColor.b + "," + borderColor.a + ")";
            context.lineWidth = borderThickness;
            roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 3 + borderThickness, 6);
            // 1.4 is extra height factor for text below baseline: g,j,p,q.

            // text color
            context.fillStyle = "rgba(0, 0, 0, 1.0)";
            context.fillText(message, borderThickness, fontsize + borderThickness);

            // canvas contents will be used for a texture
            var texture = new THREE.Texture(canvas)
            texture.needsUpdate = true;
            var spriteMaterial = new THREE.SpriteMaterial(
              //  { map: texture, useScreenCoordinates: false, alignment: spriteAlignment });
            { map: texture, useScreenCoordinates: false});
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(100, 50, 1.0);
            return sprite;
        }

        function roundRect(ctx, x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }


        //if (!Detector.webgl) Detector.addGetWebGLMessage();

        //var camera, scene, renderer;
        //var cameraControls;
        //var effectController;
        //var teapotSize = 400;
        //var ambientLight, light;
        //var skybox;

        //var tess = -1;	// force initialization
        //var bBottom;
        //var bLid;
        //var bBody;
        //var bFitLid;
        //var bNonBlinn;
        //var shading;
        //var wireMaterial, flatMaterial, gouraudMaterial, phongMaterial, texturedMaterial, reflectiveMaterial;

        //var teapot, textureCube;

        //// allocate these just once
        //var diffuseColor = new THREE.Color();
        //var specularColor = new THREE.Color();

        //init();
        //render();

        //function init() {

        //    var container = document.createElement('div');
        //    container.setAttribute("style","margin-top:-100px;");
        //    document.body.appendChild(container);

        //    var canvasWidth = window.innerWidth;
        //    var canvasHeight = window.innerHeight;

        //    // CAMERA
        //    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 80000);
        //    camera.position.set(-600, 550, 3300);

        //    // LIGHTS
        //    ambientLight = new THREE.AmbientLight(0x404040);	// 0.2

        //    light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        //    // direction is set in GUI

        //    // RENDERER
        //    renderer = new THREE.WebGLRenderer({ antialias: true });
        //    renderer.setPixelRatio(window.devicePixelRatio);
        //    renderer.setSize(canvasWidth, canvasHeight);
        //    renderer.gammaInput = true;
        //    renderer.gammaOutput = true;
        //    container.appendChild(renderer.domElement);

        //    // EVENTS
        //    window.addEventListener('resize', onWindowResize, false);

        //    // CONTROLS
        //    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
        //    cameraControls.addEventListener('change', render);

        //    // TEXTURE MAP
        //  //  var textureMap = new THREE.TextureLoader().load('textures/UV_Grid_Sm.jpg');
        //    var textureMap = new THREE.TextureLoader().load('textures/ricoh_theta_s.jpg');
        //    textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;
        //   textureMap.anisotropy = 16;

        //    // REFLECTION MAP
        //    var path = "textures/cube/skybox/";
        //    var urls = [
        //        path + "px.jpg", path + "nx.jpg",
        //        path + "py.jpg", path + "ny.jpg",
        //        path + "pz.jpg", path + "nz.jpg"
        //    ];

        //    textureCube = new THREE.CubeTextureLoader().load(urls);

        //    // MATERIALS
        //    var materialColor = new THREE.Color();
        //    materialColor.setRGB(1.0, 1.0, 1.0);

        //    wireMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });

        //    flatMaterial = new THREE.MeshPhongMaterial({ color: materialColor, specular: 0x000000, flatShading: true, side: THREE.DoubleSide });

        //    gouraudMaterial = new THREE.MeshLambertMaterial({ color: materialColor, side: THREE.DoubleSide });

        //    phongMaterial = new THREE.MeshPhongMaterial({ color: materialColor, side: THREE.DoubleSide });

        //    texturedMaterial = new THREE.MeshPhongMaterial({ color: materialColor, map: textureMap, side: THREE.DoubleSide });

        //    reflectiveMaterial = new THREE.MeshPhongMaterial({ color: materialColor, envMap: textureCube, side: THREE.DoubleSide });

        //    // scene itself
        //    scene = new THREE.Scene();
        //    scene.background = new THREE.Color(0xAAAAAA);

        //    scene.add(ambientLight);
        //    scene.add(light);

        //    // GUI
        //    setupGui();

        //}

        //// EVENT HANDLERS

        //function onWindowResize() {

        //    var canvasWidth = window.innerWidth;
        //    var canvasHeight = window.innerHeight;

        //    renderer.setSize(canvasWidth, canvasHeight);

        //    camera.aspect = canvasWidth / canvasHeight;
        //    camera.updateProjectionMatrix();

        //    render();

        //}

        function setupGui() {

            effectController = {

                shininess: 40.0,
                ka: 0.17,
                kd: 0.51,
                ks: 0.2,
                metallic: true,

                hue: 0.121,
                saturation: 0.73,
                lightness: 0.66,

                lhue: 0.04,
                lsaturation: 0.01,	// non-zero so that fractions will be shown
                llightness: 1.0,

                // bizarrely, if you initialize these with negative numbers, the sliders
                // will not show any decimal places.
                lx: 0.32,
                ly: 0.39,
                lz: 0.7,
                newTess: 15,
                bottom: true,
                lid: true,
                body: true,
                fitLid: false,
                nonblinn: false,
                newShading: "glossy"
            };

            var h;

            var gui = new dat.GUI();
            console.log("gui", gui);

            // material (attributes)

            //h = gui.addFolder("Material control");

            //h.add(effectController, "shininess", 1.0, 400.0, 1.0).name("shininess").onChange(render);
            //h.add(effectController, "kd", 0.0, 1.0, 0.025).name("diffuse strength").onChange(render);
            //h.add(effectController, "ks", 0.0, 1.0, 0.025).name("specular strength").onChange(render);
            //h.add(effectController, "metallic").onChange(render);

            // material (color)

            //h = gui.addFolder("Material color");

            //h.add(effectController, "hue", 0.0, 1.0, 0.025).name("hue").onChange(render);
            //h.add(effectController, "saturation", 0.0, 1.0, 0.025).name("saturation").onChange(render);
            //h.add(effectController, "lightness", 0.0, 1.0, 0.025).name("lightness").onChange(render);

            //// light (point)

            //h = gui.addFolder("Lighting");

            //h.add(effectController, "lhue", 0.0, 1.0, 0.025).name("hue").onChange(render);
            //h.add(effectController, "lsaturation", 0.0, 1.0, 0.025).name("saturation").onChange(render);
            //h.add(effectController, "llightness", 0.0, 1.0, 0.025).name("lightness").onChange(render);
            //h.add(effectController, "ka", 0.0, 1.0, 0.025).name("ambient").onChange(render);

            //// light (directional)

            //h = gui.addFolder("Light direction");

            //h.add(effectController, "lx", -1.0, 1.0, 0.025).name("x").onChange(render);
            //h.add(effectController, "ly", -1.0, 1.0, 0.025).name("y").onChange(render);
            //h.add(effectController, "lz", -1.0, 1.0, 0.025).name("z").onChange(render);

            //h = gui.addFolder("Tessellation control");
            //h.add(effectController, "newTess", [2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50]).name("Tessellation Level").onChange(render);
            //h.add(effectController, "lid").name("display lid").onChange(render);
            //h.add(effectController, "body").name("display body").onChange(render);
            //h.add(effectController, "bottom").name("display bottom").onChange(render);
            //h.add(effectController, "fitLid").name("snug lid").onChange(render);
            //h.add(effectController, "nonblinn").name("original scale").onChange(render);

            h = gui.addFolder("Tessellation control");
            //h.add(effectController, "newTess", [2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50]).name("Tessellation Level").onChange(render);
            h.add(effectController, "lid").name("display lid").onChange(render);
            //h.add(effectController, "body").name("display body").onChange(render);
            //h.add(effectController, "bottom").name("display bottom").onChange(render);
            //h.add(effectController, "fitLid").name("snug lid").onChange(render);
            //h.add(effectController, "nonblinn").name("original scale").onChange(render);

            // shading
            //h = gui.add(effectController, "newShading", ["wireframe", "flat", "smooth", "glossy", "textured", "reflective"]).name("Shading").onChange(render);

        }


        ////

        //function render() {

        //    if (effectController.newTess !== tess ||
        //        effectController.bottom !== bBottom ||
        //        effectController.lid !== bLid ||
        //        effectController.body !== bBody ||
        //        effectController.fitLid !== bFitLid ||
        //        effectController.nonblinn !== bNonBlinn ||
        //        effectController.newShading !== shading) {

        //        tess = effectController.newTess;
        //        bBottom = effectController.bottom;
        //        bLid = effectController.lid;
        //        bBody = effectController.body;
        //        bFitLid = effectController.fitLid;
        //        bNonBlinn = effectController.nonblinn;
        //        shading = effectController.newShading;

        //        createNewTeapot();

        //    }

        //    // We're a bit lazy here. We could check to see if any material attributes changed and update
        //    // only if they have. But, these calls are cheap enough and this is just a demo.
        //    phongMaterial.shininess = effectController.shininess;
        //    texturedMaterial.shininess = effectController.shininess;

        //    diffuseColor.setHSL(effectController.hue, effectController.saturation, effectController.lightness);
        //    if (effectController.metallic) {

        //        // make colors match to give a more metallic look
        //        specularColor.copy(diffuseColor);

        //    }
        //    else {

        //        // more of a plastic look
        //        specularColor.setRGB(1, 1, 1);

        //    }

        //    diffuseColor.multiplyScalar(effectController.kd);
        //    flatMaterial.color.copy(diffuseColor);
        //    gouraudMaterial.color.copy(diffuseColor);
        //    phongMaterial.color.copy(diffuseColor);
        //    texturedMaterial.color.copy(diffuseColor);

        //    specularColor.multiplyScalar(effectController.ks);
        //    phongMaterial.specular.copy(specularColor);
        //    texturedMaterial.specular.copy(specularColor);

        //    // Ambient's actually controlled by the light for this demo
        //    ambientLight.color.setHSL(effectController.hue, effectController.saturation, effectController.lightness * effectController.ka);

        //    light.position.set(effectController.lx, effectController.ly, effectController.lz);
        //    light.color.setHSL(effectController.lhue, effectController.lsaturation, effectController.llightness);

        //    // skybox is rendered separately, so that it is always behind the teapot.
        //    if (shading === "reflective") {

        //        scene.background = textureCube;

        //    } else {

        //        scene.background = null;

        //    }

        //    renderer.render(scene, camera);

        //}

        //// Whenever the teapot changes, the scene is rebuilt from scratch (not much to it).
        //function createNewTeapot() {

        //    if (teapot !== undefined) {

        //        teapot.geometry.dispose();
        //        scene.remove(teapot);

        //    }

        //    var teapotGeometry = new THREE.TeapotBufferGeometry(teapotSize,
        //        tess,
        //        effectController.bottom,
        //        effectController.lid,
        //        effectController.body,
        //        effectController.fitLid,
        //        !effectController.nonblinn);

        //    teapot = new THREE.Mesh(
        //        teapotGeometry,
        //        shading === "wireframe" ? wireMaterial : (
        //        shading === "flat" ? flatMaterial : (
        //        shading === "smooth" ? gouraudMaterial : (
        //        shading === "glossy" ? phongMaterial : (
        //        shading === "textured" ? texturedMaterial : reflectiveMaterial)))));	// if no match, pick Phong

        //    scene.add(teapot);

        //}

        //generate random color
        function random_rgba() {
            var o = Math.round, r = Math.random, s = 255;
            return 'rgb(' + o(r() * s) + ', ' + o(r() * s) + ', ' + o(r() * s) +')';
        }

        function getColor(mcID) {
            for (var i = 0; i < $scope.uniqueMcIDColor.length;i++){
                if ($scope.uniqueMcIDColor[i]['mcID'] == mcID) {
                    console.log('test', $scope.uniqueMcIDColor[i]['color']);
                    return $scope.uniqueMcIDColor[i]['color'];
                }
            }
            //        var color = new THREE.Color("rgb(66, 72, 244)");
            return 'rgb(255, 255, 255)';
        }

    }
})();



