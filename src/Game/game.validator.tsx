import { GameResult } from './game.models';

export default class GameValidator {
  validateRows = (symbol: number, stats: string[][]) => {
    let isWinner = false;
    stats.forEach((row, rowIdx) => {
      if (!isWinner) {
        let symbolsLength = row.filter(
          (item) => symbol.toString() == item
        ).length;
        isWinner = symbolsLength == row.length;
      }
    });
    return isWinner;
  };

  validateColumns = (symbol: number, stats: string[][]) => {
    let rows: string[][] = [];
    // convert columns data to rows
    for (let i = 0; i < stats.length; i++) {
      for (let j = 0; j < stats.length; j++) {
        if (!rows[i]) {
          rows[i] = [];
        }
        rows[i].push(stats[j][i]);
      }
    }
    return this.validateRows(symbol, rows);
  };

  // validate cross symbols
  validateCross = (symbol: number, stats: string[][]) => {
    let rows: string[][] = [[], []];
    let x = 0;
    let y = stats.length - 1;
    for (let i = 0; i < stats.length; i++) {
      rows[0].push(stats[i][x++]);
      rows[1].push(stats[i][y--]);
    }
    return this.validateRows(symbol, rows);
  };

  validateWinner = (stats: string[][]) => {
    let results: GameResult[] = [];
    [1, 0].forEach((symbol) => {
      results.push({
        symbol,
        isWinner: this.validateRows(symbol, stats),
      });
      results.push({
        symbol,
        isWinner: this.validateColumns(symbol, stats),
      });
      results.push({
        symbol,
        isWinner: this.validateCross(symbol, stats),
      });
    });
    return results.find((item) => item.isWinner);
  };
}
