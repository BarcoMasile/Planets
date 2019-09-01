
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

    var cameraPosition = camera.position.clone();
    var intersectionPoint = planeIntersection.point.clone();

    var velocityVersor = intersectionPoint.sub(cameraPosition).normalize();
    var velocityMagnitude = Constants.VELOCITY_MAGNITUDE;
    var velocity = velocityVersor.multiplyScalar(velocityMagnitude);

    var additionalMoonGeometry = new THREE.SphereGeometry(newPlanetRadius, 32, 32);
    var additionalMaterial = new THREE.MeshLambertMaterial( { map: newPlanetTexture } );
    var additionalMoonSphere = new THREE.Mesh(additionalMoonGeometry, additionalMaterial);
    additionalMoonSphere.position.set(x, y, z);
    console.log("Mesh position: ", x, y, z);

    var additionalMoon = new Planet(newPlanetMass, velocity, additionalMoonSphere, newPlanetRadius);
    additionalMoon.radius = newPlanetRadius;
    additionalMoon.mesh.position.set(x, y, z);

    scene.add(additionalMoon.mesh);

    axes = new THREE.AxesHelper(newPlanetRadius * 2);
    additionalMoon.mesh.add(axes);
    newlyCreatedMoon = additionalMoon;

    updateTotPlanetNumber();

    newPlanetRadius = null;
    newPlanetMass = null;
  } else {
    console.log("No intersections");
  }

}

