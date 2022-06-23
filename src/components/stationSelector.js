import React from 'react';
import {StationDisplay} from "./stationDisplay";
import { StationMap } from './stationMap';

class StationOption extends React.Component {


    render() {
        return (<option value={this.props.station.id}>{this.props.station.name}</option>)
    }
}

class StationSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected_station: null, search_query: "" };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }

    handleSearchChange(e) {
        this.setState({ "search_query": e.target.value || "" });
    }

    handleSelectChange(e) {
        this.setState({ "selected_station": this.props.stations.find(element => element.id === e.target.value)});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stations !== this.props.stations && this.state.selected_station != null){
            this.setState({ "selected_station": this.props.stations.find(element => element.id === this.state.selected_station.id)});
        }
    }

    render() {
        const elements = [<option key="placeholder">Select an option...</option>]
        for(let station of this.props.stations){
            if(station.name.toLowerCase().includes(this.state.search_query.toLowerCase())){
                elements.push(<StationOption key={station.id} station={station}></StationOption>)
            }
        }
        return (
            <div>
            <input type="text" placeholder="Filter stations..."  onChange={this.handleSearchChange}></input>
            <select onChange={this.handleSelectChange}>
                {elements}
            </select>
            <StationDisplay station={this.state.selected_station}/>
            <StationMap stations={this.props.stations} station={this.state.selected_station}></StationMap>
            </div>
        )
    }
}

export {
    StationSelector
}