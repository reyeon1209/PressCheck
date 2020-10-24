import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from "./screens/Home.js";
import News from "./screens/News.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/news" component={News} />
            {/* <Route path="/professor/edit/:id" component={EditProblem} />
            <Route path="/professor/create" component={CreateProblem} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
