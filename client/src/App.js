import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from "./screens/Home.js";
import News from "./screens/News.js";
import Analyze from "./screens/Analyze.js";
import Todays from "./screens/Todays.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/news" component={News} />
            <Route path="/analyze" component={Analyze} />
            <Route path="/todays" component={Todays} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
