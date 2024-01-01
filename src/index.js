// #region Imports
import './css/styles.scss';
import { createGrid, updateGrid } from './js/DOMHandler';
import { game } from './js/game';

// #endregion

const playerGridContainer = document.getElementById('player-grid');
const aiGridContainer = document.getElementById('ai-grid');

createGrid(playerGridContainer);
game.player.board.placeShip(2, [0, 0]);
updateGrid('player-grid', game.player.board);
createGrid(aiGridContainer);
updateGrid('ai-grid', game.ai.board);
