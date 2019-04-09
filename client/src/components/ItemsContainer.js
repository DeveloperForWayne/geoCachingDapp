import React, {Component} from 'react';
import Item from "./Item";
import ItemForm from "../components/ItemForm";

import "./ItemContianer.css"

export default class ItemFormContainer extends Component {
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
				<ItemForm />
				{this.renderItems()}
			</div>
		)
	}
}
