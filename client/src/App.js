import React, { Component } from 'react';
import './App.css';
import NavBarComponent from"../src/components/NavBarComponent.js"
import Footer from "../src/components/Footer.js"
import UserAddress from "../src/components/UserAddress.js"
import ItemsOwnedContainer from './components/ItemsOwnedContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavBarComponent/>
      <UserAddress/>
      <ItemsOwnedContainer/>
      <Footer/>
      </div>
    );
  }
}

export default App;
