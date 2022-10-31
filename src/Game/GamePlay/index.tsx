import React from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import GameForm from '../GameForm';
import { GamePlayProps, GameResult } from '../game.models';
import GameValidator from '../game.validator';

interface GamePlayState {
  isGameStarted: boolean;
  isGameEnded: boolean;
  gameStats: string[][];
  cssGrid: string;
  turn: number;
  gameResult?: GameResult;
}

class GamePlay extends React.Component<GamePlayProps, GamePlayState> {
  gameValidtor: GameValidator = new GameValidator();
  constructor(props: GamePlayProps) {
    super(props);
    this.state = {
      isGameStarted: false,
      isGameEnded: false,
      gameStats: [],
      cssGrid: 'auto',
      turn: 1,
    };
  }

  getGameStats = () => {
    const size = this.props.game?.config?.gridSize || 3;
    let gameStats: string[][] = [];
    let cssGrid: string = '';
    for (let i = 0; i < size; i++) {
      let row: string[] = [];
      for (let j = 0; j < size; j++) {
        row.push('');
      }
      cssGrid += 'auto ';
      gameStats.push(row);
    }
    return { gameStats, cssGrid };
  };

  onClickStartGame = () => {
    const stats = this.getGameStats();
    this.setState({
      isGameStarted: true,
      gameStats: stats.gameStats,
      cssGrid: stats.cssGrid,
      turn: this.props.game?.config?.symbol || 1,
      gameResult: undefined,
      isGameEnded: false,
    });
  };

  validateGame = () => {
    let { gameStats } = this.state;
    const gameResult = this.gameValidtor.validateWinner(gameStats);
    if (gameResult) {
      this.setState({ gameResult, isGameEnded: true });
    }
  };

  onClickBox = (rowIndex: number, cellIndex: number) => {
    let { turn, gameStats } = this.state;
    gameStats = [...gameStats];
    if (!gameStats[rowIndex][cellIndex]) {
      let symbol = this.props.game?.config?.symbol;
      symbol = symbol === 0 ? 0 : 1;
      if (turn === 1) {
        turn = 0;
        gameStats[rowIndex][cellIndex] = symbol?.toString();
      } else {
        turn = 1;
        gameStats[rowIndex][cellIndex] = symbol === 1 ? '0' : '1';
      }
      this.setState({ gameStats, turn }, () => {
        this.validateGame();
      });
    }
  };

  renderGame = () => {
    const { gameStats, gameResult, isGameEnded } = this.state;
    // let isGameFinished = !!gameResult;
    return gameStats.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        return (
          <Button
            onClick={(e) => this.onClickBox(rowIndex, cellIndex)}
            className={cell ? `symbol_${cell}` : ''}
            color="primary"
            key={`key_${rowIndex}_${cellIndex}`}
            disabled={!!cell || isGameEnded}
          >
            {cell ? (cell === '1' ? 'X' : 'O') : ''}
          </Button>
        );
      });
    });
  };

  render(): React.ReactNode {
    const { isGameStarted, isGameEnded, cssGrid, gameResult } = this.state;
    return (
      <div className="game-play">
        <GameForm
          {...this.props}
          isGameStarted={isGameStarted}
          isGameEnded={isGameEnded}
          onClickStartGame={this.onClickStartGame}
        />
        <div
          className="game-container"
          style={{ gridTemplateColumns: cssGrid }}
        >
          {this.renderGame()}
        </div>
        {isGameEnded && (
          <Alert
            severity="warning"
            style={{ margin: '20px', backgroundColor: '#DDD' }}
          >
            The End — Player {`${gameResult?.symbol == 1 ? 'X' : 'O'}`} Won the
            game!
          </Alert>
        )}
      </div>
    );
  }
}

export default GamePlay;
