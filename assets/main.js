(function() {
  'use strict';
  var container;
  var camera, scene, controls, renderer, room;
  var stlLoader = new THREE.STLLoader();
  var models = [
    "bFZbl-mmCeD_obj", // vive
  ];
  var scenemodels = [];

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 2;
    scene.add(camera);
    // Add some lights
    var light = new THREE.AmbientLight(0x606060);
    light.position.set(0, 10, 1);
    scene.add(light);
    var directional = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(directional);
    // Create a box for us to be inside
    room = new THREE.Mesh(
      new THREE.BoxGeometry(6, 6, 6, 8, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x4d6dfe, wireframe: true })
    );
    scene.add(room);
    models.forEach(function(model) {
      var folder = `models/${model}/`;
      loadmodel(`${folder}model.stl`);
    });
    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x222222);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;


    document.getElementById('head').appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
  }

  function loadmodel(model) {
    stlLoader.load(model, function(geo) {
      var obj = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ color: 0xc44bff }));
      scene.add(obj);
      scenemodels.push(obj.id);
    });
  }

  function onWindowResize() {
    var wiw = window.innerWidth;
    var wih = window.innerHeight;
    camera.aspect = wiw / wih;
    camera.updateProjectionMatrix();
    renderer.setSize(wiw, wih);
  }

  function animate() {
    // Stuff to do every frame here
    renderer.render(scene, camera);
    scenemodels.forEach(function(id) {
      scene.getObjectById(id, true).rotation.x += .004;
      // scene.getObjectById(id, true).rotation.z += .025;
      scene.getObjectById(id, true).rotation.y += .001;
    });
    requestAnimationFrame(animate);
  }
  init();
  animate();
}());
