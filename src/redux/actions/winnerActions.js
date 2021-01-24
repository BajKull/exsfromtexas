export const setWinner = (winner) => {
  return {
    type: "SET_WINNER",
    payload: winner,
  };
};

export const resetWinner = () => {
  return {
    type: "RESET_WINNER",
  };
};
