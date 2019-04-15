import React, { Component } from 'react';
import {ethers} from "ethers";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
//const provider = ethers.getDefaultProvider('kovan');
const cacheJson = require("../json/Cache.json")
const cacheAbi = cacheJson.abi;
const cacheBytecode = cacheJson.bytecode;

const itemJson = require("../json/Item.json")
const itemAbi = itemJson.abi;
const itemBytecode = itemJson.bytecode;

//const privateKey = process.env.PRIVATE_KEY;
const privateKey = "0x44f74e69ee761fd3288d497e7380861ed1825dfef32cc8b8612284c3df26fd1b";

const wallet = new ethers.Wallet(privateKey, provider);

class Cache extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Wayne's Junkyard",
            coordinates: "2345w 3456N",
            cacheCoordinates: "2345w 3456N",
            address: "",
            itemAddress: "",
            items: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);

        this.handleNMChange = this.handleNMChange.bind(this);
        this.handleCDChange = this.handleCDChange.bind(this);
        this.handleECCChange = this.handleECCChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        let factory = new ethers.ContractFactory(cacheAbi, cacheBytecode, wallet);
        let contract = await factory.deploy(this.state.coordinates, this.state.name);
        
        this.setState({address: contract.address});

        await contract.deployed();
        
    }

    async handleAddItem(event) {
        event.preventDefault();
        
        // add item address to cache
        let contractAdditem = new ethers.Contract(this.state.address, cacheAbi, provider);
        let contractWithSigner = contractAdditem.connect(wallet);
        let tx = await contractWithSigner.addItem(this.state.cacheCoordinates, this.state.itemAddress);
        await tx.wait();

        let itemsAdded = await contractWithSigner.getCacheItems(this.state.cacheCoordinates);
        this.setState({items: itemsAdded});

        // change item status
        let contractChangeStatus = new ethers.Contract(this.state.itemAddress, itemAbi, provider);
        let contractSigner = contractChangeStatus.connect(wallet);
        let txItem = await contractSigner.putItemInCache();
        await txItem.wait();
        
    }

    async handleDeleteItem(event) {
        event.preventDefault();
        
        // remove item from cache
        let contractDelitem = new ethers.Contract(this.state.address, cacheAbi, provider);
        let contractSignerDel = contractDelitem.connect(wallet);
        let txDel = await contractSignerDel.removeItem(this.state.cacheCoordinates, this.state.itemAddress);
        await txDel.wait();

        let itemsDeleted = await contractSignerDel.getCacheItems(this.state.cacheCoordinates);
        this.setState({items: itemsDeleted});

        // change item status
        let contractChangeStatusDel = new ethers.Contract(this.state.itemAddress, itemAbi, provider);
        let contractSignerSt = contractChangeStatusDel.connect(wallet);
        let txChangeItem = await contractSignerSt.removeItemFromChache();
        await txChangeItem.wait();
        
    }

    handleNMChange(event) {
        this.setState({name: event.target.value});
    }

    handleCDChange(event) {
        this.setState({coordinates: event.target.value});
    }

    handleECCChange(event) {
        this.setState({cacheCoordinates: event.target.value});
    }

    handleItemChange(event) {
        this.setState({itemAddress: event.target.value});
    }

    render() {
        return (
            <div className="container border">
                <h2>Cache</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">New Cache Name:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.name} onChange={this.handleNMChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">New Cache Coordinates:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.coordinates} onChange={this.handleCDChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Create Cache</button>
                        </div>
                    </div>
                </form>
                <h3>Cache Address: {this.state.address}</h3>
                <hr />
                <form onSubmit={this.handleAddItem}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Existing Cache Coordinates:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.cacheCoordinates} onChange={this.handleECCChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Item address:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.itemAddress} onChange={this.handleItemChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Add Item</button>
                        </div>
                    </div>
                </form>
                <form onSubmit={this.handleDeleteItem}>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Delete Item</button>
                        </div>
                    </div>
                </form>
                <h3>All Items in Cache</h3>
                <ul>
                    {this.state.items.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    };
};

export default Cache;
