import React, { Component } from 'react';
import {ethers} from "ethers";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
//const provider = ethers.getDefaultProvider('kovan');
const GeoCacherJson = require("../json/GeoCacher.json");
const geoCacherAbi = GeoCacherJson.abi;
const geoCacherBytecode = GeoCacherJson.bytecode;

const cacheJson = require("../json/Cache.json");
const cacheAbi = cacheJson.abi;

const itemJson = require("../json/Item.json")
const itemAbi = itemJson.abi;

//const privateKey = process.env.PRIVATE_KEY;
const privateKey = "0x391e818eee3d1cba9c1fffc2078302041e0d1b4ce2fdc3ee60dd420fc7c2241e";

const wallet = new ethers.Wallet(privateKey, provider);

class GeoCacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geocacherName: this.props.geocacherName,
            geocacherAddress: this.props.geocacherAddress,
            cacheAddress: this.props.cacheAddress,
            itemAddress: this.props.itemAddress,
            cacheCoordinates: this.props.cacheCoordinates,
            itemsInBag: this.props.itemsInBag,
            itemsInCache: this.props.itemsInCache
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClaimItem = this.handleClaimItem.bind(this);

        this.handleNMChange = this.handleNMChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleECCChange = this.handleECCChange.bind(this);
        this.handleCADChange = this.handleCADChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        let factory = new ethers.ContractFactory(geoCacherAbi, geoCacherBytecode, wallet);
        let contract = await factory.deploy(this.state.geocacherName);
        
        this.setState({geocacherAddress: contract.address});

        await contract.deployed();
        
    }

    async handleClaimItem(event) {
        event.preventDefault();
        
        // claim ownership of item
        let contractClaimitem = new ethers.Contract(this.state.geocacherAddress, geoCacherAbi, provider);
        let contractWithSigner = contractClaimitem.connect(wallet);
        let tx = await contractWithSigner.claimOwnershipOfItem(this.state.itemAddress);
        await tx.wait();

        let itemsOwneded = await contractWithSigner.getBagItems();
        this.setState({itemsInBag: itemsOwneded});

        // change item owner
        let contractChangeStatus = new ethers.Contract(this.state.itemAddress, itemAbi, provider);
        let contractSigner = contractChangeStatus.connect(wallet);
        let txItem = await contractSigner.setItemOwner(this.state.geocacherAddress);
        await txItem.wait();

        // Remove Item From Chache
        let txItemStatus = await contractSigner.removeItemFromChache();
        await txItemStatus.wait();

        // remove item from cache
        let contractDelitem = new ethers.Contract(this.state.cacheAddress, cacheAbi, provider);
        let contractSignerDel = contractDelitem.connect(wallet);
        let txDel = await contractSignerDel.removeItem(this.state.cacheCoordinates, this.state.itemAddress);
        await txDel.wait();

        let itemsDeleted = await contractSignerDel.getCacheItems(this.state.cacheCoordinates);
        this.props.changeItemIncache(itemsDeleted);
        
    }

    handleNMChange(event) {
        this.setState({geocacherName: event.target.value});
    }

    handleItemChange(event) {
        this.setState({itemAddress: event.target.value});
    }

    handleECCChange(event) {
        this.setState({cacheCoordinates: event.target.value});
    }

    handleCADChange(event) {
        this.setState({cacheAddress: event.target.value});
    }

    render() {
        return (
            <div className="container border">
                <h2>GeoCacher</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">New GeoCacher Name:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.geocacherName} onChange={this.handleNMChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Create GeoCacher</button>
                        </div>
                    </div>
                </form>
                <h3>GeoCacher Address: {this.state.geocacherAddress}</h3>
                <hr />
                <form onSubmit={this.handleClaimItem}>
                <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Cache Address:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.cacheAddress} onChange={this.handleCADChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Cache Coordinates:</label>
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
                        <button type="submit" className="btn btn-primary">Claim Ownership</button>
                        </div>
                    </div>
                </form>
                <h3>All Items in Bag</h3>
                <ul>
                    {this.state.itemsInBag.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    };
};

export default GeoCacher;
