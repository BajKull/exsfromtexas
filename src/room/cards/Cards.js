import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

export default function Cards({ player }) {
  const [hidden, setHidden] = useState(true);
  const user = useSelector((state) => state.user);
  const winner = useSelector((state) => state.winner);

  useEffect(() => {
    if (user.id === player.id || winner) setHidden(false);
  }, [player.id, user.id, winner]);

  return (
    <div className="cards">
      <Card card={player.holeSet.holeCard1} hidden={hidden} />
      <Card card={player.holeSet.holeCard2} hidden={hidden} />
    </div>
  );
}
