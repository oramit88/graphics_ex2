// Computer Graphics (3504837)- Exercise 2
// students name: daria dadov (ID:319575676), or amit (ID:301427647),dima girya (319308060)
const app = angular.module("graphicCourseHw2", []);
app.controller("ctrl", function ($scope) {

    var isNeedToMove = false;
    var isNeedToScale = false;
    var isNeedToRotation = false;
    var isNeedToMirror = false;
    var isNeedToShearing = false;
    $scope.currentOperation = "Not selected";

    var copyOfData = angular.copy(data);
    $scope.scaleFactor = 0.5;
    $scope.rotateAngle = 45;
    $scope.shearingFactor = 1.1;

    /*clear board function*/
    $scope.resetBoard = function () {
        data = copyOfData; //reset the data to the source
        clearBoard();
        try {
            validateData(data);
            setFlagsToFalse();
            drawShapes(data);
            updateCurrentOperation();
        }
        catch (e) {
            alert(e);
            alert("Fix data and reload the page")
        }

    };

    $scope.moveShape = function () {
        setFlagsToFalse();
        isNeedToMove = true;
        updateCurrentOperation();
    };

    $scope.transformScalingShape = function () {
        setFlagsToFalse();
        isNeedToScale = true;
        updateCurrentOperation();
    };


    $scope.transformRotationShape = function () {
        setFlagsToFalse();
        isNeedToRotation = true;
        updateCurrentOperation();
    };

    $scope.transformMirrorShape = function () {
        setFlagsToFalse();
        isNeedToMirror = true;
        updateCurrentOperation();
    };

    $scope.transformShearingShape = function () {
        setFlagsToFalse();
        isNeedToShearing = true;
        updateCurrentOperation();
    };

    function setFlagsToFalse() {
        $scope.currentOperation = "none";
        isNeedToRotation = false;
        isNeedToScale = false;
        isNeedToMove = false;
        isNeedToMirror = false;
        isNeedToShearing = false;
        updateCurrentOperation();
    }

    /*update the giu with the cuurrent operation name*/
    function updateCurrentOperation() {
        console.log($scope.currentOperation);
        if (isNeedToRotation) {
            $scope.currentOperation = "Rotation";
        }
        else if (isNeedToScale) {
            $scope.currentOperation = "Scale";
        }
        else if (isNeedToMove) {
            $scope.currentOperation = "Move";
        }
        else if (isNeedToMirror) {
            $scope.currentOperation = "Mirror";
        }
        else if (isNeedToShearing) {
            $scope.currentOperation = "Shearing";
        }
        else {
            $scope.currentOperation = "Not selected";
        }
        console.log($scope.currentOperation)
    }

    var firstPointX, firstPointY, secPointX, secPointY;
    var counter = 0; //the number of points that the user pressed so far.

//the board
    var canvasBoard = document.getElementById("workingZone");
    var ctx = canvasBoard.getContext("2d");

//add an event listener to mouse pressing
    canvasBoard.addEventListener('click', function (evt) {
        var deltaX;
        var deltaY;
        var mousePos = getMousePos(canvasBoard, evt);
        console.log(mousePos.x);
        console.log(mousePos.y);
        /*move action*/
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
                data = moveShapeTo(deltaX, deltaY, data);
                drawShapes(data);
                counter = 0;
                setFlagsToFalse();
            }
        }
        /*Scale action*/
        else if (isNeedToScale === true) {
            data = scaleTransformation(mousePos.x, mousePos.y, data, $scope.scaleFactor);
            setFlagsToFalse();
        }
        /*Rotation action*/
        else if (isNeedToRotation === true) {
            data = rotationTransformation(mousePos.x, mousePos.y, data, $scope.rotateAngle);
            setFlagsToFalse();
        }
        /*Mirror action*/
        else if (isNeedToMirror === true) {
            data = mirorTransformation(mousePos.x, mousePos.y, data);
            setFlagsToFalse();
        }
        /*Shearing action*/
        else if (isNeedToShearing === true) {
            data = shearingTransformation(mousePos.x, mousePos.y, data, $scope.shearingFactor);
            setFlagsToFalse();
        }
    }, false);

    function clearBoard() {
        ctx.clearRect(0, 0, 800, 800);
    }
    //draws a pixel on the board in (x,y) point
    function putPixel(x, y) {
        ctx = canvasBoard.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(x, y, 4, 4);
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
        var dataMoved = moveShapeTo(-x, -y, data); //moving the shape to the (0,0) point
        var dataTransformation = scalingShape(scalingFactor, dataMoved);
        var dataResult = moveShapeTo(x, y, dataTransformation);//moving back
        clearBoard();
        drawShapes(dataResult);//draws the shape after the transformation
        return dataResult;
    }

    function rotationTransformation(x, y, data) {
        var dataMoved = moveShapeTo(-x, -y, data); //moving the shape to the (0,0) point
        var dataTransformation = rotationShape($scope.rotateAngle, dataMoved);
        var dataResult = moveShapeTo(x, y, dataTransformation);//moving back
        clearBoard();
        drawShapes(dataResult);//draws the shape after the transformation
        return dataResult;
    }

    function mirorTransformation(x, y, data) {
        var dataResult = mirorShape(x, y, data);
        clearBoard();
        drawLine(0, y, 800, y); //the miror axis
        drawShapes(dataResult);//draws the shape after the transformation
        return dataResult;
    }

    function shearingTransformation(x, y, data, shearingFactor) {
        var dataMoved = moveShapeTo(-x, -y, data); //moving the shape to the (0,0) point
        var dataTransformation = shearingShape(x, y, dataMoved, shearingFactor);
        var dataResult = moveShapeTo(x, y, dataTransformation);//moving back
        clearBoard();
        drawShapes(dataResult);//draws the shape after the transformation
        return dataResult;
    }

    /*will change the data according to the shearingShape transformation-*/
    function shearingShape(x, y, data, a) {
        var dataResult = [];
        data.forEach(function (obj) {
            var resultObject;
            switch (obj.type) {
                case "line":
                    resultObject = {
                        "type": "line",
                        "points": [
                            transformShearingPoint(obj, 0, a),
                            transformShearingPoint(obj, 1, a)
                        ]
                    };
                    break;
                case "circle":
                    resultObject = {
                        "type": "circle",
                        "points": [
                            transformShearingPoint(obj, 0, a),
                            transformShearingPoint(obj, 1, a)
                        ]
                    };
                    break;
                case "polygon":
                    resultObject = {
                        "type": "polygon",
                        "numOfRibs": obj.numOfRibs,
                        "points": [
                            transformShearingPoint(obj, 0, a),
                            transformShearingPoint(obj, 1, a)
                        ]
                    };
                    break;
                case "curve":
                    resultObject = {
                        "type": "curve",
                        "numOfSections": obj.numOfSections,
                        "points": [
                            transformShearingPoint(obj, 0, a),
                            transformShearingPoint(obj, 1, a),
                            transformShearingPoint(obj, 2, a),
                            transformShearingPoint(obj, 3, a)
                        ]
                    };
                    break
            }
            dataResult.push(resultObject);
        });
        return dataResult;
    }

    function transformShearingPoint(obj, index, a) {
        return {
            x: obj.points[index].x + a * obj.points[index].y,
            y: obj.points[index].y
        }
    }

    /*will change the data according to the mirorShape transformation-*/
    function mirorShape(x, y, data) {
        var dataResult = [];
        data.forEach(function (obj) {
            var resultObject;
            switch (obj.type) {
                case "line":
                    resultObject = {
                        "type": "line",
                        "points": [
                            transformMirorPoint(obj, 0, y),
                            transformMirorPoint(obj, 1, y)
                        ]
                    };
                    break;
                case "circle":
                    resultObject = {
                        "type": "circle",
                        "points": [
                            transformMirorPoint(obj, 0, y),
                            transformMirorPoint(obj, 1, y)
                        ]
                    };
                    break;
                case "polygon":
                    resultObject = {
                        "type": "polygon",
                        "numOfRibs": obj.numOfRibs,
                        "points": [
                            transformMirorPoint(obj, 0, y),
                            transformMirorPoint(obj, 1, y)
                        ]
                    };
                    break;
                case "curve":
                    resultObject = {
                        "type": "curve",
                        "numOfSections": obj.numOfSections,
                        "points": [
                            transformMirorPoint(obj, 0, y),
                            transformMirorPoint(obj, 1, y),
                            transformMirorPoint(obj, 2, y),
                            transformMirorPoint(obj, 3, y)
                        ]
                    };
                    break
            }
            dataResult.push(resultObject);
        });
        return dataResult;
    }

    function transformMirorPoint(obj, index, Yc) {
        console.log(obj.points[index].x, 2 * Yc * -obj.points[index].y);
        return {
            x: obj.points[index].x,
            y: 2 * Yc - obj.points[index].y
        }
    }

    /*will change the data according to the scalingShape transformation-*/
    function scalingShape(scalingFactor, data) {
        var dataResult = [];
        data.forEach(function (obj) {
            var resultObject;
            switch (obj.type) {
                case "line":
                    resultObject = {
                        "type": "line",
                        "points": [
                            transformScalePoint(obj, 0, scalingFactor),
                            transformScalePoint(obj, 1, scalingFactor)
                        ]
                    };
                    break;
                case "circle":
                    resultObject = {
                        "type": "circle",
                        "points": [
                            transformScalePoint(obj, 0, scalingFactor),
                            transformScalePoint(obj, 1, scalingFactor)
                        ]
                    };
                    break;
                case "polygon":
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


    /*will change the data according to the moveShapeTo transformation-*/
    function moveShapeTo(deltaX, deltaY, data) {
        var dataResult = [];
        data.forEach(function (obj) {
            var resultObject;
            switch (obj.type) {
                case "line":
                    resultObject = {
                        "type": "line",
                        "points": [
                            transformMovePoint(obj, 0, deltaX, deltaY),
                            transformMovePoint(obj, 1, deltaX, deltaY)
                        ]
                    };
                    break;
                case "circle":
                    resultObject = {
                        "type": "circle",
                        "points": [
                            transformMovePoint(obj, 0, deltaX, deltaY),
                            transformMovePoint(obj, 1, deltaX, deltaY)
                        ]
                    };
                    break;
                case "polygon":
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

    /*will change the data according to the rotationShape transformation-*/
    function rotationShape(angle, data) {
        var dataResult = [];
        data.forEach(function (obj) {
            var resultObject;
            switch (obj.type) {
                case "line":
                    resultObject = {
                        "type": "line",
                        "points": [
                            transformRotationPoint(obj, 0, angle),
                            transformRotationPoint(obj, 1, angle)
                        ]
                    };
                    break;
                case "circle":
                    resultObject = {
                        "type": "circle",
                        "points": [
                            transformRotationPoint(obj, 0, angle),
                            transformRotationPoint(obj, 1, angle)
                        ]
                    };
                    break;
                case "polygon":
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

    //drawing the line between first point to second point
    function drawLine(firstPoint_X, firstPoint_Y, secondPoint_X, secondPoint_Y) {
        var dx;
        var dy;

        if (firstPoint_X != undefined && secondPoint_X != undefined) {
            dx = firstPoint_X - secondPoint_X;
            dy = firstPoint_Y - secondPoint_Y;
        }

        var range = Math.max(Math.abs(dx), Math.abs(dy));

        var dxx = dx / range;
        var dyy = dy / range;

        var x;
        var y;

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
        var lastPx = x1 + radius * Math.cos(0 / numOfRibs);
        var lastPy = y1 + radius * Math.sin(0 / numOfRibs);
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
                    drawLine(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y);
                    break;
                case "circle":
                    drawCircle(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y);
                    break;
                case "polygon":
                    drawPolygon(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y, obj.numOfRibs);
                    break;
                case "curve":
                    drawBezierCurvest(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y, obj.points[2].x, obj.points[2].y, obj.points[3].x, obj.points[3].y, obj.numOfSections);
            }
        });
    }

    function validateData(data) {
        data.forEach(function (obj) {
            var resultObject;
            switch (obj.type) {
                case "line":
                    resultObject = {
                        "type": "line",
                        "points": [
                            validatePoint(obj, 0),
                            validatePoint(obj, 1)
                        ]
                    };
                    break;
                case "circle":
                    resultObject = {
                        "type": "circle",
                        "points": [
                            validatePoint(obj, 0),
                            validatePoint(obj, 1)
                        ]
                    };
                    break;
                case "polygon":
                    resultObject = {
                        "type": "polygon",
                        "numOfRibs": obj.numOfRibs,
                        "points": [
                            validatePoint(obj, 0),
                            validatePoint(obj, 1)
                        ]
                    };
                    break;
                case "curve":
                    resultObject = {
                        "type": "curve",
                        "numOfSections": obj.numOfSections,
                        "points": [
                            validatePoint(obj, 0),
                            validatePoint(obj, 1),
                            validatePoint(obj, 2),
                            validatePoint(obj, 3)
                        ]
                    };
                    break
            }
        });
    }

    function validatePoint(obj, index) {
        if (typeof  obj.points[index].x !== "number") {
            throw "Point must by number";
        }
        if (typeof  obj.points[index].y !== "number") {
            throw "Point can'by number";
        }
        if (obj.points[index].x < 0) {
            throw "Point can'by negative";
        }
        if (obj.points[index].y < 0) {
            throw "Point can'by negative";
        }
    }

    try {
        validateData(data);
        drawShapes(data);
    }
    catch (e) {
        alert(e);
        alert("Fix data and reload the page")
    }

});
