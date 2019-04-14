import React, { Component } from 'react';
import './App.css';
import NavBarComponent from"../src/components/NavBarComponent.js"
import Cache from "../src/components/Cache.js"
import Footer from "../src/components/Footer.js"
import ItemsOwnedContainer from './components/ItemsOwnedContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Cache />
      <Footer />
      </div>
    );
  }
}

export default App;
