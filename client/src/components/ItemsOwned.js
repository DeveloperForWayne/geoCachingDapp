import React, {Component} from 'react';
// CSS
import "./itemsOwned.css";
import ItemTile from "./ItemTile";
class ItemsOwned extends Component {
  constructor (props) {
    super(props);
    this.state = {
      address: "0x8633873f6f7ebb9bf2410645fd1f09cceb5dc8bc",
      name: "Geo Coin",
      coordinates: "2345w 3456N",
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log('Item Info Changed' + this.state.name) ;
    event.preventDefault();
    this.submitItem(this.state)
  }

  // resetItem() {
  //   this.setState({address: "" , name:"", coordinates:""});
  // }
  // handleChange(event) {this.setState({address: event.target.value, 
  //                      name: event.target.value,
  //                      coordinates: event.target.value
  //                     });
  //}
  render () {
    return (
      <ItemTile>
        <form>
          <div className="form-group">
            <input type="hidden" name="address" value={this.state.address} onChange={this.handleChange} Address/>
            <input type="hidden" name="name" value={this.state.name} onChange={this.handleChange}Name/>
            <input type="hidden" name="name" value={this.state.name} onChange={this.handleChange} coordinates/>
            <input type="submit" className="btn-sm" value="Show on the Map"  />
            <input type="submit" className="btn-sm" value="Submit" onClick={this.handleSubmit} />
          </div>
        </form>
      </ItemTile>
    )
  }
}
export default ItemsOwned;