import React, { useEffect, useRef } from "react";
import Cards from "./cards/Cards";
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
    } else {
      playerRef.current.classList.remove("transparent");
    }

    if (player.ready) lastActionRef.current.classList.replace("fold", "raise");
    else lastActionRef.current.classList.replace("raise", "fold");

    if (player.active) playerRef.current.classList.add("turn");
    else playerRef.current.classList.remove("turn");

    if (player.lastAction === "fold") {
      lastActionRef.current.classList.remove("raise");
      lastActionRef.current.classList.remove("call");
      lastActionRef.current.classList.add("fold");
    } else if (player.lastAction === "call") {
      lastActionRef.current.classList.remove("raise");
      lastActionRef.current.classList.remove("fold");
      lastActionRef.current.classList.add("call");
    } else if (player.lastAction === "raise") {
      lastActionRef.current.classList.remove("call");
      lastActionRef.current.classList.remove("fold");
      lastActionRef.current.classList.add("raise");
    }
  }, [player]);

  return (
    <div className="playerContainer">
      <div className="player" ref={playerRef}>
        <Avatar avatar={player.avatar} pass={player.pass} />

        <div className="info">
          <p className="nick">{player.nickname}</p>
          <p className="tokens">{player.budget}</p>
          <p className="action fold" ref={lastActionRef}>
            {gameStarted === "game" ? (
              <>{player.lastAction || "WAITING"}</>
            ) : (
              <>{player.ready ? "READY" : "UNREADY"}</>
            )}
          </p>
        </div>
        <Cards player={player} />
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
