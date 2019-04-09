//these are all of the left-sided 2d panels for moving coordinates and also seeing the 2-dimensional cross-sections
var displaysOffset = 150; // half of the 2d panel's width and height
var displaysScale = 40;
var lineOffset = 5; // amount of pixels that line is depositioned to make it look natural on the 2d panel

var maxPointRange = 2;
var minPointRange = -2;

function selectPointOnAllDisplays(point) {
    while( document.getElementsByClassName('point-selected')[0] ) {
         document.getElementsByClassName('point-selected')[0].className = "point";
    }
    selectPointOnDisplay(point,'xy');
    selectPointOnDisplay(point,'xz'); 
    selectPointOnDisplay(point,'zy');
}
function selectPointOnDisplay(point,dimensions) {
    var dimension1 = dimensions[0];
    var dimension2 = dimensions[1];
    
    var thisPoint = document.getElementById('point-'+point+'-'+dimension1+dimension2);
    thisPoint.className = "point point-selected"
}

function updatePointOnAllDisplays(point) {
    updatePointOnDisplay(point,'xy');
    updatePointOnDisplay(point,'xz'); 
    updatePointOnDisplay(point,'zy');
}
function updatePointOnDisplay(point,dimensions) {
    var dimension1 = dimensions[0];
    var dimension2 = dimensions[1];
    var x = modelPoints[point][dimension1]*displaysScale+displaysOffset;
    var y = -modelPoints[point][dimension2]*displaysScale+displaysOffset;
  
    var thisPoint = document.getElementById('point-'+point+'-'+dimension1+dimension2);
    thisPoint.style.webkitTransform =
    thisPoint.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';
    thisPoint.setAttribute('data-x', x);
    thisPoint.setAttribute('data-y', y);
  
    for( let i = 0; i < pointsConnections.length; i++) {
        if (pointsConnections[i][0] == point || pointsConnections[i][1] == point ) {
            updateLineOnAllDisplays(i);
        }
    }
}

function updateLineOnAllDisplays(line) {
    updateLineOnDisplay(line,'xy');
    updateLineOnDisplay(line,'xz'); 
    updateLineOnDisplay(line,'zy');
}
function updateLineOnDisplay(line,dimensions) {
  
    var dimension1 = dimensions[0];
    var dimension2 = dimensions[1];
    var lineDiv = document.getElementById("line-"+line+"-"+dimension1+dimension2);
    var x1 = modelPoints[pointsConnections[line][0]][dimension1]*displaysScale+displaysOffset + lineOffset;
    var y1 = -modelPoints[pointsConnections[line][0]][dimension2]*displaysScale+displaysOffset + lineOffset; // y axis is inverted
    var x2 = modelPoints[pointsConnections[line][1]][dimension1]*displaysScale+displaysOffset + lineOffset;
    var y2 = -modelPoints[pointsConnections[line][1]][dimension2]*displaysScale+displaysOffset + lineOffset; // y axis is inverted

    lineDiv.setAttribute('x1',x1);
    lineDiv.setAttribute('y1',y1);
    lineDiv.setAttribute('x2',x2);
    lineDiv.setAttribute('y2',y2);
}

function updateFlatDisplay(string, modelPoints) {
    var dimension1 = string[0];
    var dimension2 = string[1];
  
    var displaySection = document.getElementById(string)
    var display = displaySection.getElementsByClassName('display')[0];

    var displayField = displaySection.getElementsByClassName('field')[0];
    display.scrollTop = 50;
    display.scrollLeft = 20;
  
    //create points
    for( let i = 0; i < modelPoints.length; i++ ) {
        var pointDiv = document.createElement('div');
        pointDiv.id = "point-"+i+"-"+dimension1+dimension2;
        pointDiv.className = "point";
        pointDiv.pointId = i;
      
        var x = modelPoints[i][dimension1]*displaysScale+displaysOffset;
        var y = -modelPoints[i][dimension2]*displaysScale+displaysOffset; // y axis is inverted
      
        pointDiv.style.webkitTransform =
        pointDiv.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

        pointDiv.setAttribute('data-x', x);
        pointDiv.setAttribute('data-y', y);
        displayField.appendChild(pointDiv);
    }
  
    //create lines
    for( let i = 0; i < pointsConnections.length; i++ ) {
          var lineDiv = document.createElementNS('http://www.w3.org/2000/svg','line');
          lineDiv.id = "line-"+i+"-"+dimension1+dimension2;
          lineDiv.className = "flat-display-line";
          lineDiv.lineId = i;
      
          var x1 = modelPoints[pointsConnections[i][0]][dimension1]*displaysScale+displaysOffset + lineOffset;
          var y1 = -modelPoints[pointsConnections[i][0]][dimension2]*displaysScale+displaysOffset + lineOffset; // y axis is inverted
          var x2 = modelPoints[pointsConnections[i][1]][dimension1]*displaysScale+displaysOffset + lineOffset;
          var y2 = -modelPoints[pointsConnections[i][1]][dimension2]*displaysScale+displaysOffset + lineOffset; // y axis is inverted

          lineDiv.setAttribute('x1',x1);
          lineDiv.setAttribute('y1',y1);
          lineDiv.setAttribute('x2',x2);
          lineDiv.setAttribute('y2',y2);
          lineDiv.setAttribute("stroke", "white")
          lineDiv.setAttribute("stroke-width","2")
          displayField.getElementsByTagName('svg')[0].appendChild(lineDiv);
      }
}

interact('.point')
  .styleCursor(false)
  .draggable({
    inertia: false,
    snap: {
        targets: [
          interact.createSnapGrid({ x: 10, y: 10, range: 10 })
        ]
    },
    restrict: {
      restriction: "parent",
      endOnly: false,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    onmove: dragMoveListener,
    onend: function (event) {
      //
    }
});

function dragMoveListener (event) {
    var target = event.target,
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    var dimensions = target.parentElement.parentElement.parentElement;
    var dimension1 = dimensions.id[0];
    var dimension2 = dimensions.id[1];

    modelPoints[target.pointId][dimension1] = (x-displaysOffset)/displaysScale;
    modelPoints[target.pointId][dimension2] = -(y-displaysOffset)/displaysScale; // y axis is inverted
  
    updatePointOnAllDisplays(target.pointId);
    updatePointCoordinatesDisplay(target.pointId)
    updatePoints();
    updateSelectedPointMeshPosition(target.pointId);
}
