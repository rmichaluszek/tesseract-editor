function addPointsListInputListeners() {
    var pointsListDisplayContainer = document.getElementById('points-container');

    for(let i = 0;i < modelPoints.length; i++) {
        let point = pointsListDisplayContainer.getElementsByTagName('li')[i];
        point.addEventListener('click', function (evt) {
            pointsListDisplayContainer.getElementsByClassName("point-on-list-selected")[0].className = "point-on-list";
            point.className = "point-on-list point-on-list-selected";
            updatePointCoordinatesDisplay(i);
        });
    }
}

function updatePointsList(points) {
    var pointsListDisplayContainer = document.getElementById('points-container');

    //clear all points
    while (pointsListDisplayContainer.firstChild) {
        pointsListDisplayContainer.removeChild(pointsListDisplayContainer.firstChild);
    }
  
    for(let point in points) {
        var li = document.createElement('li');
        li.className = "point-on-list";
        if(point == 0)
            li.className = "point-on-list point-on-list-selected";
        li.innerHTML = "Point "+point;
        li.id="point-on-list"+point;
        
        pointsListDisplayContainer.appendChild(li);
    }
}