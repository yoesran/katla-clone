import React from "react";
import "./Letter.css";

interface Props {
  letter: string;
  letterState: string;
}

const Letter = ({ letter, letterState }: Props) => {
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
