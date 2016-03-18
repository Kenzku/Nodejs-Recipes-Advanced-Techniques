/**
 * Created by Huang, Fuguo (aka Ken) on 16/03/2016.
 */
$(document).ready(function() {
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    remoteCanvas = document.getElementById('remotecanvas'),
    remoteContext = remoteCanvas.getContext('2d'),
    $canvas = $('canvas'),
    top = $canvas.offset().top,
    left = $canvas.offset().left,
    wsClient = new WebSocket('ws://localhost:8080', 'draw-protocol'),
    mySocketId = -1;

var resizeCanvas = function() {
    context.canvas.width = remoteContext.canvas.width = $(window).width();
    context.canvas.height = remoteContext.canvas.height = $(window).height();
};

var initialiseCanvas = function () {
    context.lineCap = remoteContext.lineCap = 'round';
    resizeCanvas();
    context.save();
    remoteContext.save();
    context.clearRect(0,0,context.canvas.width,context.canvas.height);
    remoteContext.clearRect(0,0,remoteContext.canvas.width,remoteContext.canvas.height);
    context.restore();
    remoteContext.restore();
};

var draw = {
    isDrawing: false,
    mousedown: function (context, coordinates) {
        context.beginPath();
        context.moveTo(coordinates.x, coordinates.y);
        this.isDrawing = true;
    },
    mousemove: function (context, coordinates) {
        if (this.isDrawing) {
            context.lineTo(coordinates.x, coordinates.y);
            context.stroke();
        }
    },
    mouseup: function(context, coordinates) {
        this.isDrawing = false;
        context.lineTo(coordinates.x, coordinates.y);
        context.stroke();
        context.closePath();
    },
    touchstart: function(context, coordinates) {
        context.beginPath();
        context.moveTo(coordinates.x, coordinates.y);
        this.isDrawing = true;
    },
    touchmove: function(context, coordinates) {
        if (this.isDrawing) {
            context.lineTo(coordinates.x, coordinates.y);
            context.stroke();
        }
    },
    touchend: function(context, coordinates) {
        if (this.isDrawing) {
            this.touchmove(coordinates);
            this.isDrawing = false;
        }
    }
};

function setupDraw(event, isRemote) {
    var coordinates = {},
        evt = {};

    evt.type = event.type;
    evt.socketId = mySocketId;
    evt.lineWidth = context.lineWidth;
    evt.strokeStyle = context.strokeStyle;
    if (evt.type.indexOf('touch') != -1) {
        evt.targetTouches = [{pageX: 0, pageY: 0}];
        evt.targetTouches[0].pageX = event.targetTouches[0].pageX || 0;
        evt.targetTouches[0].pageY = event.targetTouches[0].pageY || 0;
        coordinates.x = event.targetTouches[0].pageX - left;
        coordinates.y = event.targetTouches[0].pageY - top;
    } else {
        evt.pageX = event.pageX;
        evt.pageY = event.pageY;
        coordinates.x = event.pageX - left;
        coordinates.y = event.pageY - top;
    }
    if (event.strokeStyle) {
        remoteContext.strokeStyle = event.strokeStyle;
        remoteContext.lineWidth = event.lineWidth;
    }

    if (!isRemote) {
        wsClient.send(JSON.stringify(evt));
        draw[event.type](context, coordinates);
    } else {
        draw[event.type](remoteContext, coordinates);
    }
}

window.addEventListener('mousedown', setupDraw, false);
window.addEventListener('mousemove', setupDraw, false);
window.addEventListener('mouseup', setupDraw, false);
canvas.addEventListener('touchstart', setupDraw, false);
canvas.addEventListener('touchmove',setupDraw, false);
canvas.addEventListener('touchend',setupDraw, false);

document.body.addEventListener('touchmove',function(event){
    event.preventDefault();
},false);

$('#clear').click(function (e) {
    initialiseCanvas(true);
    $("#sizer").val("");
});

$("#draw").click(function (e) {
    e.preventDefault();
    $("label[for='sizer']").text("Line Size:");
});

    $("#colors li").click(function (e) {
        e.preventDefault();
        $("label[for='sizer']").text("Line Size:");
        context.strokeStyle = $(this).css("background-color");
    });


    $("#sizer").change(function (e) {
        context.lineWidth = parseInt($(this).val(), 10);
    });

    initialiseCanvas();


    window.onresize = function() {
        resizeCanvas();
    };


    wsClient.onmessage = function(event) {
        if (event.data.indexOf("socketId_") !== -1) {
            mySocketId = event.data.split("_")[1];
        } else {
            var dt = JSON.parse(event.data);
            setupDraw(dt, true);
        }

    };
});