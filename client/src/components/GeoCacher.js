import React, { Component } from 'react';
import {ethers} from "ethers";
import '../components/GeoCacher.css'

const provider = ethers.getDefaultProvider('ropsten');
const GeoCacherJson = require("../json/GeoCacher.json");
const geoCacherAbi = GeoCacherJson.abi;
const geoCacherBytecode = GeoCacherJson.bytecode;
const cacheJson = require("../json/Cache.json");
const cacheAbi = cacheJson.abi;
const itemJson = require("../json/Item.json")
const itemAbi = itemJson.abi;
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

class GeoCacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geocacherName: this.props.geocacherName,
            geocacherAddress: this.props.geocacherAddress,
            cacheAddress: this.props.cacheAddress,
            itemAddress: this.props.itemAddress,
            itemsInBag: this.props.itemsInBag,
            itemsInCache: this.props.itemsInCache,
            createdGeocacherAddress:"",
            createdGeocacherName:""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddressSubmit = this.handleAddressSubmit.bind(this);
        this.handleClaimItem = this.handleClaimItem.bind(this);
        this.handleNMChange = this.handleNMChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        let factory = new ethers.ContractFactory(geoCacherAbi, geoCacherBytecode, wallet);
        let contract = await factory.deploy(this.state.createdGeocacherName);
        this.setState({createdGeocacherAddress: contract.address});
        await contract.deployed();
    }

    async handleAddressSubmit(event) {
        event.preventDefault();
        let contractAddress = this.state.geocacherAddress;
        let geocacherContract = new ethers.Contract(contractAddress, geoCacherAbi, provider);
        let newGeocacherName = await geocacherContract.name();
        this.setState({geocacherName: newGeocacherName});
        await geocacherContract.deployed();
    }

    async handleClaimItem(event) {
        event.preventDefault();
        let contractAddress = this.state.geocacherAddress;
        let geocacherContract = new ethers.Contract(contractAddress, geoCacherAbi, provider);
        let contractWithSigner = geocacherContract.connect(wallet);
        let tx = await contractWithSigner.claimOwnershipOfItem(this.state.itemAddress);
        console.log(tx.hash);
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
        this.setState({createdGeocacherName: event.target.value});
    }

    handleAddressChange(event) {
        this.setState({geocacherAddress: event.target.value});
    }

    handleItemChange(event) {
        this.setState({itemAddress: event.target.value});
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
                        <div className="col-sm-3">
                            <input className="form-control" type="text" value={this.state.createdGeocacherName} onChange={this.handleNMChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Create Geocacher Address</button>
                        </div>
                    </div>
                </form>
                <h6>New geocacher Address: {this.state.createdGeocacherAddress}</h6>

                <hr/>

                If you already have an address, enter it here:
                <form onSubmit={this.handleAddressSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Address:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text"  onChange={this.handleAddressChange}/><br/>
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
