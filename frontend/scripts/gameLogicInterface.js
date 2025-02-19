import { BOARD_UNITS_HEIGHT, BOARD_UNITS_WIDTH } from "./gameUI.js"

const SCORE_PER_ROW_CLEAR = 100

export const Tetromino = {
	I_Piece: "I_Piece",
	J_Piece: "J_Piece",
	L_Piece: "L_Piece",
	O_Piece: "O_Piece",
	S_Piece: "S_Piece",
	Z_Piece: "Z_Piece",
	T_Piece: "T_Piece",
};

export const TetrominoShapes = {
	I_Piece: [
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]
	],
	J_Piece: [
        [0,0,1,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,0,0,0]
	],
	L_Piece: [
       [0,1,0,0],
       [0,1,0,0],
       [0,1,1,0],
       [0,0,0,0]
	],
	O_Piece: [
		[0,0,0,0],
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0]
	],
	S_Piece: [
        [0,0,0,0],
        [0,0,1,1],
        [0,1,1,0],
        [0,0,0,0]
	],
	Z_Piece: [
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
	],
	T_Piece: [
        [0,0,0,0],
        [0,1,1,1],
        [0,0,1,0],
        [0,0,0,0]
	]
};

function getRandomTetromino() {
	const options = Object.values(Tetromino);
	return options[Math.floor(Math.random() * options.length)];
}

function getRandomColour() {
	const options = [
		"cyan",
		"blue",
		"orange",
		"yellow",
		"green",
		"purple",
		"red"
	];
	return options[Math.floor(Math.random() * options.length)];
}

export const emptyGameState = {
	// A 10x20 array full of null values
	playfield: new Array(BOARD_UNITS_HEIGHT).fill(new Array(BOARD_UNITS_WIDTH).fill(null)),
	score: 0,
	upcomingTetrominoes: Array.from({length: 3}, getRandomTetromino),
	heldTetromino: null,
	activeTetromino: {
		...(function() {
			const tetromino = getRandomTetromino();
			return {
				name: tetromino,
				tiles: TetrominoShapes[tetromino]
			};
		}()),
		position: {
			x: (BOARD_UNITS_WIDTH - 4) / 2,
			y: BOARD_UNITS_HEIGHT - 1, // Top row is reserved for game over
		},
		colour: getRandomColour()
	}
};

