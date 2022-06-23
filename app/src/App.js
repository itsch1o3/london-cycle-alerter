import React from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import {StationSelector} from "./components/stationSelector";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {stations: new Map()}
    }

    getNotificationPermission(){
        Notification.requestPermission().then(function(result) {
        });
    }

    fetchStations(){
        let parser = new DOMParser();
        fetch("https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml").then(res => res.text())
            .then(res => parser.parseFromString(res, "application/xml"))
            .then(document => document.getElementsByTagName("station"))
            .then((result) => {
                const data =
                    Array.from(result).map(
                        station => {
                            return {
                                id: station.querySelector("id").textContent,
                                name: station.querySelector("name").textContent,
                                bikeCount: parseInt(station.querySelector("nbBikes").textContent),
                                emptyDockCount: parseInt(station.querySelector("nbEmptyDocks").textContent),
                                loc: [parseFloat(station.querySelector("lat").textContent),parseFloat(station.querySelector("long").textContent)]
                            }
                        }
                    );

                this.setState({"stations": data});
                }
            )
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.fetchStations(),
            10000
        );
        this.fetchStations()
        this.getNotificationPermission();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div className="App">
                <StationSelector stations={this.state.stations}/>
                </div>
        );
    }
}

export default App;
