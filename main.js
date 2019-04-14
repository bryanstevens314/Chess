
// import pieces from './pieces';
// import initial_Board from './board';

window.onload = () => {
  const main = document.getElementById('main');
  const board = document.createElement('div');
  for (let y = 0; y <= 7; y++) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let x = 0; x <= 7; x++) {
      const space = document.createElement('div');
      y % 2 ? (
        x % 2 ? space.className = 'cell white' : space.className = 'cell black'
      ) : (
          x % 2 ? space.className = 'cell black' : space.className = 'cell white'
        );
      row.appendChild(space);
    }
    board.appendChild(row);
  }
  main.appendChild(board);
}
