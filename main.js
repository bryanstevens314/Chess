

window.onload = () => {
  const main = document.getElementById('main');
  const board = document.createElement('div');
  board.className = 'board';
  for (let y = 0; y <= 7; y++) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let x = 0; x <= 7; x++) {
      const space = document.createElement('div');
      const img = document.createElement('img');
      const currentPiece = initial_Board[y][x];
      y <= 2 ?
        img.setAttribute('src', pieces[currentPiece].img_black)
        :
        img.setAttribute('src', pieces[currentPiece].img_white);
      y % 2 ?
        x % 2 ? space.className = 'cell white' : space.className = 'cell black'
        :
        x % 2 ? space.className = 'cell black' : space.className = 'cell white';
      space.appendChild(img);
      row.appendChild(space);
    }
    board.appendChild(row);
  }
  main.appendChild(board);
}
const initial_Board = [
  [2, 3, 4, 5, 6, 4, 3, 2],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [2, 3, 4, 5, 6, 4, 3, 2],
];

const pieces = {
  0: {
    img_white: './assets/chess_pieces/blank.PNG',
    img_black: './assets/chess_pieces/blank.PNG',
  },
  1: {
    name: 'Pawn',
    img_white: './assets/chess_pieces/white/pawn.PNG',
    img_black: './assets/chess_pieces/black/pawn.PNG',
    movement: [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
    attack: [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
  },
  2: {
    name: 'Rook',
    img_white: './assets/chess_pieces/white/rook.PNG',
    img_black: './assets/chess_pieces/black/rook.PNG',
    movement: [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0]
    ],
    attack: [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0]
    ],
  },
  3: {
    name: 'Knight',
    img_white: './assets/chess_pieces/white/knight.PNG',
    img_black: './assets/chess_pieces/black/knight.PNG',
    movement: [
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0]
    ],
    attack: [
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0]
    ],
  },
  4: {
    name: 'Bishop',
    img_white: './assets/chess_pieces/white/bishop.PNG',
    img_black: './assets/chess_pieces/black/bishop.PNG',
    movement: [
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1]
    ],
    attack: [
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1]
    ],
  },
  5: {
    name: 'Queen',
    img_white: './assets/chess_pieces/white/queen.PNG',
    img_black: './assets/chess_pieces/black/queen.PNG',
    movement: [
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1]
    ],
    attack: [
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1]
    ],
  },
  6: {
    name: 'King',
    img_white: './assets/chess_pieces/white/king.PNG',
    img_black: './assets/chess_pieces/black/king.PNG',
    movement: [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0]
    ],
    attack: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0]
    ],
  }
}
