"use strict";
exports.__esModule = true;
exports.runGame = exports.isGameOver = exports.playBallTurn = exports.addPlayerPoint = exports.calculPlayerScore = exports.willPlayerOneWinBall = exports.initGame = void 0;
exports.initGame = function () {
    return {
        playerOnePoints: [0, 0, 0, 0, 0],
        playerTwoPoints: [0, 0, 0, 0, 0],
        playerOneScore: 0,
        playerTwoScore: 0,
        round: 0
    };
};
exports.willPlayerOneWinBall = function () {
    return Math.random() < 0.5;
};
exports.calculPlayerScore = function (winningPlayerScore, losingPlayerScore) {
    var hasWiningPlayerWonPoint = false;
    var newPlayerWinningScore = 0;
    var newLosingPlayerScore = losingPlayerScore;
    if (winningPlayerScore === 0) {
        newPlayerWinningScore = 15;
    }
    else if (winningPlayerScore === 15) {
        newPlayerWinningScore = 30;
    }
    else if (winningPlayerScore === 30) {
        newPlayerWinningScore = 40;
    }
    if (winningPlayerScore === 40 && losingPlayerScore !== 40 && losingPlayerScore !== 50) {
        newPlayerWinningScore = 0;
        newLosingPlayerScore = 0;
        hasWiningPlayerWonPoint = true;
    }
    else if (winningPlayerScore === 40) {
        newPlayerWinningScore = 50;
        newLosingPlayerScore = 40;
    }
    if (winningPlayerScore === 50) {
        newPlayerWinningScore = 0;
        newLosingPlayerScore = 0;
        hasWiningPlayerWonPoint = true;
    }
    return { newPlayerWinningScore: newPlayerWinningScore, newLosingPlayerScore: newLosingPlayerScore, hasWiningPlayerWonPoint: hasWiningPlayerWonPoint };
};
exports.addPlayerPoint = function (playerPoints, round) {
    var newPoint = playerPoints[round] + 1;
    var isNewRound = newPoint === 7;
    playerPoints[round] = newPoint;
    return { playerPoints: playerPoints, isNewRound: isNewRound };
};
exports.playBallTurn = function (tennisGame) {
    var didPlayerOneWon = exports.willPlayerOneWinBall();
    var winningPlayerScore = didPlayerOneWon ? tennisGame.playerOneScore : tennisGame.playerTwoScore;
    var losingPlayerScore = didPlayerOneWon ? tennisGame.playerTwoScore : tennisGame.playerOneScore;
    var _a = exports.calculPlayerScore(winningPlayerScore, losingPlayerScore), newLosingPlayerScore = _a.newLosingPlayerScore, newPlayerWinningScore = _a.newPlayerWinningScore, hasWiningPlayerWonPoint = _a.hasWiningPlayerWonPoint;
    tennisGame.playerOneScore = didPlayerOneWon ? newPlayerWinningScore : newLosingPlayerScore;
    tennisGame.playerTwoScore = didPlayerOneWon ? newLosingPlayerScore : newPlayerWinningScore;
    if (hasWiningPlayerWonPoint) {
        var _b = exports.addPlayerPoint(didPlayerOneWon ? tennisGame.playerOnePoints : tennisGame.playerTwoPoints, tennisGame.round), playerPoints = _b.playerPoints, isNewRound = _b.isNewRound;
        didPlayerOneWon ? (tennisGame.playerOnePoints = playerPoints) : (tennisGame.playerTwoPoints = playerPoints);
        if (isNewRound) {
            tennisGame.round += 1;
        }
    }
    return tennisGame;
};
exports.isGameOver = function (tennisGame) {
    if (tennisGame.round <= 2) {
        return { gameIsOver: false, winner: null };
    }
    var playerOneWonPoint = tennisGame.playerOnePoints.reduce(function (wonPoint, point) {
        if (point === 7) {
            return wonPoint + 1;
        }
        return wonPoint;
    }, 0);
    var playerTwoWonPoint = tennisGame.playerTwoPoints.reduce(function (wonPoint, point) {
        if (point === 7) {
            return wonPoint + 1;
        }
        return wonPoint;
    }, 0);
    if (playerOneWonPoint >= 3) {
        return { gameIsOver: true, winner: 1 };
    }
    if (playerTwoWonPoint >= 3) {
        return { gameIsOver: true, winner: 2 };
    }
    return { gameIsOver: false, winner: null };
};
exports.runGame = function () {
    var tennisGame = exports.initGame();
    while (!exports.isGameOver(tennisGame).gameIsOver) {
        tennisGame = exports.playBallTurn(tennisGame);
    }
    var winner = exports.isGameOver(tennisGame).winner;
    console.log("And the winner is : Player " + winner);
    console.log('With a score of: ', tennisGame.playerOnePoints);
    console.log("Against the other player's: ", tennisGame.playerTwoPoints);
};
exports.runGame();
