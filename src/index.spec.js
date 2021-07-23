"use strict";
exports.__esModule = true;
var index_1 = require("./index");
describe("test tennis init", function () {
    test("Does willPlayerOneWinPoint send true or false ", function () {
        var didPlayerOneWinPoint = index_1.willPlayerOneWinBall();
        expect(didPlayerOneWinPoint === true || didPlayerOneWinPoint === false).toBe(true);
    });
    test("A tennis match has two player with 5 sets of points starting at 0", function () {
        var expectedGame = {
            playerOnePoints: [0, 0, 0, 0, 0],
            playerOneScore: 0,
            playerTwoPoints: [0, 0, 0, 0, 0],
            playerTwoScore: 0,
            round: 0
        };
        var receivedGame = index_1.initGame();
        expect(receivedGame).toStrictEqual(expectedGame);
    });
});
describe("test tennis scoring", function () {
    test("A player who won must gain score 0 to 15", function () {
        var expectedPlayerScore = { newPlayerWinningScore: 15, newLosingPlayerScore: 0, hasWiningPlayerWonPoint: false };
        var score = index_1.calculPlayerScore(0, 0);
        expect(score).toStrictEqual(expectedPlayerScore);
    });
    test("A player who won must gain score 15 to 30", function () {
        var expectedPlayerScore = { newPlayerWinningScore: 30, newLosingPlayerScore: 0, hasWiningPlayerWonPoint: false };
        var score = index_1.calculPlayerScore(15, 0);
        expect(score).toStrictEqual(expectedPlayerScore);
    });
    test("A player who won must gain score 30 to 40", function () {
        var expectedPlayerScore = { newPlayerWinningScore: 40, newLosingPlayerScore: 0, hasWiningPlayerWonPoint: false };
        var score = index_1.calculPlayerScore(30, 0);
        expect(score).toStrictEqual(expectedPlayerScore);
    });
    test("A player who won must gain score 40 to 0", function () {
        var expectedPlayerScore = { newPlayerWinningScore: 0, newLosingPlayerScore: 0, hasWiningPlayerWonPoint: true };
        var score = index_1.calculPlayerScore(40, 0);
        expect(score).toStrictEqual(expectedPlayerScore);
    });
    test("A player who won when there was 40 - 40 will be in advantage", function () {
        var expectedPlayerScore = { newPlayerWinningScore: 50, newLosingPlayerScore: 40, hasWiningPlayerWonPoint: false };
        var score = index_1.calculPlayerScore(40, 40);
        expect(score).toStrictEqual(expectedPlayerScore);
    });
    test("A player who won when there was 40 - 50 will be in advantage and the other one won't", function () {
        var expectedPlayerScore = { newPlayerWinningScore: 50, newLosingPlayerScore: 40, hasWiningPlayerWonPoint: false };
        var score = index_1.calculPlayerScore(40, 50);
        expect(score).toStrictEqual(expectedPlayerScore);
    });
    test("A player who won must gain score 50 to 0 as the losing player", function () {
        var expectedPlayerScore = { newPlayerWinningScore: 0, newLosingPlayerScore: 0, hasWiningPlayerWonPoint: true };
        var score = index_1.calculPlayerScore(50, 40);
        expect(score).toStrictEqual(expectedPlayerScore);
    });
});
describe("test tennis scoring", function () {
    test("if a player win and was at 0 point it must be at 1", function () {
        var expectedPlayerPoint = [1, 0, 0, 0, 0];
        var expectedIsNewRound = false;
        var pointResult = index_1.addPlayerPoint([0, 0, 0, 0, 0], 0);
        expect(pointResult.isNewRound).toStrictEqual(expectedIsNewRound);
        expect(pointResult.playerPoints).toStrictEqual(expectedPlayerPoint);
    });
    test("if a player win and was at 0 point in round 2 it must be at 1", function () {
        var expectedPlayerPoint = [0, 1, 0, 0, 0];
        var expectedIsNewRound = false;
        var pointResult = index_1.addPlayerPoint([0, 0, 0, 0, 0], 1);
        expect(pointResult.isNewRound).toStrictEqual(expectedIsNewRound);
        expect(pointResult.playerPoints).toStrictEqual(expectedPlayerPoint);
    });
    test("if a player win and was at 6 point it must be at 7 and be a new round", function () {
        var expectedPlayerPoint = [7, 0, 0, 0, 0];
        var expectedIsNewRound = true;
        var pointResult = index_1.addPlayerPoint([6, 0, 0, 0, 0], 0);
        expect(pointResult.isNewRound).toStrictEqual(expectedIsNewRound);
        expect(pointResult.playerPoints).toStrictEqual(expectedPlayerPoint);
    });
});
describe("test whole ballgame", function () {
    test("first round of game", function () {
        var expectedGame1 = {
            playerOnePoints: [0, 0, 0, 0, 0],
            playerOneScore: 15,
            playerTwoPoints: [0, 0, 0, 0, 0],
            playerTwoScore: 0,
            round: 0
        };
        var expectedGame2 = {
            playerOnePoints: [0, 0, 0, 0, 0],
            playerOneScore: 0,
            playerTwoPoints: [0, 0, 0, 0, 0],
            playerTwoScore: 15,
            round: 0
        };
        var resultingTennisGame = index_1.playBallTurn(index_1.initGame());
        expect((resultingTennisGame.playerTwoScore === expectedGame1.playerTwoScore &&
            resultingTennisGame.playerOneScore === expectedGame1.playerOneScore) ||
            (resultingTennisGame.playerTwoScore === expectedGame2.playerTwoScore &&
                resultingTennisGame.playerOneScore === expectedGame2.playerOneScore)).toBe(true);
    });
    test("first point of game", function () {
        var expectedGame1 = {
            playerOnePoints: [0, 0, 0, 0, 0],
            playerOneScore: 50,
            playerTwoPoints: [0, 0, 0, 0, 0],
            playerTwoScore: 40,
            round: 0
        };
        var expectedGame2 = {
            playerOnePoints: [0, 0, 0, 0, 0],
            playerOneScore: 0,
            playerTwoPoints: [1, 0, 0, 0, 0],
            playerTwoScore: 0,
            round: 0
        };
        var resultingTennisGame = index_1.playBallTurn({
            playerOnePoints: [0, 0, 0, 0, 0],
            playerOneScore: 40,
            playerTwoPoints: [0, 0, 0, 0, 0],
            playerTwoScore: 50,
            round: 0
        });
        expect((resultingTennisGame.playerTwoScore === expectedGame1.playerTwoScore &&
            resultingTennisGame.playerOneScore === expectedGame1.playerOneScore) ||
            (resultingTennisGame.playerTwoScore === expectedGame2.playerTwoScore &&
                resultingTennisGame.playerOneScore === expectedGame2.playerOneScore &&
                resultingTennisGame.playerTwoPoints[0] === expectedGame2.playerTwoPoints[0])).toBe(true);
    });
    test("first set of game", function () {
        var expectedGame1 = {
            playerOnePoints: [0, 0, 0, 0, 0],
            playerOneScore: 50,
            playerTwoPoints: [6, 0, 0, 0, 0],
            playerTwoScore: 40,
            round: 0
        };
        var expectedGame2 = {
            playerOnePoints: [0, 0, 0, 0, 0],
            playerOneScore: 0,
            playerTwoPoints: [7, 0, 0, 0, 0],
            playerTwoScore: 0,
            round: 1
        };
        var resultingTennisGame = index_1.playBallTurn({
            playerOnePoints: [0, 0, 0, 0, 0],
            playerOneScore: 40,
            playerTwoPoints: [6, 0, 0, 0, 0],
            playerTwoScore: 50,
            round: 0
        });
        expect((resultingTennisGame.playerTwoScore === expectedGame1.playerTwoScore &&
            resultingTennisGame.playerOneScore === expectedGame1.playerOneScore) ||
            (resultingTennisGame.playerTwoScore === expectedGame2.playerTwoScore &&
                resultingTennisGame.playerOneScore === expectedGame2.playerOneScore &&
                resultingTennisGame.playerTwoPoints[0] === expectedGame2.playerTwoPoints[0] &&
                resultingTennisGame.round === expectedGame2.round)).toBe(true);
    });
    test("game is over false at init", function () {
        var expectedResult = {
            gameIsOver: false,
            winner: null
        };
        var _a = index_1.isGameOver({
            playerOnePoints: [0, 0, 0, 0, 0],
            playerOneScore: 0,
            playerTwoPoints: [0, 0, 0, 0, 0],
            playerTwoScore: 0,
            round: 0
        }), gameIsOver = _a.gameIsOver, winner = _a.winner;
        expect(gameIsOver).toBe(expectedResult.gameIsOver);
        expect(winner).toBe(expectedResult.winner);
    });
    test("game is over false at the middle of the game", function () {
        var expectedResult = {
            gameIsOver: false,
            winner: null
        };
        var _a = index_1.isGameOver({
            playerOnePoints: [7, 7, 2, 3, 0],
            playerOneScore: 40,
            playerTwoPoints: [5, 3, 7, 5, 0],
            playerTwoScore: 50,
            round: 3
        }), gameIsOver = _a.gameIsOver, winner = _a.winner;
        expect(gameIsOver).toBe(expectedResult.gameIsOver);
        expect(winner).toBe(expectedResult.winner);
    });
    test("game is over true", function () {
        var expectedResult = {
            gameIsOver: true,
            winner: 1
        };
        var _a = index_1.isGameOver({
            playerOnePoints: [7, 7, 6, 6, 7],
            playerOneScore: 0,
            playerTwoPoints: [6, 6, 7, 7, 6],
            playerTwoScore: 0,
            round: 4
        }), gameIsOver = _a.gameIsOver, winner = _a.winner;
        expect(gameIsOver).toBe(expectedResult.gameIsOver);
        expect(winner).toBe(expectedResult.winner);
    });
});
