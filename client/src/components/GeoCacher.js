import React, { Component } from 'react';
import {ethers} from "ethers";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
//const provider = ethers.getDefaultProvider('kovan');
const GeoCacherJson = require("../json/GeoCacher.json")
const geoCacherAbi = GeoCacherJson.abi;
const geoCacherBytecode = GeoCacherJson.bytecode;

const itemJson = require("../json/Item.json")
const itemAbi = itemJson.abi;

//const privateKey = process.env.PRIVATE_KEY;
const privateKey = "0x44f74e69ee761fd3288d497e7380861ed1825dfef32cc8b8612284c3df26fd1b";

const wallet = new ethers.Wallet(privateKey, provider);

class GeoCacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Wayne",
            address: "",
            itemAddress: "",
            items: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClaimItem = this.handleClaimItem.bind(this);

        this.handleNMChange = this.handleNMChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        let factory = new ethers.ContractFactory(geoCacherAbi, geoCacherBytecode, wallet);
        let contract = await factory.deploy(this.state.name);
        
        this.setState({address: contract.address});

        await contract.deployed();
        
    }

    async handleClaimItem(event) {
        event.preventDefault();
        
        // add item address to cache
        let contractClaimitem = new ethers.Contract(this.state.address, geoCacherAbi, provider);
        let contractWithSigner = contractClaimitem.connect(wallet);
        let tx = await contractWithSigner.claimOwnershipOfItem(this.state.itemAddress);
        await tx.wait();

        let itemsOwneded = await contractWithSigner.getBagItems();
        this.setState({items: itemsOwneded});

        // change item owner
        let contractChangeStatus = new ethers.Contract(this.state.itemAddress, itemAbi, provider);
        let contractSigner = contractChangeStatus.connect(wallet);
        let txItem = await contractSigner.setItemOwner(this.state.address);
        await txItem.wait();

        // Remove Item From Chache
        let txItemStatus = await contractSigner.removeItemFromChache();
        await txItemStatus.wait();
        
    }

    handleNMChange(event) {
        this.setState({name: event.target.value});
    }

    handleItemChange(event) {
        this.setState({itemAddress: event.target.value});
    }

    render() {
        return (
            <div className="container border">
                <h2>GeoCacher</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">New GeoCacher Name:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.name} onChange={this.handleNMChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Create GeoCacher</button>
                        </div>
                    </div>
                </form>
                <h3>GeoCacher Address: {this.state.address}</h3>
                <hr />
                <form onSubmit={this.handleClaimItem}>
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
                    {this.state.items.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    };
};

export default GeoCacher;
