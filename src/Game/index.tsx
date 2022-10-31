import { connect } from 'react-redux';
import AppGame from './Game';
import { AppState } from '../models';
import { GameConfigModel, GameDataModel } from './game.models';
import {
  saveGameData,
  clearGameData,
  saveGameConfig,
  loginUser,
  loadGameData,
} from './game.actions';

const mapStateToProps = (state: AppState) => {
  return {
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  loadGameData: () => dispatch(loadGameData()),
  saveGameData: (data: GameDataModel) => dispatch(saveGameData(data)),
  saveGameConfig: (config: GameConfigModel) => dispatch(saveGameConfig(config)),
  clearGameData: () => dispatch(clearGameData()),
  loginUser: (username: string) => dispatch(loginUser(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppGame);
