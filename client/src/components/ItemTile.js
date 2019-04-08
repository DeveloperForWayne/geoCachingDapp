import React from 'react';

// CSS
import "./ItemTile.css";

const ItemTile = props => {
	return (
		<div className="item-tile-container">
			{props.children}
		</div>
	)
};

export default ItemTile;