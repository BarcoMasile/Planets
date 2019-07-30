
function init() {
  container = document.querySelector( '#scene-container' );
  scene = new THREE.Scene();
  // scene.background = new THREE.Color( 0x22333 );
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
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        },
      false
  );
  document.addEventListener('mousedown', onMouseDown, false);
}

function onMouseDown(event) {
  if (addPlanetMode) {
    addPlanetMode = false;

    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    addPlanet(2, 30, null, Constants.MOON_MASS * 5, new THREE.Vector3(4, 0, 4), mouse, scene);
  }
}

function onMouseUp(event) {
  if (event.ctrlKey || addMode) {
    /*
     distance – distance between the origin of the ray and the intersection
     point – point of intersection, in world coordinates
     face – intersected face
     faceIndex – index of the intersected face
     indices – indices of vertices comprising the intersected face
     object – the intersected object
     */
    var intersections = raycaster.intersectObjects(planes, false);
    if (intersections.length > 0) {
      planeIntersection = intersections[0];

      var cameraPosition = camera.position.clone();
      var intersectionPoint = planeIntersection.point.clone();

      var velocityVersor = intersectionPoint.sub(cameraPosition).normalize();
      var velocityMagnitude = 10;
      var velocity = velocityVersor.multiplyScalar(velocityMagnitude);

      addDefaultCelestialBody(velocity, planeIntersection.point, scene);
    }
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
  var distance = 50000;
  var geometry = new THREE.Geometry();

  for (var i = 0; i < 10000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = THREE.Math.randFloatSpread(distance);
    vertex.y = THREE.Math.randFloatSpread(distance);
    vertex.z = THREE.Math.randFloatSpread(distance);

    geometry.vertices.push(vertex);
  }

  var particles = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0x888888}));
  scene.add(particles);
}

function createStarsNew() {
  const SEPARATION = 1;
  const AMOUNTX = 1000;
  const AMOUNTY = 1000;
  var numParticles = AMOUNTX * AMOUNTY;
  var positions = new Float32Array( numParticles * 3 );
  var scales = new Float32Array( numParticles );
  var i = 0, j = 0;
  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
      positions[ i ] = THREE.Math.randFloatSpread(ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 )); // x
      positions[ i + 1 ] = THREE.Math.randFloatSpread(ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ) * 0.75); // y
      positions[ i + 2 ] = THREE.Math.randFloatSpread(iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 )); // z
      scales[ j ] = 12;
      i += 3;
      j ++;
    }
  }
  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  geometry.addAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );
  var material = new THREE.ShaderMaterial( {
    uniforms: {
      color: { value: new THREE.Color( 0x888888 ) },
    }
//    ,
//    vertexShader: document.getElementById( 'vertexshader' ).textContent,
//    fragmentShader: document.getElementById( 'fragmentshader' ).textContent
  } );
  particles = new THREE.Points( geometry, material );
  scene.add( particles );
}