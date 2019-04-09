import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
// CSS
import "./ItemForm.css";
import ItemTile from "./ItemTile";
class ItemForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      address: "0x8633873f6f7ebb9bf2410645fd1f09cceb5dc8bc",
      name: "Geo Coin",
      coordinates: "2345w 3456N",
      inCache: true,
      letUpdate : false
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleSubmit(event) {
    console.log('Item Info Changed' + this.state.name) ;
    event.preventDefault();
    //this.submitItem(this.state)
    this.setState({name: event.target.value,
      coordinates: event.target.value,
      inCache: event.target.value
      //stuffs to be added regerding submission to blockchain
     });
  }


  // handleChange(event) {this.setState({name: event.target.value,
  //                      coordinates: event.target.value,
  //                      inCache: event.target.value

  //                     });
  // }
  render () {
    return (
      <ItemTile>
        <form>
          <div className="form-group">
            <h4> Item address {this.state.address}</h4>
            <input  type="hidden" name="name" value={this.state.name} onChange={this.handleChange}Name/>
            <input  type="hidden" name="coordinates" value={this.state.coordinates} onChange={this.handleChange} coordinates/>
            <input  type="checkbox" name="name" value={this.state.inCache} onChange={this.handleChange} inCache/>

            <input type="submit" className="btn-sm" value="Show on the Map"  />
            <input  type="submit" className="btn-sm" value="Submit" onClick={this.handleSubmit} />
          </div>
        </form>
      </ItemTile>
    )
  }
}
export default ItemForm;