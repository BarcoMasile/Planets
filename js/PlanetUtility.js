
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

let normalizationFactor = 0.10;

function calculateIncrementedRadius(planet1, planet2) {
    maxRadius = Math.max(planet1.getRadius(), planet2.getRadius());
    totalMass = planet1.mass + planet2.mass;
    incrementMass = Math.min(planet1.mass, planet2.mass);

    // totalMass : 100 = incrementMass : x => 100 * incrementMass / totalMass
    incrementPercentage = 100.0 * incrementMass / totalMass;
    incrementedRadius = maxRadius + maxRadius * incrementPercentage;
    // console.log("OldRadius " + maxRadius + " NEW INCREMENTED RADIUS " + incrementedRadius);
    return incrementedRadius; // * normalizationFactor;
}

/*function drawHelperPlane(scene) {
    // two planes are necessary to intercepts intersection both from
    // the upper and the lower side.
    var geometry = new THREE.PlaneBufferGeometry(50000, 50000);
    // the plane is equal to the y-z axes plane: need to be rotated 90 degrees
    // in order to match with the x-z plane. Thus we obtain a plane that face the up direction
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    var plane = new THREE.Mesh(geometry);
    plane.visible = false;

    var upsideDownPlaneGeometry = geometry.clone();
    // Similar to the previuos case, except that now we must rotate 180 degrees because
    // we need a plane that face the down direction
    upsideDownPlaneGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));
    var upsideDownPlane = new THREE.Mesh(upsideDownPlaneGeometry);
    upsideDownPlane.visible = false;

    scene.add(plane);
    scene.add(upsideDownPlane);
    return [plane, upsideDownPlane];
}*/

/*function drawAxes(scene){
    var AXIS_EXTREME = 100;

    var geometry = new THREE.Geometry();
    var lineMaterial = new THREE.LineBasicMaterial({ color: 0xFF0000, opacity: 0.9 });

    geometry.vertices.push(new THREE.Vector3(-AXIS_EXTREME, 0, 0));
    geometry.vertices.push(new THREE.Vector3(AXIS_EXTREME, 0, 0));
    var xAxis =  new THREE.Line(geometry, lineMaterial);
    scene.add(xAxis);

    lineMaterial = new THREE.LineBasicMaterial({ color: 0x00FF00, opacity: 0.9 });
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, -AXIS_EXTREME, 0));
    geometry.vertices.push(new THREE.Vector3(0, AXIS_EXTREME, 0));
    var yAxis = new THREE.Line(geometry, lineMaterial);
    scene.add(yAxis);

    lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000FF, opacity: 0.9 });
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, -AXIS_EXTREME));
    geometry.vertices.push(new THREE.Vector3(0, 0, AXIS_EXTREME));
    var zAxis = new THREE.Line(geometry, lineMaterial);
    scene.add(zAxis);

}*/

var planesVisible = false;
function toggleHelperPlanesVisibility() {
    for (var i = 0; i < planes.length; i++) {
        if(planesVisible){
            planes[i].material.opacity = 0.0;
        }
        else{
            planes[i].material.opacity = 0.7;
        }
        planes[i].material.needsUpdate = true;
    }
    planesVisible = !planesVisible;
}