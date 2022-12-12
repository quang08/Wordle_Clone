import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup } = useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup); //keyup cleaner, prevent adding too many events
  }, [handleKeyup]); //every time handlekeyup is triggered + initial render

  return (
    <div>
      <div>Solution: {solution}</div>
      <div>Current Guess: {currentGuess}</div>
    </div>
  );
}
