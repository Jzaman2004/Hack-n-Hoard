const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 768; // Example width based on your Java settings
canvas.height = 576; // Example height based on your Java settings

// Game variables
let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 48,
    height: 48,
    speed: 4,
    direction: 'down',
    hasKey: 0,
    hasBoots: false
};

let keys = {};
let lastTime = 0;
let playTime = 0;

// Load assets
const assets = {
    player: {
        down1: new Image(),
        down2: new Image(),
        up1: new Image(),
        up2: new Image(),
        left1: new Image(),
        left2: new Image(),
        right1: new Image(),
        right2: new Image()
    }
};

assets.player.down1.src = 'assets/images/player_down_1.png';
assets.player.down2.src = 'assets/images/player_down_2.png';
assets.player.up1.src = 'assets/images/player_up_1.png';
assets.player.up2.src = 'assets/images/player_up_2.png';
assets.player.left1.src = 'assets/images/player_left_1.png';
assets.player.left2.src = 'assets/images/player_left_2.png';
assets.player.right1.src = 'assets/images/player_right_1.png';
assets.player.right2.src = 'assets/images/player_right_2.png';

// Event listeners for key presses
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Game loop
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    update(deltaTime);
    render();
    playTime += deltaTime / 1000;
    requestAnimationFrame(gameLoop);
}

// Update game state
function update(deltaTime) {
    if (keys['ArrowUp']) {
        player.y -= player.speed;
        player.direction = 'up';
    }
    if (keys['ArrowDown']) {
        player.y += player.speed;
        player.direction = 'down';
    }
    if (keys['ArrowLeft']) {
        player.x -= player.speed;
        player.direction = 'left';
    }
    if (keys['ArrowRight']) {
        player.x += player.speed;
        player.direction = 'right';
    }
}

// Render game objects
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    let playerImage;
    switch (player.direction) {
        case 'up':
            playerImage = assets.player.up1;
            break;
        case 'down':
            playerImage = assets.player.down1;
            break;
        case 'left':
            playerImage = assets.player.left1;
            break;
        case 'right':
            playerImage = assets.player.right1;
            break;
    }
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    // Update UI
    document.getElementById('key-count').innerText = `Keys: ${player.hasKey}`;
    document.getElementById('time').innerText = `Time: ${playTime.toFixed(2)}`;
}

// Start the game loop
requestAnimationFrame(gameLoop);