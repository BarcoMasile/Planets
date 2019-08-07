
function addPlanetFromAdditionalPlane() {
  camera.updateMatrixWorld();
  raycaster.setFromCamera( mouse, camera );
  var intersections = raycaster.intersectObjects(additionalPlanes);

  if (intersections.length > 0) {
    console.log("Totale " + intersections.length + " intersezioni");
    intersections.forEach(el => console.log("Intersection: " + el.point.x + " " + el.point.y + " " + el.point.z));
    var planeIntersection = intersections[0];
    const x = planeIntersection.point.x;
    const y = planeIntersection.point.y;
    const z = planeIntersection.point.z;
    // var planeIntersection = intersections[Math.floor(Math.random()*intersections.length)];

    var cameraPosition = camera.position.clone();
    var intersectionPoint = planeIntersection.point.clone();

    var velocityVersor = intersectionPoint.sub(cameraPosition).normalize();
    var velocityMagnitude = Constants.VELOCITY_MAGNITUDE;
    var velocity = velocityVersor.multiplyScalar(velocityMagnitude);

    var additionalMoonGeometry = new THREE.SphereGeometry(1, 32, 32);
    var additionalMaterial = new THREE.MeshLambertMaterial( { map: textureMoon } );
    var additionalMoonSphere = new THREE.Mesh(additionalMoonGeometry, additionalMaterial);
    additionalMoonSphere.position.set(x, y, z);
    console.log("Mesh position: ", x, y, z);

    var additionalMoon = new Planet(Constants.MOON_MASS, velocity, additionalMoonSphere, Constants.MOON_RADIUS);
    additionalMoon.radius = Constants.MOON_RADIUS;
    additionalMoon.mesh.position.set(x, y, z);

    scene.add(additionalMoonSphere);
    celestialBodies.push(additionalMoon);

    updateTotPlanetNumber();

  } else {
    console.log("No intersections");
  }

}

