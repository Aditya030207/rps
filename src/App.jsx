import { useState } from 'react';
import './App.css'

function App() {
  let [hmm, setHmm] = useState("");
  let [compChoice, setCompChoice] = useState("");
  let [userScore, setUserScore] = useState(0);
  let [computerScore, setComputerScore] = useState(0);
  let [roundsPlayed, setRoundsPlayed] = useState(0);
  let [userWinStreak, setUserWinStreak] = useState(0);
  let [computerWinStreak, setComputerWinStreak] = useState(0);
  let [winner, setWinner] = useState(null);

  let handleChoiceClick = (choice) => {
    setHmm(choice);

    let rand = Math.random();
    let randomComputerChoice = "";
    if (rand < 0.33) {
      randomComputerChoice = "ROCK";
    } else if (rand < 0.67) {
      randomComputerChoice = "PAPER";
    } else {
      randomComputerChoice = "SCISSORS";
    }
    setCompChoice(randomComputerChoice);
    let newUserScore = userScore;
    let newComputerScore = computerScore;
    let newRoundsPlayed = roundsPlayed + 1;

    if (choice === randomComputerChoice) {
    } else if (
      (choice === "ROCK" && randomComputerChoice === "SCISSORS") ||
      (choice === "PAPER" && randomComputerChoice === "ROCK") ||
      (choice === "SCISSORS" && randomComputerChoice === "PAPER")
    ) {
      newUserScore++;
      setUserScore(newUserScore);
    } else {
      newComputerScore++;
      setComputerScore(newComputerScore);
    }

    setRoundsPlayed(newRoundsPlayed);

    if (newRoundsPlayed === 3) {
      if (newUserScore > newComputerScore) {
        setWinner("User");
        setUserWinStreak(userWinStreak + 1);
        setComputerWinStreak(0);
      } else if (newComputerScore > newUserScore) {
        setWinner("Computer");
        setComputerWinStreak(computerWinStreak + 1);
        setUserWinStreak(0);
      } else {
        setWinner("Draw");
      }
    }
  };

  let resetGame = () => {
    setUserScore(0);
    setComputerScore(0);
    setRoundsPlayed(0);
    setWinner(null);
    setHmm("");
    setCompChoice("");
  };

  return <div>
    <h3>Computer Win Streak: {computerWinStreak} | User Win Streak: {userWinStreak}</h3>
    <h3>Round: {roundsPlayed} / 3</h3>
    <h1>Computer {computerScore} : {userScore} User</h1>
    <h1>{compChoice} : {hmm}</h1>

    {winner ? (
      <div>
        <h2>{winner === "Draw" ? "The Match is a Draw!" : `Match Winner: ${winner}`}</h2>
        <button onClick={resetGame}>Play Again</button>
      </div>
    ) : (
      <div>
        <button onClick={() => handleChoiceClick("ROCK")}>🪨</button>
        <button onClick={() => handleChoiceClick("PAPER")}>🗒️</button>
        <button onClick={() => handleChoiceClick("SCISSORS")}>✂️</button>
      </div>
    )}
  </div>
}

export default App
