import React, { Component } from 'react';
import './App.css';
import NavBarComponent from"../src/components/NavBarComponent.js"
import Footer from "../src/components/Footer.js"
import UserAddress from "../src/components/UserAddress.js"
import ItemFormContainer from './components/ItemFormContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavBarComponent/>
      <UserAddress/>
      <ItemFormContainer/>
      <Footer/>
      </div>
    );
  }
}

export default App;
