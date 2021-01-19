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
  const table = useSelector((state) => state.table);
  const panel = useRef(null);
  const readyBtn = useRef(null);

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
    if (amount === "half")
      setStake(parseInt(table.coinsInRound / 2 + player.bet));
    if (amount === "third")
      setStake(parseInt((table.coinsInRound / 4) * 3 + player.bet));
    if (amount === "pot") setStake(table.coinsInRound + player.bet);
    if (amount === "all") setStake(player.budget);
  };

  const typeInput = (e) => {
    if (e.target.value > player.budget) setStake(player.budget);
    else if (e.target.value < 0) setStake(0);
    else if (isNaN(e.target.value)) return;
    else if (e.target.value === "") setStake(0);
    else setStake(parseInt(e.target.value));
  };

  const userReady = () => {
    fetch(`${endpoint}/api/room/${roomcode}/player/${userId}/ready`, {
      method: "PUT",
    });
    readyBtn.current.disabled = true;
    setTimeout(() => {
      if (table.status === "lobby") readyBtn.current.disabled = false;
    }, 1000);
  };

  return (
    <div className="userPanel" ref={panel}>
      <div className="content">
        {table.coinsInRound !== 0 && player && player.pass && (
          <div className="folded">
            <h1>Folded</h1>
          </div>
        )}
        {table.status === "lobby" && (
          <>
            {player && player.ready ? (
              <button
                className="ready notready"
                ref={readyBtn}
                onClick={userReady}
              >
                Ready
              </button>
            ) : (
              <button className="ready" ref={readyBtn} onClick={userReady}>
                Unready
              </button>
            )}
          </>
        )}
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