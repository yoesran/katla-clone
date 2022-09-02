import React from "react";
import "./Key.css";

interface Props {
  item: string;
  onSelectLetter: (item: string) => void;
  gameOver: boolean;
  letterState: string;
}

const Key = ({ item, onSelectLetter, gameOver, letterState }: Props) => {
  const selectLetter = () => {
    if (gameOver) return;

    onSelectLetter(item);
  };

  return (
    <div className="key" onClick={selectLetter} id={letterState}>
      {item}
    </div>
  );
};

export default Key;
