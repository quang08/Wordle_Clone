import React from "react";

export default function Row({ guess, currentGuess }) {
  if (guess) {//render past guess after enter
    //if guess has a value then render this
    return (
      <div className="row past">
        {guess.map((letter, i) => (
          <div key={i} className={letter.color}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) { //live render current guess
    let letters = currentGuess.split("");
    
    return (
      <div className="row current">
        {letters.map((letter, i) => (
          <div key={i} className="filled">
            {letter}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((v, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }

  return (
    //else render empty
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
