import Nav from "./components/Nav";
import Createroom from "./components/Createroom";
import Homepage from './components/Homepage';
import Lobby from "./components/Lobby";
import { store  } from "./components/store/store";
import { Provider } from 'react-redux'
import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./components/styles/App.css";

export const App = () => {
  return (
    <Provider store={store}>
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
            <Route path="/lobby">
              <Lobby />
            </Route>
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;
