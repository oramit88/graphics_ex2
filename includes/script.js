// Computer Graphics (3504837)- Exercise 1
// Date: 19.4.2017
// students name: daria dadov (ID:319575676), or amit (ID:301427647)


console.log(data);


// points variables for line,circle,polygon
var firstPoint_X = undefined;
var firstPoint_Y = undefined;
var secondPoint_X = undefined;
var secondPoint_Y = undefined;


//boolean variables for changing the points when pressing "change" button
var isNeedToChangeFirst = true;
var isNeedToChangeSecond = true;
var isNeedToChangechange_1_BezierPoint = false;
var isNeedToChangechange_2_BezierPoint = false;
var isNeedToChangechange_3_BezierPoint = false;
var isNeedToChangechange_4_BezierPoint = false;

// points variables for Bezier curve
var first_BezierPoint_X;
var first_BezierPoint_Y;

var second_BezierPoint_X;
var second_BezierPoint_Y;

var third_BezierPoint_X;
var third_BezierPoint_Y;

var fourth_BezierPoint_X;
var fourth_BezierPoint_Y;


//counter for limiting the number of drawing on the board
var numOfPoints = 0;

var firstP = document.getElementById("firstP"); //the Gui first point coordinates
var secondP = document.getElementById("secondP"); //the Gui second point coordinates

//bazier point GUI
var p_of_1_BezierPopint = document.getElementById("1_BezierPopint");
var p_of_2_BezierPopint = document.getElementById("2_BezierPopint");
var p_of_3_BezierPopint = document.getElementById("3_BezierPopint");
var p_of_4_BezierPopint = document.getElementById("4_BezierPopint");

//the board
var canvasBoard = document.getElementById("workingZone");
var ctx = canvasBoard.getContext("2d");


function clearBoard() {
    console.log("clearBoard");
    ctx.clearRect(0, 0, 800, 800);
}

//draws a pixel on the board in (x,y) point
function putPixel(x, y) {
    //numOfPoints++;
    //console.log("putpx----X:" + x + "  putpx----Y:" + y);
    ctx = canvasBoard.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, 4, 4);
}

