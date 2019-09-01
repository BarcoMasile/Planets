function update() {
  updateObjects(clock.getDelta());
}

function render() {
  camera.updateMatrixWorld();
  raycaster.setFromCamera( mouse, camera );
  // controls.update();
  renderer.render( scene, camera );
}

function animate() {
  renderer.setAnimationLoop( () => {
    if(simulationRunning){
      update();
    }
    render();
  });
}

function togglePlayPause() {
  simulationRunning ? stop() : play();
  simulationRunning = !simulationRunning;
  document.getElementById("play-pause").innerHTML = simulationRunning ? "pause" : "play_arrow";
}

function play() {
  animate();
}

function stop() {
  // renderer.setAnimationLoop(null);
}

function updateObjects(delta){
  trajClick++;
  var nextArray = [];
  var bodiesCount = celestialBodies.length;
  for (var i = 0; i < bodiesCount; i++) {
    if (celestialBodies[i].markedForRemoval) {
      scene.remove(celestialBodies[i].mesh);
      scene.remove(celestialBodies[i].trajectory);
    } else {
      nextArray.push(celestialBodies[i]);
    }
  }

  celestialBodies = nextArray;

  for (var i = 0; i < newCelestialBodies.length; i++) {
    scene.add(newCelestialBodies[i].mesh);
    celestialBodies.push(newCelestialBodies[i]);
    updateTotPlanetNumber();
  }
  // important: empties the new bodies vector
  newCelestialBodies = [];

  for (var i = 0; i < celestialBodies.length; i++) {
    for (var j = 0; j < celestialBodies.length; j++) {
      if (celestialBodies[i] === celestialBodies[j]) {
        continue;
      }

      celestialBodies[i].addForceContribution(celestialBodies[j]);
    }
  }

  for (var i = 0; i < celestialBodies.length; i++) {
    var previousPosition = celestialBodies[i].getPosition().clone();
    celestialBodies[i].updatePosition();
    var newPosition = celestialBodies[i].getPosition().clone();

    if (trajClick % 2 === 0) {
      addTrajectorySegment(celestialBodies[i], previousPosition, newPosition);
    }
    // check if the body is gone too far: if so, marks it for removal
    if (celestialBodies[i].getPosition().distanceTo(new THREE.Vector3(0, 0, 0)) > Constants.REMOVAL_DISTANCE_THRESHOLD) {
      celestialBodies[i].markedForRemoval = true;
    }
  }

  for (var i = 0; i < celestialBodies.length; i++) {
    for (var j = 0; j < celestialBodies.length; j++) {
      if (celestialBodies[i] === celestialBodies[j]) {
        continue;
      }
      resolveCollision(celestialBodies[i], celestialBodies[j]);
    }
  }
}

function resolveCollision(firstBody, secondBody){

  if (!firstBody.overlaps(secondBody)) {
    return;
  }
  if (firstBody.markedForRemoval || secondBody.markedForRemoval) {
    return;
  }

  firstBody.markedForRemoval = true;
  secondBody.markedForRemoval = true;

  var prototypeBody;
  if (firstBody.mass >= secondBody.mass) {
    prototypeBody = firstBody;
  } else {
    prototypeBody = secondBody;
  }

  var maxRadius = Math.max(firstBody.getRadius(), secondBody.getRadius());
  var unionGeometry = new THREE.SphereGeometry(maxRadius, 32, 32);
  var material = prototypeBody.mesh.material.clone();
  var unionMesh = new THREE.Mesh(unionGeometry, material);

  var position = prototypeBody.getPosition().clone();

  unionMesh.position.x = position.x;
  unionMesh.position.y = position.y;
  unionMesh.position.z = position.z;

  // m[vx, vy, vz]+mv2[vx2, vy2, vz2]=M[Vx, Vy, Vz]
  // [Vx, Vy, Vz] = m1v1 + m2v2 / M
  var sumMass = firstBody.mass + secondBody.mass;
  var velocity = (firstBody.velocity.clone().multiplyScalar(firstBody.mass).add(secondBody.velocity.clone().multiplyScalar(secondBody.mass)));
  velocity.divideScalar(sumMass);

  unionBodyRadius = calculateIncrementedRadius(firstBody, secondBody);
  let unionBody = new Planet(sumMass, velocity, unionMesh, unionBodyRadius);

  mainPlanet = (mainPlanet === firstBody || mainPlanet === secondBody) ? unionBody : mainPlanet;

  newCelestialBodies.push(unionBody);
  updateTotPlanetNumber();
}
