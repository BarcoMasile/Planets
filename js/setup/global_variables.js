// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let mainPlanet;
let clock;
let mouse;
let raycaster;
let trajectoriesMaterial;
let addPlanetMode = false;
let simulationRunning = true;
let celestialBodies = [];
let newCelestialBodies = [];

let trajClick = 0;

let textureOrigin;
let textureMoon;