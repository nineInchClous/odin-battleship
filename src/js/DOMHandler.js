import { game } from './game';

const content = document.getElementById('content');
const playerGridContainer = document.getElementById('player-grid');
const aiGridContainer = document.getElementById('ai-grid');
const gridSize = 10;
const dialog = document.querySelector('dialog');
const resultPara = document.getElementById('game-result');
const restartGameBtn = document.querySelector('dialog button');

/**
 *
 * @param {*} pGrid
 * @param {*} pPosition
 */
function getGridCell(pGrid, pPosition) {
  const rows = document.querySelectorAll(`#${pGrid} .row`);
  const row = rows[pPosition[1]];
  return row.childNodes[pPosition[0]];
}

/**
 *
 * @param {*} pGrid
 * @param {*} pPosition
 * @param {*} pBoard
 */
export function updateCell(pGrid, pPosition, pBoard) {
  const currCellState = pBoard.getCellState([pPosition[0], pPosition[1]]);
  const currGridCell = getGridCell(pGrid, [pPosition[0], pPosition[1]]);

  if (currCellState.alreadyAttacked) {
    currGridCell.classList.add('attacked');
  } else {
    currGridCell.classList.remove('attacked');
  }

  if (currCellState.ship) {
    currGridCell.classList.add('ship');
  } else {
    currGridCell.classList.remove('ship');
  }
}

/**
 *
 * @param {*} board
 */
export function updateGrid(pGrid, pBoard) {
  for (let i = 0; i < gridSize; i += 1) {
    for (let j = 0; j < gridSize; j += 1) {
      updateCell(pGrid, [i, j], pBoard);
    }
  }
}

/**
 *
 */
function handleClickAiGrid(pPosition) {
  game.playAttack(pPosition);
  updateCell('ai-grid', pPosition, game.ai.board);
  updateGrid('player-grid', game.player.board);

  if (game.isGameOver()) {
    resultPara.textContent = `${game.getWinner().toUpperCase()} wins the game!`;
    dialog.showModal();
  }
}

/**
 *
 */
function handleClickPlayerGrid() {
  console.log(game.isGameOver());
}

/**
 *
 */
export function createGrid(pContainer) {
  let currCell;
  let currRow;

  for (let i = 0; i < gridSize; i += 1) {
    currRow = document.createElement('div');
    currRow.className = 'row';

    for (let j = 0; j < gridSize; j += 1) {
      currCell = document.createElement('div');
      currCell.className = 'cell';
      currCell.setAttribute('data-pos', [i, j]);

      if (pContainer.id === 'ai-grid') {
        currCell.addEventListener('click', () => handleClickAiGrid([j, i]));
      } else {
        currCell.addEventListener('click', handleClickPlayerGrid);
      }

      currRow.appendChild(currCell);
    }

    pContainer.appendChild(currRow);
  }
}

restartGameBtn.addEventListener('click', () => {
  dialog.close();
  game.resetGame();
  updateGrid('player-grid', game.player.board);
  updateGrid('ai-grid', game.ai.board);
});
