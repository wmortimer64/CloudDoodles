var socket = io();

/**
 * Prevents inputs from redirecting to another
 */
const inputs = document.querySelectorAll('input');
inputs.forEach((input) => {
    input.addEventListener('click', (event) => {
        event.preventDefault();
    });
});

document.addEventListener('mousemove', mouseMoveHandler, false);
document.addEventListener('keydown', (e) => {
    if (e.key == 'c') {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        // replaced .rect() & .fill with .filLRect to save space
        // Replaced the static coded width and height with the context's
        // built in width and height variables.
        ctx.fillRect(0, 0, c.width, c.height);
    }
});

/** @type { HTMLCanvasElement } */
var c = document.getElementById('can');
var ctx = c.getContext('2d');
var x = 0;
var y = 0;
var b = 0;
var prex = 0;
var prey = 0;
var currLineWidth;
/** @type {HTMLInputElement} */
var typer = document.getElementById('room');
var thick = document.getElementById('thickness');

setInterval(update, 10);
function update() {
    ctx.lineCap = 'round';
    if (b != 0) {
        socket.emit('line', {
            x1: x,
            x2: prex,
            y1: y,
            y2: prey,
            room: typer.value,
            thickness: thick.value,
        });
    }
    prex = x;
    prey = y;
}
function mouseMoveHandler(e) {
    var rect = c.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    b = e.buttons;
}
function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = currLineWidth;
    ctx.stroke();

    ctx.fill();
}
socket.on('draw', function (data) {
    if (data.room == typer.value) {
        currLineWidth = data.thickness;
        line(data.x1, data.y1, data.x2, data.y2);
    }
});
