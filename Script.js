// Set up the canvas and context
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

// Player and goal elements
const playerElement = document.getElementById('player');
const goalElement = document.getElementById('goal');

// Game configuration
let tileSize = 50;
let rows = 10;
let cols = 10;
let player = { x: 0, y: 0 };
let goal = { x: 0, y: 0 };
let moves = 0;
let mazeGenerated = false;

// Start game button and difficulty selection
const startGameBtn = document.getElementById('startGameBtn');
const difficultySelect = document.getElementById('difficultySelect');
const startScreen = document.getElementById('startScreen');

// Function to handle difficulty selection and start game
startGameBtn.addEventListener('click', function() {
    const difficulty = difficultySelect.value;
    
    switch(difficulty) {
        case 'easy':
            rows = 10;
            cols = 10;
            break;
        case 'hard':
            rows = 15;
            cols = 15;
            break;
        case 'extreme':
            rows = 20;
            cols = 20;
            break;
        case 'difficult':
            rows = 25;
            cols = 25;
            break;
    }

    tileSize = Math.min(400 / cols, 400 / rows); // Adjust tile size based on difficulty
    canvas.width = cols * tileSize;
    canvas.height = rows * tileSize;

    startScreen.style.display = 'none'; // Hide start screen
    canvas.style.display = 'block'; // Show maze canvas
    playerElement.style.display = 'block'; // Show player
    goalElement.style.display = 'block'; // Show goal

    initGame();
    drawMaze();
    placePlayerAndGoal();
});

// Initialize game
function initGame() {
    player = { x: 0, y: 0 };
    goal = { x: cols - 1, y: rows - 1 };
    moves = 0;
}

// Draw the maze dynamically
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000';

    // Drawing horizontal and vertical lines for the maze (This part will depend on your maze logic)
    // Example of drawing random lines, this should be replaced with actual maze generation logic

    for (let i = 0; i < rows; i++) {
        drawLine(0, i * tileSize, canvas.width, i * tileSize); // horizontal lines
    }

    for (let j = 0; j < cols; j++) {
        drawLine(j * tileSize, 0, j * tileSize, canvas.height); // vertical lines
    }
}

// Function to draw a line in the maze
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Function to place player and goal in the maze
function placePlayerAndGoal() {
    playerElement.style.left = `${player.x * tileSize}px`;
    playerElement.style.top = `${player.y * tileSize}px`;

    goalElement.style.left = `${goal.x * tileSize}px`;
    goalElement.style.top = `${goal.y * tileSize}px`;
}

// Function to check if the player reaches the goal
function checkWin() {
    if (player.x === goal.x && player.y === goal.y) {
        document.getElementById('Message-Container').style.display = 'flex';
        document.getElementById('moves').textContent = `You reached the goal in ${moves} moves!`;
    }
}

// Move the player within the maze
function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    // Ensure the player stays within bounds
    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        player.x = newX;
        player.y = newY;
        moves++;
        placePlayerAndGoal();
        checkWin();
    }
}

// Listen for arrow key inputs to move the player
window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

// Retry game by resetting player position and moves
function retryGame() {
    player = { x: 0, y: 0 };
    moves = 0;
    document.getElementById('Message-Container').style.display = 'none';
    placePlayerAndGoal();
}






