const players = (state = [], action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return [...state, action.payload];
    case "REMOVE_PLAYER": {
      const index = state.findIndex((player) => player.id === action.payload);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    case "SET_PLAYERS":
      return action.payload;
    case "RESET_PLAYERS":
      return [];
    default:
      return state;
  }
};

export default players;
