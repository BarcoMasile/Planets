
function init() {
  container = document.querySelector( '#scene-container' );
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x22333 );
  clock = new THREE.Clock();
  mouse = new THREE.Vector2();
  raycaster = new THREE.Raycaster();

  trajectoriesMaterial = new THREE.LineBasicMaterial({color: 0xffffff});

  addOriginMassiveBody(scene);
  addSpiralOfBodies(scene);

  document.addEventListener(
      'mousemove',
      function(event) {
          event.preventDefault();
          let x = (event.clientX / window.innerWidth) * 2 - 1;
          let y = -(event.clientY / window.innerHeight) * 2 + 1;

          mouse.set(x, y);
        },
      false
  );
  document.addEventListener('mouseup', onMouseUp, false);
}

function onMouseUp(event) {
  event.preventDefault();

  if (addPlanetMode) {
    showAdditionalPlane = false;

    addPlanetFromAdditionalPlane();
    deleteAdditionalPlanes();
    updateTotPlanetNumber();
  }
}

function createCamera() {
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;

  const near = 1;
  const far = Settings.CAMERA_FAR_DISTANCE;

  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(-4,4, Settings.CAMERA_INITIAL_DISTANCE);
  scene.add(camera);
}

function createCameraInPosition(x,y,z) {
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;

  const near = 1;
  const far = Settings.CAMERA_FAR_DISTANCE;

  scene.remove(camera);
  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.set(x ,y, z + Settings.CAMERA_INITIAL_DISTANCE);
  scene.add(camera);
  createControls();
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
  textureEarth = loader.load(Settings.EARTH_TEXTURE_FILE);
  textureJupiter = loader.load(Settings.JUPITER_TEXTURE_FILE);

}


function drawAdditionalPlane() {
  if (additionalPlanes.length !== 0) {
    showAdditionalPlane = false;
    addPlanetMode = false;
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

  additionalPlanes.push(planeHelperFront, planeHelperBack);

  scene.add(grid);
  scene.add(additionalPlanes[0]);
  scene.add(additionalPlanes[1]);
}

function deleteAdditionalPlanes() {
  showAdditionalPlane = false;

  scene.remove(grid);
  scene.remove(additionalPlanes[0]);
  scene.remove(additionalPlanes[1]);

  additionalPlanes = [];
  grid = null;
}
