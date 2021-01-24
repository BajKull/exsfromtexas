const winner = (state = null, action) => {
  switch (action.type) {
    case "SET_WINNER":
      return { ...state, ...action.payload };
    case "RESET_WINNER":
      return null;
    default:
      return state;
  }
};
export default winner;
