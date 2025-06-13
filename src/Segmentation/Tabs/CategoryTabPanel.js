import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryTabPanel (props) {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    );
}

CategoryTabPanel.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};
