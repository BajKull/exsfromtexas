import React, { useEffect, useRef } from "react";
import Cards from "./Cards";
import { ReactComponent as Placeholder } from "./avatar.svg";
import { ReactComponent as Chip } from "./chip.svg";
import { useSelector } from "react-redux";

export default function Player({ id }) {
  const player = useSelector((state) => state.players.find((p) => p.id === id));
  const playerRef = useRef(null);
  const lastActionRef = useRef(null);

  useEffect(() => {
    if (player.pass) playerRef.current.classList.add("blurred");
    else playerRef.current.classList.remove("blurred");

    if (player.lastAction === "fold")
      lastActionRef.current.classList.replace(/call|raise/, "fold");
    else if (player.lastAction === "call")
      lastActionRef.current.classList.replace(/fold|raise/, "call");
    else lastActionRef.current.classList.replace(/fold|call/, "raise");
  }, [player.lastAction, player.pass]);

  return (
    <div className="playerContainer" ref={playerRef}>
      <div className="player">
        <div className="avatar">
          <Placeholder />
        </div>
        <div className="info">
          <p className="nick">{player.nickname}</p>
          <p className="tokens">{player.budget}</p>
          <p className="action green" ref={lastActionRef}>
            {player.lastAction || "WAITING"}
          </p>
        </div>
        <Cards />
        {player.bet !== 0 && (
          <div className="userTokens">
            <Chip className="chipImg" />
            <p className="chips">{player.bet}</p>
          </div>
        )}
      </div>
    </div>
  );
}