function deletePixel(x, y) {
    console.log("delete px----X:" + x + "  putpx----Y:" + y);
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

function moveShapeTo(daltaX, daltaY, data) {
    var dataResult = [];
    data.forEach(function (obj) {
        var resultObject;
        switch (obj.type) {
            case "line":
                console.log("Transform moveShapeTo of type line");
                resultObject = {
                    "type": "line",
                    "points": [
                        transformPoint(obj,0,daltaX,daltaY),
                        transformPoint(obj,1,daltaX,daltaY)
                       ]
                };
                break;
            case "circle":
                console.log("Transform moveShapeTo of type circle");
                resultObject = {
                    "type": "circle",
                    "points": [
                        transformPoint(obj,0,daltaX,daltaY),
                        transformPoint(obj,1,daltaX,daltaY)
                    ]
                };
                break;
            case "polygon":
                console.log("Transform moveShapeTo of type polygon");
                resultObject = {
                    "type": "polygon",
                    "numOfRibs":obj.numOfRibs,
                    "points": [
                        transformPoint(obj,0,daltaX,daltaY),
                        transformPoint(obj,1,daltaX,daltaY)
                    ]
                };
                break;
            case "curve":
                console.log("Transform moveShapeTo of type curve");
                resultObject = {
                    "type": "polygon",
                    "numOfSections":obj.numOfSections,
                    "points": [
                        transformPoint(obj,0,daltaX,daltaY),
                        transformPoint(obj,1,daltaX,daltaY),
                        transformPoint(obj,2,daltaX,daltaY),
                        transformPoint(obj,3,daltaX,daltaY)
                    ]
                };
                break
        }
        dataResult.push(resultObject);
    });
    return dataResult;
}

function transformPoint(obj,index,daltaX,daltaY) {
   return {
        x: obj.points[index].x + daltaX,
        y: obj.points[index].y + daltaY
    }
}

//add an event listener to mouse pressing

var firstPointX,firstPointY,secPointX,secPointY;
var counter=0;

canvasBoard.addEventListener('click', function (evt) {
    if(isNeedToMove==true){
        var mousePos = getMousePos(canvasBoard, evt);
        console.log("user clicked on board:" + mousePos.x + "," + mousePos.y);
        if(counter==0){
            firstPointX=mousePos.x;
            firstPointY=mousePos.y;
            counter++;
        }
        else if(counter==1){
            secPointX=mousePos.x;
            secPointY=mousePos.y;
            var deltaX=firstPointX-secPointX;
            var deltaY=firstPointY-secPointY;
            clearBoard();
            drawShapesFromData(moveShapeTo(deltaX, deltaY,data));
            counter=0;
            isNeedToMove=false;
        }

    }
}, false);

function changeFirstPoint() {
    deletePixel(firstPoint_X, firstPoint_Y);
    numOfPoints--;
    isNeedToChangeFirst = true;
}

function changeSecondPoint() {
    deletePixel(secondPoint_X, secondPoint_Y);
    numOfPoints--;
    isNeedToChangeSecond = true;
}

function MyLine() {

    if (firstPoint_X == undefined || firstPoint_Y == undefined) {
        alert("first point isnt defined!");
    }
    else if (secondPoint_X == undefined || secondPoint_Y == undefined) {
        alert("second point isnt defined!");
    }
    else { //the two points defined by the user and now we can draw the line.
        MyLine2(firstPoint_X, firstPoint_Y, secondPoint_X, secondPoint_Y);
    }
}

//drawing the line between first point to second point
function MyLine2(firstPoint_X, firstPoint_Y, secondPoint_X, secondPoint_Y) {
    var dx;
    var dy;

    if (firstPoint_X != undefined && secondPoint_X != undefined) {
        dx = firstPoint_X - secondPoint_X;
        dy = firstPoint_Y - secondPoint_Y;
    }

    var range = Math.max(Math.abs(dx), Math.abs(dy));
    console.log("Range:" + range);

    dxx = dx / range;
    var test = Math.abs(dxx);
    dyy = dy / range;

    console.log("dxx: " + test + "dyy:  " + dyy);

    var x;
    var y;
    var m = dy / dx;
    console.log("m" + m);

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

//drawing the circle on the board
function MyCircle() {
    if (firstPoint_X == undefined || firstPoint_Y == undefined) {
        alert("first point isnt defined!");
    }
    else if (secondPoint_X == undefined || secondPoint_Y == undefined) {
        alert("second point isnt defined!");
    }
    else {
        radius = calcRadius();
        for (var angle = 0; angle < 720; angle++) {
            var x = firstPoint_X + radius * Math.sin(angle);
            var y = firstPoint_Y + radius * Math.cos(angle);
            putPixel(x, y);
        }
    }
}


function DrawCircle(x1, y1, x2, y2) {
    radius = calcRadius(x1, y1, x2, y2);
    for (var angle = 0; angle < 720; angle++) {
        var x = x1 + radius * Math.sin(angle);
        var y = y1 + radius * Math.cos(angle);
        putPixel(x, y);
    }
}


//drawing the polygon on the board
function MyPolygon() {
    if (firstPoint_X == undefined || firstPoint_Y == undefined) {
        alert("first point isnt defined!");
    }
    else if (secondPoint_X == undefined || secondPoint_Y == undefined) {
        alert("second point isnt defined!");
    }
    else {
        radius = calcRadius();
        var poly = document.getElementById("polyNum").value;
        var lastPx = firstPoint_X + radius * Math.cos(0 * 2 * Math.PI / poly);
        var lastPy = firstPoint_Y + radius * Math.sin(0 * 2 * Math.PI / poly);
        for (var i = 1; i <= poly; i++) {
            console.log(i);
            var x = firstPoint_X + radius * Math.cos(i * 2 * Math.PI / poly);
            var y = firstPoint_Y + radius * Math.sin(i * 2 * Math.PI / poly);
            putPixel(x, y);
            MyLine2(lastPx, lastPy, x, y);
            lastPx = x;
            lastPy = y;
        }
        // numOfPoints=0;
    }

}

function DrawPolygon(x1, y1, x2, y2, numOfRibs) {
    radius = calcRadius(x1, y1, x2, y2);
    var lastPx = x1 + radius * Math.cos(0 * 2 * Math.PI / numOfRibs);
    var lastPy = y1 + radius * Math.sin(0 * 2 * Math.PI / numOfRibs);
    for (var i = 1; i <= numOfRibs; i++) {
        //console.log(i);
        var x = x1 + radius * Math.cos(i * 2 * Math.PI / numOfRibs);
        var y = y1 + radius * Math.sin(i * 2 * Math.PI / numOfRibs);
        putPixel(x, y);
        MyLine2(lastPx, lastPy, x, y);
        lastPx = x;
        lastPy = y;
    }

}

function change1_BezierPopint() {
    isNeedToChangechange_1_BezierPoint = true;
}
function change2_BezierPopint() {
    isNeedToChangechange_2_BezierPoint = true;
}
function change3_BezierPopint() {
    isNeedToChangechange_3_BezierPoint = true;
}
function change4_BezierPopint() {
    isNeedToChangechange_4_BezierPoint = true;
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
        console.log("*****************");
        console.log(final_X._data[0][0]);
        console.log(final_y._data[0][0]);
        console.log("*****************");
        putPixel(final_X._data[0][0], final_y._data[0][0]);
        MyLine2(lastPointX, lastPointY, final_X._data[0][0], final_y._data[0][0]);
        lastPointX = final_X._data[0][0];
        lastPointY = final_y._data[0][0];
    }

}

function drawShapesFromData(data) {
    data.forEach(function (obj) {
        switch (obj.type) {
            case "line":
                console.log("drawShapesFromData: draw line");
                MyLine2(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y);
                break;
            case "circle":
                console.log("drawShapesFromData: draw circle");
                DrawCircle(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y);
                break;
            case "polygon":
                console.log("drawShapesFromData: draw polygon");
                DrawPolygon(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y, obj.numOfRibs);
                break;
            case "curve":
                console.log("drawShapesFromData: draw curve");
                drawBezierCurvest(obj.points[0].x, obj.points[0].y, obj.points[1].x, obj.points[1].y, obj.points[2].x, obj.points[2].y, obj.points[3].x, obj.points[3].y, obj.numOfSections);
        }
    });
}

drawShapesFromData(data);

var isNeedToMove = false;
function moveShape() {
    isNeedToMove = true;
}