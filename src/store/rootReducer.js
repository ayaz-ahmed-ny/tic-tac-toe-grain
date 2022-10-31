import { combineReducers } from 'redux';

import game from '../Game/game.reducer';

const rootReducer = combineReducers({
  game,
});
export default rootReducer;
