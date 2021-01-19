import React, { useEffect } from "react";
import Table from "./Table";
import UserPanel from "./UserPanel";
import NicknameScreen from "./NicknameScreen";
import SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import {
  Route,
  useLocation,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { resetUser, setId } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { resetPlayers, setPlayers } from "../redux/actions/playerActions";
import { setRoomcode } from "../redux/actions/connectionActions";
import { setTable } from "../redux/actions/tableActions";
import { waitFor } from "@testing-library/react";

export default function Room() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const endpoint = useSelector((state) => state.connection.endpoint);
  const roomcode = useSelector((state) => state.connection.roomcode);
  const userId = useSelector((state) => state.user.id);
  const nickname = useSelector((state) => state.user.name);
  const avId = useSelector((state) => state.user.avatar);

  useEffect(() => {
    const code = location.pathname.split("/").pop();
    dispatch(setRoomcode(code));
  }, [dispatch, location]);

  useEffect(() => {
    if (nickname === "unknown") return;
    const socket = SockJS(endpoint + "/room/" + roomcode);
    const stomp = Stomp.Stomp;
    const client = stomp.over(socket);

    const processMsg = (msg) => {
      const data = JSON.parse(msg.body);
      console.log(data);
      dispatch(setPlayers(data.players));
      dispatch(setTable(data.table));
    };

    client.connect({}, () => {
      waitFor(() =>
        client.subscribe(`/topic/room/${roomcode}`, processMsg)
      ).then(() => {
        fetch(`${endpoint}/api/room/${roomcode}/player`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname: nickname, avatar: avId }),
        })
          .then((res) => res.json())
          .then((res) => {
            // dodac 404
            if (res.status === 404) history.push("/");
            dispatch(setId(res.id));
          });
      });
    });

    return () => {
      if (roomcode !== null) {
        client.disconnect();
      }
    };
  }, [dispatch, endpoint, roomcode, nickname, avId, history]);

  useEffect(() => {
    if (nickname === "unknown") return;
    window.onbeforeunload = () => {
      navigator.sendBeacon(
        `${endpoint}/api/room/${roomcode}/player/${userId}/delete`,
        {}
      );
    };
  }, [endpoint, roomcode, userId, nickname]);

  useEffect(() => {
    return () => {
      if (userId !== 0 && roomcode !== null) {
        navigator.sendBeacon(
          `${endpoint}/api/room/${roomcode}/player/${userId}/delete`,
          {}
        );
        dispatch(setRoomcode(null));
        dispatch(resetPlayers());
        dispatch(setTable({}));
        dispatch(resetUser());
      }
    };
  }, [dispatch, endpoint, roomcode, userId]);

  return (
    <Route
      path={`${useRouteMatch().path}/:id`}
      render={() => (
        <div className="room">
          {nickname === "unknown" && <NicknameScreen />}
          <Table />
          <UserPanel />
        </div>
      )}
    />
  );
}
