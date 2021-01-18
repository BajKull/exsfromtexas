export const addPlayer = (player) => {
  return {
    type: "ADD_PLAYER",
    payload: player,
  };
};

export const removePlayer = (id) => {
  return {
    type: "REMOVE_PLAYER",
    payload: id,
  };
};

export const resetPlayers = () => {
  return {
    type: "RESET_PLAYERS",
  };
};

export const setPlayers = (players) => {
  return {
    type: "SET_PLAYERS",
    payload: players,
  };
};
