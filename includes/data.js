/**
 * Created by orami on 5/9/2017.
 */

var x = 200;
var y = -60;
var data = [

    {
        "type": "line",
        "points": [{
            x: 50 + x,
            y: 200 + y
        },
            {
                x: 250 + x,
                y: 200 + y
            }]
    },
    {
        "type": "line",
        "points": [{
            x: 50 + x,
            y: 200 + y
        },
            {
                x: 50 + x,
                y: 400 + y
            }]
    },
    {
        "type": "line",
        "points": [{
            x: 50 + x,
            y: 400 + y
        },
            {
                x: 250 + x,
                y: 400 + y
            }]
    },
    {
        "type": "line",
        "points": [{
            x: 250 + x,
            y: 200 + y
        },
            {
                x: 250 + x,
                y: 400 + y
            }]
    },
    {
        "type": "line",
        "points": [{
            x: 50 + x,
            y: 200 + y
        },
            {
                x: 150 + x,
                y: 100 + y
            }]
    },
    {
        "type": "line",
        "points": [{
            x: 150 + x,
            y: 100 + y
        },
            {
                x: 250 + x,
                y: 200 + y
            }]
    }
    ,
    {
        "type": "circle",
        "points": [{
            x: 150 + x,
            y: 150 + y
        },
            {
                x: 170 + x,
                y: 170 + y
            }]
    },
    {
        "type": "polygon",
        "numOfRibs": 6,
        "points": [{
            x: 150 + x,
            y: 300 + y
        },
            {
                x: 200 + x,
                y: 350 + y
            }]
    },
    {
        "type": "curve",
        "numOfSections": 20,
        "points": [{
            x: 50 + x,
            y: 500 + y
        },
            {
                x: 80 + x,
                y: 450 + y
            },
            {
                x: 250 + x,
                y: 500 + y
            },
            {
                x: 280 + x,
                y: 450 + y
            }]
    }
];
