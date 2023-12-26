import { game } from './game';

const content = document.getElementById('content');
const playerGridContainer = document.getElementById('player-grid');
const aiGridContainer = document.getElementById('ai-grid');
const gridSize = 10;

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
 * @param {*} board
 */
export function updateGrid(pGrid, pBoard) {
  let currCellState;
  let currGridCell;

  for (let i = 0; i < gridSize; i += 1) {
    for (let j = 0; j < gridSize; j += 1) {
      currCellState = pBoard.getCellState([i, j]);
      currGridCell = getGridCell(pGrid, [i, j]);
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
  }
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
      currCell.addEventListener('click', () => {
        game.ai.board.receiveAttack([j, i]);
        updateGrid('ai-grid', game.ai.board);
      });
      currRow.appendChild(currCell);
    }

    pContainer.appendChild(currRow);
  }
}
