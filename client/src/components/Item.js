import React, { Component } from 'react';
import {ethers} from "ethers";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
//const provider = ethers.getDefaultProvider('kovan');
const itemJson = require("../json/Item.json")
const itemAbi = itemJson.abi;
const itemBytecode = itemJson.bytecode;
//const privateKey = process.env.PRIVATE_KEY;
const privateKey = "0x44f74e69ee761fd3288d497e7380861ed1825dfef32cc8b8612284c3df26fd1b";

const wallet = new ethers.Wallet(privateKey, provider);

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "logbooks",
            address: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        let factory = new ethers.ContractFactory(itemAbi, itemBytecode, wallet);

        let contract = await factory.deploy("", this.state.name, wallet.address, false);
        
        this.setState({address: contract.address});

        await contract.deployed();
        
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    render() {
        return (
            <div className="container border">
                <h2>Item</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Item Name:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-success">Create Item</button>
                        </div>
                    </div>
                </form>
                <h3>Item Address: {this.state.address}</h3>
            </div>
        );
    };
};

export default Item;