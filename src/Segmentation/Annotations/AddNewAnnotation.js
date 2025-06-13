import React from 'react';
import PropTypes from 'prop-types';
import Communication from '../Communication';
import {canCreate, performLongRunningTask, pickCreateButtonStyle} from '../ToggleActiveTool';

export function AddNewAnnotation (props) {
    function addLesion () {
        const viewport = global.viewportsCore.getActiveViewport();

        if (!canCreate(props)) {
            return;
        }
        global.viewportsCore.getActiveViewport().segmentations.unselectObjects();

        Communication.setSegmentationToolType(props.toolId);
        const annotation = viewport.segmentations.createAnnotationPlaceholder(props.toolId, props.toolSubtype);
        const action = () => global.viewportsCore.segmentingAnnotationsController.linkAnnotationToSeries(annotation);
        performLongRunningTask(
            action,
            () => {
                global.viewportsCore.segmentingAnnotationsController.selectToEdit(annotation);
                global.viewportsCore.segmentingAnnotationsController.emitUpdatedEvent(annotation);
            }
        );
    }

    const isEnabled = canCreate(props);
    const style = pickCreateButtonStyle(props);

    return (
        <div
            className={`annotation-toolbar-button add-segmentation-button ${style} ${props.className}`}
            onClick={isEnabled ? addLesion : undefined}
        >
            {props.title}
        </div>
    );
}

AddNewAnnotation.propTypes = {
    toolId: PropTypes.string.isRequired,
    toolSubtype: PropTypes.string,
    title: PropTypes.string.isRequired,
    className: PropTypes.string
};

AddNewAnnotation.defaultProps = {
    className: ''
};
