export enum Player {
  One,
  Two,
}

export interface Game {
  [Player.One]: number
  [Player.Two]: number
}

export const initGame = (): Game => {
  return {
    [Player.One]: 0,
    [Player.Two]: 0,
  };
}

export const incrementScore = (game: Game, player: Player): Game => {
  return {...game, [player]: game[player] + 1}
}