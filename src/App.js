import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Wordle from "./components/Wordle";
import useLocalStorage from "use-local-storage";

function App() {
  const [solution, setSolution] = useState(null);
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((res) => res.json())
      .then((data) => {
        const randomSolution = data[Math.floor(Math.random() * data.length)];
        setSolution(randomSolution.word);
      });
  }, []); //[] ?

  return (
    <div className="app" data-theme={theme}>
      <div className="navbar">
        <div></div>
        <h1>Wordle</h1>
        <i onClick={switchTheme} className="fas fa-toggle-on toggle"></i>
      </div>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;

/*
Data needed to track:
- solution (word to guess):
  -> 5 letter string
- past guesses (guessed letters, 5 letters in a turn):
  -> an array of past guesses
  -> each past guess is an array of letter object [{},{},{},{},{}]
  -> each obj represents a letter in the word to guess {key: 'a', color: 'yellow'} 
- current guess
  -> a string max of 5 letters
- keypad letters
  -> array of letter objects [{key: 'a', color: 'green'}, {}, {},...] that we have to colorized
- number of turns
  -> int from 0->6


game process:
  -- entering words:
    -- user enters a letter & a square is filled with that letter
    -- when a user hits delete it deletes the previous letter
    -- when a user hits enter it submits the word
      -- if all squares are not filled with letters then the word is not submitted
      -- if that word has already been used in a prev guess then the word is not submitted
  -- checking submitted words:
    -- each letter is checked to see if it matches to the solution
    -- each letter is assigned a color based on it's inclusion in the solution
      -- exact matches (correct position in the solution) are green
      -- partial matches (in the solution but not the correct position) are yellow
      -- none-matches (not in the solution at all) are grey
    -- the guess is added the grid with the correct colors
    -- the current guess moves to the next row
    -- the keypad letters are updated (colors)
  -- ending the game:
    -- when the guessed word fully matches the solution
      -- modal to say 'well done'
    -- when the user runs out of guesses
      -- modal to say 'unlucky'
*/

/*
solution data:
- 3rd party api
- own db
- json file
*/
