import React from "react";

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">{solution}</p>
          {turn < 2 ? (
            <p>You found the solution in {turn} guess :)</p>
          ) : (
            <p>You found the solution in {turn} guessses :)</p>
          )}
        </div>
      )}

      {!isCorrect && (
        <div>
          <h1>Nevermind!</h1>
          <p className="solution">{solution}</p>
          <p>Better luck next time :)</p>
        </div>
      )}
    </div>
  );
}
