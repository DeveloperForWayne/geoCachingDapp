import React, { Component } from 'react';
import {ethers} from "ethers";

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
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">New Cache Name:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.cacheName} onChange={this.handleNMChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">New Cache Coordinates:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.cacheCoordinates} onChange={this.handleCDChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Create Cache</button>
                        </div>
                    </div>
                </form>
                <h3>Cache Address: {this.state.cacheAddress}</h3>
                <hr />
                <form onSubmit={this.handleAddItem}>
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
                <h3>All Items in Cache:</h3>
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
