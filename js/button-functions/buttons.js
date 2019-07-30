
function resetViewPosition() {
  let x = mainPlanet.getPosition().x;
  let y = mainPlanet.getPosition().y;
  let z = mainPlanet.getPosition().z;

  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z + Settings.CAMERA_INITIAL_DISTANCE;

}


function addPlanetFromView() {
  addPlanetMode = true;
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