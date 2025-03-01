import { TetrominoShapes } from "./gameLogicInterface.js";

export const BOARD_UNITS_WIDTH = 10;
export const BOARD_UNITS_HEIGHT = 20;

const BOARD_UNIT_PIXEL_SIZE = 40;
const BOARD_WIDTH = BOARD_UNITS_WIDTH * BOARD_UNIT_PIXEL_SIZE;
const BOARD_HEIGHT = BOARD_UNITS_HEIGHT * BOARD_UNIT_PIXEL_SIZE;

export function drawGrid(){
    var gameCanvas=document.getElementById("game-grid");
    gameCanvas.setAttribute("width", BOARD_WIDTH)
    gameCanvas.setAttribute("height", BOARD_HEIGHT)

    var gameContext = gameCanvas.getContext("2d");
    addHorizontalGameLines(gameContext);
    addVerticalGameLines(gameContext);
    gameContext.stroke();
}

export function refreshGameDisplay(game) {
    clearGrid('game-grid');
    clearGrid('upcoming-pieces-canvas');

    drawGrid();
    drawTiles(game);
    drawUpcomingTetrominoes(game);
}

function addVerticalGameLines(gameContext) {
    for (var xPosition=0; xPosition<=BOARD_WIDTH; xPosition = xPosition + BOARD_UNIT_PIXEL_SIZE) {
        gameContext.moveTo(xPosition,0);
        gameContext.lineTo(xPosition, BOARD_HEIGHT);
    }
}

function addHorizontalGameLines(gameContext) {
    for (var yPosition = 0; yPosition <= BOARD_HEIGHT; yPosition = yPosition + BOARD_UNIT_PIXEL_SIZE) {
        gameContext.moveTo(0, yPosition);
        gameContext.lineTo(BOARD_WIDTH, yPosition);
    }
}

function clearGrid(canvasId) {
    var gameGridCanvas = document.getElementById(canvasId);
    var gameGridContext = gameGridCanvas.getContext("2d");
    gameGridContext.clearRect(0, 0, gameGridCanvas.width, gameGridCanvas.height);
}

export function drawTiles(game) {
    var gameCanvas=document.getElementById("game-grid");
    var ctx = gameCanvas.getContext("2d")
    for (let rows = 0 ; rows < BOARD_UNITS_WIDTH ; rows++) {
        for (let cols = 0 ; cols < BOARD_UNITS_HEIGHT ; cols++) {
            let tileColour = game.getTileAtPosition(rows,cols)
            if (tileColour != null) {
                ctx.strokeStyle = tileColour;
                ctx.fillStyle = tileColour;
                ctx.fillRect(BOARD_UNIT_PIXEL_SIZE*rows , BOARD_UNIT_PIXEL_SIZE*cols , BOARD_UNIT_PIXEL_SIZE, BOARD_UNIT_PIXEL_SIZE);
            }
        }
    } 
}

export function drawUpcomingTetrominoes(game){
    const upcomingTetrominoes = game.getUpcomingTetrominoes();
    const canvas = document.getElementById("upcoming-pieces-canvas");
    const ctx = canvas.getContext("2d");
    ctx.canvas.height = 300;
    ctx.canvas.width = 200;

    upcomingTetrominoes.forEach((upcomingTetromino, index) => {
        const xPos = 1;
        const yPos = index * 5; 
        
        drawPiece(TetrominoShapes[upcomingTetromino], xPos, yPos, ctx);
    });
}

export function drawPiece(piece, xPos, yPos,ctx) {
    const gridSize = 20;
    ctx.fillStyle = 'cyan';
    for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
            if (piece[row][col]) {
                ctx.strokeRect(col * gridSize + xPos * gridSize, row * gridSize + yPos * gridSize, gridSize, gridSize); 
                ctx.fillRect(col * gridSize + xPos * gridSize, row * gridSize + yPos * gridSize, gridSize, gridSize);
            }
        }
    }
}