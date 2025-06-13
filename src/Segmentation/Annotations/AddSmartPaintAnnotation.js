import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {canCreate, performLongRunningTask} from '../ToggleActiveTool';
import Communication from '../Communication';
import {SEGMENTATION_TOOL_TYPES} from '../Enum/SegmentationTypes';

export function AddSmartPainAnnotation (props) {
    const [is3D, set3D] = useState(true);

    const propsWithTool = {
        toolId: SEGMENTATION_TOOL_TYPES.SMART_PAINT_BRUSH
    };

    function addLesion () {
        const viewport = global.viewportsCore.getActiveViewport();

        if (!canCreate(propsWithTool)) {
            return;
        }

        Communication.setSegmentationToolType(SEGMENTATION_TOOL_TYPES.SMART_PAINT_BRUSH);
        const annotation = viewport.segmentations.createAnnotationPlaceholder(SEGMENTATION_TOOL_TYPES.SMART_PAINT_BRUSH, undefined);
        const action = () => global.viewportsCore.segmentingAnnotationsController.linkAnnotationToSeries(annotation);
        performLongRunningTask(
            action,
            () => {
                global.viewportsCore.segmentingAnnotationsController.selectToEdit(annotation);
                global.viewportsCore.segmentingAnnotationsController.emitUpdatedEvent(annotation);
                props.setActiveAnnotation(annotation);
            }
        );

    }

    function setMode () {
        set3D(!is3D);
        global.viewportsCore.segmentingAnnotationsController.updateToolMode3D(!is3D);
    }

    const activeMode = is3D ? '3D' : '2D'

    return (
        <>
            <div
                className={`add-segmentation-button`}
                onClick={addLesion}
            >
                Add {activeMode} lesion
            </div>
            <div
                className={`add-segmentation-button switch-button`}
                onClick={() => setMode()}
            >
                2D/3D
            </div>
        </>
    );
}

AddSmartPainAnnotation.propTypes = {
    setActiveAnnotation: PropTypes.func.isRequired
};

export default AddSmartPainAnnotation;
