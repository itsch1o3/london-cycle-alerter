import React from 'react';
import {NotificationToggle} from "./notificationToggle";
class StationDisplay extends React.Component {

    render() {
        if(this.props.station != null) {
            return (
                <div>
                    <h1>{this.props.station.name}</h1>
                    <p>{this.props.station.bikeCount} bikes available.</p>
                    <NotificationToggle station={this.props.station} type="bikes"></NotificationToggle>
                    <p>{this.props.station.emptyDockCount} docks available.</p>
                    <NotificationToggle station={this.props.station} type="docks"></NotificationToggle>
                </div>
            )
        } else return <div></div>
    }
}

export {
    StationDisplay
}