import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Bg from "./bg.png";
import Smoke from "./smoke.mov";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRoomcode } from "../redux/actions/connectionActions";
import Loading from "../loading/Loading";

export default function Main() {
  const [showMenu1, setShowMenu1] = useState(true);
  const [showMenu2, setShowMenu2] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const history = useHistory();
  const endpoint = useSelector((state) => state.connection.endpoint);
  const dispatch = useDispatch();

  const vidRef = useRef(null);

  const changeMenu = () => {
    if (showMenu1) {
      setShowMenu1(false);
      setShowMenu2(true);
    } else {
      setShowMenu1(true);
      setShowMenu2(false);
    }
  };

  const changeJoinMenu = () => {
    if (showJoin) {
      setShowMenu2(true);
      setShowJoin(false);
    } else {
      setShowMenu2(false);
      setShowJoin(true);
    }
  };

  const imgOnLoad = () => {
    setLoading(false);
  };

  const createRoom = () => {
    fetch(`${endpoint}/api/createRoom`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((code) => {
        dispatch(setRoomcode(code.id));
        history.push(`/room/${code.id}`);
      });
  };

  const joinRoom = () => {
    history.push(`/room/${code}`);
  };

  const typeCode = (e) => {
    if (/^[a-zA-Z]{0,4}$/.test(e.target.value))
      setCode(e.target.value.toUpperCase());
  };

  useEffect(() => {
    if (!loading) vidRef.current.play();
  }, [loading]);

  return (
    <div className="main">
      <Loading loading={loading} />
      <div>
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

            <button onClick={() => createRoom()}>Stwórz grę</button>

            <button onClick={changeJoinMenu}>Dołącz</button>
          </div>
        </CSSTransition>
        <CSSTransition
          timeout={250}
          in={showJoin}
          unmountOnExit
          classNames="fadeout"
        >
          <div className="content">
            <h2>Kod pokoju</h2>
            <input value={code} onChange={typeCode} className="globalInput" />
            <button onClick={joinRoom}>Dołącz</button>
            <button onClick={changeJoinMenu}>Cofnij</button>
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
