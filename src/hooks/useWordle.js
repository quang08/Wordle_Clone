import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]); //each guess is an array
  const [history, setHistory] = useState(["hello"]); //each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an array of letter objects [{key: 'a', color: 'red'}]
  const formatGuess = () => {
    let solutionArray = [...solution]; //spread to indvidual letters
    let formattedGuess = [...currentGuess].map((letter) => {
      return {
        key: letter,
        color: "grey", //default
      };
    });

    //find add green (same index, correct guess)
    formattedGuess.forEach((letter, i) => {
      if (solutionArray[i] === letter.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null; //cross out the matched letter
      }
    });

    //find add yellow(correct guess, incorrect index <-> included anywhere but the green ones)
    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
        //cross out the matched letter (since it could be anywhere, we have to specify the LETTER's index)
      }
    });

    return formattedGuess;
  };

  //add guesses into the guesses state
  //update the isCorrect state if guess is correct
  //add 1 to turn state
  const addNewGuess = () => {};

  //handle keyup event and track current guess
  //when user hit enter, add the new guess
  const handleKeyup = ({ key }) => {
    //destructure key in event
    if (key === "Enter") {
      //only add guess if turn < 5
      if (turn > 5) {
        console.log("used up guesses");
        return;
      }
      //do not allow duplicate word (check history)
      if (history.includes(currentGuess)) {
        console.log("already tried this word");
        return;
      }
      //check word 5 characters long
      if (currentGuess.length !== 5) {
        console.log("words must be 5 characters long");
        return;
      }

      const formatted = formatGuess();
      console.log(formatted);
    }

    if (key === "Backspace") {
      //delete
      setCurrentGuess((prev) => {
        return prev.slice(0, -1); //return a new string with last character removed
      });
      return;
    }
    if (key.match(/^[A-Za-z]$/)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key; //string so concatenate
        });
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
