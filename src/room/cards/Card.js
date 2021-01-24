import React, { useEffect, useRef } from "react";
import { ReactComponent as Hearts } from "./hearts.svg";
import { ReactComponent as Diamonds } from "./diamonds.svg";
import { ReactComponent as Clubs } from "./clubs.svg";
import { ReactComponent as Spades } from "./spades.svg";

const Color = ({ suit }) => {
  if (suit === "heart") return <Hearts className="cardImg red" />;
  else if (suit === "diamond") return <Diamonds className="cardImg blue" />;
  else if (suit === "club") return <Clubs className="cardImg green" />;
  else if (suit === "spade") return <Spades className="cardImg black" />;
  else return null;
};

const Figure = ({ rank }) => {
  if (rank === 11) return <p>J</p>;
  else if (rank === 12) return <p>Q</p>;
  else if (rank === 13) return <p>K</p>;
  else if (rank === 14) return <p>A</p>;
  else return <p>{rank}</p>;
};

export default function Card({ card, hidden }) {
  const cardRef = useRef(null);
  const getClass = () => {
    if (card) {
      const suit = card.suit;
      if (suit === "heart") return "red";
      else if (suit === "diamond") return "blue";
      else if (suit === "club") return "green";
      else if (suit === "spade") return "black";
    } else return "card";
  };

  useEffect(() => {
    if (card && hidden === false)
      cardRef.current.classList.replace("covered", "uncovered");
    else cardRef.current.classList.replace("uncovered", "covered");
  }, [card, hidden]);

  if (hidden) return <div className="card covered" ref={cardRef}></div>;
  else
    return (
      <div className="card covered" ref={cardRef}>
        {card && (
          <div className={getClass()}>
            <Figure rank={card.rank} />
            <Color suit={card.suit} />
          </div>
        )}
      </div>
    );
}
