import React, { useCallback, useEffect } from "react";
import { keyboard } from "../Utils";
import Key from "./Key";
import "./Keyboard.css";

interface Props {
  onSelectLetter: (item: string) => void;
  gameOver: boolean;
  letterState: {
    letter: string;
    state: string;
  }[];
}

const Keyboard = ({ onSelectLetter, gameOver, letterState }: Props) => {
  const handleKeyboard: (event: KeyboardEvent) => any = useCallback(
    (event: KeyboardEvent) => {
      if (gameOver) return;

      if (event.key === "Enter") {
        onSelectLetter("ENTER");
      } else if (event.key === "Backspace") {
        onSelectLetter("DELETE");
      } else {
        keyboard.forEach((rows) => {
          rows.forEach((key) => {
            if (event.key.toLowerCase() === key.toLowerCase()) {
              onSelectLetter(key);
            }
          });
        });
      }
    },
    [onSelectLetter, gameOver]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      {keyboard.map((row, rowIndex) => {
        return (
          <div key={`Keyboard row ${rowIndex}`} className="line">
            {row.map((item, columnIndex) => {
              let state: string = "";
              letterState.forEach((element) => {
                if (element.letter === item) {
                  state = element.state;
                  return;
                }
              });
              return (
                <Key
                  key={`Key ${rowIndex}${columnIndex}`}
                  item={item}
                  onSelectLetter={onSelectLetter}
                  gameOver={gameOver}
                  letterState={state}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
