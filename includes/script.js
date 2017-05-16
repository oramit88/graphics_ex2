// Computer Graphics (3504837)- Exercise 2
// students name: daria dadov (ID:319575676), or amit (ID:301427647),dima girya (319308060)


console.log(data);

var isNeedToMove = false;
var isNeedToScale = false;
var isNeedToRotation = false;

function moveShape() {
    isNeedToMove = true;
    isNeedToScale = false;
    isNeedToRotation = false;
}


function transformScalingShape() {
    isNeedToScale = true;
    isNeedToMove = false;
    isNeedToRotation = false;
}


function transformRotationShape() {
    isNeedToRotation = true;
    isNeedToScale = false;
    isNeedToMove = false;
}

//add an event listener to mouse pressing

var firstPointX, firstPointY, secPointX, secPointY;
var counter = 0;


//the board
var canvasBoard = document.getElementById("workingZone");
var ctx = canvasBoard.getContext("2d");

canvasBoard.addEventListener('click', function (evt) {
    var deltaX;
    var deltaY;
    var mousePos = getMousePos(canvasBoard, evt);
    if (isNeedToMove === true) {
        if (counter === 0) {
            firstPointX = mousePos.x;
            firstPointY = mousePos.y;
            counter++;
        }
        else if (counter === 1) {
            secPointX = mousePos.x;
            secPointY = mousePos.y;
            deltaX = secPointX - firstPointX;
            deltaY = secPointY - firstPointY;
            clearBoard();
            drawShapes(moveShapeTo(deltaX, deltaY, data));
            counter = 0;
            isNeedToMove = false;
        }
    }
    else if (isNeedToScale === true) {
        scaleTransformation(mousePos.x, mousePos.y, data, 0.7);
        isNeedToScale = false;
    }
    else if (isNeedToRotation === true) {
        rotationTransformation(mousePos.x, mousePos.y, data);

    }
}, false);


function clearBoard() {
    ctx.clearRect(0, 0, 800, 800);
}


function resetBoard() {
    clearBoard();
    drawShapes(data);
}


//draws a pixel on the board in (x,y) point
function putPixel(x, y) {
    ctx = canvasBoard.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, 4, 4);
}

function deletePixel(x, y) {
    ctx = canvasBoard.getContext("2d");
    ctx.fillStyle = "yellow";
    ctx.fillRect(x, y, 1, 1);
}

//returns the mouse position when user click's on the board
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function scaleTransformation(x, y, data, scalingFactor) {
    var dataMoved = moveShapeTo(-x, -y, data);
    var dataTransformation = scalingShape(scalingFactor, dataMoved);
    var dataResult = moveShapeTo(x, y, dataTransformation);
    clearBoard();
    drawShapes(dataResult);
}

function rotationTransformation(x, y, data) {
    var dataMoved = moveShapeTo(-x, -y, data);
    var dataTransformation = rotationShape(90,dataMoved);
    var dataResult = moveShapeTo(x, y, dataTransformation);
    clearBoard();
    drawShapes(dataResult);
}

function scalingShape(scalingFactor, data) {
    var dataResult = [];
    data.forEach(function (obj) {
        var resultObject;
        switch (obj.type) {
            case "line":
                //  console.log("Transform moveShapeTo of type line");
                resultObject = {
                    "type": "line",
                    "points": [
                        transformScalePoint(obj, 0, scalingFactor),
                        transformScalePoint(obj, 1, scalingFactor)
                    ]
                };
                break;
            case "circle":
                //        console.log("Transform moveShapeTo of type circle");
                resultObject = {
                    "type": "circle",
                    "points": [
                        transformScalePoint(obj, 0, scalingFactor),
                        transformScalePoint(obj, 1, scalingFactor)
                    ]
                };
                break;
            case "polygon":
                //       console.log("Transform moveShapeTo of type polygon");
                resultObject = {
                    "type": "polygon",
                    "numOfRibs": obj.numOfRibs,
                    "points": [
                        transformScalePoint(obj, 0, scalingFactor),
                        transformScalePoint(obj, 1, scalingFactor)
                    ]
                };
                break;
            case "curve":
                //        console.log("Transform moveShapeTo of type curve");
                resultObject = {
                    "type": "curve",
                    "numOfSections": obj.numOfSections,
                    "points": [
                        transformScalePoint(obj, 0, scalingFactor),
                        transformScalePoint(obj, 1, scalingFactor),
                        transformScalePoint(obj, 2, scalingFactor),
                        transformScalePoint(obj, 3, scalingFactor)
                    ]
                };
                break
        }
        dataResult.push(resultObject);
    });
    return dataResult;
}

