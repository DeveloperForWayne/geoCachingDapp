import React, {Component} from 'react';
import Item from "./Item";
// import FakeDb from "../fakedb";

export default class ItemsOwnedContainer extends Component {
	renderItems() {
		return this.props.Item.map(Item => {
			return <Item
				key={"Item-" + Item.id}
				name={Item.name}
				address={Item.address}
				coordinates={Item.coordinates}
			/>
		})
	}

	render() {
		return (
			<div className="Item-container">
				{this.renderItems()}
			</div>
		)
	}
}
