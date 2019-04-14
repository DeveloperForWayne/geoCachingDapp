import React, { Component } from 'react';

class Cache extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Geo Coin",
            coordinates: "2345w 3456N"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input name="name" type="text" value={this.state.name} />
                </label>
                <label>
                Coordinates:
                <input name="coordinates" type="text" value={this.state.coordinates} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    };
};

export default Cache;
