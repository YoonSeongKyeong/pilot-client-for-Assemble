import React from 'react';
// import {Route, Switch} from 'react-router-dom';
import { Home, Room, Group } from './pages';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css'

class App extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/rooms/:roomId/people/:username" component={Group} />
            <Route path="/rooms/:roomId" component={Room} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;