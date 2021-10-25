import Nav from "./components/Nav";
import Createroom from "./components/Createroom";
import Lobby from "./components/Lobby";
import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./components/styles/App.css";

const Homepage: React.FC = () => {
  return (
    <div className="main-page">
      <div>
        <input id="username" type="text" placeholder="Username" />
      </div>
      <div className="create-link mplink">
			  <Link to="/create">CREATE</Link>
      </div>
      <div className="join-link mplink">
			  <Link to="/join">JOIN</Link>
      </div>
      <div className="lobby-link mplink">
			  <Link to="/lobby">LOBBY</Link>
      </div>
    </div>
  );
};
export const App: React.FC = () => {
  return (
    <Fragment>
      <Nav />
	  <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/create">
          <Createroom />
        </Route>
		<Route  path="/lobby">
				<Lobby />
		</Route>
      </Switch>
	  </Router>
    </Fragment>
  );
};
