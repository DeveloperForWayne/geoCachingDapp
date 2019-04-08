import React, {Component} from 'react';
import Item from "./Item";
import ItemOwned from "../components/ItemOwned";
// import FakeDb from "../fakedb";

import "./ItemContianer.css"

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
				<ItemOwned />
				{this.renderItems()}
			</div>
		)
	}
}