function transformScalePoint(obj, index, scaleFactor) {
    return {
        x: obj.points[index].x * scaleFactor,
        y: obj.points[index].y * scaleFactor
    }
}

function moveShapeTo(deltaX, deltaY, data) {
    var dataResult = [];
    data.forEach(function (obj) {
        var resultObject;
        switch (obj.type) {
            case "line":
                //  console.log("Transform moveShapeTo of type line");
                resultObject = {
                    "type": "line",
                    "points": [
                        transformMovePoint(obj, 0, deltaX, deltaY),
                        transformMovePoint(obj, 1, deltaX, deltaY)
                    ]
                };
                break;
            case "circle":
                //    console.log("Transform moveShapeTo of type circle");
                resultObject = {
                    "type": "circle",
                    "points": [
                        transformMovePoint(obj, 0, deltaX, deltaY),
                        transformMovePoint(obj, 1, deltaX, deltaY)
                    ]
                };
                break;
            case "polygon":
                //    console.log("Transform moveShapeTo of type polygon");
                resultObject = {
                    "type": "polygon",
                    "numOfRibs": obj.numOfRibs,
                    "points": [
                        transformMovePoint(obj, 0, deltaX, deltaY),
                        transformMovePoint(obj, 1, deltaX, deltaY)
                    ]
                };
                break;
            case "curve":
                //   console.log("Transform moveShapeTo of type curve");
                resultObject = {
                    "type": "curve",
                    "numOfSections": obj.numOfSections,
                    "points": [
                        transformMovePoint(obj, 0, deltaX, deltaY),
                        transformMovePoint(obj, 1, deltaX, deltaY),
                        transformMovePoint(obj, 2, deltaX, deltaY),
                        transformMovePoint(obj, 3, deltaX, deltaY)
                    ]
                };
                break
        }
        dataResult.push(resultObject);
    });
    return dataResult;
}

function transformMovePoint(obj, index, deltaX, deltaY) {
    return {
        x: obj.points[index].x + deltaX,
        y: obj.points[index].y + deltaY
    }
}

function rotationShape(angle,data) {
    var dataResult = [];
    data.forEach(function (obj) {
        var resultObject;
        switch (obj.type) {
            case "line":
                //console.log("Transform rotation of type line");
                resultObject = {
                    "type": "line",
                    "points": [
                        transformRotationPoint(obj, 0, angle),
                        transformRotationPoint(obj, 1, angle)
                    ]
                };
                break;
            case "circle":
                // console.log("Transform rotation of type circle");
                resultObject = {
                    "type": "circle",
                    "points": [
                        transformRotationPoint(obj, 0, angle),
                        transformRotationPoint(obj, 1, angle)
                    ]
                };
                break;
            case "polygon":
                //   console.log("Transform rotation of type polygon");
                resultObject = {
                    "type": "polygon",
                    "numOfRibs": obj.numOfRibs,
                    "points": [
                        transformRotationPoint(obj, 0, angle),
                        transformRotationPoint(obj, 1, angle)
                    ]
                };
                break;
            case "curve":
                //     console.log("Transform rotation of type curve");
                resultObject = {
                    "type": "curve",
                    "numOfSections": obj.numOfSections,
                    "points": [
                        transformRotationPoint(obj, 0, angle),
                        transformRotationPoint(obj, 1, angle),
                        transformRotationPoint(obj, 2, angle),
                        transformRotationPoint(obj, 3, angle)
                    ]
                };
                break
        }
        dataResult.push(resultObject);
    });
    return dataResult;
}

function transformRotationPoint(obj, index, ph) {
    return {
        x: obj.points[index].x * Math.cos(ph) - obj.points[index].y * Math.sin(ph),
        y: obj.points[index].x * Math.sin(ph) + obj.points[index].y * Math.cos(ph)
    }
}

function calculateAngle(x, y) {
    var r = calculateDistance(x, y, 0, 0);
    return Math.acos((Math.pow(r, 2) + Math.pow(x, 2) - Math.pow(y, 2)) / ( 2 * r * x));
}

