
let container;
let camera;
let controls;
let renderer;
let scene;
let mainPlanet;
let clock;
let mouse;
let raycaster;
let axes;
let trajectoriesMaterial;
let addPlanetMode = false;
let newlyCreatedMoon;
let simulationRunning = true;
let celestialBodies = [];
let newCelestialBodies = [];

let showAdditionalPlane = false;
let additionalPlanes = [];
let grid;
// let plane;
// let additionalPlanesGroup;

let trajClick = 0;

let textureOrigin;
let textureMoon;
