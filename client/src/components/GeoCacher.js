import React, { Component } from 'react';
import {ethers} from "ethers";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
//const provider = ethers.getDefaultProvider('kovan');
const GeoCacherJson = require("../json/GeoCacher.json");
const geoCacherAbi = GeoCacherJson.abi;
const geoCacherBytecode = GeoCacherJson.bytecode;

const cacheJson = require("../json/Cache.json");
const cacheAbi = cacheJson.abi;

const itemJson = require("../json/Item.json")
const itemAbi = itemJson.abi;

//const privateKey = process.env.PRIVATE_KEY;
const privateKey = "0xba5d2a82930afbd24b81bd225a88231be220015ae0b0f8ec8ed0baba7430be11";

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
        this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
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

    async handleAddressSubmit(event) {
        event.preventDefault();
        let factory = new ethers.ContractFactory(geoCacherAbi, geoCacherBytecode, wallet);
        let contract = await factory.deploy(this.state.geocacherAddress);
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

        let itemsOwned = await contractWithSigner.getBagItems();
        this.setState({itemsInBag: itemsOwned});

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

    handleAddressChange(event) {
        this.setState({geocacherAddress: event.target.value});
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
                {/* <h2>Geocacher</h2> */}
                <br/>
                <form onSubmit={this.handleSubmit}>
                    If you are a new geocacher, enter your name and an Ethereum address will be created for you.
                    Use it next time to retrieve your info.
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Name:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.geocacherName} onChange={this.handleNMChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Create Geocacher Address</button>
                        </div>
                    </div>
                </form>
                <h6>Geocacher Address: {this.state.geocacherAddress}</h6>

                <hr/>

                If you already have an address, enter it here:
                <form onSubmit={this.handleAddressSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Address:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.geocacherAddress} onChange={this.handleAddressChange}/><br/>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        &emsp;<h5>You have these items in your bag:</h5>
                        <ul>
                            {this.state.itemsInBag.map(item => (
                            <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </form>
                
                <hr/>

                <form onSubmit={this.handleClaimItem}>
                    {/* <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Cache Address:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.cacheAddress} onChange={this.handleCADChange} />
                        </div>
                    </div> */}
                    {/* <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Cache Coordinates:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.cacheCoordinates} onChange={this.handleECCChange} />
                        </div>
                    </div> */}
                    <h5>Claiming an Item's Ownership:</h5>
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
               
            </div>
        );
    };
};

export default GeoCacher;
