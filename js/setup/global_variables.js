
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
let newlyCreatedMoon = null;
let axes = null;
let simulationRunning = true;
let celestialBodies = [];
let newCelestialBodies = [];

let newPlanetRadius;
let newPlanetMass;
let newPlanetTexture;

let showAdditionalPlane = false;
let additionalPlanes = [];
let grid;

let showLateralButtons = true;

let trajClick = 0;

let textureOrigin;
let textureMoon;
let textureEarth;
let textureJupiter;
