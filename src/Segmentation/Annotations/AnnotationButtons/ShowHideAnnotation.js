import React from 'react';
import PropTypes from 'prop-types';

export default function ShowHideAnnotation ({annotation}) {
    function toggleAnnotationVisibility (e) {
        e.stopPropagation();
        global.viewportsCore.segmentingAnnotationsController.toggleAnnotationVisibility(annotation);
    }

    const isVisible = annotation.getIsVisible() ? 'visible' : 'not-visible';
    return (
        <div
            className={`annotation-action-button show-hide-button ${isVisible}`}
            onClick={toggleAnnotationVisibility}
        >
            Show/Hide
        </div>
    );
}

ShowHideAnnotation.propTypes = {
    annotation: PropTypes.object.isRequired
};
