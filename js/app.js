// global variables needed in many places in the code
var random;

// Enemies our player must avoid
var Enemy = function(x , y , velocity) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.velocity = velocity;
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    random = Math.random() * (12 - 2) + 2;//got it from mdn docs
    //move horizontally based on the velosity specified multiplied by dt for smooth movement
    this.x += this.velocity * dt; 
    //reset movement 
    if(this.x > 500)//if bug out of canvas
    {
        this.x = -90;
        this.velocity = 80 * random; // Random value with an acceptable velocity.
    }

    //if there's collision with the player, reset player place. 
    //calculate the difference between the center of the player's place and
    // the center of the enemy's place, to detect collision.
    if (player.x - 50 < this.x 
        && player.x + 50 > this.x
        && player.y - 45 < this.y
        && player.y + 45 > this.y) {
        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //alert("render()");
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// =================================( Player )===================================


var Player = function() {
    //alert("PlayerCreation()");
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt) {
    //detect Winning
    if (this.y < 50){
        alert("You Won!");
        console.log("You Won!");
        this.x = 200;
        this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    //alert(key);
    //control player and restrict player's field of control to the canvas.
    switch (key) {
        case 'left':
            {
                if (this.x <= 0) {
                    break;
                }
                else {
                    this.x -= 100;
                }
            }
            break;
        case 'up': {
            this.y -= 85;
        }
            break;
        case 'right': {
            if (this.x >= 400) {
                break;
            }
            else {
                this.x += 100;
            }
        }
            break;
        case 'down': {
            if (this.y >= 400) {
                break;
            }
            else {
                this.y += 85;
            }

        }
            break;
    }

}

// Now instantiate your objects. ===============================================
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var player = new Player();
var enemy;
var initialPos = 0;
for ( var i = 0 ; i < 4 ; i++){
    initialPos += 70
    if (initialPos > 210 )
        initialPos = 70;
    enemy = new Enemy(0,initialPos,400);
    allEnemies.push(enemy);
}
// Place the player object in a variable called player
var player = new Player();



// ========================== (Control method) =================================
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});