
function resetViewPosition() {
  // camera.updateMatrix();
  let x = mainPlanet.getPosition().x, y = mainPlanet.getPosition().y, z = mainPlanet.getPosition().z;
  // camera.position.set(x, y, z - Settings.CAMERA_INITIAL_DISTANCE);
  // camera.lookAt(mainPlanet.getPosition());

  createCameraInPosition(x,y,z);
  camera.lookAt(mainPlanet.getPosition());
}

function addPlanetFromView() {
  addPlanetMode = true;
  showAdditionalPlane = true;
  deleteAdditionalPlanes();
  drawAdditionalPlane();
  togglePlayPause();
}

function toggleGrid(){
  showAdditionalPlane = !showAdditionalPlane;
  if (showAdditionalPlane) {
    drawAdditionalPlane();
  } else {
    deleteAdditionalPlanes();
  }
}

function updateTotPlanetNumber() {
  document.getElementById("tot-planet-number").innerText = "" + celestialBodies.length;
}

function clearTraces(){
  var size = celestialBodies.length;
  for (var i = 0; i < size; i++) {
    celestialBodies[i].trajectoryVertices = [];
  }
}