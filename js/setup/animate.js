function update() {
  updateObjects(clock.getDelta());
}

function render() {
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

function play() {
  animate();
}

function stop() {
  renderer.setAnimationLoop(null);
}

function updateObjects(delta){
  // var nextArray = [];
  // var bodiesCount = celestialBodies.length;
  // for (var i = 0; i < bodiesCount; i++) {
  //   if (celestialBodies[i].markedForRemoval) {
  //     scene.remove(celestialBodies[i].mesh);
  //   }
  //   else {
  //     nextArray.push(celestialBodies[i]);
  //   }
  // }
  //
  // celestialBodies = nextArray;
  //
  // for (var i = 0; i < newCelestialBodies.length; i++) {
  //   scene.add(newCelestialBodies[i].mesh);
  //   celestialBodies.push(newCelestialBodies[i]);
  //   updateTotPlanetNumber();
  // }
  //
  // newCelestialBodies = [];
  //
  // for (var i = 0; i < celestialBodies.length; i++) {
  //   for (var j = 0; j < celestialBodies.length; j++) {
  //     if (celestialBodies[i] === celestialBodies[j]) {
  //       continue;
  //     }
  //
  //     celestialBodies[i].addForceContribution(celestialBodies[j]);
  //   }
  // }
  //
  // for (var i = 0; i < celestialBodies.length; i++) {
  //   // a problem, that arises when the browser tab is changed, should be fixed
  //   celestialBodies[i].updatePosition();
  //
  //   if (celestialBodies[i].getPosition().distanceTo(new THREE.Vector3(0, 0, 0)) > Constants.REMOVAL_DISTANCE_THRESHOLD) {
  //     celestialBodies[i].markedForRemoval = true;
  //   }
  // }
  //
  // for (var i = 0; i < celestialBodies.length; i++) {
  //   for (var j = 0; j < celestialBodies.length; j++) {
  //     if (celestialBodies[i] === celestialBodies[j]) {
  //       continue;
  //     }
  //     resolveCollision(celestialBodies[i], celestialBodies[j]);
  //   }
  // }

  //

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
  // check se collidono davvero
  // if(!firstBody.overlaps(secondBody)){
  //   return;
  // }
  // if (firstBody.markedForRemoval || secondBody.markedForRemoval){
  //   return;
  // }
  //
  // firstBody.markedForRemoval = true;
  // secondBody.markedForRemoval = true;
  // // the most massive body retains its properties (color, radius, etc...)
  // var prototypeBody;
  // var disappearingBody;
  // if(firstBody.mass >= secondBody.mass){
  //   prototypeBody = firstBody;
  //   disappearingBody = secondBody;
  // }
  // else{
  //   prototypeBody = secondBody;
  //   disappearingBody = firstBody;
  // }
  //
  // var maxRadius = Math.max(firstBody.getRadius(), secondBody.getRadius());
  // var unionGeometry = new THREE.SphereGeometry(maxRadius, 32, 32);
  // var material = prototypeBody.mesh.material; // new THREE.MeshLambertMaterial({color: 0xFF0000});
  // var unionMesh = new THREE.Mesh(unionGeometry, material);
  //
  // var position = prototypeBody.getPosition().clone();
  //
  // unionMesh.position.x = position.x;
  // unionMesh.position.y = position.y;
  // unionMesh.position.z = position.z;
  //
  // var sumMass = firstBody.mass + secondBody.mass;
  // var velocity = (firstBody.velocity.clone().multiplyScalar(firstBody.mass).add( secondBody.velocity.clone().multiplyScalar(secondBody.mass) ))
  // velocity.divideScalar(sumMass);
  // velocity.addScalar(8);
  //
  // var unionBody = new Planet(sumMass, velocity, unionMesh);
  // unionBody.mainPlanet = firstBody.mainPlanet || secondBody.mainPlanet;
  // if (unionBody.mainPlanet) {
  //   mainPlanet = unionBody;
  // }
  // newCelestialBodies.push(unionBody);
  // updateTotPlanetNumber();

  //

  if (!firstBody.overlaps(secondBody)) {
    return;
  }
  if (firstBody.markedForRemoval || secondBody.markedForRemoval) {
    return;
  }
  // both bodies (and both meshes) will be removed, a new one, resulting from the sum
  // of the two, will be added to the scene
  firstBody.markedForRemoval = true;
  secondBody.markedForRemoval = true;
  // the most massive body retains its properties (color, radius, etc...)
  var prototypeBody;
  var disappearingBody;
  if (firstBody.mass >= secondBody.mass) {
    prototypeBody = firstBody;
    disappearingBody = secondBody;
  } else {
    prototypeBody = secondBody;
    disappearingBody = firstBody;
  }

  var maxRadius = Math.max(firstBody.getRadius(), secondBody.getRadius());
  var unionGeometry = new THREE.SphereGeometry(maxRadius, 32, 32);
  var material = prototypeBody.mesh.material;
  var unionMesh = new THREE.Mesh(unionGeometry, material);

  var position = prototypeBody.getPosition().clone();

  unionMesh.position.x = position.x;
  unionMesh.position.y = position.y;
  unionMesh.position.z = position.z;

  // TODO: compute the correct velocity

  // m[vx, vy, vz]+mv2[vx2, vy2, vz2]=M[Vx, Vy, Vz]
  // [Vx, Vy, Vz] = m1v1 + m2v2 / M
  var sumMass = firstBody.mass + secondBody.mass;
  var velocity = (firstBody.velocity.clone().multiplyScalar(firstBody.mass).add(secondBody.velocity.clone().multiplyScalar(secondBody.mass)));
  velocity.divideScalar(sumMass);

  var unionBody = new Planet(sumMass, velocity, unionMesh);

  newCelestialBodies.push(unionBody);
  updateTotPlanetNumber();
}