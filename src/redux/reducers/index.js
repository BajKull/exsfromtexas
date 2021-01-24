import Players from "./players";
import User from "./user";
import Connection from "./connection";
import Table from "./table";
import Winner from "./winner";
import { combineReducers } from "redux";
const allReducers = combineReducers({
  players: Players,
  user: User,
  connection: Connection,
  table: Table,
  winner: Winner,
});

export default allReducers;
