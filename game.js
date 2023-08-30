let lastRenderTime = 0;
const SNAKE_SPEED = 1;
let snakeBody = [{ x: 3, y: 3 }];
let snakeDirection = 1;
const snake = document.querySelectorAll(".snake");
// const snake = document.querySelector("#snake-cells");
const gameBoard = document.getElementById("game-board");
const food = document.querySelector(".food");
let foodPosition = { x: 6, y: 6 };

function main(currentTime) {
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 200;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    console.log('Render');
    lastRenderTime = currentTime;

    update();
    draw();
}


window.requestAnimationFrame(main);



function update() {

   
    
    for(let i=snakeBody.length-1; i > 0 ; i--){
        snakeBody[i]["x"] = snakeBody[i-1]["x"]; 
        snakeBody[i]["y"] = snakeBody[i-1]["y"]; 
    }
    switch (snakeDirection) {
        case 1:
            snakeBody[0]["x"] += SNAKE_SPEED;
            break;
        case -1:
            snakeBody[0]["x"] -= SNAKE_SPEED;
            break;
        case 2:
            snakeBody[0]["y"] += SNAKE_SPEED;
            break;
        case -2:
            snakeBody[0]["y"] -= SNAKE_SPEED;
            break;
    }
    console.log(snakeBody); 
    if (snakeBody[0]["x"] == foodPosition["x"] && snakeBody[0]["y"] == foodPosition["y"]) {
        expandBody();
        regenerateFood();
    }
   
}

function draw() {
    gameBoard.innerHTML="";
    gameBoard.appendChild(food); 

    for (let i = 0; i < snakeBody.length; i++) {
        let snakeCell = document.createElement("div"); 
        snakeCell.classList.add("snake"); 
        snakeCell.style.gridColumnStart = `${snakeBody[i]["x"]}`;
        snakeCell.style.gridColumnEnd = `${snakeBody[i]["x"]}`;
        snakeCell.style.gridRowStart = `${snakeBody[i]["y"]}`;
        snakeCell.style.gridRowEnd = `${snakeBody[i]["y"]}`;
        gameBoard.appendChild(snakeCell); 
    }

}


function regenerateFood() {
    foodPosition["x"] = Math.floor(Math.random() * 20) + 1;
    foodPosition["y"] = Math.floor(Math.random() * 20) + 1;

    food.style.gridColumnStart = `${foodPosition["x"]}`;
    food.style.gridColumnEnd = `${foodPosition["x"]}`;
    food.style.gridRowStart = `${foodPosition["y"]}`;
    food.style.gridRowEnd = `${foodPosition["y"]}`;

}



function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowUp":
            if (snakeDirection !== 2)
                snakeDirection = -2;
            break;
        case "ArrowDown":
            if (snakeDirection !== -2)
                snakeDirection = 2;
            break;
        case "ArrowLeft":
            if (snakeDirection !== 1)
                snakeDirection = -1;
            break;
        case "ArrowRight":
            if (snakeDirection !== -1)
                snakeDirection = 1;
            break;
        default:
            break;
    }
}
function drawCell(x,y){
     
}

function expandBody() {
    switch (snakeDirection) {
        case 1:
            snakeBody.push({ x: snakeBody[snakeBody.length - 1]["x"] - 1, y: snakeBody[snakeBody.length - 1]["y"] });
            break;
        case -1:
            snakeBody.push({ x: snakeBody[snakeBody.length - 1]["x"] + 1, y: snakeBody[snakeBody.length - 1]["y"] });
            break;
        case 2:
            snakeBody.push({ x: snakeBody[snakeBody.length - 1]["x"], y: snakeBody[snakeBody.length - 1]["y"] - 1 });
            break;
        case -2:
            snakeBody.push({ x: snakeBody[snakeBody.length - 1]["x"], y: snakeBody[snakeBody.length - 1]["y"] + 1 });
            break;
    }
    console.log(snakeBody)
}



// Add event listeners to the document
document.addEventListener("keydown", handleKeyPress);
