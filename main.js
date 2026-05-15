const board = document.querySelector('.board');
const sizeInput = document.getElementById('size');
const mode = document.querySelector('.mode');
let color = '#000';
let isDrawing = true;

// Initialize the board with default size
populateBoard(16);
setupListeners();

// Populate the grid
function populateBoard(size) {
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const sq = document.createElement('div');
        sq.classList.add('box');
        sq.style.backgroundColor = "#fff";
        board.appendChild(sq);
    }
}

// Handle color changes when hovering
function colorBoard(event) {
    if (isDrawing && event.target.classList.contains('box')) {
        event.target.style.backgroundColor = color === 'random' 
            ? getRandomColor() 
            : color;
    }
}

// Change the selected color
function changeColor(choice) {
    color = choice;
}

// Reset the board
function resetBoard() {
    document.querySelectorAll('.box').forEach(box => {
        box.style.backgroundColor = "#fff";
    });
}

// Set the grid size
function setGridSize(gridSize) {
    if (gridSize >= 2 && gridSize <= 100) {
        populateBoard(gridSize);
    } else {
        alert('Please enter a value between 2 and 100.');
    }
}

// Toggle draw mode
function toggleDrawing() {
    isDrawing = !isDrawing;
    mode.textContent = isDrawing ? 'Color' : 'No Color';
    mode.style.backgroundColor = isDrawing ? 'green' : 'red';
}

// Utility: Generate a random color
function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// Add necessary event listeners
function setupListeners() {
    board.addEventListener('mouseover', colorBoard);
    board.addEventListener('click', toggleDrawing);

    document.getElementById('set-size').addEventListener('click', (e) => {
        e.preventDefault();
        const gridSize = parseInt(sizeInput.value, 10);
        setGridSize(gridSize);
        sizeInput.value = 0
    });

    document.querySelector('#reset-btn').addEventListener('click', resetBoard);
}
