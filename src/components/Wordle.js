import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup); //keyup cleaner, prevent adding too many events
  }, [handleKeyup]); //every time handlekeyup is triggered + initial render

  useEffect(() => {
    console.log(guesses);
  }, [guesses]);

  return (
    <div>
      <div>Solution: {solution}</div>
      <div>Current Guess: {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
    </div>
  );
}
