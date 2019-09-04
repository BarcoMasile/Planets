
function addPlanet(radius, segments, color, mass, velocity, position, scene){
  var geometry = new THREE.SphereGeometry( radius, segments, segments);
  var material = new THREE.MeshLambertMaterial( { map: textureMoon } );
  var mesh = new THREE.Mesh( geometry, material );
  var body = new Planet(mass, velocity, mesh);
  body.radius = radius;
  scene.add( mesh );

  mesh.position.x = position.x;
  mesh.position.y = position.y;
  mesh.position.z = position.z;
  celestialBodies.push(body);
  updateTotPlanetNumber();
}

function addOriginMassiveBody(scene){
  var planetSphere;

  var geometry = new THREE.SphereBufferGeometry( Constants.SUN_RADIUS, 32, 32 );
  var material = new THREE.MeshLambertMaterial( { map: textureOrigin } );
  planetSphere = new THREE.Mesh( geometry, material );
  var planet = new Planet(Constants.SUN_MASS, new THREE.Vector3(0, 0, 0), planetSphere, Constants.SUN_RADIUS);
  planet.radius = Constants.SUN_RADIUS;

  mainPlanet = planet;
  mainPlanet.mainPlanet = true;
  scene.add( planetSphere );
  celestialBodies.push(planet);
  updateTotPlanetNumber();
}

function addSpiralOfBodies(scene){
  var additionalBodiesCount = 14;
  var alpha = Math.PI / 12;
  var changingColor = new THREE.Color(0x337722);
  for (var i = 0; i < additionalBodiesCount; i++){
    var additionalMoonGeometry = new THREE.SphereGeometry(1, 32, 32);
    changingColor.add( new THREE.Color(256 + i));

    var additionalMaterial = new THREE.MeshLambertMaterial( { map: textureMoon } );
    var additionalMoonSphere = new THREE.Mesh(additionalMoonGeometry, additionalMaterial);
    var distance = 50 + i * 2;

    var x  = distance * Math.cos(alpha * i);
    var y = distance * Math.sin(i + alpha * i * 6);
    var z = distance * Math.sin(alpha * i);

    var vConst = 7;
    var vx = -1 * (vConst) * Math.sin(alpha * i);
    var vz = (vConst) * Math.cos(alpha * i);

    var additionalMoon = new Planet(Constants.MOON_MASS, new THREE.Vector3(vx + 5, 5, vz), additionalMoonSphere, Constants.MOON_RADIUS);
    additionalMoon.radius = Constants.MOON_RADIUS;

    additionalMoonSphere.position.x = x;
    additionalMoonSphere.position.y = y;
    additionalMoonSphere.position.z = z;

    scene.add(additionalMoonSphere);
    celestialBodies.push(additionalMoon);
    updateTotPlanetNumber();
  }
}

function addTrajectorySegment(object, startPoint, endPoint) {

  if (!!object.trajectory) {
    scene.remove(object.trajectory)
  }

  if (!object.trajectoryVertices) {
    object.trajectoryVertices = [];
  }

  object.trajectoryVertices.push(endPoint.x);
  object.trajectoryVertices.push(endPoint.y);
  object.trajectoryVertices.push(endPoint.z);

  var floats = new Float32Array(object.trajectoryVertices);
  var trajectoryGeometry = new THREE.BufferGeometry();
  var material = new THREE.LineBasicMaterial({color: object.mesh.material.color});
  trajectoryGeometry.addAttribute('position', new THREE.BufferAttribute(floats, 3));
  var trajectory = new THREE.Line(trajectoryGeometry, material);
  object.trajectory = trajectory;
  scene.add(trajectory);
}

function calculateIncrementedRadius(planet1, planet2) {
  let cubicRadius = planet1.getRadius() ** 3 + planet2.getRadius() ** 3;
  return Math.cbrt(cubicRadius) * Constants.RADIUS_INCREMENT_PERCENTAGE;

}


