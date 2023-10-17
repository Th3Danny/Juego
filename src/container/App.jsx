import React, { useState } from "react";
import WordGame from "../components/juego";
import '../css/App.css'
function App() {
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const handleWin = () => {
    setGameWon(true);
  };

  const handleLoss = () => {
    setGameLost(true);
  };

  return (
    <div>
      {gameWon ? (
        <div>
          <h1 className="win">¡Ganaste!</h1>
          <button onClick={() => setGameWon(false)}>Jugar de nuevo</button>
        </div>
      ) : gameLost ? (
        <div>
          <h1 className="lose">¡Perdiste!</h1>
          <button onClick={() => setGameLost(false)}>Jugar de nuevo</button>
        </div>
      ) : (
        <WordGame onWin={handleWin} onLoss={handleLoss} />
      )}
    </div>
  );
}

export default App;
