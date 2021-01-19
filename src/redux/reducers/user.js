const defaultUser = {
  name: "unknown",
  id: 0,
  avatar: 0,
};

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case "SET_ID":
      return { ...state, id: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "CHANGE_AVATAR": {
      return {
        ...state,
        avatar: (state.avatar + (action.payload % 16) + 16) % 16,
      };
    }
    case "RESET_USER":
      return defaultUser;
    default:
      return state;
  }
};

export default user;
