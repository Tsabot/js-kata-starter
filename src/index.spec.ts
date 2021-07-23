import { willPlayerOneWinBall, initGame, calculPlayerScore, addPlayerPoint, playBallTurn, isGameOver } from "./index";

describe("test tennis init", () => {
  test("Does willPlayerOneWinPoint send true or false ", () => {
    const didPlayerOneWinPoint = willPlayerOneWinBall();

    expect(didPlayerOneWinPoint === true || didPlayerOneWinPoint === false).toBe(true);
  });
  test("A tennis match has two player with 5 sets of points starting at 0", () => {
    const expectedGame = {
      playerOnePoints: [0, 0, 0, 0, 0],
      playerOneScore: 0,
      playerTwoPoints: [0, 0, 0, 0, 0],
      playerTwoScore: 0,
      round: 0
    };

    const receivedGame = initGame();

    expect(receivedGame).toStrictEqual(expectedGame);
  });
});
describe("test tennis scoring", () => {
  test("A player who won must gain score 0 to 15", () => {
    const expectedPlayerScore = { newPlayerWinningScore: 15, newLosingPlayerScore: 0, hasWiningPlayerWonPoint: false };

    const score = calculPlayerScore(0, 0);

    expect(score).toStrictEqual(expectedPlayerScore);
  });
  test("A player who won must gain score 15 to 30", () => {
    const expectedPlayerScore = { newPlayerWinningScore: 30, newLosingPlayerScore: 0, hasWiningPlayerWonPoint: false };

    const score = calculPlayerScore(15, 0);

    expect(score).toStrictEqual(expectedPlayerScore);
  });
  test("A player who won must gain score 30 to 40", () => {
    const expectedPlayerScore = { newPlayerWinningScore: 40, newLosingPlayerScore: 0, hasWiningPlayerWonPoint: false };

    const score = calculPlayerScore(30, 0);

    expect(score).toStrictEqual(expectedPlayerScore);
  });
  test("A player who won must gain score 40 to 0", () => {
    const expectedPlayerScore = { newPlayerWinningScore: 0, newLosingPlayerScore: 0, hasWiningPlayerWonPoint: true };

    const score = calculPlayerScore(40, 0);

    expect(score).toStrictEqual(expectedPlayerScore);
  });
  test("A player who won when there was 40 - 40 will be in advantage", () => {
    const expectedPlayerScore = { newPlayerWinningScore: 50, newLosingPlayerScore: 40, hasWiningPlayerWonPoint: false };

    const score = calculPlayerScore(40, 40);

    expect(score).toStrictEqual(expectedPlayerScore);
  });
  test("A player who won when there was 40 - 50 will be in advantage and the other one won't", () => {
    const expectedPlayerScore = { newPlayerWinningScore: 50, newLosingPlayerScore: 40, hasWiningPlayerWonPoint: false };

    const score = calculPlayerScore(40, 50);

    expect(score).toStrictEqual(expectedPlayerScore);
  });
  test("A player who won must gain score 50 to 0 as the losing player", () => {
    const expectedPlayerScore = { newPlayerWinningScore: 0, newLosingPlayerScore: 0, hasWiningPlayerWonPoint: true };

    const score = calculPlayerScore(50, 40);

    expect(score).toStrictEqual(expectedPlayerScore);
  });
});

describe("test tennis scoring", () => {
  test("if a player win and was at 0 point it must be at 1", () => {
    const expectedPlayerPoint = [1, 0, 0, 0, 0];
    const expectedIsNewRound = false;

    const pointResult = addPlayerPoint([0, 0, 0, 0, 0], 0);

    expect(pointResult.isNewRound).toStrictEqual(expectedIsNewRound);
    expect(pointResult.playerPoints).toStrictEqual(expectedPlayerPoint);
  });
  test("if a player win and was at 0 point in round 2 it must be at 1", () => {
    const expectedPlayerPoint = [0, 1, 0, 0, 0];
    const expectedIsNewRound = false;

    const pointResult = addPlayerPoint([0, 0, 0, 0, 0], 1);

    expect(pointResult.isNewRound).toStrictEqual(expectedIsNewRound);
    expect(pointResult.playerPoints).toStrictEqual(expectedPlayerPoint);
  });
  test("if a player win and was at 6 point it must be at 7 and be a new round", () => {
    const expectedPlayerPoint = [7, 0, 0, 0, 0];
    const expectedIsNewRound = true;

    const pointResult = addPlayerPoint([6, 0, 0, 0, 0], 0);

    expect(pointResult.isNewRound).toStrictEqual(expectedIsNewRound);
    expect(pointResult.playerPoints).toStrictEqual(expectedPlayerPoint);
  });
});

