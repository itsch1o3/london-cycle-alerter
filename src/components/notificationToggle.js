import React from 'react';

class NotificationToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sendNotifications: false, activeNotification: null, sw: null};
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        navigator.serviceWorker.getRegistration('service-worker.js').then((sw) => {console.log(sw);this.setState({"sw":sw})})
    }

    componentDidUpdate(prevProps) {
        if(this.state.sw != null){
            if(!this.state.sendNotifications && this.state.activeNotification != null){
                this.state.activeNotification.close();
                this.setState({
                        activeNotification: null
                    }
                )
            }
            if (prevProps.station.id !== this.props.station.id){
                if (this.state.activeNotification != null) {
                    this.state.activeNotification.close();
                    this.setState({
                            activeNotification: null
                        }
                    )
                }
            }
            if (this.props.type === "bikes") {
                if (this.props.station.bikeCount === 0) {
                    if (this.state.activeNotification == null && this.state.sendNotifications) {
                        this.state.sw.showNotification('Santander Bike Alert', {body: "There's no bikes left at " + this.props.station.name + "!", tag: "bikeAlert"})
                        this.state.sw.getNotifications({tag: 'bikeAlert'}).then((notifications) => this.setState({
                            activeNotification: notifications[0]
                        }))
                    }
                } else {
                    if (this.state.activeNotification != null) {
                        this.state.activeNotification.close();
                        this.setState({
                                activeNotification: null
                            }
                        )
                    }
                }
            }
            if (this.props.type === "docks") {
                if (this.props.station.emptyDockCount === 0) {
                    if (this.state.activeNotification == null && this.state.sendNotifications) {
                        this.setState({
                            activeNotification: this.state.sw.showNotification('Santander Bike Alert', {body: "There's no empty docks left at " + this.props.station.name + "!", tag: "dockAlert"})
                        })
                        this.state.sw.getNotifications({tag: 'dockAlert'}).then((notifications) => this.setState({
                            activeNotification: notifications[0]
                        }))
                        
                    } else {

                    }
                } else {
                    if (this.state.activeNotification != null) {
                        this.state.activeNotification.close();
                        this.setState({
                                activeNotification: null
                            }
                        )
                    }
                }
            }
        }
    }

    handleClick() {
        this.setState(prevState => ({
            sendNotifications: !prevState.sendNotifications
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.sendNotifications ? 'NOTIFICATIONS ON' : 'NOTIFICATIONS OFF'}
            </button>
        );
    }
}

export {
    NotificationToggle
}