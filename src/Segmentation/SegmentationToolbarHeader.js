import React from 'react';
import PropTypes from 'prop-types';
import {SEGMENTATION_TOOL_TYPES} from './Enum/SegmentationTypes';
import Communication from './Communication';

export default function SegmentationToolbarHeader (props) {
    function closeToolbar () {
        Communication.setSegmentationToolType(SEGMENTATION_TOOL_TYPES.NONE);
        props.onClose();
    }

    function onClose () {
        closeToolbar();
    }

    function renderCloseButton () {
        return (
            <span
                className="close-button"
                title="Close"
                onClick={onClose}
            >
                ✖
            </span>
        );
    }

    return (
        <div className="segmentation-toolbox">
            <div className="segmentation-toolbox-header">
                <span className="segmentation-toolbox-header-title">Segmentation</span>
                {renderCloseButton()}
            </div>
            {props.children}
        </div>
    );
}

SegmentationToolbarHeader.propTypes = {
    children: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
};
