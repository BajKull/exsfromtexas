import React, { useEffect, useRef } from "react";
import Cards from "./Cards";
import { ReactComponent as Chip } from "./chip.svg";
import { useSelector } from "react-redux";
import Avatar from "./avatars/Avatar";

export default function Player({ id }) {
  const player = useSelector((state) => state.players.find((p) => p.id === id));
  const playerRef = useRef(null);
  const lastActionRef = useRef(null);
  const gameStarted = useSelector((state) => state.table.status);

  useEffect(() => {
    if (player.pass) {
      playerRef.current.classList.add("transparent");
      document.getElementsByClassName("avatar")[0].classList.add("blurred");
    } else {
      playerRef.current.classList.remove("transparent");
      document.getElementsByClassName("avatar")[0].classList.remove("blurred");
    }

    if (player.active) playerRef.current.classList.add("turn");
    else playerRef.current.classList.remove("turn");

    if (player.lastAction === "fold")
      lastActionRef.current.classList.replace(/call|raise/, "fold");
    else if (player.lastAction === "call")
      lastActionRef.current.classList.replace(/fold|raise/, "call");
    else lastActionRef.current.classList.replace(/fold|call/, "raise");
  }, [player.active, player.lastAction, player.pass]);

  return (
    <div className="playerContainer" ref={playerRef}>
      <div className="player">
        <Avatar avatar={player.avatar} />

        <div className="info">
          <p className="nick">{player.nickname}</p>
          <p className="tokens">{player.budget}</p>
          <p className="action green" ref={lastActionRef}>
            {gameStarted === "game" ? (
              <>{player.lastAction || "WAITING"}</>
            ) : (
              <>{player.ready ? "READY" : "UNREADY"}</>
            )}
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
