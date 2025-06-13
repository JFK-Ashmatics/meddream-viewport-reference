import React from 'react';
import PropTypes from 'prop-types';

export function ShowAnnotationMeasurements (props) {
    function showAnnotationMeasurementsInfo () {
        global.viewportsCore.segmentingAnnotationsController.getMeasurementsForAnnotation(props.annotation).then((result) => console.log(result));
    }

    return (
        <div
            className={`annotation-action-button`}
            onClick={showAnnotationMeasurementsInfo}
        >
            Info
        </div>
    );
}

ShowAnnotationMeasurements.propTypes = {
    annotation: PropTypes.object.isRequired
};
