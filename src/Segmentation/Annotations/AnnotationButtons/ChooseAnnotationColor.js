import React from 'react';
import PropTypes from 'prop-types';

export function ChooseAnnotationColor ({annotation}) {
    const currentColor = annotation.getColor();
    return (
        <div
            className={`annotation-action-button choose-color-button`}
            style={{backgroundColor: currentColor}}
        />
    );
}

ChooseAnnotationColor.propTypes = {
    annotation: PropTypes.object.isRequired
};
