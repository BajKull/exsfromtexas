import React, { useEffect } from "react";
import Table from "./Table";
import UserPanel from "./UserPanel";
import NicknameScreen from "./NicknameScreen";
import SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import { Route, useLocation, useRouteMatch } from "react-router-dom";
import { setId } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { setPlayers } from "../redux/actions/playerActions";
import { setRoomcode } from "../redux/actions/connectionActions";
import { setTable } from "../redux/actions/tableActions";

export default function Room() {
  const dispatch = useDispatch();
  const location = useLocation();
  const endpoint = useSelector((state) => state.connection.endpoint);
  const roomcode = useSelector((state) => state.connection.roomcode);
  const userId = useSelector((state) => state.user.id);
  const nickname = useSelector((state) => state.user.name);

  useEffect(() => {
    const code = location.pathname.split("/").pop();
    dispatch(setRoomcode(code));
  }, [dispatch, location]);

  useEffect(() => {
    if (nickname === "unknown") return;
    const socket = SockJS(endpoint + "/room/" + roomcode);
    const stomp = Stomp.Stomp;
    const client = stomp.over(socket);
    socket.onclose = () => {};

    client.connect({}, () => {
      client.subscribe(`/topic/room/${roomcode}`, processMsg);
      fetch(`${endpoint}/api/room/${roomcode}/player`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname: nickname }),
      })
        .then((res) => res.json())
        .then((res) => dispatch(setId(res.id)));
    });

    const processMsg = (msg) => {
      const data = JSON.parse(msg.body);
      console.log(data);
      dispatch(setPlayers(data.players));
      dispatch(setTable(data.table));
    };
  }, [dispatch, endpoint, roomcode, nickname]);

  useEffect(() => {
    if (nickname === "unknown") return;
    window.onbeforeunload = () => {
      navigator.sendBeacon(
        `${endpoint}/api/room/${roomcode}/player/${userId}/delete`,
        {}
      );
    };
  }, [endpoint, roomcode, userId, nickname]);

  // const startGame = () => {
  //   fetch(`${endpoint}api/room/${roomcode}/start`, {
  //     method: "GET",
  //   });
  // };

  return (
    <Route
      path={`${useRouteMatch().path}/:id`}
      render={() => (
        <div className="room">
          {nickname === "unknown" && <NicknameScreen />}
          <Table />
          <UserPanel />
          {/* <button onClick={() => startGame()}></button> */}
        </div>
      )}
    />
  );
}
