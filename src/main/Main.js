import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Bg from "./bg.png";
import Smoke from "./smoke2.mov";

export default function Main() {
  const [showMenu1, setShowMenu1] = useState(true);
  const [showMenu2, setShowMenu2] = useState(false);
  const [loading, setLoading] = useState(true);

  const vidRef = useRef(null);
  const leftCard = useRef(null);
  const rightCard = useRef(null);

  const changeMenu = () => {
    if (showMenu1) {
      setShowMenu1(false);
      setShowMenu2(true);
    } else {
      setShowMenu1(true);
      setShowMenu2(false);
    }
  };

  const imgOnLoad = () => {
    // leftCard.current.classList.remove("floating");
    // rightCard.current.classList.remove("floating");
    leftCard.current.classList.add("leftCardGo");
    rightCard.current.classList.add("rightCardGo");
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    // vidRef.current.playbackRate = 0.9;
    if (!loading) vidRef.current.play();
  }, [loading]);

  return (
    <div className="main">
      <CSSTransition
        className="mainLoading"
        in={loading}
        timeout={250}
        unmountOnExit
        classNames="fadeout"
      >
        <div>
          <div className="card leftCard floating" ref={leftCard}></div>
          <div className="card rightCard floating" ref={rightCard}></div>
        </div>
      </CSSTransition>
      <div>
        {" "}
        <CSSTransition
          timeout={350}
          in={showMenu1}
          unmountOnExit
          classNames="fadeout"
        >
          <div className="content">
            <h2>Texas Hold'em online</h2>
            <h3>
              Rzuć wyzwanie innym i pokonaj ich w darmowej rozgrywce pokera
              online.
            </h3>
            <button onClick={changeMenu}>Graj</button>
          </div>
        </CSSTransition>
        <CSSTransition
          timeout={250}
          in={showMenu2}
          unmountOnExit
          classNames="fadeout"
        >
          <div className="content">
            <h2>Texas Hold'em online</h2>
            <button>Stwórz grę</button>
            <button>Dołącz</button>
          </div>
        </CSSTransition>
        <div className="background">
          <video
            muted
            loop
            className="bgSmoke"
            preload="none"
            playsInline
            ref={vidRef}
          >
            <source src={Smoke} type="video/mp4" />
          </video>
          <img src={Bg} alt="" className="bgPic" onLoad={imgOnLoad} />
        </div>
        <div className="lines">
          <hr className="line line1" />
          <hr className="line line2" />
          <hr className="line line3" />
        </div>
      </div>
    </div>
  );
}
