import React from 'react';
import PropTypes from 'prop-types';
import ViewportContainer from './ViewportContainer';

export class ViewportsLayout extends React.Component {
    isContainerActive (containerId) {
        return this.props.activeContainerId === containerId;
    }

    createViewportContainer (row, column) {
        const containerId = `viewport-container-${row + 1}-${column + 1}`;
        return (
            <ViewportContainer
                key={containerId}
                containerId={containerId}
                isActive={this.isContainerActive(containerId)}
                style={this.getContainerStyle(row, column)}
            />
        );
    }

    getContainerStyle (row, column) {
        return {
            width: `${100 / this.props.layoutColumns}%`,
            height: `${100 / this.props.layoutRows}%`,
            left: `${column === 0 ? 0 : (100 / this.props.layoutColumns) * column}%`,
            top: `${row === 0 ? 0 : (100 / this.props.layoutRows) * row}%`
        };
    }

    createLayoutColumns (row) {
        const columnNumbers = [...Array(this.props.layoutColumns).keys()];
        return columnNumbers.map(column => this.createViewportContainer(row, column));
    }

    createLayoutRows () {
        const rowNumbers = [...Array(this.props.layoutRows).keys()];
        return rowNumbers.map(row => (
            this.createLayoutColumns(row)
        ))
    }

    render () {
        return (
            <div id="viewports-layout" className="grid-viewports-layout">
                {this.createLayoutRows()}
            </div>
        );
    }
}

ViewportsLayout.propTypes = {
    layoutRows: PropTypes.number.isRequired,
    layoutColumns: PropTypes.number.isRequired,
    activeContainerId: PropTypes.string.isRequired
};

export default ViewportsLayout;
