function addPointCoordinatesInputListeners() {
    var pointCoordinatesDisplay = document.getElementById('coordinates').getElementsByClassName("panel-section")[0];

    for(let i = 0;i < 4; i++) {
        let input = pointCoordinatesDisplay.getElementsByTagName("input")[i];
        input.addEventListener('input', function (evt) {
            let newValue = input.value;
            let dimension = "x";
            if(i==1) dimension = "y";
            if(i==2) dimension = "z";
            modelPoints[currentPointSelected][dimension] = newValue;
            updatePointOnAllDisplays(currentPointSelected);
            updatePoints();
            updateSelectedPointMeshPosition(currentPointSelected);
        });
    }
}
function updatePointCoordinatesDisplay(point) {
    currentPointSelected = point;
    var pointCoordinatesDisplay = document.getElementById('coordinates').getElementsByClassName("panel-section")[0];

    document.getElementById("point-name").innerHTML = "Point "+point;
  
    var xInput = pointCoordinatesDisplay.getElementsByTagName("input")[0];
    var yInput = pointCoordinatesDisplay.getElementsByTagName("input")[1];
    var zInput = pointCoordinatesDisplay.getElementsByTagName("input")[2];
    var wInput = pointCoordinatesDisplay.getElementsByTagName("input")[3];
  
    xInput.value = modelPoints[currentPointSelected].x;
    yInput.value = modelPoints[currentPointSelected].y;
    zInput.value = modelPoints[currentPointSelected].z;
  
    updatePoints();
    updateSelectedPointMeshPosition(point);
    selectPointOnAllDisplays(currentPointSelected);
}