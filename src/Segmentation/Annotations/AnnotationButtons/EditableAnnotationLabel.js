import React from 'react';
import PropTypes from 'prop-types';
import EditableInput from '../../EditableInput';

export default function EditableAnnotationLabel ({annotation}) {
    function renameAnnotation (newLabel = '') {
        if (newLabel.trim()) {
            global.viewportsCore.segmentingAnnotationsController.renameAnnotation(annotation, newLabel.trim());
        }
    }

    return (
        <EditableInput
            className="annotation-name"
            title={'Rename Annotation Tooltip'}
            value={{
                getValue: () => annotation.getLabel(),
                setValue: (newValue) => renameAnnotation(newValue)
            }}
        />
    );
}

EditableAnnotationLabel.propTypes = {
    annotation: PropTypes.object.isRequired
};
