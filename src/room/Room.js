import React, { useEffect, useState } from "react";
import Table from "./Table";
import UserPanel from "./UserPanel";
import NicknameScreen from "./NicknameScreen";
import SockJS from "sockjs-client";
import Winner from "./Winner";
import * as Stomp from "@stomp/stompjs";
import { Route, useLocation, useHistory } from "react-router-dom";
import { resetUser, setId } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { resetPlayers, setPlayers } from "../redux/actions/playerActions";
import { setRoomcode } from "../redux/actions/connectionActions";
import { setTable } from "../redux/actions/tableActions";
import { setWinner, resetWinner } from "../redux/actions/winnerActions";
import Loading from "../loading/Loading";

export default function Room() {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const socket = SockJS(endpoint + "/room/" + roomcode);
    const stomp = Stomp.Stomp;
    const client = stomp.over(socket);
    client.debug = () => {};

    const processMsg = (msg) => {
      const data = JSON.parse(msg.body);
      console.log(data);
      if (data.messageType === "roomStatus") {
        dispatch(setPlayers(data.players));
        dispatch(setTable(data.table));
        setLoading(false);
        dispatch(resetWinner());
      } else if (data.messageType === "winner") {
        dispatch(setWinner(data.winners[0]));
      }
    };

    client.connect({}, () => {
      client.subscribe(`/topic/room/${roomcode}`, processMsg);
      setTimeout(() => {
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
      }, 500);
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
      path={`/room/:id`}
      render={() => (
        <div className="room">
          <Loading loading={loading} cname="bigLoading" />
          {nickname === "unknown" && <NicknameScreen />}
          <Table />
          <UserPanel />
          <Winner />
        </div>
      )}
    />
  );
}
