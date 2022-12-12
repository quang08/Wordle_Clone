import React, { useEffect, useState } from "react";

export default function Keypad({ usedKeys }) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/letters")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);
//   console.log('this is');
//   console.log(usedKeys);

  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter.key]; //usedKeys: {p: 'grey', e: 'grey', n: 'yellow', i: 'yellow', s: 'grey'} -> usedKeys[keys] = 'grey'
          return (
            <div key={letter.key} className={color}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
}
