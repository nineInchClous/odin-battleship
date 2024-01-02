import { game } from './game';

const gridSize = 10;
const dialog = document.querySelector('dialog');
const resultPara = document.getElementById('game-result');
const restartGameBtn = document.querySelector('dialog button');
const horizontalChckBx = document.getElementById('horizontal');
const horizontalLabel = document.querySelector('#instructions label');
const instructionsPara = document.querySelector('#instructions h2');

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
    let startPos = pPosition;
    if (
      !game.player.board.isPositionAndLengthValid(
        shipLength,
        pPosition,
        horizontalChckBx.checked
      )
    ) {
      if (horizontalChckBx.checked) {
        startPos = [game.player.board.size - shipLength, pPosition[1]];
      } else {
        startPos = [pPosition[0], game.player.board.size - shipLength];
      }
    }

    if (
      !game.player.board.isPositionOccupied(
        shipLength,
        startPos,
        horizontalChckBx.checked
      )
    ) {
      game.player.board.placeShip(
        shipLength,
        startPos,
        horizontalChckBx.checked
      );
    }

    if (game.isAllShipsPlaced()) {
      instructionsPara.textContent = 'Good luck captain';
      horizontalChckBx.classList.add('hide');
      horizontalLabel.classList.add('hide');
    }
  }
}

/**
 * Preview the placement of a ship on the player board
 * @param {*} pPosition The position of the cell (format: [x, y])
 */
function previewShipPlacement(pPosition) {
  const shipLength = game.player.board.previewNextShipPlacement();
  if (shipLength !== null) {
    updateGrid('player-grid', game.player.board);
    if (horizontalChckBx.checked) {
      let xStart;
      if (!game.player.board.isPositionAndLengthValid(shipLength, pPosition)) {
        xStart = game.player.board.size - shipLength;
      } else {
        [xStart] = pPosition;
      }
      for (let i = 0; i < shipLength; i += 1) {
        const currGridCell = getGridCell('player-grid', [
          xStart + i,
          pPosition[1],
        ]);
        currGridCell.classList.add('ship');
      }
    } else {
      let yStart;
      if (
        !game.player.board.isPositionAndLengthValid(
          shipLength,
          pPosition,
          false
        )
      ) {
        yStart = game.player.board.size - shipLength;
      } else {
        [, yStart] = pPosition;
      }
      for (let i = 0; i < shipLength; i += 1) {
        const currGridCell = getGridCell('player-grid', [
          pPosition[0],
          yStart + i,
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

  for (let i = gridSize - 1; i >= 0; i -= 1) {
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

    pContainer.prepend(currRow);
  }
}

restartGameBtn.addEventListener('click', () => {
  dialog.close();
  game.resetGame();
  updateGrid('player-grid', game.player.board);
  updateGrid('ai-grid', game.ai.board);
  horizontalChckBx.classList.remove('hide');
  horizontalLabel.classList.remove('hide');
  instructionsPara.textContent = 'Place your ships';
});
