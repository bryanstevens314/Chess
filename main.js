
window.onload = () => {
  const game = new Game;
  game.generateBoard();
}
class Game {
  constructor() {
    this.generateBoard = this.generateBoard.bind(this);
    this.main = document.getElementById('main');
    this.board = document.createElement('div');
    this.board.className = 'board';
    this.state = {
      currentPlayer: 0,
      board: [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'K', 'Q', 'B', 'N', 'R'],
      ],
      targetPiece: {
        location: [],
        validMoves: []
      },
      //[{*white*} {*black*}]
      castle: [{ kingSide: true, queenSide: true },
      { kingSide: true, queenSide: true }],
      kingPosition: [[4, 7], [4, 0]],
      enPassant: false,
      fiftyMoveCounter: 0,
      fullmoveCounter: 0,
      fenString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0'
    };
  }


  isCheckMate() {
    return 0;
  }

  makeMove(moveArr) {

  }

  getAvailableMoves(column, row) {
    const currCenter = { x: column, y: row };
    const board_Piece = this.state.board[row][column];
    const pieceObject = pieces[board_Piece];
    const movementArray = pieceObject.movement[this.state.currentPlayer];
    let movements = [];

    for (let i = 0; i <= 4; i++) {
      let currRow = movementArray[i];
      if (currRow.includes(1)) {
        for (let j = 0; j <= 4; j++) {
          let currElem = currRow[j];
          if (currElem === 1) {
            movements.push([j, i]);
          }
        }
      }
    }
    //fenString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0'
    return movements;
  }

  generateBoard() {

    for (let y = 0; y <= 7; y++) {
      const row = document.createElement('div');
      row.className = 'row';
      for (let x = 0; x <= 7; x++) {
        const space = document.createElement('div');
        space.addEventListener('mousedown', (event) => {
          console.log(this.state.currentPlayer);
          let row = event.target.row;
          let column = event.target.column;
          if (this.state.targetPiece.location.length === 0) {
            let movesArr = this.getAvailableMoves(column, row);
            let currentCell = this.state.board[row][column];
            let currentPiece = currentCell[0];
            if (pieces[currentPiece].player === this.state.currentPlayer) {
              const newMoves = movesArr.map(element => {
                const offset = [element[0] - 2, element[1] - 2];
                const newCoord = [column + offset[0], row + offset[1]]
                if (newCoord[0] >= 0 && newCoord[0] <= 7
                  && newCoord[1] >= 0 && newCoord[1] <= 7) {
                  this.state.board[newCoord[1]][newCoord[0]] += ',-1';
                  return newCoord;
                }
              });
              this.state.targetPiece = {
                location: [column, row],
                validMoves: newMoves
              };
              while (this.board.hasChildNodes()) {
                this.board.removeChild(this.board.firstChild);
              }
              this.generateBoard();
            }
          }
          else {
            let validMove = false;

            this.state.targetPiece.validMoves.forEach(element => {
              if (element !== undefined) {
                let origin = this.state.targetPiece.location;
                const destination = [column, row];
                if (element[0] === destination[0] && element[1] === destination[1]) {
                  const currPiece = this.state.board[origin[1]][origin[0]].split(',');
                  this.state.board[origin[1]][origin[0]] = '0';
                  this.state.board[destination[1]][destination[0]] = currPiece[0];
                  this.state.currentPlayer === 0 ? this.state.currentPlayer = 1 : this.state.currentPlayer = 0;
                } else {
                  const currElement = this.state.board[element[1]][element[0]].split(',');
                  this.state.board[element[1]][element[0]] = currElement[0];
                }
              }
            });

            this.state.targetPiece = {
              location: [],
              validMoves: []
            };
            while (this.board.hasChildNodes()) {
              this.board.removeChild(this.board.firstChild);
            }
            this.generateBoard();
          }
        });
        const img = document.createElement('img');
        img.row = y;
        img.column = x;
        let piece = this.state.board[y][x];
        y % 2 ?
          x % 2 ? space.className = 'cell white' : space.className = 'cell black'
          :
          x % 2 ? space.className = 'cell black' : space.className = 'cell white'

        if (piece.includes('-1')) {

          space.className = 'cell blue'
          const arr = piece.split(',');
          this.state.board[y][x] = arr[0];
          img.setAttribute('src', pieces[arr[1]].img);
        }
        else {
          img.setAttribute('src', pieces[piece].img);
        }
        // else {
        // img.setAttribute('src', pieces[piece].img);
        // }

        space.appendChild(img);
        row.appendChild(space);
      }
      this.board.appendChild(row);
    }
    this.main.appendChild(this.board);
    document.body.appendChild(this.main)
  }
}

