(function () {
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

        $scope.lid = true;


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



       // $('canvas').remove();
        //starting of 3js code
        var container;
        var camera, scene, renderer,controls;
        var plane;
        var sprite1;
        var canvasText;
        var effectController;

        var mouse, raycaster, isShiftDown = false;

        var cubeGeometry = new THREE.BoxGeometry(40, 40, 40);
        var color = new THREE.Color("rgb(244, 66, 66)");
        var cubeMaterial = new THREE.MeshLambertMaterial({ color, overdraw: 0.5 });


        var humancubeGeometry = new THREE.BoxGeometry(10, 40, 10);
        var humancolor = new THREE.Color("rgb(44, 166, 166)");
        var humancubeMaterial = new THREE.MeshLambertMaterial({ humancolor, overdraw: 0.5 });

        var objects = [];
        var texture1;
        var context1;

        init();
        render();

        function init() {

            container = document.createElement( 'div' );
            document.body.appendChild( container );

            var info = document.createElement( 'div' );
            info.style.position = 'absolute';
            info.style.top = '10px';
            info.style.width = '100%';
            info.style.textAlign = 'center';
            info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> - voxel painter<br><strong>click</strong>: add voxel, <strong>shift + click</strong>: remove voxel, <a href="javascript:save()">save .png</a>';
            container.appendChild( info );


        //    console.log("camera", window.innerWidth / window.innerHeight);
            camera = new THREE.PerspectiveCamera( 40, (window.innerWidth / window.innerHeight), 1, 10000 );
            camera.position.set( 600, 800, 1300 );
            camera.lookAt( new THREE.Vector3() );




            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xf0f0f0 );

            // Grid

            var gridHelper = new THREE.GridHelper( 1000, 20 );
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
            //document.addEventListener('mouseup', onDocumentMouseUp, false);
            document.addEventListener( 'keydown', onDocumentKeyDown, false );
            document.addEventListener('keyup', onDocumentKeyUp, false);
            document.addEventListener('mousemove', onDocumentMouseMove, false);

            //
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', render); // remove when using animation loop
            // enable animation loop when using damping or autorotation
            //controls.enableDamping = true;
            //controls.dampingFactor = 0.25;
            controls.enableZoom = false;

            window.addEventListener( 'resize', onWindowResize, false );


            document.getElementById("main-container-page").setAttribute("style", "display:none;")


                //// CONTROLS
                //cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
                //cameraControls.addEventListener('change', render);

            //tooltip
            // create a canvas element
            canvasText = document.createElement('canvas');
            context1 = canvasText.getContext('2d');
            context1.font = "Bold 20px Arial";
            context1.fillStyle = "rgba(0,0,0,0.95)";
            context1.fillText('Hello, world!', 0, 20);



            // canvas contents will be used for a texture
            texture1 = new THREE.Texture(canvasText)
            texture1.needsUpdate = true;

           // var spriteMaterial = new THREE.SpriteMaterial({ map: texture1, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.topLeft });
            var spriteMaterial = new THREE.SpriteMaterial({ map: texture1, color: 0xffffff });


            sprite1 = new THREE.Sprite(spriteMaterial);
            sprite1.scale.set(200, 100, 1.0);
            sprite1.position.set(50, 50, 0);
            scene.add(sprite1);

            loadObject();// for testing
            setupGui();
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
                if (intersect.object != plane) {

                    console.log("down " + mouse.x + " " + mouse.y);
                  //  var canvas1 = $('#floorCanva').get(0);

                 //   var c = document.getElementById('floorCanvas');
                   // var canvas1 = c.getContext('2d');

                  //  var canvas1 = renderer.domElement;

                  //  console.log('ctx',canvas1);
                   // console.log("canvas1 0",$('#floorCanva'));
                  //  console.log("canvas1",canvas1);
                    // var  context1 = canvas1.getContext('2d');
                    console.log(intersect);
                    context1.clearRect(0, 0, 640, 480);
                    var message = intersect.uuid;
                    var metrics = context1.measureText(message);
                    var width = metrics.width;
                    context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
                    context1.fillRect(0, 0, width + 8, 20 + 8);
                    context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
                    context1.fillRect(2, 2, width + 4, 20 + 4);
                    context1.fillStyle = "rgba(0,0,0,1)"; // text color
                    context1.fillText(intersect.object["uuid"], 4, 20);
                    texture1.needsUpdate = true;
                }
                else {
                    context1.clearRect(0, 0, 300, 300);
                    context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
                    context1.fillRect(0, 0, width + 8, 20 + 8);
                    context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
                    context1.fillRect(2, 2, 14, 20 + 4);
                    context1.fillStyle = "rgba(0,0,0,1)"; // text color
                 
                    context1.fillText(intersect.object["uuid"], 4, 20);
                    texture1.needsUpdate = true;
                   
                }

            } 
        }

        function onDocumentMouseUp(event) {
            if ($scope.draggedObject !=[] ) {
            event.preventDefault();
            console.log("up event",event);
            mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

            console.log("up "+mouse.x + " " + mouse.y);

            console.log("$scope.draggedObject", $scope.draggedObject);
            // raycaster.setFromCamera(mouse, camera);
            // var intersects = raycaster.intersectObjects(objects);

            $scope.draggedObject.position.copy(new THREE.Vector3(mouse.x, 0, mouse.y));//.add(intersect.face.normal);


            scene.add($scope.draggedObject);
            objects.push($scope.draggedObject);
            $scope.draggedObject = [];

            render();
        }
        }

        function onDocumentMouseDown( event ) {

            event.preventDefault();

            mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
            mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

            console.log("down "+mouse.x + " " + mouse.y);

          //  console.log("mouse", mouse);
          //  console.log("camera",camera);
            raycaster.setFromCamera( mouse, camera );

            var intersects = raycaster.intersectObjects( objects );
            console.log("intersects", intersects);
            if ( intersects.length > 0 ) {

                var intersect = intersects[ 0 ];

                if ( isShiftDown ) {

                    if ( intersect.object != plane ) {
                        $scope.draggedObject = intersect.object;
                        scene.remove( intersect.object );

                        objects.splice( objects.indexOf( intersect.object ), 1 );

                    }

                } else {
                  //  console.log("intersect.point", intersect.point);
                  //  intersect.point = new THREE.Vector3(intersect.point.x + 50, 0, intersect.point.z);
                   // console.log("intersect.point2", intersect.point);
                    var voxel = new THREE.Mesh(cubeGeometry, cubeMaterial);
                    console.log("intersect.point", intersect.point);
                    voxel.position.copy( intersect.point ).add( intersect.face.normal );
                    voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
                  //  console.log(voxel);
                    // voxel.position.x = voxel.position.x - (2 * 50);
                    // voxel.position.copy(new THREE.Vector3(voxel.position.x - 250, voxel.position.y, voxel.position.z - 500));
                 //   console.log("voxel position", voxel.position);
                    scene.add( voxel );
                  //  console.log("intersect.point", intersect.point);
                    objects.push( voxel );

                    console.log("objects",objects);
                }

              //  console.log("voxel",voxel);
                render();

            }

        }

        function loadObject() {


            //load box
          //  for (var i = 0; i < 2;i++){
                var voxel = makeVoxel(-483.4314996186829, 0, -491.91271139593596);
                scene.add(voxel);
                objects.push(voxel);


                //var voxelPlane = makeVoxelPlane(-483.4314996186829, 0, -491.91271139593596);
                //scene.add(voxelPlane);

                voxel = makeVoxel(25.44411073386641, 1.1368683772161603e-13, 23.087223782740466);
                scene.add(voxel);
                objects.push(voxel);
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

        function makeVoxel(x, y, z) {
            var voxel = new THREE.Mesh(cubeGeometry, cubeMaterial);
            voxel.position.copy(new THREE.Vector3(x, y, z));//.add(intersect.face.normal);
            voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

            return voxel;
        }

        //function makeVoxelPlane(x,y,z) {
        //    var VoxelPlane = new THREE.Sprite(spriteMaterial);
        //    VoxelPlane.position.copy(new THREE.Vector3(x, y, z));//.add(intersect.face.normal);
        //    VoxelPlane.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        //    VoxelPlane.position.y = VoxelPlane.position.y + 25;
        //    return VoxelPlane;
        //}

        function makeHuman(x, y, z) {
            var voxel = new THREE.Mesh(humancubeGeometry, humancubeMaterial);
            voxel.position.copy(new THREE.Vector3(x, y, z));//.add(intersect.face.normal);
            voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(50);
            voxel.position.x = voxel.position.x - 5;
            voxel.position.y = voxel.position.y - 25;
            voxel.position.z = voxel.position.z - 5;

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


    }
})();



