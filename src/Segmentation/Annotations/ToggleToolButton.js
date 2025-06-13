import React from 'react';
import PropTypes from 'prop-types';
import {toggleActiveTool} from '../ToggleActiveTool';

export function ToggleToolButton (props) {
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
            className={`annotation-toolbar-button ${props.className}`}
            onClick={toggleEditOnAnnotation}
        >
            {props.tooltip}
        </div>
    );
}

ToggleToolButton.propTypes = {
    className: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    annotation: PropTypes.object,
    toolId: PropTypes.string.isRequired
};

export default ToggleToolButton;
