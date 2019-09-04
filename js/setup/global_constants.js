Constants = {
    "G" : 6.673E-11,
    "SUN_MASS" : 10E13,
    "SUN_RADIUS": 24,
    "MOON_MASS" : 3E10,
    "MOON_RADIUS": 2,
    "JUPITER_MASS" : 10E8,
    "JUPITER_RADIUS": 12,
    "EARTH_MASS": 1.43E3,
    "EARTH_RADIUS": 6,
    "EARTH_MOON_DISTANCE" : 384400000,
    "EARTH_MOON_SCREEN_DISTANCE" : 50,
    "DISTANCE_SCALE_FACTOR" :  undefined,
    "DEFAULT_TIME_DELTA" : .02,
    "REMOVAL_DISTANCE_THRESHOLD" : 1E4,
    "RADIUS_INCREMENT_PERCENTAGE": 1.005,
    "VELOCITY_MAGNITUDE": 15,
    "MOON_MOVEMENT_STEP": 5
};

Settings = {
    "CAMERA_INITIAL_DISTANCE": 200,
    "CAMERA_FAR_DISTANCE": 100000,
    "ORIGIN_TEXTURE_FILE": "textures/sun-texture-midres-3.jpg",
    "MOON_TEXTURE_FILE": "textures/moon-texture.jpg",
    "EARTH_TEXTURE_FILE": "textures/earth.jpg",
    // "EARTH_TEXTURE_FILE": "textures/earth-texture-1.jpg",
    // "EARTH_TEXTURE_FILE": "textures/earth-texture-2.jpg",
    "JUPITER_TEXTURE_FILE": "textures/jupiter-texture-1.jpg",
    // "JUPITER_TEXTURE_FILE": "textures/jupiter-texture-2.jpg",
    // "JUPITER_TEXTURE_FILE": "textures/jupiter-texture-3.jpg",
    // "JUPITER_TEXTURE_FILE": "textures/jupiter-texture-4.jpg",
    "PLANE_SIZE": 1000,
    "PLANE_VISIBLE": false,
    "PLANE_OPACITY": 0
};

Constants.DISTANCE_SCALE_FACTOR = Constants.EARTH_MOON_DISTANCE / Constants.EARTH_MOON_SCREEN_DISTANCE;