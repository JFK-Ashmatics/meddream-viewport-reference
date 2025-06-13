import React from 'react';
import PropTypes from 'prop-types';
import {toggleActiveTool} from '../ToggleActiveTool';

export default function EditAnnotationShape (props) {
    function toggleEditOnAnnotation () {
        toggleActiveTool({
            annotation: props.annotation,
            toolId: props.toolId
        });
    }

    if (!props.annotation) {
        return null;
    }

    return (
        <div
            className={`annotation-action-button edit-annotation-button`}
            onClick={toggleEditOnAnnotation}
        >
            Edit
        </div>
    );
}

EditAnnotationShape.propTypes = {
    annotation: PropTypes.object,
    toolId: PropTypes.string.isRequired
};
