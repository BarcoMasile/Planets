
function resetViewPosition() {
  let x = mainPlanet.getPosition().x, y = mainPlanet.getPosition().y, z = mainPlanet.getPosition().z;

  createCameraInPosition(x,y,z);
  camera.updateMatrix();
  camera.lookAt(mainPlanet.getPosition());
}

function addPlanetFromView(planetType) {
  if (planetType) {
    switch (planetType) {
      case "EARTH":
        newPlanetRadius = Constants.EARTH_RADIUS;
        newPlanetMass = Constants.EARTH_MASS;
        newPlanetTexture = textureEarth;
        break;

      case "JUPITER":
        newPlanetRadius = Constants.JUPITER_RADIUS;
        newPlanetMass = Constants.JUPITER_MASS;
        newPlanetTexture = textureJupiter;
        break;

      default:
        newPlanetRadius = Constants.MOON_RADIUS;
        newPlanetMass = Constants.MOON_MASS;
        newPlanetTexture = textureMoon;
        break;
    }
  } else {
    newPlanetRadius = Constants.MOON_RADIUS;
    newPlanetMass = Constants.MOON_MASS;
    newPlanetTexture = textureMoon;
  }

  hideLateralButtons();
  addPlanetMode = true;
  showAdditionalPlane = true;
  deleteAdditionalPlanes();
  drawAdditionalPlane();
  togglePlayPause();
  toggleTranslationButtons();

}

function toggleTranslationButtons() {
  const display = document.getElementById("translation-buttons").style.display;
  document.getElementById("translation-buttons").style.display = display === "none" ? "block" : "none";
}

function toggleLateralButtons() {
  const display = document.getElementById("lateral-buttons").style.display;
  document.getElementById("lateral-buttons").style.display = display === "none" ? "block" : "none";
  showLateralButtons = display !== "none";
}

function hideLateralButtons() {
  document.getElementById("lateral-buttons").style.display = "none";
}

function planetPositionOK() {
  addPlanetMode = false;
  showLateralButtons = true;
  // remove axeshelper from planet
  newlyCreatedMoon.mesh.remove(axes);
  celestialBodies.push(newlyCreatedMoon);
  toggleTranslationButtons();
  togglePlayPause();
  toggleLateralButtons();
  updateTotPlanetNumber();
}

function planetPositionCancel() {
  addPlanetMode = false;
  showLateralButtons = true;
  // remove new planet
  scene.remove(newlyCreatedMoon.mesh);
  axes = null;
  newlyCreatedMoon = null;
  toggleTranslationButtons();
  togglePlayPause();
  toggleLateralButtons();
  updateTotPlanetNumber();
}

function changePlanetMass(valore) {
  if (!newlyCreatedMoon)
    return;

  switch (valore) {
    case "EARTH":
      newlyCreatedMoon.mesh.radius = Constants.EARTH_RADIUS;
      break;

    case "JUPITER":
      newlyCreatedMoon.mesh.radius = Constants.JUPITER_RADIUS;
      break;

    default:
      newlyCreatedMoon.mesh.radius = Constants.MOON_RADIUS;
      break;
  }
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


function moveXPlus() {
  if (!newlyCreatedMoon) {
    return;
  }

  const pos = newlyCreatedMoon.getPosition();
  const x = pos.x + Constants.MOON_MOVEMENT_STEP, y = pos.y, z = pos.z;

  newlyCreatedMoon.mesh.position.set(x, y, z);
}

function moveXMinus() {
  if (!newlyCreatedMoon) {
    return;
  }

  const pos = newlyCreatedMoon.getPosition();
  const x = pos.x - Constants.MOON_MOVEMENT_STEP, y = pos.y, z = pos.z;

  newlyCreatedMoon.mesh.position.set(x, y, z);
}

function moveYPlus() {
  if (!newlyCreatedMoon) {
    return;
  }

  const pos = newlyCreatedMoon.getPosition();
  const x = pos.x, y = pos.y + Constants.MOON_MOVEMENT_STEP, z = pos.z;

  newlyCreatedMoon.mesh.position.set(x, y, z);
}

function moveYMinus() {
  if (!newlyCreatedMoon) {
    return;
  }

  const pos = newlyCreatedMoon.getPosition();
  const x = pos.x, y = pos.y - Constants.MOON_MOVEMENT_STEP, z = pos.z;

  newlyCreatedMoon.mesh.position.set(x, y, z);
}

function moveZPlus() {
  if (!newlyCreatedMoon) {
    return;
  }

  const pos = newlyCreatedMoon.getPosition();
  const x = pos.x, y = pos.y, z = pos.z + Constants.MOON_MOVEMENT_STEP;

  newlyCreatedMoon.mesh.position.set(x, y, z);
}

function moveZMinus() {
  if (!newlyCreatedMoon) {
    return;
  }

  const pos = newlyCreatedMoon.getPosition();
  const x = pos.x, y = pos.y, z = pos.z - Constants.MOON_MOVEMENT_STEP;

  newlyCreatedMoon.mesh.position.set(x, y, z);
}

