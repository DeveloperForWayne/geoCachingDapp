import React, { Component } from 'react';
import './App.css';
//import NavBarComponent from"../src/components/NavBarComponent.js"
import Footer from "../src/components/Footer.js"
import Header from "../src/components/Header.js"


class App extends Component {
  render() {
    return (
      <div className="container">
      <Header/>
  
    
      <Footer/>
      </div>
    );
  }
}

export default App;
