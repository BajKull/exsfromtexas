import "./scss/style.css";
import Navbar from "./navbar/Navbar";
import Main from "./main/Main";
import Room from "./room/Room";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/room" component={Room} />
      </Switch>
    </Router>
  );
}

export default App;
