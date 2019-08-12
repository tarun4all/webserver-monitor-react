import React, { Component } from 'react';
import { Avatar } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateMonitor from './components/createMonitor';
import Login from './components/login';
import 'antd/dist/antd.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      login: false,
    };
  }

  render() {
    return (
       <Router>
        <div style={{"padding": '20%', "marginLeft": '10%'}}> 
        <Link to="/login">
          <Avatar size={40} style={{"position": 'absolute', 'top': '3%', 'right': '10%'}} icon="user" />
        </Link>

          <Route path="/" exact component={CreateMonitor} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
