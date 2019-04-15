import React, { Component } from 'react';
import './App.css';
import GeoCacher from"../src/components/GeoCacher.js"
import Cache from "../src/components/Cache.js"
import Footer from "../src/components/Footer.js"
import Item from '../src/components/Item.js';

class App extends Component {
  render() {
    return (
      <div className="container">
      <Cache /><br />
      <Item /><br />
      <GeoCacher />
      <Footer />
      </div>
    );
  }
}

export default App;