describe("test whole ballgame", () => {
  test("first round of game", () => {
    const expectedGame1 = {
      playerOnePoints: [0, 0, 0, 0, 0],
      playerOneScore: 15,
      playerTwoPoints: [0, 0, 0, 0, 0],
      playerTwoScore: 0,
      round: 0
    };
    const expectedGame2 = {
      playerOnePoints: [0, 0, 0, 0, 0],
      playerOneScore: 0,
      playerTwoPoints: [0, 0, 0, 0, 0],
      playerTwoScore: 15,
      round: 0
    };

    const resultingTennisGame = playBallTurn(initGame());

    expect(
      (resultingTennisGame.playerTwoScore === expectedGame1.playerTwoScore &&
        resultingTennisGame.playerOneScore === expectedGame1.playerOneScore) ||
        (resultingTennisGame.playerTwoScore === expectedGame2.playerTwoScore &&
          resultingTennisGame.playerOneScore === expectedGame2.playerOneScore)
    ).toBe(true);
  });
  test("first point of game", () => {
    const expectedGame1 = {
      playerOnePoints: [0, 0, 0, 0, 0],
      playerOneScore: 50,
      playerTwoPoints: [0, 0, 0, 0, 0],
      playerTwoScore: 40,
      round: 0
    };
    const expectedGame2 = {
      playerOnePoints: [0, 0, 0, 0, 0],
      playerOneScore: 0,
      playerTwoPoints: [1, 0, 0, 0, 0],
      playerTwoScore: 0,
      round: 0
    };

    const resultingTennisGame = playBallTurn({
      playerOnePoints: [0, 0, 0, 0, 0],
      playerOneScore: 40,
      playerTwoPoints: [0, 0, 0, 0, 0],
      playerTwoScore: 50,
      round: 0
    });

    expect(
      (resultingTennisGame.playerTwoScore === expectedGame1.playerTwoScore &&
        resultingTennisGame.playerOneScore === expectedGame1.playerOneScore) ||
        (resultingTennisGame.playerTwoScore === expectedGame2.playerTwoScore &&
          resultingTennisGame.playerOneScore === expectedGame2.playerOneScore &&
          resultingTennisGame.playerTwoPoints[0] === expectedGame2.playerTwoPoints[0])
    ).toBe(true);
  });
  test("first set of game", () => {
    const expectedGame1 = {
      playerOnePoints: [0, 0, 0, 0, 0],
      playerOneScore: 50,
      playerTwoPoints: [6, 0, 0, 0, 0],
      playerTwoScore: 40,
      round: 0
    };
    const expectedGame2 = {
      playerOnePoints: [0, 0, 0, 0, 0],
      playerOneScore: 0,
      playerTwoPoints: [7, 0, 0, 0, 0],
      playerTwoScore: 0,
      round: 1
    };

    const resultingTennisGame = playBallTurn({
      playerOnePoints: [0, 0, 0, 0, 0],
      playerOneScore: 40,
      playerTwoPoints: [6, 0, 0, 0, 0],
      playerTwoScore: 50,
      round: 0
    });

    expect(
      (resultingTennisGame.playerTwoScore === expectedGame1.playerTwoScore &&
        resultingTennisGame.playerOneScore === expectedGame1.playerOneScore) ||
        (resultingTennisGame.playerTwoScore === expectedGame2.playerTwoScore &&
          resultingTennisGame.playerOneScore === expectedGame2.playerOneScore &&
          resultingTennisGame.playerTwoPoints[0] === expectedGame2.playerTwoPoints[0] &&
          resultingTennisGame.round === expectedGame2.round)
    ).toBe(true);
  });
  test("game is over false at init", () => {
    const expectedResult = {
      gameIsOver: false,
      winner: null
    };

    const { gameIsOver, winner } = isGameOver({
      playerOnePoints: [0, 0, 0, 0, 0],
      playerOneScore: 0,
      playerTwoPoints: [0, 0, 0, 0, 0],
      playerTwoScore: 0,
      round: 0
    });

    expect(gameIsOver).toBe(expectedResult.gameIsOver);
    expect(winner).toBe(expectedResult.winner);
  });
  test("game is over false at the middle of the game", () => {
    const expectedResult = {
      gameIsOver: false,
      winner: null
    };

    const { gameIsOver, winner } = isGameOver({
      playerOnePoints: [7, 7, 2, 3, 0],
      playerOneScore: 40,
      playerTwoPoints: [5, 3, 7, 5, 0],
      playerTwoScore: 50,
      round: 3
    });

    expect(gameIsOver).toBe(expectedResult.gameIsOver);
    expect(winner).toBe(expectedResult.winner);
  });
  test("game is over true", () => {
    const expectedResult = {
      gameIsOver: true,
      winner: 1
    };

    const { gameIsOver, winner } = isGameOver({
      playerOnePoints: [7, 7, 6, 6, 7],
      playerOneScore: 0,
      playerTwoPoints: [6, 6, 7, 7, 6],
      playerTwoScore: 0,
      round: 4
    });

    expect(gameIsOver).toBe(expectedResult.gameIsOver);
    expect(winner).toBe(expectedResult.winner);
  });
});
