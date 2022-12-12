import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect){ 
        setTimeout(() => setShowModal(true),2000); //show after lost 2s, because dont want to interrupt tiles animation
        window.removeEventListener("keyup", handleKeyup)
    };

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000); //show after lost 2s, because dont want to interrupt tiles animation
      window.removeEventListener("keyup", handleKeyup);
    };

    return () => window.removeEventListener("keyup", handleKeyup); //keyup cleaner, prevent adding too many events
  }, [handleKeyup, isCorrect, turn]); //every time handlekeyup or correct answer or out of turn is triggered + initial render

  //   useEffect(() => {
  //     console.log(guesses);
  //   }, [guesses]);

  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution}/>}
    </div>
  );
}