export default function createGame(initialGameState = emptyGameState) {
	const tetrisGame = {
		gameState: initialGameState,

		
		gameState: initialGameState,
		/**
		 * Checks if a new active tetromino state is possible
		 *
		 * The paramenter newState is the same format as `activeTetromino` in the gameState object
		 * @param {object} newState
		 * @returns {boolean}
		 */
		isStateValid: function(newState) {
			for (let row = 0; row < 4; row++) {
				for (let col = 0; col < 4; col++) {
					if (newState.tiles[row][col] == 0) {
						continue;
					}
					let playfield_col = newState.position.x + col;
					let playfield_row = newState.position.y - row;

					// check boundaries 
					if (playfield_col < 0 || playfield_col >= BOARD_UNITS_WIDTH) {
						return false;
					}
					if (playfield_row < 0 || playfield_row >= BOARD_UNITS_HEIGHT) {
						return false;
					}

					// check existing blocks
					if (this.gameState.playfield[playfield_row][playfield_col] != null) {
						return false;
					}

				}
			}
			return true;					
		},

		/**
		 * Progress the game forward one timestep
		 */
		gameTick: function() {
			this.scoreRows();
		},

		/**
		 * Return if the game is over
		 * @return {boolean}
		 */
		isGameOver: function() {
			return false
		},

		/**
		 * Return the tile at the given position
		 * If there is a tile, return it's colour
		 * @return {null | string}
		 *
		 * Possible colours: "cyan, blue, orange, yellow, green, purple, red"
		 */
		 getTileAtPosition: function(x, y) {
			for (let rows = 0 ; rows < emptyGameState.activeTetromino[x] ; rows++) {
				for (let cols = 0 ; cols < emptyGameState.activeTetromino[y] ; cols++){
					if (emptyGameState.activeTetromino[x][y] == 0) {
						console.log("This is null")
					}
					else {
						console.log("This is something")
					}

			}
		}		
			if (this.gameState.playfield[x][y] == null ) {
				const tileColor = this.gameState.playfield[x][y]
				return tileColor
			}
			if (1==1){
				emptyGameState.activeTetromino[x][y]
			}

			else  {				
				return null
			}
		},

		/**
		 * Return the score of the game
		 * @return {int}
		 */
		getScore: function() {
			return this.gameState.score

		},

		/**
		 * Return any stats that have been kept track of (tetrominos dropped, tetrises made, etc.)
		 * @return {object}
		 *
		 * Which stats to keep track of can be determined later
		 */
		getStats: function() {

		},

		/**
		 * Get any upcoming tetrominoes
		 * @return {Array<Tetromino>}
		 */
		getUpcomingTetrominoes: function() {

		},

		/**
		 * Return the tetromino currently being held, if any
		 * @return {null | Tetromino}
		 */
		getHeldTetromino: function() {

		},

		/**
		 * Return the entire game state in a single object
		 * This combines every one of the above functions (for debug purposes)
		 * @return {object}
		 */
		getGameState: function() {
			return this.gameState;
		},

		/**
		 * Move the current tetromino left 1 tile
		 */

		moveLeft: function() {
			if (this.isStateValid({
				...this.gameState.activeTetromino,
				position: {
					x: this.gameState.activeTetromino.position.x - 1,
					y: this.gameState.activeTetromino.position.y		
				}
			})) 			
			{
				this.gameState.activeTetromino.position.x -= 1;
			}
		},
          

        moveDown: function() {
			let { x, y } = this.gameState.activeTetromino.position;
			let newPosition = { x, y: y - 1 };
			let newState = {	...this.gameState.activeTetromino, position: newPosition
			};
			if (this.isStateValid(newState)) {
				this.gameState.activeTetromino.position = newState; 
			}
		},          

		moveDown: function() {
			let { x, y } = this.gameState.activeTetromino.position;
			let newPosition = { x, y: y - 1 };
			let newState = {
				...this.gameState.activeTetromino,
				position: {
					x: newPosition.x,
					y: newPosition.y
				}
			}

			if (this.isStateValid(newState)) {
				this.gameState.activeTetromino = newState;
			}
		},


		/**
		 * Move the current tetromino right 1 tile
		 */
		moveRight: function() {
			if (this.isStateValid({
				...this.gameState.activeTetromino,
				position: {
					x: this.gameState.activeTetromino.position.x + 1,
					y: this.gameState.activeTetromino.position.y
				}
			})) {
				this.gameState.activeTetromino.position.x += 1;
			}
		},

		/**
		 * Rotate the current tetromino clockwise 90 degrees
		 */
		rotateTetrominoClockwise: function() {

		},

		/**
		 * Rotate the current tetromino anti-clockwise 90 degrees
		 */
		rotateTetrominoAntiClockwise: function() {

		},

		/**
		 * Instantly drop the current tetromino as far as it goes and lock it in place
		 */
		instantDropTetromino: function() {

		},

		/**
		 * Hold the current tetromino, swapping it for any currently held one
		 */
		holdCurrentTetromino: function() {

		},

		updateActiveTetromino: function() {
			this.gameState.activeTetromino.name = this.gameState.upcomingTetrominoes.shift()
			this.gameState.activeTetromino.tiles = TetrominoShapes[this.gameState.activeTetromino.name]
			this.gameState.activeTetromino.position.x = (BOARD_UNITS_WIDTH - 4) / 2
			this.gameState.activeTetromino.position.y = BOARD_UNITS_HEIGHT - 1
			this.gameState.activeTetromino.colour = getRandomColour()

				// add tetromino to list of upcoming ones
			this.gameState.upcomingTetrominoes.push(getRandomTetromino())
		},


		/**
		 * Check for any full rows in the game board and clear them, also updates score
		 */
		scoreRows: function() {
			// iterate in reverse as removing elements during loop
			for (let row_ind = BOARD_UNITS_HEIGHT - 1; row_ind >= 0; row_ind--) {
				let row = this.gameState.playfield[row_ind];

				let all_filled = !(row.includes(null));

				if (all_filled) {
					this.gameState.playfield.splice(row_ind, 1);  // remove row
					this.gameState.score += SCORE_PER_ROW_CLEAR;
					this.gameState.playfield.push(new Array(BOARD_UNITS_WIDTH).fill(null));  // add empty row
				}
			}
		},

	};

	return tetrisGame;
};
