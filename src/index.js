// #region Imports
import './css/styles.scss';
import { createGrid, updateGrid } from './js/DOMHandler';
import { game } from './js/game';

// #endregion

const playerGridContainer = document.getElementById('player-grid');
const aiGridContainer = document.getElementById('ai-grid');

createGrid(playerGridContainer);
createGrid(aiGridContainer);
updateGrid('ai-grid', game.ai.board);
