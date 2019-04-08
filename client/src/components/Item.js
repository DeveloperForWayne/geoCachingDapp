import React from 'react';

// CSS
import "./Item.css"
import ItemTile from "./ItemTile";

const Item = props => {
	return (
		<ItemTile>
			<div>
				<div className="Item-container">
					<h4 className="name">{props.name}</h4>
					<h4 className="address">{props.address}</h4>
				</div>
				<div className="coordinates">
					{props.coordinates}
				</div>
			</div>
		</ItemTile>
	)
};

export default Item;