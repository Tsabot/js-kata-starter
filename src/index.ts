export enum Player {
  One = 'One',
  Two = 'Two',
}

export interface Game {
  One: number;
  Two: number;
  IsGameOver: boolean;
}

export const initGame = (): Game => {
  return {
    One: 0,
    Two: 0,
    IsGameOver: false,
  };
}

export const incrementScore = (game: Game, player: Player): Game => {
  const IsGameOver = game[player] === 3;
  
  return {...game, [player]: game[player] + 1, IsGameOver}
}