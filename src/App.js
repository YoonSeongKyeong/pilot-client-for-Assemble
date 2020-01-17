import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Home } from './pages';

class App extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Route exact path="/" component={() =>Home} />
        <Switch>
          <Route path="/home" component={() => Home} />
        </Switch>
      </div>
    );
  }
}

export default App;