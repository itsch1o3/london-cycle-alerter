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
            <div style={{margin: "auto", textAlign: "center"}}>
            <h1>Cycle Hire Tracker</h1>
            <p>Select a dock from the dropdown below to view information on availability; and enable notifications for when all docks are full or empty.<br/>
              You can also use the provided map to view availability in the area surrounding the dock, so you can reroute accordingly!<br/>
            <i>Note: This web app is mainly client-side, and relies on web requests only to access live TFL data.<br/> The APIs available for notifications in browsers are limited; and none exist to update in the background regularly without a server "pushing" the notifications.<br/>
                As a result, notifications on mobile platforms can be unreliable if the webpage is in the background, and the app will only work while open - sorry!</i><br/>
            </p>
            
            <div className="App">
                <StationSelector stations={this.state.stations}/>
                </div>
            </div>
        );
    }
}

export default App;
