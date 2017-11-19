import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tags from 'src/views/components/tags/tags-component'
import Tasks from 'src/views/components/tasks/tasks-component'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Tags</h1>
        <Tags/>
        <h1>Tasks</h1>
        <Tasks/>
      </div>
    );
  }
}

export default App;
