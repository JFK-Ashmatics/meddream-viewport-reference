import React from 'react';
import PropTypes from 'prop-types';

export default class Mpr extends React.Component {
    changeViewportOrientation (type) {
        global.viewportsCore.controller.changeViewportOrientation(this.props.activeContainerId, type);
    }

    createMprMist (type) {
        global.viewportsCore.generateMPRViewport(this.props.activeContainerId, type);
    }

    createMprMist3d () {
        global.viewportsCore.generateMPRViewport3D(this.props.activeContainerId);
    }

    createObliqueMistMpr () {
        global.viewportsCore.generateObliqueMPR(this.props.activeContainerId);
    }

    render () {
        return (
            <>
                <span>MPR</span>
                <button onClick={() => this.changeViewportOrientation('AXIAL')}>MPR Axial</button>
                <button onClick={() => this.changeViewportOrientation('CORONAL')}>MPR Coronal</button>
                <button onClick={() => this.changeViewportOrientation('SAGITTAL')}>MPR Sagittal</button>
                <br/>
                <span>Oblique MPR</span>
                <button onClick={() => this.createMprMist('AXIAL')}>MPR Axial</button>
                <button onClick={() => this.createMprMist('CORONAL')}>MPR Coronal</button>
                <button onClick={() => this.createMprMist('SAGITTAL')}>MPR Sagittal</button>
                <button onClick={() => this.createMprMist3d('SAGITTAL')}>MPR 3D</button>
                <button onClick={() => this.createObliqueMistMpr()}>Oblique</button>
            </>
        )
    }
}

Mpr.propTypes = {
    activeContainerId: PropTypes.string.isRequired
};
