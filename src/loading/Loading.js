import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function Loading({ loading }) {
  const leftCard = useRef(null);
  const rightCard = useRef(null);

  useEffect(() => {
    if (!loading && leftCard.current && rightCard.current) {
      leftCard.current.classList.add("leftCardGo");
      rightCard.current.classList.add("rightCardGo");
    }
  }, [loading]);
  return (
    <CSSTransition
      className="mainLoading"
      in={loading}
      timeout={750}
      unmountOnExit
      classNames="fadeoutLoading"
    >
      <div>
        <div className="card leftCard floating" ref={leftCard}></div>
        <div className="card rightCard floating" ref={rightCard}></div>
      </div>
    </CSSTransition>
  );
}
