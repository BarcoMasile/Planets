Constants = {
    "G" : 6.673E-11,
    "EARTH_MASS" : 10E13, // 	5.972E+24,
    "EARTH_RADIUS": 5,
    "MOON_MASS" : 3E10, // 7.348E+22,
    "MOON_RADIUS": 1,
    "JUPITER_MASS" : 1.8986E+27,
    "EARTH_MOON_DISTANCE" : 384400000, //384,400 Km
    "EARTH_MOON_SCREEN_DISTANCE" : 50,
    "DISTANCE_SCALE_FACTOR" :  undefined,
    "DEFAULT_TIME_DELTA" : .02,
    "LOG_ENABLED" : true,
    "REMOVE_DISTANT_BODIES" : true,
    "REMOVAL_DISTANCE_THRESHOLD" : 1E4,
    "CAMERA_MOVEMENT_STEP" : 1,
    "CONTROLS_TYPE" : "trackball"
};

Settings = {
    "CAMERA_INITIAL_DISTANCE": 200,
    "CAMERA_FAR_DISTANCE": 100000,
    "ORIGIN_TEXTURE_FILE": "textures/sun-texture-midres-2.jpg",
    "MOON_TEXTURE_FILE": "textures/moon-texture.jpg"
};

Constants.DISTANCE_SCALE_FACTOR = Constants.EARTH_MOON_DISTANCE / Constants.EARTH_MOON_SCREEN_DISTANCE;