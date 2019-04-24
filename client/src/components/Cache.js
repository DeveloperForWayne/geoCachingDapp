import React, { Component } from 'react';
import {ethers} from "ethers";
import Map from "../components/Map"

const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
//const provider = ethers.getDefaultProvider('kovan');
const cacheJson = require("../json/Cache.json");
const cacheAbi = cacheJson.abi;
const cacheBytecode = cacheJson.bytecode;

const itemJson = require("../json/Item.json")
const itemAbi = itemJson.abi;

//const privateKey = process.env.PRIVATE_KEY;
const privateKey = "0x391e818eee3d1cba9c1fffc2078302041e0d1b4ce2fdc3ee60dd420fc7c2241e";

const wallet = new ethers.Wallet(privateKey, provider);

class Cache extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cacheName: this.props.cacheName,
            cacheCoordinates: this.props.cacheCoordinates,
            cacheAddress: this.props.cacheAddress,
            itemAddress: this.props.itemAddress,
            itemsInCache: this.props.itemsInCache
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.setItems = this.setItems.bind(this);

        this.handleNMChange = this.handleNMChange.bind(this);
        this.handleCDChange = this.handleCDChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        let factory = new ethers.ContractFactory(cacheAbi, cacheBytecode, wallet);
        let contract = await factory.deploy(this.state.cacheCoordinates, this.state.cacheName);
        
        this.setState({cacheAddress: contract.address});

        await contract.deployed();
        
    }

    //to show on the map
    async handleClick(event) {
        event.preventDefault();

    }

    async handleAddItem(event) {
        event.preventDefault();
        
        // add item address to cache
        let contractAdditem = new ethers.Contract(this.state.cacheAddress, cacheAbi, provider);
        let contractWithSigner = contractAdditem.connect(wallet);
        let tx = await contractWithSigner.addItem(this.state.cacheCoordinates, this.state.itemAddress);
        await tx.wait();

        let itemsAdded = await contractWithSigner.getCacheItems(this.state.cacheCoordinates);
        this.setState({itemsInCache: itemsAdded});

        // change item status
        let contractChangeStatus = new ethers.Contract(this.state.itemAddress, itemAbi, provider);
        let contractSigner = contractChangeStatus.connect(wallet);
        let txItem = await contractSigner.putItemInCache();
        await txItem.wait();
        
    }

    setItems(items){
        this.setState({itemsInCache: items});
    }

    handleNMChange(event) {
        this.setState({cacheName: event.target.value});
    }

    handleCDChange(event) {
        this.setState({cacheCoordinates: event.target.value});
    }

    handleItemChange(event) {
        this.setState({itemAddress: event.target.value});
    }

    render() {
        return (
            <div className="container border">
                {/* <h1>Cache</h1> */}
                <br/>
                To create a new cache, enter it's name and exact coordinates below:
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                    
                        <label className="col-sm-2 col-form-label">Name:</label>
                        <div className="col-sm-3">
                            <input className="form-control" type="text" value={this.state.cacheName} onChange={this.handleNMChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Coordinates:</label>
                        <div className="col-sm-3">
                            <input className="form-control" type="text" value={this.state.cacheCoordinates} onChange={this.handleCDChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6">
                        <button type="submit" className="btn btn-primary">Create Cache</button>
                        </div>
                    </div>
                </form>
                <h6>This is your new cache address: &emsp;{this.state.cacheAddress}</h6>
                <button type="submit" className="btn btn-primary" onClick={this.handleClick} >Show on Map</button>
                <hr />

                To put an item in a cache, enter it's Ethereum address and cache's coordinates below:
                <form onSubmit={this.handleAddItem}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Item address:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.itemAddress} onChange={this.handleItemChange} />
                        </div>
                        <label className="col-sm-2 col-form-label">Cache coordinates:</label>
                        <div className="col-sm-3">
                            <input className="form-control" type="text" value={this.state.itemAddress} onChange={this.handleCDChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Add Item</button>
                        </div>
                    </div>
                </form>
                <h6>All Items in This Cache:</h6>
                <ul>
                    {this.state.itemsInCache.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    };
};

export default Cache;
