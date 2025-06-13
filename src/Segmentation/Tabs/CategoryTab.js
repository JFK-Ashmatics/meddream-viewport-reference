import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryTab ({id, tabStyle, isActive, label, labelStyle, onClick}) {
    const activeClassName = isActive ? 'active' : '';
    return (
        <div
            className={`${tabStyle} ${activeClassName}`}
            title={label}
            onClick={() => onClick(id)}
        >
            <div className={`${labelStyle} ${activeClassName}`}>{label}</div>
        </div>
    );
}

CategoryTab.propTypes = {
    isActive: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    tabStyle: PropTypes.string.isRequired,
    labelStyle: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
