import React from 'react';
import PropTypes from 'prop-types';
import {SEGMENTATION_TYPES} from '../../Enum/SegmentationTypes';

export default function DuplicateAnnotation ({annotation}) {
    function duplicateAnnotation (e) {
        e.stopPropagation();
        global.viewportsCore.segmentingAnnotationsController.duplicateAnnotation(annotation);
    }

    if (annotation.type !== SEGMENTATION_TYPES.BOUNDING_BOX) {
        return null;
    }
    return (
        <div
            className="annotation-action-button duplicate-annotation-button"
            onClick={duplicateAnnotation}
        >
            Duplicate
        </div>
    );
}

DuplicateAnnotation.propTypes = {
    annotation: PropTypes.object.isRequired
};
