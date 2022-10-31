import { GameDataModel, GameStateModel, GameConfigModel } from './game.models';

export const SET_GAME_DATA = 'SET_GAME_DATA';
export const TTT_USER = 'TTT_USER';
export const TTT_USER_DATA = 'TTT_USER_DATA';

export const loadGameData = () => {
  return (dispatch: any) => {
    const data: GameDataModel[] =
      JSON.parse(localStorage.getItem(TTT_USER_DATA) || '[]') || [];
    const username: string = localStorage.getItem(TTT_USER) || '';
    dispatch(
      setData({
        data,
        username,
        isLoggedIn: !!username,
        isLoaded: true,
        isLoading: false,
      })
    );
  };
};

export const saveGameData = (gameData: GameDataModel) => {
  return (dispatch: any, getState: any) => {
    const data = [...getState().game.data];
    data.push(gameData);
    localStorage.setItem(TTT_USER_DATA, JSON.stringify(data));
    dispatch(
      setData({
        data,
      })
    );
  };
};

export const saveGameConfig = (config: GameConfigModel) => {
  return (dispatch: any, getState: any) => {
    dispatch(
      setData({
        config: Object.assign({}, getState().game.config, config),
      })
    );
  };
};

export const clearGameData = () => {
  return (dispatch: any, getState: any) => {
    localStorage.removeItem(TTT_USER_DATA);
    localStorage.removeItem(TTT_USER);
    dispatch(
      setData({
        isLoaded: false,
        isLoggedIn: false,
        username: '',
        data: [],
      })
    );
  };
};

export const loginUser = (username: string) => {
  return (dispatch: any) => {
    dispatch(
      setData({
        username,
        isLoaded: false,
        isLoggedIn: true,
        data: [],
      })
    );
    localStorage.setItem(TTT_USER, username);
    localStorage.setItem(TTT_USER_DATA, JSON.stringify([]));
  };
};

export const setData = (payload: GameStateModel) => {
  return {
    type: SET_GAME_DATA,
    payload,
  };
};
