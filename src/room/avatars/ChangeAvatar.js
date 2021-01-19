import React from "react";
import { useDispatch } from "react-redux";
import { changeAvatar } from "../../redux/actions/userActions";

export default function ChangeAvatar() {
  const dispatch = useDispatch();
  const changeId = (how) => {
    if (how === "-") {
      dispatch(changeAvatar(-1));
    } else {
      dispatch(changeAvatar(1));
    }
  };
  return (
    <div className="buttons">
      <button onClick={() => changeId("-")}>&lt;</button>
      <button onClick={() => changeId("+")} className="right">
        &gt;
      </button>
    </div>
  );
}
