const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;

let paths = []; // Array to store paths

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX - canvasOffsetX;
    startY = e.clientY - canvasOffsetY;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
});

toolbar.addEventListener('click', (e) => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paths = []; // Clear paths on clear action
    }
});

toolbar.addEventListener('change', (e) => {
    if (e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if (!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    ctx.stroke();
};

canvas.addEventListener('mouseup', () => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();

    // Store the drawn path on mouse up
    paths.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
});

canvas.addEventListener('mousemove', draw);

// Listen for keydown event
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'z') {
        e.preventDefault(); // Prevent default Ctrl+Z behavior (like browser undo)
        undoLastPath();
    }
});

function undoLastPath() {
    if (paths.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paths.pop(); // Remove the last path
        redrawPaths();
    }
}

function redrawPaths() {
    paths.forEach((path) => {
        ctx.putImageData(path, 0, 0);
    });
}
