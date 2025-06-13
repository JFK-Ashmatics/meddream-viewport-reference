import React from 'react';
import PropTypes from 'prop-types';
import ViewerInteractions from './ViewerInteractions';
import Mpr from './Mpr';
import Measurements from './Measurements';
import SegmentationModal from '../Segmentation/SegmentationModal';
import '../css/Segmentation.css';

export default class LeftMenu extends React.Component {
    constructor (props) {
        super(props);
        this.petSeriesUid = React.createRef();
        this.landmarkUid = React.createRef();
        this.state = {
            showSegmentationModal: false
        }
    }

    showIntensity () {
        global.viewportsCore.enableIntensity();
    }

    hideIntensity () {
        global.viewportsCore.disableIntensity();
    }

    showAngles () {
        global.viewportsCore.measurementsController.toggleAngleBetweenIntersectingRulers(true);
    }

    hideAngles() {
        global.viewportsCore.measurementsController.toggleAngleBetweenIntersectingRulers(false);
    }

    createLandmark () {
        global.viewportsCore.landmarksController.enable((landmarkData) => console.log(landmarkData));
        global.viewportsCore.landmarksController.createLandmark();
    }

    removeLandmark () {
        global.viewportsCore.landmarksController.removeLandmark(this.landmarkUid.current.value);
    }

    fusion () {
        if (this.petSeriesUid.current.value) {
            global.viewportsCore.getActiveViewport().enableFusion(this.petSeriesUid.current.value);
        } else {
            global.viewportsCore.getActiveViewport().enableFusion(global.viewportsCore.getActiveViewport().getSeries().uid);
        }

    }

    resetAllViewports () {
        global.viewportsCore.resetAllViewportsRenders();
    }

    enableReferenceLines () {
        global.viewportsCore.enableReferenceLines();
    }

    disableReferenceLines () {
        global.viewportsCore.disableReferenceLines();
    }

    cacheStudy () {
        global.viewportsCore.cacheStudy(global.viewportsCore.getActiveViewportStudy().uid, 'Orthanc');
    }

    enableSync () {
        global.viewportsCore.enableSync((func, param) => {
            this.doFunctionFromEvents(func, param);
        });
        global.viewportsCore.getViewportsList().forEach(viewport => {
            this.createInputInViewport(viewport);
        });
    }

    createInputInViewport (viewport) {
        let input = document.createElement('input');
        input.className = 'sync-checkbox';
        input.type = 'checkbox';
        input.id = `syncCheckbox-${viewport.containerId}`;
        input.checked = global.viewportsCore.getLockedViewportContainers().includes(viewport.containerId)
        input.onclick = () => {
            if (input.checked === true) {
                global.viewportsCore.addToSync([viewport.containerId]);
            } else {
                global.viewportsCore.removeFromSync([viewport.containerId]);
            }
        };
        document.getElementById(viewport.containerId).appendChild(input);
    }

    disableSync () {
        global.viewportsCore.disableSync((func, param) => {
            this.doFunctionFromEvents(func, param);
        });
        global.viewportsCore.getViewportsList().forEach(viewport => {
            document.getElementById(`syncCheckbox-${viewport.containerId}`).remove();
        });
    }

    doFunctionFromEvents (func, param) {
        switch (func) {
            case 'image-position-changed':
                global.viewportsCore.applyPanForLockedViews(param.containerId, param.imagePosition.x, param.imagePosition.y);
                break;
            case 'zoom-changed':
                global.viewportsCore.applyZoomForLockedViews(param.containerId, param.scale, param.point);
                break;
            default:
                break;
        }
    }

    showSegmentationModal () {
        global.viewportsCore.generateMpr(this.props.activeContainerId, ['viewport-container-1-1', 'viewport-container-1-2', 'viewport-container-2-1']);
        global.viewportsCore.preloadSegmentingAnnotationsController().then(() => this.setShowSegmentationModal(true))
        global.viewportsCore.setMouseButtonFunction(0, 13);
    }

    hideSegmentationModal () {
        this.setShowSegmentationModal(false);
    }

    setShowSegmentationModal (status) {
        this.setState({showSegmentationModal: status})
    }

    render () {
        return (
            <div className="mouse-function">
                <span>Layout columns: {this.props.layoutColumns}</span>
                <input
                    type="range"
                    min="1"
                    max="5"
                    value={this.props.layoutColumns}
                    onChange={this.props.onLayoutColumnsChanged}
                />
                <span>Layout rows: {this.props.layoutRows}</span>
                <input
                    type="range"
                    min="1"
                    max="3"
                    value={this.props.layoutRows}
                    onChange={this.props.onLayoutRowsChanged}
                />
                <br/>
                <ViewerInteractions/>
                <button onClick={() => this.showIntensity()}>Show Intensity</button>
                <button onClick={() => this.hideIntensity()}>Hide Intensity</button>
                <button onClick={() => this.showAngles()}>Show Angles</button>
                <button onClick={() => this.hideAngles()}>Hide Angles</button>
                <br/>
                <br/>
                <Measurements/>
                <br/>
                <button onClick={() => this.createLandmark()}>Landmark</button>
                <input type="text" className="input" placeholder="Landmark Ref. UID" ref={this.landmarkUid}/>
                <button onClick={() => this.removeLandmark()}>Remove Landmark</button>
                <br/>
                <Mpr activeContainerId={this.props.activeContainerId}/>
                <br/>
                <input type="text" className="input" placeholder="Series UID" ref={this.petSeriesUid}/>
                <button onClick={() => this.fusion()}>Fusion</button>
                <br/>
                <button onClick={() => this.resetAllViewports()}>Reset All</button>
                <button onClick={() => this.enableReferenceLines()}>Enable References Lines</button>
                <button onClick={() => this.disableReferenceLines()}>Disable References Lines</button>
                <button onClick={() => this.cacheStudy()}>Cache Study</button>
                <br/>
                <button onClick={() => this.enableSync()}>Enable sync</button>
                <button onClick={() => this.disableSync()}>Disable sync</button>
                <br/>
                <button onClick={() => this.showSegmentationModal()}>Segmentation</button>
                <SegmentationModal show={this.state.showSegmentationModal} onClose={() => this.hideSegmentationModal()}/>
            </div>
        )
    }
}

LeftMenu.protoTypes = {
    onLayoutColumnsChanged: PropTypes.func.isRequired,
    onLayoutRowsChanged: PropTypes.func.isRequired,
    activeContainerId: PropTypes.string.isRequired,
    layoutColumns: PropTypes.string.isRequired,
    layoutRows: PropTypes.string.isRequired
}
