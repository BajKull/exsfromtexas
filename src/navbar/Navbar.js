import React, { useRef, useState } from "react";
import { ReactComponent as Logo } from "./logo2.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as Click } from "./click.svg";

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const roomcode = useSelector((state) => state.connection.roomcode);
  const copyBtn = useRef(null);

  const copyCode = () => {
    navigator.clipboard.writeText(
      `https://exsfromtexas.netlify.app/room/${roomcode}`
    );
    setCopied(true);
    copyBtn.current.disabled = true;
    setTimeout(() => {
      setCopied(false);
      copyBtn.current.disabled = false;
    }, 3000);
  };
  return (
    <div className="navbar">
      <Link to="/">
        <Logo className="logoPic" />
      </Link>
      <div className="logo">
        <h1>Ex's from Texas</h1>
      </div>
      <div className="login">
        {roomcode ? (
          <button onClick={() => copyCode()} ref={copyBtn}>
            {roomcode}
            <Click className="click" />
          </button>
        ) : (
          <button>Log in</button>
        )}
      </div>
      <CSSTransition
        in={copied}
        timeout={350}
        classNames="comeFromTop"
        unmountOnExit
        className="clipboard"
      >
        <h1>Link copied to clipboard!</h1>
      </CSSTransition>
    </div>
  );
}
