
function addPlanetFromAdditionalPlane() {
  raycaster.setFromCamera( mouse, camera );
  var intersections = raycaster.intersectObjects(additionalPlanesGroup.children);

  if (intersections.length > 0) {
    planeIntersection = intersections[0];

    var cameraPosition = camera.position.clone();
    var intersectionPoint = planeIntersection.point.clone();

    var velocityVersor = intersectionPoint.sub(cameraPosition).normalize();
    var velocityMagnitude = Constants.VELOCITY_MAGNITUDE;
    var velocity = velocityVersor.multiplyScalar(velocityMagnitude);

    var additionalMoonGeometry = new THREE.SphereGeometry(1, 32, 32);
    var additionalMaterial = new THREE.MeshLambertMaterial( { map: textureMoon } );
    var additionalMoonSphere = new THREE.Mesh(additionalMoonGeometry, additionalMaterial);

    // var additionalMoon = new Planet(Constants.MOON_MASS, new THREE.Vector3(10, 5, 7), additionalMoonSphere, Constants.MOON_RADIUS);
    var additionalMoon = new Planet(Constants.MOON_MASS, velocity, additionalMoonSphere, Constants.MOON_RADIUS);
    additionalMoon.radius = Constants.MOON_RADIUS;
    scene.add(additionalMoonSphere);
    celestialBodies.push(additionalMoon);
    updateTotPlanetNumber();

  } else {
    console.log("No intersections");
  }

}

