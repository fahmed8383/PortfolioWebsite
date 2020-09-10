import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Navbar from './Components/Navbar';
import Home from './Views/Home'
import './css/App.scss';

class App extends Component{
  state = {
  }
  render(){
    return (
      <Router>
        <div>
          <Route path="/" component={Navbar}></Route>
          <Route exact path="/" component={Home}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
