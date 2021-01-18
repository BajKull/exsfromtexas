const defaultUser = {
  name: "unknown",
  id: 0,
};

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case "SET_ID":
      return { ...state, id: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

export default user;
