import React, { Component } from 'react';
import {ethers} from "ethers";
import Map from "../components/Map"

const provider = ethers.getDefaultProvider('ropsten');
const cacheJson = require("../json/Cache.json");
const cacheAbi = cacheJson.abi;
const cacheBytecode = cacheJson.bytecode;
const itemJson = require("../json/Item.json")
const itemAbi = itemJson.abi;
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

class Cache extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cacheName: this.props.cacheName,
            cacheLat: this.props.cacheLat,
            cacheLng: this.props.cacheLng,
            cacheAddress: this.props.cacheAddress,
            itemAddress: this.props.itemAddress,
            itemsInCache: this.props.itemsInCache,
            createdCacheName:"",
            createdCacheLat:"",
            createdCacheLng:"",           
            createdCacheAddress:"",
            showMap:false,
            loading:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.setItems = this.setItems.bind(this);
        this.handleNMChange = this.handleNMChange.bind(this);
        this.handleCreatedNMChange = this.handleCreatedNMChange.bind(this);
        this.handleCreatedLngChange = this.handleCreatedLngChange.bind(this);
        this.handleCreatedLatChange = this.handleCreatedLatChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleCacheAddressChange = this.handleCacheAddressChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        let factory = new ethers.ContractFactory(cacheAbi, cacheBytecode, wallet);
        let contract = await factory.deploy(this.state.createdCacheLat, this.state.createdCacheLng,
        this.state.craetedCacheName);
        this.setState({createdCacheAddress: contract.address});
        await contract.deployed();  
    }

    async handleClick(event) {
        event.preventDefault();
        this.setState({showMap: true});
    }

    async handleAddItem(event) {
        event.preventDefault();
        // add item address to cache
        let contract = new ethers.Contract(this.state.cacheAddress, cacheAbi, provider);
        let contractWithSigner = contract.connect(wallet);
        let tx = await contractWithSigner.addItem(this.state.itemAddress);
        await tx.wait();
        let itemsAdded = await contractWithSigner.listItems(this.state.cacheCoordinates);
        this.setState({itemsInCache: itemsAdded});
        // change item status
        let itemContract = new ethers.Contract(this.state.itemAddress, itemAbi, provider);
        let contractSigner = itemContract.connect(wallet);
        let txItem = await contractSigner.putItemInCache();
        await txItem.wait();
    }

    setItems(items){
        this.setState({itemsInCache: items});
    }

    handleNMChange(event) {
        this.setState({cacheName: event.target.value});
    }

    handleLatChange(event) {
        this.setState({cacheLat : event.target.value});
    }

    handleLngChange(event) {
        this.setState({cacheLng : event.target.value});
    }

    handleCreatedNMChange(event) {
        this.setState({createdCacheName: event.target.value});
    }

    handleCreatedLatChange(event) {
        this.setState({createdCacheLat : event.target.value});
    }

    handleCreatedLngChange(event) {
        this.setState({createdCacheLng : event.target.value});
    }

    handleCacheAddressChange(event) {
        this.setState({cacheAddress : event.target.value});
    }

    handleItemChange(event) {
        this.setState({itemAddress: event.target.value});
    }

    render() {
        return (
            <div className="container border">
                <br/>
                To create a new cache, enter it's name and coordinates below:
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                    
                        <label className="col-sm-2 col-form-label">Name:</label>
                        <div className="col-sm-3">
                            <input className="form-control" type="text"  onChange={this.handlecreatedNMChange} />
                        </div>
                    </div>
                         <div className="form-group row">
                             <label className="col-sm-2 col-form-label">Coordinates(Latitude):</label>
                             <div className="col-sm-3">
                             <input className="form-control" type="text"  onChange={this.handleCreatedLatChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Coordinates(Longitude):</label>
                        <div className="col-sm-3">
                            <input className="form-control" type="text"  onChange={this.handleCreatedLngChange} />
                        </div>
                    </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                                <button type="submit" className="btn btn-primary">Create Cache</button>
                            </div>
                         </div>
                </form>
                    <h6>This is your new cache address: &emsp;{this.state.createdCacheAddress}</h6>
                    <button type="submit" className="btn btn-primary" onClick={this.handleClick} >Show on Map</button>
                    {this.state.showMap ?
                    <Map
                    lat={this.state.createdCacheLat}
                    lng={this.state.createdCacheLng}/> :
                    null
                    }
                <hr />

                To put an item in a cache, enter it's Ethereum address and cache's address below:
                <form onSubmit={this.handleAddItem}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Item address:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.itemAddress} onChange={this.handleItemChange} />
                            </div>
                                 <label className="col-sm-2 col-form-label">Cache Address:</label>
                            <div className="col-sm-10">
                            <input className="form-control" type="text" onChange={this.handleCacheAddressChange} />
                        </div>
                    </div>
                    <br/>
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
