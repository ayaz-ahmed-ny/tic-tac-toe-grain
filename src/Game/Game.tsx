import React from 'react';
import { GameProps } from './game.models';
import { InfinitySpin } from 'react-loader-spinner';
import Login from './Login';
import GamePlay from './GamePlay';

export interface GameState {}

export default class AppGame extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    this.props.loadGameData();
  }

  render() {
    const { game, loginUser, saveGameConfig, clearGameData } = this.props;
    // show loader until data is loaded from API/localstorage
    if (game.isLoading) {
      return (
        <div className="app-loader">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      );
    }
    return (
      <div className="game-panel-container">
        <h3>Tic Tac Toe</h3>
        {game.isLoggedIn ? (
          <GamePlay
            game={game}
            saveGameConfig={saveGameConfig}
            clearGameData={clearGameData}
          />
        ) : (
          <Login onLogin={loginUser} />
        )}
      </div>
    );
  }
}
