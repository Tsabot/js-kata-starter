import { initGame, Game, Player, incrementScore } from "./index";

describe("Test of systemUnderTest()", function() {
  it("Should initialize a game", function() {
    const game = initGame();

    const expectedGame: Game = {
      [Player.One]: 0,
      [Player.Two]: 0,
    }

    expect(game).toEqual(expectedGame);
  });

  it("Should increment a score from 0 to 1 for player One", function() {
    const givenGame: Game = {
      [Player.One]: 0,
      [Player.Two]: 0,
    }
    
    const game = incrementScore(givenGame, Player.One);

    const expectedGame: Game = {
      [Player.One]: 1,
      [Player.Two]: 0,
    }

    expect(game).toEqual(expectedGame);
  });

  it("Should increment a score from 0 to 1 for player Two", function() {
    const givenGame: Game = {
      [Player.One]: 0,
      [Player.Two]: 0,
    }
    
    const game = incrementScore(givenGame, Player.Two);

    const expectedGame: Game = {
      [Player.One]: 0,
      [Player.Two]: 1,
    }

    expect(game).toEqual(expectedGame);
  });

  it("Should increment a score from 1 to 2 for player One", function() {
    const givenGame: Game = {
      [Player.One]: 1,
      [Player.Two]: 0,
    }
    
    const game = incrementScore(givenGame, Player.One);

    const expectedGame: Game = {
      [Player.One]: 2,
      [Player.Two]: 0,
    }

    expect(game).toEqual(expectedGame);
  });

  it("Should increment a score from 1 to 2 for player Two", function() {
    const givenGame: Game = {
      [Player.One]: 0,
      [Player.Two]: 1,
    }
    
    const game = incrementScore(givenGame, Player.Two);

    const expectedGame: Game = {
      [Player.One]: 0,
      [Player.Two]: 2,
    }

    expect(game).toEqual(expectedGame);
  });
});
