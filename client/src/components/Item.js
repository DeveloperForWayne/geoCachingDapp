import React, { Component } from 'react';
import {ethers} from "ethers";

let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
//let provider = ethers.getDefaultProvider('kovan');
let itemJson = require("../json/Item.json")
let itemAbi = itemJson.abi;
let itemBytecode = itemJson.bytecode;
let privateKey = '0x44f74e69ee761fd3288d497e7380861ed1825dfef32cc8b8612284c3df26fd1b';
let wallet = new ethers.Wallet(privateKey, provider);

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Geo Coin",
            coordinates: "2345w 3456N",
            address: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNMChange = this.handleNMChange.bind(this);
        this.handleCDChange = this.handleCDChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        let factory = new ethers.ContractFactory(cacheAbi, cacheBytecode, wallet);
        
        let contract = await factory.deploy(this.state.coordinates, this.state.name);
        
        this.setState({address: contract.address});

        await contract.deployed();
        
    }

    handleNMChange(event) {
        this.setState({name: event.target.value});
    }

    handleCDChange(event) {
        this.setState({coordinates: event.target.value});
    }

    render() {
        return (
            <div className="container border">
                <h2>Create Item</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Item Name:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.name} onChange={this.handleNMChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Create Cache</button>
                        </div>
                    </div>
                </form>
                <h3>Cache Address: {this.state.address}</h3>
            </div>
        );
    };
};

export default Item;