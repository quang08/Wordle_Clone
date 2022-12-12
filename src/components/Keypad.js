import React, { useEffect, useState } from "react";

export default function Keypad() {
   const [letters, setLetters] = useState(null);

   useEffect(() => {
     fetch("http://localhost:3001/letters")
       .then((res) => res.json())
       .then((json) => {
         setLetters(json);
       });
   }, []);

const KEYS = [
  { key: "a" },
  { key: "b" },
  { key: "c" },
  { key: "d" },
  { key: "e" },
  { key: "f" },
  { key: "g" },
  { key: "h" },
  { key: "i" },
  { key: "j" },
  { key: "k" },
  { key: "l" },
  { key: "m" },
  { key: "n" },
  { key: "o" },
  { key: "p" },
  { key: "q" },
  { key: "r" },
  { key: "s" },
  { key: "t" },
  { key: "u" },
  { key: "v" },
  { key: "w" },
  { key: "x" },
  { key: "y" },
  { key: "z" },
];
// setLetters(KEYS);
   return (
     <div className="keypad">
       {letters &&
         letters.map((l) => {
           return <div key={l.key}>{l.key}</div>;
         })}
     </div>
   );
}
