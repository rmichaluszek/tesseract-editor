//3d display of 4d object
var mainDisplayCanvas = document.getElementById('main-display-canvas');
var mainDisplayEngine = new BABYLON.Engine(mainDisplayCanvas, true);
var lines = [];

var selectedPointMesh;

var x = 0;

function updatePoints() {
    x+= 0.005
    var positions3DOf4DPoints = points4DToPoints3D(modelPoints,0,0,0,0,0,x);
    for(let i = 0; i < modelPoints.length; i++) {
        modelPointsIn3D[i] = new BABYLON.Vector3(positions3DOf4DPoints[i].x,positions3DOf4DPoints[i].y,positions3DOf4DPoints[i].z);
    }
}

function updateLines(scene) {
    for( var i = 0; i < lines.length; i++ ) {
       lines[i] = BABYLON.MeshBuilder.CreateLines("line"+i, {points: line(pointsConnections[i]),instance: lines[i]}, scene);       
    }
}

function createLines(scene) {
    for( var i = 0; i < pointsConnections.length; i++ ) {
       lines[i] = BABYLON.MeshBuilder.CreateLines("line"+i, {points: line(pointsConnections[i]), updatable: true}, scene);
       lines[i].color = new BABYLON.Color3(0.8,0.8,0.8)
       lines[i].scalingDeterminant= 3;
       lines[i].dash = 2;
    }
  console.log(lines[0]);
}

var createScene = function() {
    var scene = new BABYLON.Scene(mainDisplayEngine);
    scene.clearColor = "#121223";
    createLines(scene);   

    selectedPointMesh = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.1}, scene);
    var orangeMaterial = new BABYLON.StandardMaterial("orangeMaterial", scene);
    orangeMaterial.emissiveColor = new BABYLON.Color3(230/235.0,126/235.0,34/235.0);
    selectedPointMesh.material = orangeMaterial;
  
    var camera = new BABYLON.ArcRotateCamera("arcCam",-1.2,1.2,10.0,new BABYLON.Vector3(0,0,0));
    camera.attachControl(mainDisplayCanvas,true);
    camera.wheelPrecision = 30;
    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 40;
  
    window.addEventListener('resize', function(){
      mainDisplayEngine.resize();
    });
  
    return scene;
}

function updateSelectedPointMeshPosition(point) {
    selectedPointMesh.position = new BABYLON.Vector3(modelPointsIn3D[point].x,modelPointsIn3D[point].y,modelPointsIn3D[point].z);
}

function mainDisplayStart() {
    var scene = createScene();
    mainDisplayEngine.runRenderLoop(function(){
        scene.render();
        updatePoints();
        updateLines();
        updateSelectedPointMeshPosition(currentPointSelected)
    });
}
