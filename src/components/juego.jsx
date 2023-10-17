
import React, { useState, useEffect, useRef } from "react";
import "../css/juego.css"; 
const words = [
  "manzana",
  "pera",
  "platano",
  "naranja",
  "uva",
  "sandia",
  "fresa",
  "kiwi",
  "piña",
  "mango",
];

function shuffleWord(word) {
  const shuffledWord = word.split("").sort(() => Math.random() - 0.5).join("");
  return shuffledWord;
}

function WordGame({ onWin, onLoss }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledWord, setShuffledWord] = useState(
    shuffleWord(words[currentWordIndex])
  );
  const [errors, setErrors] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [inputLetters, setInputLetters] = useState(
    Array(shuffledWord.length).fill("")
  );
  const [resetWord, setResetWord] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (errors === 4) {
      onLoss();
      setErrors(0); // Reinicia el contador de errores
    }
  }, [errors]);

  useEffect(() => {
    if (resetWord) {
      setShuffledWord(shuffleWord(words[currentWordIndex]));
      setInputLetters(Array(words[currentWordIndex].length).fill(""));
      setCurrentLetterIndex(0);
      setResetWord(false);
      inputRefs.current[0].focus(); 
    }
  }, [currentWordIndex, resetWord]);

  const handleInputChange = (value, index) => {
    const currentWord = words[currentWordIndex];
    const newInputLetters = [...inputLetters];
    newInputLetters[index] = value;

    if (value === currentWord[index]) {
      if (index < currentWord.length - 1) {
        inputRefs.current[index + 1].focus(); 
      }

      const nextLetterIndex = currentLetterIndex + 1;
      newInputLetters[nextLetterIndex] = "";

      if (nextLetterIndex === currentWord.length) {
        setCorrectWords(correctWords + 1); 
        if (correctWords + 1 === words.length) {
          onWin();
        } else {
          setCurrentWordIndex(currentWordIndex + 1); 
          setResetWord(true); 
        }
        setErrors(0); 
      } else {
        setCurrentLetterIndex(nextLetterIndex);
      }
    } else {
      setErrors(errors + 1);
    }

    setInputLetters(newInputLetters);
  };

  const handleClear = () => {
    setInputLetters(Array(words[currentWordIndex].length).fill(""));
    inputRefs.current[0].focus(); 
  };

  const handleReset = () => {
    setCurrentWordIndex(currentWordIndex + 1);
    setResetWord(true); 
    setErrors(0); 
  };

  return (
    <div className="word-game-container">
      <h1 className="word-game-title">Adivina la palabra</h1>
      <div className="word">{shuffledWord}</div>
      <div className="word-inputs">
        {inputLetters.map((letter, index) => (
          <input
            key={index}
            type="text"
            value={letter}
            onChange={(e) => handleInputChange(e.target.value, index)}
            maxLength="1"
            className={index === currentLetterIndex ? "active" : ""}
            ref={(input) => (inputRefs.current[index] = input)}
          />
        ))}
      </div>
      <button onClick={handleClear} className="clear-button">Clear</button>
      <button onClick={handleReset} className="reset-button">Reset</button>
      <p className="error-message">Errores: {errors} / 4</p>
    </div>
  );
}

export default WordGame;
