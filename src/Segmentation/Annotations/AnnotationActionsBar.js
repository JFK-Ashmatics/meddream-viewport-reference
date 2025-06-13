import React from 'react';
import PropTypes from 'prop-types';

export default function AnnotationActionsBar (props) {
    return (
        <div className={`segmentation-toolbox-annotation-actions-bar ${props.className}`}>
            {props.children}
        </div>
    );
}

AnnotationActionsBar.defaultProps = {
    className: '',
    showContent: true
};

AnnotationActionsBar.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};
