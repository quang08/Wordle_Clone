import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if(isCorrect) window.removeEventListener("keyup", handleKeyup);

    if(turn > 5) window.removeEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup); //keyup cleaner, prevent adding too many events
  }, [handleKeyup, isCorrect, turn]); //every time handlekeyup or correct answer or out of turn is triggered + initial render

//   useEffect(() => {
//     console.log(guesses);
//   }, [guesses]);

  return (
    <div>
      <div>Solution: {solution}</div>
      <div>Current Guess: {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
    </div>
  );
}
