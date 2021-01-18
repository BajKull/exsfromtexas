import React from "react";
import Player from "./Player";
import { useSelector } from "react-redux";

export default function Players() {
  const players = useSelector((state) => state.players);
  return (
    <div className="players">
      {players.map((player) => (
        <Player key={player.id} id={player.id} />
      ))}
    </div>
  );
}
