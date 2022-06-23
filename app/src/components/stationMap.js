import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { icon } from 'leaflet';
import React from 'react';

class StationMap extends React.Component {
    
    constructor(props) {
        super(props)
        this.mapRef = React.createRef();
        this.state = {station: this.props.station || {
            id: "-1",
            name: "Placeholder Station",
            bikeCount: 1,
            emptyDockCount: 1,
            loc: [51.513, -0.0986]
        }, "markers": this.generateStationMarkers(this.props.stations)}
    }

    bike_icon = icon({
        iconUrl: 'bike_icon.png',
        iconSize: [24, 24],
    });

    bike_none_icon = icon({
        iconUrl: 'bike_icon_none.png',
        iconSize: [24, 24],
    });

    dock_none_icon = icon({
        iconUrl: 'rack_icon_none.png',
        iconSize: [24, 24],
    });

    dock_low_icon = icon({
        iconUrl: 'rack_icon_low.png',
        iconSize: [24, 24],
    });

    bike_low_icon = icon({
        iconUrl: 'bike_icon_low.png',
        iconSize: [24, 24],
    });

    componentDidUpdate(prevProps) {
        if(this.state.station != null && this.props.station != null){
        if (this.state.station.id != this.props.station.id){
            this.setState({"station": this.props.station})
            this.mapRef.current.setView(this.props.station.loc, 17)
        }}
        if(prevProps.stations != this.props.stations){
            this.setState({"markers": this.generateStationMarkers(this.props.stations)})
        }
    }


    generateStationMarkers(){
        let markers = [];
        for(let istation of this.props.stations){
            let icon = this.bike_icon
            if(istation.bikeCount == 0){
                icon = this.bike_none_icon
            } else if(istation.emptyDockCount == 0){
                icon = this.dock_none_icon
            } else if(istation.emptyDockCount / istation.bikeCount <= 0.2) {
                icon = this.dock_low_icon
            }
            else if(istation.bikeCount / istation.emptyDockCount <= 0.2) {
                icon = this.bike_low_icon
            }
            markers.push(<Marker key={istation.id} position={istation.loc} icon={icon}>
                <Popup>
                  <b>{istation.name}</b><br />
                  {istation.bikeCount} bikes<br />
                  {istation.emptyDockCount} docks
                </Popup>
              </Marker>)
        }
        return markers
    }

    render() {
        return (<MapContainer id="map" center={this.state.station.loc} zoom={13} scrollWheelZoom={false} ref={this.mapRef}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.markers}
</MapContainer>)
        
    }
}

export {
    StationMap
}