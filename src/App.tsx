import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, keyboard, Position } from "./Utils";
import { wordBank } from "./wordle-bank";

function App() {
  const [board, setBoard] = useState<string[][]>(boardDefault);
  const [position, setPosition] = useState<Position>({ row: 0, column: 0 });
  const [words, setWords] = useState<string[]>([]);
  const [correctWord, setCorrectWord] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [letterState, setLetterState] = useState([{ letter: "", state: "" }]);

  useEffect(() => {
    const words = wordBank;
    const rand = Math.floor(Math.random() * words.length);
    console.log(words[rand]);
    setWords(words);
    setCorrectWord(words[rand]);
  }, []);

  const call = () => {
    let state: {
      correct: string;
      almost: string;
      disabled: string;
    } = { correct: "", almost: "", disabled: "" };
    board.forEach((row, rowIndex) => {
      row.forEach((_, columnIndex) => {
        let letter = board[rowIndex][columnIndex];
        let correct = letter === correctWord.toUpperCase()[columnIndex];
        let almost =
          !correct &&
          letter !== "" &&
          correctWord.toUpperCase().includes(letter);
        if (correct) {
          state.correct += letter;
        } else if (almost) {
          state.almost += letter;
        } else {
          state.disabled += letter;
        }
      });
    });

    keyboard.forEach((row) => {
      row.forEach((item) => {
        let correct = state.correct.includes(item);
        let almost = state.almost.includes(item);
        let disabled = state.disabled.includes(item);

        let letterState = correct
          ? "correct-letter"
          : almost
          ? "almost-letter"
          : disabled
          ? "disabled-letter"
          : "";
        setLetterState((prev) => [
          ...prev,
          {
            letter: item,
            state: letterState,
          },
        ]);
      });
    });
  };

  const onSelectLetter = (item: string) => {
    if (item === "ENTER") {
      if (position.column !== 5) return;
      call();

      let currWord: string = "";
      for (let i = 0; i < 5; i++) {
        currWord += board[position.row][i];
      }
      if (words.includes(currWord.toLowerCase())) {
        setPosition({ row: position.row + 1, column: 0 });
      } else {
        alert("Kata Tidak Ditemukan");
      }
      if (currWord.toLowerCase() === correctWord) {
        alert(`Kamu Berhasil Menebak ${correctWord.toUpperCase()}`);
        setGameOver(true);
      }
      if (position.row === 5) {
        alert(`Kamu Tidak Berhasil Menebak ${correctWord.toUpperCase()}`);
        setGameOver(true);
      }
    } else if (item === "DELETE") {
      if (position.column < 0) return;

      const newBoard = [...board];
      newBoard[position.row][position.column - 1] = "";
      setBoard(newBoard);
      setPosition({ row: position.row, column: position.column - 1 });
    } else {
      if (position.column > 4) return;

      const newBoard = [...board];
      newBoard[position.row][position.column] = item;
      setBoard(newBoard);
      setPosition({ row: position.row, column: position.column + 1 });
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Katla</h1>
      </nav>
      <div className="game">
        <Board board={board} correctWord={correctWord} currRow={position.row} />
        <Keyboard
          onSelectLetter={onSelectLetter}
          gameOver={gameOver}
          letterState={letterState}
        />
      </div>
    </div>
  );
}

export default App;