//drawing the line between first point to second point
function drawLine(firstPoint_X, firstPoint_Y, secondPoint_X, secondPoint_Y) {
    var dx;
    var dy;

    if (firstPoint_X != undefined && secondPoint_X != undefined) {
        dx = firstPoint_X - secondPoint_X;
        dy = firstPoint_Y - secondPoint_Y;
    }

    var range = Math.max(Math.abs(dx), Math.abs(dy));
    //  console.log("Range:" + range);

    dxx = dx / range;
    var test = Math.abs(dxx);
    dyy = dy / range;

    // console.log("dxx: " + test + "dyy:  " + dyy);

    var x;
    var y;
    var m = dy / dx;
    //  console.log("m" + m);

    x = firstPoint_X;
    y = firstPoint_Y;
    dxx = dxx * (-1);
    dyy = dyy * (-1);

    for (var v = 0; v < range; v++) {
        x = x + dxx;
        y = y + dyy;
        putPixel(Math.round(x), Math.round(y));
    }
}

var radius;
function calcRadius(x1, y1, x2, y2) {
    var xr = x1 - x2;
    var yr = y1 - y2;
    var powRadius = Math.pow(xr, 2) + Math.pow(yr, 2);
    return Math.sqrt(powRadius);
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function drawCircle(x1, y1, x2, y2) {
    radius = calcRadius(x1, y1, x2, y2);
    for (var angle = 0; angle < 720; angle++) {
        var x = x1 + radius * Math.sin(angle);
        var y = y1 + radius * Math.cos(angle);
        putPixel(x, y);
    }
}


function drawPolygon(x1, y1, x2, y2, numOfRibs) {
    radius = calcRadius(x1, y1, x2, y2);
    var lastPx = x1 + radius * Math.cos(0 * 2 * Math.PI / numOfRibs);
    var lastPy = y1 + radius * Math.sin(0 * 2 * Math.PI / numOfRibs);
    for (var i = 1; i <= numOfRibs; i++) {
        var x = x1 + radius * Math.cos(i * 2 * Math.PI / numOfRibs);
        var y = y1 + radius * Math.sin(i * 2 * Math.PI / numOfRibs);
        putPixel(x, y);
        drawLine(lastPx, lastPy, x, y);
        lastPx = x;
        lastPy = y;
    }

}


function drawBezierCurvest(x1, y1, x2, y2, x3, y3, x4, y4, numOfSections) {
    var buzierMatrix = math.matrix([[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 3, 0, 0], [1, 0, 0, 0]]);
    var xPointsMatrix = math.matrix([[x1], [x2], [x3], [x4]]);
    var yPointsMatrix = math.matrix([[y1], [y2], [y3], [y4]]);

    //drawing the curve
    var slot = 1 / numOfSections;
    var lastPointX = x1;
    var lastPointY = y1;

    for (var t = 0; t <= 1; t = t + slot) {
        var t_in_3 = Math.pow(t, 3);
        var t_in_2 = Math.pow(t, 2);

        var tMatrix = math.matrix([[t_in_3, t_in_2, t, 1]]);
        var tMatrix_mult_bazier = math.multiply(tMatrix, buzierMatrix);

        var final_X = math.multiply(tMatrix_mult_bazier, xPointsMatrix);
        var final_y = math.multiply(tMatrix_mult_bazier, yPointsMatrix);
        putPixel(final_X._data[0][0], final_y._data[0][0]);
        drawLine(lastPointX, lastPointY, final_X._data[0][0], final_y._data[0][0]);
        lastPointX = final_X._data[0][0];
        lastPointY = final_y._data[0][0];
    }

}

function drawShapes(data) {
    data.forEach(function (obj) {
        switch (obj.type) {
            case "line":
                //        console.log("drawShapesFromData: draw line");
                drawLine(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y);
                break;
            case "circle":
                //     console.log("drawShapesFromData: draw circle");
                drawCircle(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y);
                break;
            case "polygon":
                //     console.log("drawShapesFromData: draw polygon");
                drawPolygon(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y, obj.numOfRibs);
                break;
            case "curve":
                //     console.log("drawShapesFromData: draw curve");
                drawBezierCurvest(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y, obj.points[2].x, obj.points[2].y, obj.points[3].x, obj.points[3].y, obj.numOfSections);
        }
    });
}

drawShapes(data);
