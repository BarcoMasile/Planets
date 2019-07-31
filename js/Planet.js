
function Planet(mass, velocity, mesh, radius = 3) {

    this.mass = mass;
    this.mesh = mesh;
    this.velocity = velocity || new THREE.Vector3(2, 2, 2);
    this.acceleration = new THREE.Vector3(2, 2, 2);
    this.radius = radius;

    this.getPosition = function() {
        return this.mesh.position;
    };

    this.getRadius = function() {
        return this.radius;
    };

    this.getVelocity = function() {
        return this.velocity;
    };

    this.distanceFrom = function(body) {
        return this.getPosition().distanceTo(body.getPosition());
    };

    this.squareDistanceFrom = function(body){
        myPosition = this.getPosition();
        var squareDistance = body.getPosition().distanceToSquared(myPosition);
        return squareDistance;
    };

    this.forceBetween = function(body){
        var squareDistance = this.squareDistanceFrom(body);
        var force = Constants.G * (this.mass * body.mass) / squareDistance;
        return force;
    };

    this.addForceContribution = function(body){
        var forceMagnitude = this.forceBetween(body);
        var distance = this.distanceFrom(body);
        var xDiff = body.getPosition().x - this.getPosition().x;
        var yDiff = body.getPosition().y - this.getPosition().y;
        var zDiff = body.getPosition().z - this.getPosition().z;

        var xRatio = xDiff / distance;
        var yRatio = yDiff / distance;
        var zRatio = zDiff / distance;

        var fx = forceMagnitude * xRatio;
        var fy = forceMagnitude * yRatio;
        var fz = forceMagnitude * zRatio;

        var forceVector = new THREE.Vector3(fx, fy, fz);

        this.acceleration.add(forceVector.divideScalar(this.mass));
    };

    this.updatePosition = function(delta){
        if(!delta){
            delta = Constants.DEFAULT_TIME_DELTA;
        }

        this.velocity.add(this.acceleration.multiplyScalar(delta));
        var nextPosition = this.getPosition().clone();
        var tempAcceleration = this.acceleration.clone();
        var tempVelocity = this.velocity.clone();
        nextPosition.add( tempAcceleration.multiplyScalar(delta * delta).multiplyScalar(.5) );
        nextPosition.add( tempVelocity.multiplyScalar(delta));

        this.mesh.position.x = nextPosition.x;
        this.mesh.position.y = nextPosition.y;
        this.mesh.position.z = nextPosition.z;

        this.acceleration = new THREE.Vector3(0, 0, 0);
    };

    this.overlaps = function(otherBody){
        return this.distanceFrom(otherBody) <= this.getRadius() + otherBody.getRadius();
    };


}
