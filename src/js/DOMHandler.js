import { game } from './game';

const gridSize = 10;
const dialog = document.querySelector('dialog');
const resultPara = document.getElementById('game-result');
const restartGameBtn = document.querySelector('dialog button');
const horizontalChckBx = document.getElementById('horizontal');

/**
 * Get a grid cell
 * @param {string} pGrid Id name of the grid ('player-grid' or 'ai-grid')
 * @param {Array} pPosition The position of the cell (format: [x, y])
 * @returns {HTMLElement} A grid cell (div element)
 */
function getGridCell(pGrid, pPosition) {
  const rows = document.querySelectorAll(`#${pGrid} .row`);
  const row = rows[pPosition[1]];
  return row.childNodes[pPosition[0]];
}

/**
 * Update the classes of a cell for styling purpose
 * @param {string} pGrid Id name of the grid ('player-grid' or 'ai-grid')
 * @param {Array} pPosition The position of the cell (format: [x, y])
 * @param {object} pBoard The board to update (player or ai)
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
 * Update the classes of all cells of a grid for styling purpose
 * @param {object} board The board to update (player or ai)
 */
export function updateGrid(pGrid, pBoard) {
  for (let i = 0; i < gridSize; i += 1) {
    for (let j = 0; j < gridSize; j += 1) {
      updateCell(pGrid, [i, j], pBoard);
    }
  }
}

/**
 * Attack as a player and update the ui
 * @param {Array} pPosition The position of the cell (format: [x, y])
 */
function attackAsPlayer(pPosition) {
  if (game.isAllShipsPlaced()) {
    game.playAttack(pPosition);
    updateCell('ai-grid', pPosition, game.ai.board);
    updateGrid('player-grid', game.player.board);

    if (game.isGameOver()) {
      resultPara.textContent = `${game
        .getWinner()
        .toUpperCase()} wins the game!`;
      dialog.showModal();
    }
  }
}

/**
 * Place a ship on the player board
 * @param {Array} pPosition The position of the cell (format: [x, y])
 */
function placeShip(pPosition) {
  const shipLength = game.player.board.previewNextShipPlacement();
  if (shipLength !== null) {
    game.player.board.placeShip(
      shipLength,
      pPosition,
      horizontalChckBx.checked
    );
  }
}

/**
 * Preview the placement of a ship on the player board
 * @param {*} pPosition The position of the cell (format: [x, y])
 */
function previewShipPlacement(pPosition) {
  const shipLength = game.player.board.previewNextShipPlacement();
  if (
    shipLength !== null &&
    game.player.board.isShipPlacable(
      shipLength,
      pPosition,
      horizontalChckBx.checked
    )
  ) {
    updateGrid('player-grid', game.player.board);
    if (horizontalChckBx.checked) {
      for (let i = 0; i < shipLength; i += 1) {
        const currGridCell = getGridCell('player-grid', [
          pPosition[0] + i,
          pPosition[1],
        ]);
        currGridCell.classList.add('ship');
      }
    } else {
      for (let i = 0; i < shipLength; i += 1) {
        const currGridCell = getGridCell('player-grid', [
          pPosition[0],
          pPosition[1] + i,
        ]);
        currGridCell.classList.add('ship');
      }
    }
  }
}

/**
 * Create an empty grid
 * @param {HTMLElement} pContainer The container of the grid
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
        currCell.addEventListener('click', () => attackAsPlayer([j, i]));
      } else {
        currCell.addEventListener('click', () => placeShip([j, i]));
        currCell.addEventListener('mouseover', () =>
          previewShipPlacement([j, i])
        );
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
