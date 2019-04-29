import React, { Component } from 'react';
//import './App.css';
import GeoCacher from"../src/components/GeoCacher.js"
import Cache from "../src/components/Cache.js"
import Footer from "../src/components/Footer.js"
import Item from '../src/components/Item.js';
import Header from '../src/components/Header.js';

//require('dotenv').config();

class App extends Component {
  constructor(){
    super();
    this.state= {
      itemName: "",
      itemAddress: "",
      cacheName: "",
      cacheLat : "",
      cacheLng : "",
      cacheAddress: "",
      geocacherName: "",
      geocacherAddress: "",
      itemsInBag: [],
      itemsInCache: []
    }
    this.setItemInCache = this.setItemInCache.bind(this);
  }

  setItemInCache(items) {
    this.setState({
      itemsInCache : items
    })
    this.changeItem.setItems(items);
  }

  render() {
    return (
      <div className="container">
      <br/>
      <Header/>
      <br/>
      <h1>Geocacher</h1>
      <GeoCacher             
            geocacherName={this.state.geocacherName}
            geocacherAddress={this.state.geocacherAddress}
            cacheAddress={this.state.cacheAddress}
            itemAddress={this.state.itemAddress}
            itemsInBag={this.state.itemsInBag}
            itemsInCache={this.state.itemsInCache}
            changeItemIncache={this.setItemInCache} />
      <br/>
      <h1>Items</h1>
      <Item itemName={this.state.itemName} 
            itemAddress={this.state.itemAddress}/><br />
      <h1>Caches</h1>
      <Cache             
            cacheName={this.state.cacheName}
            cacheLat={this.state.cacheLat}
            cacheLng={this.state.cacheLng}
            cacheAddress={this.state.cacheAddress}
            itemAddress={this.state.itemAddress}
            itemsInCache={this.state.itemsInCache}
            ref={changeItem => {
              this.changeItem = changeItem;
            }} /><br />
      
      <Footer />
      </div>
    );
  }
}

export default App;
