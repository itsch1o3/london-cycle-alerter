import React from 'react';

class NotificationToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sendNotifications: false, activeNotification: null};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
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
                        this.setState({
                            activeNotification: new Notification('Santander Bike Alert', {body: "There's no bikes left at " + this.props.station.name + "!", tag: "bikeAlert"})
                        })
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
                            activeNotification: new Notification('Santander Bike Alert', {body: "There's no empty docks left at " + this.props.station.name + "!", tag: "dockAlert"})
                        })
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