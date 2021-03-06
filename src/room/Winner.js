import React from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";

export default function Winner() {
  const winner = useSelector((state) => state.winner);
  return (
    <CSSTransition
      in={winner !== null}
      timeout={350}
      classNames="comeFromBottom"
      unmountOnExit
    >
      <div className="winner">
        <h1>Winner of round: {winner && winner.nickname}</h1>
        <h2>Hand: {winner && winner.winningHand}</h2>
      </div>
    </CSSTransition>
  );
}
