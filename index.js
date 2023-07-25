const gameboard = document.querySelector("#gameboard");
const context = gameboard.getContext("2d");
const scoreText = document.querySelector("#scoretext");
const reset = document.querySelector("#reset");

const boardHeight = gameboard.height;
const boardWidth = gameboard.width;
const background = "white";
const snakeColor = "lightgreen";
const snakeBorer = "black";
const snakeFood = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX = 0;
let foodY = 0;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize , y:0},
    {x:0 ,y:0}
]

window.addEventListener("keydown",changeDirection)
reset.addEventListener("click",resetGame)

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>
        {clearBoard(),
         drawFood(),
         moveSnake(),
         drawSnake(),
         checkGameover(),
         nextTick()
        },75)
    }
    else{
        displayGameover();
    }
};
function clearBoard(){
    context.fillStyle = background;
    context.fillRect(0,0,boardWidth,boardHeight)
};
function createFood(){
    function randomFood(min,max)
    {
        const randNo = Math.round((Math.random() * (max-min)+min) / unitSize ) * unitSize;
        return randNo;
    }

    foodX = randomFood(0,boardWidth-unitSize);
    foodY = randomFood (0, boardWidth-unitSize)
};
function drawFood(){
    context.fillStyle = snakeFood;
    context.fillRect(foodX,foodY,unitSize,unitSize)
};
function moveSnake(){
    const head = {x:snake[0].x + xVelocity,
                y:snake[0].y + yVelocity
    }
    snake.unshift(head)
    if(snake[0].x == foodX && snake[0].y == foodY)
    {
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorer;
    snake.forEach(snakePart =>{
        context.fillRect(snakePart.x,snakePart.y,unitSize,unitSize)
        context.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize)
    })

};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameover(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= boardWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= boardHeight):
                running = false;
                break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameover(){
    context.font = "50px MV Boli";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("GAME OVER!", boardWidth / 2, boardHeight / 2);
    running = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};
