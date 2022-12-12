import React from "react";
import Row from "./Row";

export default function Grid({ currentGuess, guesses, turn }) {
  return (
    <div>
      {guesses.map((guess, i) => {
        if(turn === i) { //only pass the currentGuess in on 1 row - the row that is being selected on that turn. else, 1 letter typed will be shown in 6 rows
            return <Row key={i} currentGuess={currentGuess} />; //render current guesses live
        }
        return <Row key={i} guess={guess} />; //render past guesses
      })}
    </div>
  );
}
