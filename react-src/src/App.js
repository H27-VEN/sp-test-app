import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Register from './component/Register';
import Profile from './component/Profile';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-header">
          <Navbar />
          <div className="app-body">
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/edit/:userId" component={Register} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
