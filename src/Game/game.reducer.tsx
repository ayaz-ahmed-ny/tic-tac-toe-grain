import { GameStateModel, GameActionModel } from './game.models';
import { SET_GAME_DATA } from './game.actions';

/**
 * Initial state of reducer
 */
const initialState: GameStateModel = {
  data: [],
  username: '',
  isLoaded: false,
  isLoggedIn: false,
  isPlaying: false,
  isLoading: true,
  isGameStarted: false,
  config: {
    symbol: 1, // default symbol
    gridSize: 3, // default and minimum grid size
  },
};

const gameReducer = (state = initialState, action: GameActionModel) => {
  switch (action.type) {
    case SET_GAME_DATA:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default gameReducer;