const pieces = {
  '-1': {
    img: './assets/chess_pieces/blank.PNG',
    movement: {
      1: [],
      2: []
    },
    attack: {
      1: [],
      2: []
    },
  },
  '0': {
    img: './assets/chess_pieces/blank.PNG',
    movement: {
      1: [],
      2: []
    },
    attack: {
      1: [],
      2: []
    },
  },
  P: {
    name: 'Pawn',
    player: 0,
    img: './assets/chess_pieces/white/pawn.PNG',
    movement: {
      0: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      1: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ]
    },
    attack: {
      0: [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      1: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]
      ]
    },
  },
  R: {
    name: 'Rook',
    player: 0,
    img: './assets/chess_pieces/white/rook.PNG',
    movement: {
      0: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ],
      1: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ]
    },
    attack: {
      0: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ],
      1: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ]
    },
  },
  N: {
    name: 'Knight',
    player: 0,
    img: './assets/chess_pieces/white/knight.PNG',
    movement: {
      0: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ],
      1: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ]
    },
    attack: {
      0: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ],
      1: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ]
    },
  },
  B: {
    name: 'Bishop',
    player: 0,
    img: './assets/chess_pieces/white/bishop.PNG',
    movement: {
      0: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ],
      1: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ]
    },
    attack: {
      0: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ],
      1: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ]
    },
  },
  Q: {
    name: 'Queen',
    player: 0,
    img: './assets/chess_pieces/white/queen.PNG',
    movement: {
      0: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ],
      1: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ]
    },
    attack: {
      0: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ],
      1: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ]
    },
  },
  K: {
    name: 'King',
    player: 0,
    img: './assets/chess_pieces/white/king.PNG',
    movement: {
      0: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ],
      1: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ]
    },
    attack: {
      0: [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ],
      1: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ]
    },
  },
  p: {
    name: 'Pawn',
    player: 1,
    img: './assets/chess_pieces/black/pawn.PNG',
    movement: {
      0: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      1: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ]
    },
    attack: {
      0: [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      1: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]
      ]
    },
  },
  r: {
    name: 'Rook',
    player: 1,
    img: './assets/chess_pieces/black/rook.PNG',
    movement: {
      0: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ],
      1: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ]
    },
    attack: {
      0: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ],
      1: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ]
    },
  },
  n: {
    name: 'Knight',
    player: 1,
    img: './assets/chess_pieces/black/knight.PNG',
    movement: {
      0: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ],
      1: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ]
    },
    attack: {
      0: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ],
      1: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ]
    },
  },
  b: {
    name: 'Bishop',
    player: 1,
    img: './assets/chess_pieces/black/bishop.PNG',
    movement: {
      0: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ],
      1: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ]
    },
    attack: {
      0: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ],
      1: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ]
    },
  },
  q: {
    name: 'Queen',
    player: 1,
    img: './assets/chess_pieces/black/queen.PNG',
    movement: {
      0: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ],
      1: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ]
    },
    attack: {
      0: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ],
      1: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ]
    },
  },
  k: {
    name: 'King',
    player: 1,
    img: './assets/chess_pieces/black/king.PNG',
    movement: {
      0: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ],
      1: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ]
    },
    attack: {
      0: [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ],
      1: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ]
    },
  }
}
