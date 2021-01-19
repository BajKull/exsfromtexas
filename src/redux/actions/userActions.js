export const setName = (name) => {
  return {
    type: "SET_NAME",
    payload: name,
  };
};

export const setId = (id) => {
  return {
    type: "SET_ID",
    payload: id,
  };
};

export const changeAvatar = (how) => {
  return {
    type: "CHANGE_AVATAR",
    payload: how,
  };
};

export const resetUser = () => {
  return {
    type: "RESET_USER",
  };
};
