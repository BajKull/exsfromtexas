import React, { useEffect, useState, useRef } from "react";
import Avatar from "./avatars/Avatar";
import { useDispatch } from "react-redux";
import { setName } from "../redux/actions/userActions";
import ChangeAvatar from "./avatars/ChangeAvatar";

export default function NicknameScreen() {
  const [nick, setNick] = useState("");
  const [error, setError] = useState("");
  const input = useRef(null);
  const dispatch = useDispatch();

  const checkNick = () => {
    if (nick.length < 3)
      setError("Nickname must contains at least 3 characters.");
    else if (nick.length > 12)
      setError("Nickname must be 12 characters at max.");
    else if (/^[a-zA-Z0-9]*$/.test(nick) === false)
      setError("Nickname can't include special symbols.");
    else if (nick === "unknown") setError("Change nickname.");
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
        <Avatar />
        <ChangeAvatar />
        <label>Nickname</label>
        <input
          className="globalInput"
          value={nick}
          onChange={updateVal}
          ref={input}
        />
        <p className="error">{error}</p>
        <button onClick={checkNick}>Confirm</button>
      </div>
    </div>
  );
}
