import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn } = useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup); //keyup cleaner, prevent adding too many events
  }, [handleKeyup]); //every time handlekeyup is triggered + initial render

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  },[guesses, turn, isCorrect])

  return (
    <div>
      <div>Solution: {solution}</div>
      <div>Current Guess: {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
    </div>
  );
}
