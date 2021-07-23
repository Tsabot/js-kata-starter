import { initGame, Game, Player, incrementScore } from "./index";

describe("Test of systemUnderTest()", function() {
  it("Should initialize a game", function() {
    const game = initGame();

    const expectedGame: Game = {
      One: 0,
      Two: 0,
      IsGameOver: false,
    }

    expect(game).toEqual(expectedGame);
  });

  it("Should increment a score from 0 to 1 for player One", function() {
    const givenGame: Game = {
      One: 0,
      Two: 0,
      IsGameOver: false,
    }
    
    const game = incrementScore(givenGame, Player.One);

    const expectedGame: Game = {
      One: 1,
      Two: 0,
      IsGameOver: false,
    }

    expect(game).toEqual(expectedGame);
  });

  it("Should increment a score from 0 to 1 for player Two", function() {
    const givenGame: Game = {
      One: 0,
      Two: 0,
      IsGameOver: false,
    }
    
    const game = incrementScore(givenGame, Player.Two);

    const expectedGame: Game = {
      One: 0,
      Two: 1,
      IsGameOver: false,
    }

    expect(game).toEqual(expectedGame);
  });

  it("Should increment a score from 1 to 2 for player One", function() {
    const givenGame: Game = {
      One: 1,
      Two: 0,
      IsGameOver: false,
    }
    
    const game = incrementScore(givenGame, Player.One);

    const expectedGame: Game = {
      One: 2,
      Two: 0,
      IsGameOver: false,
    }

    expect(game).toEqual(expectedGame);
  });

  it("Should increment a score from 1 to 2 for player Two", function() {
    const givenGame: Game = {
      One: 0,
      Two: 1,
      IsGameOver: false,
    }
    
    const game = incrementScore(givenGame, Player.Two);

    const expectedGame: Game = {
      One: 0,
      Two: 2,
      IsGameOver: false,

    }

    expect(game).toEqual(expectedGame);
  });

  it("Should win a game with a score of 4", function() {
    const givenGame: Game = {
      One: 3,
      Two: 0,
      IsGameOver: false,
    }
    
    const game = incrementScore(givenGame, Player.One);

    const expectedGame: Game = {
      One: 4,
      Two: 0,
      IsGameOver: true,
    }

    expect(game).toEqual(expectedGame);
  });
});
