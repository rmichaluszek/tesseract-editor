//global variables
var modelPoints = [];
var modelPointsIn3D = [];
var pointsConnections = [];

var currentPointSelected = 0;

function vec4(x,y,z,w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  
    this.getCoordinates = function() {
        return {x:this.x,y:this.y,z:this.z,w:this.w};
    }
}

var exampleTesseract = [
    new vec4(-1,-1, 1,-1),
    new vec4(-1, 1, 1,-1),
    new vec4( 1, 1, 1,-1),
    new vec4( 1,-1, 1,-1),
  
    new vec4(-1,-1,-1,-1),
    new vec4(-1, 1,-1,-1),
    new vec4( 1, 1,-1,-1),
    new vec4( 1,-1,-1,-1),

    
    new vec4(-1,-1, 1, 1),
    new vec4(-1, 1, 1, 1),
    new vec4( 1, 1, 1, 1),
    new vec4( 1,-1, 1, 1),
  
    new vec4(-1,-1,-1, 1),
    new vec4(-1, 1,-1, 1),
    new vec4( 1, 1,-1, 1),
    new vec4( 1,-1,-1, 1),
]

var exampleTesseractConnections = [
     [0,1],
     [1,2],
     [2,3],
     [3,0],
  
     [4,5],
     [5,6],
     [6,7],
     [7,4],
  
     [8,9],
     [9,10],
     [10,11],
     [11,8],
  
     [12,13],
     [13,14],
     [14,15],
     [15,12],
  
     //connections of the planes
      
     [0,4],
     [1,5],
     [2,6],
     [3,7],
     //1-2
  
     [0,8],
     [1,9],
     [2,10],
     [3,11],
     //1-3
  
     [4,12],
     [5,13],
     [6,14],
     [7,15],
     //2-4
  
     [8,12],
     [9,13],
     [10,14],
     [11,15],
     //3-4
]

// global functions
function applyPoints(points) {
    for(var i = 0; i < points.length; i++ ) {
        modelPoints[i] = points[i]
      
    }
}
function applyConnections(connections) {
    for(var i = 0; i < connections.length; i++ ) {
          pointsConnections[i] = connections[i]
    }
}
function line(points) {
    return [modelPointsIn3D[points[0]],modelPointsIn3D[points[1]]];
}

window.addEventListener('DOMContentLoaded', function() {
  applyPoints(exampleTesseract);
  applyConnections(exampleTesseractConnections);
  updatePoints();
  mainDisplayStart();
  updateFlatDisplay('xy',modelPoints);
  updateFlatDisplay('xz',modelPoints);
  updateFlatDisplay('zy',modelPoints);
  updatePointsList(modelPoints);
  addPointsListInputListeners();
  addPointCoordinatesInputListeners();
  updatePointCoordinatesDisplay(currentPointSelected);
}); // main-display.js