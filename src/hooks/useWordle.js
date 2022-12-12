import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); //each guess is an array of formatted obj. This is an array of length 6 (6 rows, 6 tries for final answer of correct 5-character word)
  const [history, setHistory] = useState([]); //each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); //keep track of keys used and color should be {a: 'green', b:'yellow',..}

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
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) setIsCorrect(true);

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]; //all the current guess
      newGuesses[turn] = formattedGuess;
      //accessing the newGuesses array based on turn as index after every guess, then the newly formattedGuess will be added into the newGuesses arr
      return newGuesses;
    }); //update the guess state to the newGuesses array with the new guess added to it

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prevUsedKeys) => {
      //keypad
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key]; //formattedGuess : {key: p, color: 'grey} -> prevUsedKeys[key] is p

        if (l.color === "green") {
          prevUsedKeys[l.key] = "green"; // {p: 'green}
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key] = "yellow";
          return;
        }
        if (l.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[l.key] = "grey";
          return;
        }
      });

      return prevUsedKeys; //{p: 'grey', e: 'grey', n: 'yellow', i: 'yellow', s: 'grey'}
    });

    setCurrentGuess(""); //after hit enter, and already added new guess under the roof, then clear current guess to start a new guess on a new row
  };

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
      addNewGuess(formatted);
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
    usedKeys,
  };
};

export default useWordle;
