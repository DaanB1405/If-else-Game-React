import React, { useState, useEffect } from "react";
import './poep.css';
import './confetti.css';

const App = () => {
  const conditions = [
    'true',
    'false',
    '!true',
    '!false',
    '!!true',
    'true === true',
    'true == 1',
    'true === 1',
    'false == 0',
    'true != false',
    'true !== false',
    'true != 1',
    'true !== 1',
    '1 > 0',
    '0 > 1',
    '9001 > 9000',
    'true > 0',
    'false > true',
    'true || false',
    'false || true',
    'false || false',
    'true && true',
    'false && false',
    'true && false',
    'false && true',
    '[] + [] + {} === "" + {}'
  ];

  const [currentCondition, setCurrentCondition] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, sethighScore] = useState(0);
  const [disable, setDisable] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const maxConfetti = 100;
  const newScore = score + 1;
  const nextQuestionDelay = 2000

  useEffect(() => {
    const storedHighscore = localStorage.getItem('highscore');
    if (storedHighscore) {
      sethighScore(parseInt(storedHighscore, 10));
    }
  }, []);


  const handleAnswer = (userAnswer) => {
    setDisable(true);
    setTimeout(() => {
      setMessage("");
      setDisable(false);
    }, nextQuestionDelay);

    const evaluation = eval(conditions[currentCondition]);
    if (userAnswer === evaluation) {
      setScore(score + 1);
      setMessage("Nice!✅");
      setShowConfetti(true);
      setTimeout(() => {
        setCurrentCondition(prev => prev + 1);
        setShowConfetti(false);
      }, nextQuestionDelay);

      if (newScore > highScore) {
        sethighScore(newScore);
        localStorage.setItem('highscore', newScore);
      }
    } else {
      setMessage(`No, the right answer for "${conditions[currentCondition]}" is ${evaluation}`);
      setScore(0);
      setGameOver(true);

    }
  };

  const handleRestartGame = () => {
    setCurrentCondition(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <div className="score-container">
        <h2>Current score: {score}</h2>
        <h2>Highscore👑: {highScore}</h2>
      </div>
      <div>
        {gameOver ? (
          <>
            <h2>💣💣💣 Shit man... Try again dude 💣💣💣</h2>
            <button className="game-button" onClick={handleRestartGame}>Retry..</button>
          </>
        ) : (
          <>
            <h1>Does "{conditions[currentCondition]}" evaluate to true?</h1>
            <button className="game-button" onClick={() => handleAnswer(true)} disabled={disable}>True</button>
            <button className="game-button" onClick={() => handleAnswer(false)} disabled={disable}>False</button>
          </>
        )}
      </div>
      <pre className={`toast ${message ? 'has-message' : 'no-message'}`}>{message}</pre>
      {showConfetti && (
        <div className="confetti-wrapper">
          {Array.from({ length: maxConfetti }).map((_, confetti) => {
            const leftPosition = `${Math.random() * 100}%`;
            const animationDelay = `${Math.floor(Math.random() * -10)}s`;
            const topPosition = `${Math.random() * 100}%`;
            const transform = Math.random() < 0.5 ? 'scaleX(-1)' : ""

            return <div key={confetti} style={{
              left: leftPosition,
              animationDelay: animationDelay,
              top: topPosition,
              transform: transform,
            }} className="confetti"></div>
          })}
        </div>
      )
      }
    </div >
  );
};
export default App;

// - highscore niet terug naar 0
// - ruimte tussen de buttons (game-button)
// - Game over wat intenser / kruis / rood scherm / WASTED GTA V
// - "refactor" de codebase