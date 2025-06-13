import React from 'react';
import PropTypes from 'prop-types';

export default function AnnotationType ({annotation}) {
    return (
        <div className={`annotation-type-label`}>
            {annotation.getSubtype()}
        </div>
    );
}

AnnotationType.propTypes = {
    annotation: PropTypes.object.isRequired
};
