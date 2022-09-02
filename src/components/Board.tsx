import React from "react";
import { boardDefault } from "../Utils";
import "./Board.css";
import Letter from "./Letter";

interface Props {
  board: string[][];
  correctWord: string;
  currRow: number;
}

const Board = ({ board, correctWord, currRow }: Props) => {
  return (
    <div className="board">
      {boardDefault.map((row: string[], rowIndex: number) => {
        return (
          <div key={`Board row ${rowIndex}`} className="row">
            {row.map((_, columnIndex) => {
              let letter = board[rowIndex][columnIndex];
              let correct = letter === correctWord.toUpperCase()[columnIndex];
              let almost =
                !correct &&
                letter !== "" &&
                correctWord.toUpperCase().includes(letter);
              let letterState = "disabled-letter";

              if (currRow > rowIndex) {
                letterState = correct
                  ? "correct-letter"
                  : almost
                  ? "almost-letter"
                  : "disabled-letter";
              }

              return (
                <Letter
                  key={`Letter ${rowIndex}${columnIndex}`}
                  letter={letter}
                  letterState={letterState}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
