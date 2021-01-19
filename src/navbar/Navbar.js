import React from "react";
import { ReactComponent as Logo } from "./logo2.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
        <Logo className="logoPic" />
      </Link>
      <div className="logo">
        <h1>Ex's from Texas</h1>
      </div>
      <div className="login">
        <button>Zaloguj się</button>
      </div>
    </div>
  );
}
