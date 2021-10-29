import Nav from "./components/Nav";
import Createroom from "./components/Createroom";
import Homepage from "./components/Homepage";
import Lobby from "./components/Lobby";
import Room from "./components/Room";
import { store, RootState } from "./components/store/store";
import { Provider, connect, ConnectedProps } from "react-redux";
import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./components/styles/App.css";

export const App = (props: Propsfromredux) => {
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
            <Route path="/room/:rid" children={<Room />} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

const mapState = (state: RootState) => ({
  roomid: state.room.roomid,
});
const connector = connect(mapState);
type Propsfromredux = ConnectedProps<typeof connector>;
export default connector(App);
