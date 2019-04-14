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
      currentPlayer: 1,
      board: [
        [[2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [4, 2], [3, 2], [2, 2]],
        [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2]],
        [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
        [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
        [[2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [4, 1], [3, 1], [2, 1]],
      ]
    };
  }
  generateBoard() {
    for (let y = 0; y <= 7; y++) {
      const row = document.createElement('div');
      row.className = 'row';
      for (let x = 0; x <= 7; x++) {
        const space = document.createElement('div');
        space.addEventListener('mousedown', (event) => {
          const row = event.target.row;
          const column = event.target.column;
          const currentCell = state.board[row][column];
          const currentPiece = currentCell[0];
          const playerForCell = currentCell[1];
          if (playerForCell === state.currentPlayer) {
            const currentAttack = pieces[currentPiece].movement[playerForCell];
            for (let i = 0; i <= 7; i++) {
              for (let j = 0; j < 7; j++) {
                const currentOffset = getOffset({ column, row });
                const currentBoardPieceForSpace = this.state.board;
              }
            }
            console.log(currentAttack);
          }
        })
        const img = document.createElement('img');
        img.row = y;
        img.column = x;
        const piece = this.state.board[y][x];
        piece[1] === 2 ?
          img.setAttribute('src', pieces[piece[0]].img_black)
          :
          img.setAttribute('src', pieces[piece[0]].img_white);
        y % 2 ?
          x % 2 ? space.className = 'cell white' : space.className = 'cell black'
          :
          x % 2 ? space.className = 'cell black' : space.className = 'cell white';
        space.appendChild(img);
        row.appendChild(space);
      }
      this.board.appendChild(row);
    }
    this.main.appendChild(this.board);
  }
}

const pieces = {
  0: {
    img_white: './assets/chess_pieces/blank.PNG',
    img_black: './assets/chess_pieces/blank.PNG',
    movement: {
      1: [],
      2: []
    },
    attack: {
      1: [],
      2: []
    },
  },
  1: {
    name: 'Pawn',
    img_white: './assets/chess_pieces/white/pawn.PNG',
    img_black: './assets/chess_pieces/black/pawn.PNG',
    movement: {
      '1': [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      2: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ]
    },
    attack: {
      1: [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      2: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]
      ]
    },
  },
  2: {
    name: 'Rook',
    img_white: './assets/chess_pieces/white/rook.PNG',
    img_black: './assets/chess_pieces/black/rook.PNG',
    movement: {
      1: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ],
      2: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ]
    },
    attack: {
      1: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ],
      2: [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ]
    },
  },
  3: {
    name: 'Knight',
    img_white: './assets/chess_pieces/white/knight.PNG',
    img_black: './assets/chess_pieces/black/knight.PNG',
    movement: {
      1: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ],
      2: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ]
    },
    attack: {
      1: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ],
      2: [
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0]
      ]
    },
  },
  4: {
    name: 'Bishop',
    img_white: './assets/chess_pieces/white/bishop.PNG',
    img_black: './assets/chess_pieces/black/bishop.PNG',
    movement: {
      1: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ],
      2: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ]
    },
    attack: {
      1: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ],
      2: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1]
      ]
    },
  },
  5: {
    name: 'Queen',
    img_white: './assets/chess_pieces/white/queen.PNG',
    img_black: './assets/chess_pieces/black/queen.PNG',
    movement: {
      1: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ],
      2: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ]
    },
    attack: {
      1: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ],
      2: [
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ]
    },
  },
  6: {
    name: 'King',
    img_white: './assets/chess_pieces/white/king.PNG',
    img_black: './assets/chess_pieces/black/king.PNG',
    movement: {
      1: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ],
      2: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ]
    },
    attack: {
      1: [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ],
      2: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ]
    },
  }
}
