import React from "react";

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">{solution}</p>
          {turn < 2 ? (
            <span>
              <p>You found the solution in {turn} guess :)</p>
              <p>Refresh to play again</p>
            </span>
          ) : (
            <span>
              <p>You found the solution in {turn} guesses :)</p>
              <p>Refresh to play again</p>
            </span>
          )}
        </div>
      )}

      {!isCorrect && (
        <div>
          <h1>Nevermind!</h1>
          <span>
            <p className="solution">{solution}</p>
            <p>Better luck next time :)</p>
            <p>Refresh to play again</p>
          </span>
        </div>
      )}
    </div>
  );
}
