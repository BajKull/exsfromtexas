import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function UserPanel() {
  const [stake, setStake] = useState(0);
  const roomcode = useSelector((state) => state.connection.roomcode);
  const userId = useSelector((state) => state.user.id);
  const endpoint = useSelector((state) => state.connection.endpoint);
  const player = useSelector((state) =>
    state.players.find((p) => p.id === userId)
  );
  const roomStake = useSelector((state) => state.table.coinsInRound);
  const panel = useRef(null);

  const sendBet = (amount) => {
    fetch(`${endpoint}/api/room/${roomcode}/player/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bet: amount }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const sendFold = () => {
    fetch(`${endpoint}/api/room/${roomcode}/player/${userId}/pass`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const updateStake = (amount) => {
    if (amount === "half") setStake(roomStake / 2);
    if (amount === "third") setStake((roomStake / 4) * 3);
    if (amount === "pot") setStake(roomStake);
    if (amount === "all") setStake(player.budget);
  };

  const typeInput = (e) => {
    if (e.target.value > player.budget) setStake(player.budget);
    else if (e.target.value < 0) setStake(0);
    else if (isNaN(e.target.value)) return;
    else setStake(parseInt(e.target.value));
  };

  return (
    <div className="userPanel" ref={panel}>
      <div className="content">
        {/* {player && player.pass && (
          <div className="folded">
            <h1>Folded</h1>
          </div>
        )} */}
        <div className="stakes">
          <button onClick={() => updateStake("half")}>1/2 Pot</button>
          <button onClick={() => updateStake("third")}>3/4 Pot</button>
          <button onClick={() => updateStake("pot")}>Pot</button>
          <button onClick={() => updateStake("all")}>All-in</button>
          <input type="text" value={stake} onChange={typeInput} />
        </div>
        <div className="actions">
          <button className="red" onClick={() => sendFold()}>
            Fold
          </button>
          <button className="yellow" onClick={() => sendBet()}>
            Call
          </button>
          <button className="green" onClick={() => sendBet()}>
            Raise
          </button>
        </div>
      </div>
    </div>
  );
}
