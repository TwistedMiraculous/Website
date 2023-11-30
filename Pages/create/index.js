const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

const pencilButton = document.getElementById('pencil');
const circleButton = document.getElementById('circle');
const squareButton = document.getElementById('square');

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let currentBrush = 'pencil'; // Default brush

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

    if (currentBrush === 'pencil') {
        ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
        ctx.stroke();
    } else if (currentBrush === 'circle') {
        const radius = 20; // You can adjust the radius as needed
        ctx.beginPath();
        ctx.arc(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY, radius, 0, Math.PI * 2);
        ctx.stroke();
    } else if (currentBrush === 'square') {
        const size = 40; // You can adjust the size as needed
        ctx.fillRect(e.clientX - canvasOffsetX - size / 2, e.clientY - canvasOffsetY - size / 2, size, size);
    }
};

canvas.addEventListener('mouseup', () => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();

    // Store the drawn path on mouse up
    paths.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
});

canvas.addEventListener('mousemove', draw);

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

pencilButton.addEventListener('click', () => {
    currentBrush = 'pencil';
});

circleButton.addEventListener('click', () => {
    currentBrush = 'circle';
});

squareButton.addEventListener('click', () => {
    currentBrush = 'square';
});

