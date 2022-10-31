/**
 * Models for components
 */

export interface GameProps {
  game: GameStateModel;
  saveGameData(data: GameDataModel): void;
  saveGameConfig(config: GameConfigModel): void;
  clearGameData(): void;
  loadGameData(): void;
  loginUser(username: string): void;
  [key: string]: any;
}

export interface GameFormProps {
  game?: GameStateModel;
  saveGameConfig(config: GameConfigModel): void;
  clearGameData(): void;
  onClickStartGame(): void;
  isGameStarted: boolean;
  isGameEnded: boolean;
}

export interface GamePlayProps {
  game?: GameStateModel;
  saveGameConfig(config: GameConfigModel): void;
  clearGameData(): void;
}

export interface LoginProps {
  onLogin(username: string): void;
}

export interface GameResult {
  symbol: number;
  isWinner: boolean;
}

/**
 * Models for redux
 */

export interface GameActionModel {
  type: string;
  payload: GameStateModel;
}

export interface GameDataModel {
  id: number;
  isWin: number;
  createdOn: Date;
}

export interface GameStateModel {
  data?: GameDataModel[];
  isLoggedIn?: boolean;
  username?: string;
  isLoaded?: boolean;
  isLoading?: boolean;
  isPlaying?: boolean;
  isGameStarted?: boolean;
  config?: GameConfigModel;
}

export interface GameConfigModel {
  gridSize?: number;
  symbol?: number;
}
