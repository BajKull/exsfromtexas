import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setName } from "../redux/actions/userActions";

export default function NicknameScreen() {
  const [nick, setNick] = useState("");
  const [error, setError] = useState("");
  const input = useRef(null);
  const dispatch = useDispatch();

  const checkNick = () => {
    if (nick.length < 3)
      setError("Nazwa użytkownika musi zawierać co najmniej 3 znaki.");
    else if (nick.length > 12)
      setError("Nazwa użytkownika może zawierać co najmwyżej 12 znaków.");
    else if (/^[a-zA-Z0-9]*$/.test(nick) === false)
      setError("Nazwa użytkownika nie może zawierać znaków specjalnych.");
    else if (nick === "unknown") setError("Zmień nazwę użytkownika.");
    else {
      setError("");
      dispatch(setName(nick));
    }
  };

  const updateVal = (e) => {
    setNick(e.target.value);
    setError("");
    input.current.classList.remove("errorColor");
  };

  useEffect(() => {
    if (error) input.current.classList.add("errorColor");
    else input.current.classList.remove("errorColor");
  }, [error]);

  return (
    <div className="nickScreen">
      <div className="content">
        <label>Twoja nazwa</label>
        <input
          className="globalInput"
          value={nick}
          onChange={updateVal}
          ref={input}
        />
        <p className="error">{error}</p>
        <button onClick={checkNick}>Potwierdź</button>
      </div>
    </div>
  );
}
