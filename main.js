var canvas = document.getElementById('window-view');

var ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var ctxheight = ctx.canvas.height;
var ctxwidth = ctx.canvas.width;

draw();
