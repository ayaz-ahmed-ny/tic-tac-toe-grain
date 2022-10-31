import React from 'react';
import { GameFormProps } from '../game.models';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

interface GameFormState {
  gridSize: number;
  symbol: string;
}

class GameForm extends React.Component<GameFormProps, GameFormState> {
  getGridSizes(): React.ReactNode[] {
    let rows: React.ReactNode[] = [];
    for (let i = 3; i <= 9; i++) {
      rows.push(
        <MenuItem key={i} value={i}>
          {i} x {i}
        </MenuItem>
      );
    }
    return rows;
  }

  render(): React.ReactNode {
    const { game, saveGameConfig, clearGameData, isGameStarted } = this.props;
    return (
      <div className="game-play-form">
        <div className="game-play-form_field">
          <FormControl>
            <InputLabel>Select Grid Size</InputLabel>
            <MuiSelect
              label="Select Grid Size"
              value={game?.config?.gridSize}
              onChange={(e, newValue) => {
                saveGameConfig({
                  gridSize: parseInt(e.target.value.toString()),
                });
              }}
            >
              {this.getGridSizes()}
            </MuiSelect>
          </FormControl>
        </div>
        <div className="game-play-form_field">
          <FormControl>
            <InputLabel>Select Symbol</InputLabel>
            <MuiSelect
              label="Select Grid Size"
              value={game?.config?.symbol}
              onChange={(e, newValue) => {
                saveGameConfig({
                  symbol: parseInt(e.target.value.toString()),
                });
              }}
            >
              <MenuItem value={1}>x</MenuItem>
              <MenuItem value={0}>o</MenuItem>
            </MuiSelect>
          </FormControl>
        </div>
        <div className="game-play-form_field">
          <Button
            type="button"
            variant="contained"
            onClick={this.props.onClickStartGame}
          >
            {' '}
            {isGameStarted ? 'Restart' : 'Start'}{' '}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={(e) => clearGameData()}
            style={{ marginLeft: '10px' }}
          >
            {' '}
            Logout{' '}
          </Button>
        </div>
      </div>
    );
  }
}

export default GameForm;
