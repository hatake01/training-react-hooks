import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from '../components/Home';
import HelloWorld from '../components/HelloWorld';
import CountUp from '../components/CountUp';
import Postcode from '../components/Postcode';

const App = () => {
  return (
    <Router>
      <h1>React Hooks Training</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/hello">About</Link>
        </li>
        <li>
          <Link to="/this">Count Up</Link>
        </li>
        <li>
          <Link to="/postcode">Post code</Link>
        </li>
      </ul>

      <hr />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/hello" component={HelloWorld} />
        <Route exact path="/this" component={CountUp} />
        <Route exact path="/postcode" component={Postcode} />
      </Switch>
    </Router>
  );
};
export default App;
