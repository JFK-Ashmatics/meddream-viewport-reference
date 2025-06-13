import React from 'react';
import PropTypes from 'prop-types';

export class ViewportContainer extends React.Component {
    componentDidMount () {
        global.viewportsCore.layoutController.layoutContainerAdded(undefined, this.props.containerId, this.props.isActive);       // layoutContainerAdded - adds layout container to layout container list for usage
    }                                                                                           // viewportsCore will not select containers if they aren't available in container list
                                                                                                // viewportsCore will not create viewports to containers if they aren't available in container list
    componentWillUnmount () {
        global.viewportsCore.layoutController.layoutContainerRemoved(this.props.containerId);    // layoutContainerRemoved - removes layout container from layout container list
    }

    render () {
        return (
            <div
                id={this.props.containerId}
                className="grid-viewport-container"
                style={this.props.style}
            />
        );
    }
}

ViewportContainer.propTypes = {
    containerId: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired
};

export default ViewportContainer;
