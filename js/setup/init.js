
function init() {
  container = document.querySelector( '#scene-container' );
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x22333 );
  clock = new THREE.Clock();
  mouse = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  additionalPlanesGroup = new THREE.Group();

  trajectoriesMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

  addOriginMassiveBody(scene);
  addSpiralOfBodies(scene);

  document.addEventListener(
      'mousemove',
      function(event) {
          event.preventDefault();
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        },
      false
  );
  document.addEventListener('mouseup', onMouseUp, false);
}

function onMouseUp(event) {
  event.preventDefault();

  if (addPlanetMode) {
    addPlanetMode = false;
    showAdditionalPlane = false;

    addPlanetFromAdditionalPlane();
    deleteAdditionalPlanes();
    togglePlayPause();
  }
}

function createCamera() {
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;

  const near = 1;
  const far = Settings.CAMERA_FAR_DISTANCE;

  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(-4,4, Settings.CAMERA_INITIAL_DISTANCE);
}

function createLights() {
  let ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
  light.position.set(200, 400, 500);

  let light2 = new THREE.DirectionalLight(0xFFFFFF, .6);
  light2.position.set(-400, 200, -300);

  scene.add(light);
  scene.add(light2);
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.physicallyCorrectLights = true;
  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.setClearColor(0x202020, 1.0);

  container.appendChild( renderer.domElement );

  window.addEventListener( 'resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );
  });
}

function createControls() {
  controls = new THREE.OrbitControls(camera, container);
}

function loadTextures() {
  var loader = new THREE.TextureLoader();
  textureOrigin = loader.load(Settings.ORIGIN_TEXTURE_FILE);
  textureMoon = loader.load(Settings.MOON_TEXTURE_FILE);
}

function createStars() {
  return;

  var distance = 50000;
  var geometry = new THREE.Geometry();

  for (var i = 0; i < 10000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = THREE.Math.randFloatSpread(distance);
    vertex.y = THREE.Math.randFloatSpread(distance);
    vertex.z = THREE.Math.randFloatSpread(distance);

    geometry.vertices.push(vertex);
  }

  let material = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.25 });
  var particles = new THREE.Points(geometry, material);

  scene.add(particles);
}


function drawAdditionalPlane() {
  if (additionalPlanes.length !== 0) {
    return;
  }
  const x = mainPlanet.getPosition().x, y = mainPlanet.getPosition().y, z = mainPlanet.getPosition().z;

  planeHelperFront = new THREE.Mesh(new THREE.PlaneBufferGeometry(Settings.PLANE_SIZE, Settings.PLANE_SIZE, 8, 8),
    new THREE.MeshBasicMaterial( {
      color: 0x248f24, alphaTest: 0, visible: Settings.PLANE_VISIBLE
    }));
  planeHelperFront.position.set(x,y,z);

  planeHelperBack = new THREE.Mesh(new THREE.PlaneBufferGeometry(Settings.PLANE_SIZE, Settings.PLANE_SIZE, 8, 8),
    new THREE.MeshBasicMaterial( {
      color: 0x248f24, alphaTest: 0, visible: Settings.PLANE_VISIBLE
    }));
  planeHelperBack.position.set(x,y,z);
  planeHelperBack.rotateX(Math.PI);

  grid = new THREE.GridHelper( Settings.PLANE_SIZE, Settings.PLANE_SIZE / 4 );
  grid.rotateX(-Math.PI / 2.0);
  grid.position.set(x, y, z);

  additionalPlanesGroup.add(planeHelperFront);
  additionalPlanesGroup.add(planeHelperBack);

  scene.add(grid);
  scene.add(additionalPlanesGroup);
  additionalPlanes.push(planeHelperFront, planeHelperBack);
}

function deleteAdditionalPlanes() {
  showAdditionalPlane = false;
  console.log("Not showing anymore");
  scene.remove(grid);
  scene.remove(additionalPlanesGroup);
  grid = null;
}
