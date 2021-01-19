const config = {
  endpoint: "https://tranquil-tundra-62034.herokuapp.com",
  roomcode: null,
};

const connection = (state = config, action) => {
  switch (action.type) {
    case "SET_ROOMCODE":
      return { ...state, roomcode: action.payload };
    default:
      return state;
  }
};

export default connection;
