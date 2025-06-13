import React from 'react';
import './css/Demo.css';
import 'viewports-core';
import 'viewports-core/dist/area-controller';
import StudiesMenu from './StudiesMenu/StudiesMenu';
import LeftMenu from './LeftMenu/LeftMenu';
import ViewportsLayout from './ViewportsLayout/ViewportsLayout';

export default class Demo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            layoutRows: 2,
            layoutColumns: 2,
            activeContainerId: 'viewport-container-1-1'
        };
    }

    componentDidMount () {
        const configuration = {
            features: {
                mistMpr3D: true,
                batchImageRequests: true,
                compressPixelsBeforeSave: 'gzip',
                alternativeMeasurementMouseActions: false,
                segmentingAnnotations: true
            },
            requestsConfiguration: {
                maximumMetadataStreams: 5,
                maximumPixelStreams: 15,
                maximumMultiFrameStreams: 4,
                batchSizeMb: 5,
                multiFrameBatchSizeMb: 2
            }
        };
        global.viewportsCore.create(configuration);
        global.viewportsCore.setBaseUrl('.');  // This line is not required. Used only when it needs to configure different context path for requests.
        global.viewportsCore.registerEvent(global.viewportsCore.getConstants().CORE_EVENTS.ACTIVE_CONTAINER_CHANGED, (containerId) => this.selectViewportContainer(containerId));
    }

    selectViewportContainer (containerId) {
        this.setState({activeContainerId: containerId});
    }

    onLayoutColumnsChanged (event, callback) {
        this.setState({layoutColumns: parseInt(event.target.value)}, callback);
    }

    onLayoutRowsChanged (event) {
        this.setState({layoutRows: parseInt(event.target.value)});
    }

    render () {
        return (
            <div className="content">
                <StudiesMenu
                    onLayoutColumnsChanged={(event, callback) => this.onLayoutColumnsChanged(event, callback)}
                    activeContainerId={this.state.activeContainerId}
                    layoutRows={this.state.layoutRows}
                    layoutColumns={this.state.layoutColumns}
                />
                <div className="viewer-menu-container">
                    <LeftMenu
                        onLayoutColumnsChanged={(event) => this.onLayoutColumnsChanged(event)}
                        onLayoutRowsChanged={(event) => this.onLayoutRowsChanged(event)}
                        activeContainerId={this.state.activeContainerId}
                        layoutRows={this.state.layoutRows}
                        layoutColumns={this.state.layoutColumns}
                    />
                    <div id="viewer">
                        <ViewportsLayout
                            layoutRows={this.state.layoutRows}
                            layoutColumns={this.state.layoutColumns}
                            activeContainerId={this.state.activeContainerId}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
