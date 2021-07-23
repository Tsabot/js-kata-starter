interface TennisGame {
  playerOnePoints: number[];
  playerOneScore: number;
  playerTwoPoints: number[];
  playerTwoScore: number;
  round: number;
}

export const initGame = (): TennisGame => {
  return {
    playerOnePoints: [0, 0, 0, 0, 0],
    playerTwoPoints: [0, 0, 0, 0, 0],
    playerOneScore: 0,
    playerTwoScore: 0,
    round: 0
  };
};

export const willPlayerOneWinBall = (): boolean => {
  return Math.random() < 0.5;
};

export const calculPlayerScore = (winningPlayerScore, losingPlayerScore: number) => {
  let hasWiningPlayerWonPoint = false;
  let newPlayerWinningScore = 0;
  let newLosingPlayerScore = losingPlayerScore;

  if (winningPlayerScore === 0) {
    newPlayerWinningScore = 15;
  } else if (winningPlayerScore === 15) {
    newPlayerWinningScore = 30;
  } else if (winningPlayerScore === 30) {
    newPlayerWinningScore = 40;
  }

  if (winningPlayerScore === 40 && losingPlayerScore !== 40 && losingPlayerScore !== 50) {
    newPlayerWinningScore = 0;
    newLosingPlayerScore = 0;
    hasWiningPlayerWonPoint = true;
  } else if (winningPlayerScore === 40) {
    newPlayerWinningScore = 50;
    newLosingPlayerScore = 40;
  }

  if (winningPlayerScore === 50) {
    newPlayerWinningScore = 0;
    newLosingPlayerScore = 0;
    hasWiningPlayerWonPoint = true;
  }

  return { newPlayerWinningScore, newLosingPlayerScore, hasWiningPlayerWonPoint };
};

export const addPlayerPoint = (playerPoints: number[], round: number) => {
  let newPoint = playerPoints[round] + 1;
  let isNewRound = newPoint === 7;

  playerPoints[round] = newPoint;

  return { playerPoints, isNewRound };
};

export const playBallTurn = (tennisGame: TennisGame) => {
  const didPlayerOneWon = willPlayerOneWinBall();

  const winningPlayerScore = didPlayerOneWon ? tennisGame.playerOneScore : tennisGame.playerTwoScore;
  const losingPlayerScore = didPlayerOneWon ? tennisGame.playerTwoScore : tennisGame.playerOneScore;

  const { newLosingPlayerScore, newPlayerWinningScore, hasWiningPlayerWonPoint } = calculPlayerScore(
    winningPlayerScore,
    losingPlayerScore
  );

  tennisGame.playerOneScore = didPlayerOneWon ? newPlayerWinningScore : newLosingPlayerScore;
  tennisGame.playerTwoScore = didPlayerOneWon ? newLosingPlayerScore : newPlayerWinningScore;

  if (hasWiningPlayerWonPoint) {
    const { playerPoints, isNewRound } = addPlayerPoint(
      didPlayerOneWon ? tennisGame.playerOnePoints : tennisGame.playerTwoPoints,
      tennisGame.round
    );

    didPlayerOneWon ? (tennisGame.playerOnePoints = playerPoints) : (tennisGame.playerTwoPoints = playerPoints);

    if (isNewRound) {
      tennisGame.round += 1;
    }
  }

  return tennisGame;
};

export const isGameOver = (tennisGame: TennisGame) => {
  if (tennisGame.round <=2 ) {
    return { gameIsOver: false, winner: null };
  }

  const playerOneWonPoint = tennisGame.playerOnePoints.reduce((wonPoint, point) => {
    if (point === 7) {
      return wonPoint + 1;
    }

    return wonPoint;
  }, 0);

  const playerTwoWonPoint = tennisGame.playerTwoPoints.reduce((wonPoint, point) => {
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

  return { gameIsOver: false, winner: null}
};

export const runGame = () => {
  let tennisGame = initGame();

  while (!isGameOver(tennisGame).gameIsOver) {
    tennisGame = playBallTurn(tennisGame);
  }

  const { winner } = isGameOver(tennisGame);

  console.log(`And the winner is : Player ${winner}`);
  console.log('With a score of: ', tennisGame.playerOnePoints);
  console.log("Against the other player's: ", tennisGame.playerTwoPoints)
}

runGame();