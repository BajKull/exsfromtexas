import React from "react";
import { useSelector } from "react-redux";
import Card from "./cards/Card";
import Chips from "./Chips";
import Players from "./Players";

export default function Table() {
  const cards = useSelector((state) => state.table.communitySet);
  const chips = useSelector((state) => state.table.coinsInRound);
  const playerBets = useSelector((state) =>
    state.players.map((p) => p.bet).reduce((a, b) => a + b, 0)
  );
  return (
    <div className="table">
      <div className="tableChips">
        <Chips amount={chips - playerBets} />
      </div>
      <Players />
      <div className="tableCards">
        {cards &&
          cards.map((card) => (
            <Card card={card} hidden={false} key={card.suit + card.rank} />
          ))}
      </div>
    </div>
  );
}
