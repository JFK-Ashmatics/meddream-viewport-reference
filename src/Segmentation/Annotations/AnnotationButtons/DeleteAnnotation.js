import React from 'react';
import PropTypes from 'prop-types';

export function DeleteAnnotation ({annotation}) {
    function deleteAnnotation () {
        global.viewportsCore.segmentingAnnotationsController.deleteAnnotation(annotation);
    }

    return (
        <div
            className="annotation-action-button delete-annotation-button"
            onClick={() => deleteAnnotation()}
        >
            Delete
        </div>
    );
}

DeleteAnnotation.propTypes = {
    annotation: PropTypes.object.isRequired
};

export default DeleteAnnotation;
