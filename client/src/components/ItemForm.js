import React, {Component} from 'react';
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
    this.submitItem(this.state)
  }


  handleChange(event) {this.setState({name: event.target.value,
                       coordinates: event.target.value,

                      });
  }
  render () {
    return (
      <ItemTile>
        <form>
          <div className="form-group">
            <h4> Item address {this.state.address}</h4>
            <input disabled={this.state.letUpdate === true ? false : true} type="hidden" name="name" value={this.state.name} onChange={this.handleChange}Name/>
            <input disabled={this.state.letUpdate === true ? false : true} type="hidden" name="coordinates" value={this.state.coordinates} onChange={this.handleChange} coordinates/>
            <input disabled={this.state.letUpdate === true ? false : true} type="checkbox" name="name" value={this.state.coordinates} onChange={this.handleChange} coordinates/>

            <input type="submit" className="btn-sm" value="Show on the Map"  />
            <input disabled={this.state.letUpdate === true ? false : true} type="submit" className="btn-sm" value="Submit" onClick={this.handleSubmit} />
          </div>
        </form>
      </ItemTile>
    )
  }
}
export default ItemForm;