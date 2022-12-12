import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]); //each guess is an array
  const [history, setHistory] = useState([]); //each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an array of letter objects [{key: 'a', color: 'red'}]
  const formatGuess = () => {};

  //add guesses into the guesses state
  //update the isCorrect state if guess is correct
  //add 1 to turn state
  const addNewGuess = () => {};

  //handle keyup event and track current guess
  //when user hit enter, add the new guess
  const handleKeyup = ({ key }) => { //destructure key in event
    if(key === 'Backspace') { //delete
        setCurrentGuess((prev) => {
          return prev.slice(0,-1); //return a new string with last character removed
        });
        return;
    }
    if (key.match(/^[A-Za-z]$/)){
        if(currentGuess.length < 5) {
            setCurrentGuess(prev => {
                return prev + key; //string so concatenate
            })
        }
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    handleKeyup,
  };
};

export default useWordle;
