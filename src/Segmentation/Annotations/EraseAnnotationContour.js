import React from 'react';
import PropTypes from 'prop-types';
import {canEdit, toggleActiveTool} from '../ToggleActiveTool';

export function EraseAnnotationContour (props) {
    function toggleEraseOnAnnotation () {
        toggleActiveTool({
            annotation: props.annotation,
            toolId: props.toolId
        });
    }

    const isEnabled = canEdit(props);

    return (
        <div
            className={`annotation-action-button erase-contour-button`}
            onClick={isEnabled ? toggleEraseOnAnnotation : undefined}
        >
            Erase contour
        </div>
    );
}

EraseAnnotationContour.propTypes = {
    annotation: PropTypes.object,
    toolId: PropTypes.string.isRequired
};

export default EraseAnnotationContour;
