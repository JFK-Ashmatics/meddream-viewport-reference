import React from 'react';

export default class Measurements extends React.Component {
    handleMeasurementChange (event) {
        global.viewportsCore.setMouseButtonFunction(0, 5);
        global.viewportsCore.measurementsController.setActiveMeasurementType(event.target.value);
    }

    deleteMeasurementsFromActiveViewport () {
        global.viewportsCore.getActiveViewport().deleteMeasurements();
    }

    render () {
        return (
            <>
                <label htmlFor="measurements">Measurements:</label>
                <select id="measurements" onChange={this.handleMeasurementChange}>
                    <option value={'none'}>None</option>
                    <option value={'ruler'}>Line</option>
                    <option value={'angle'}>Angle</option>
                    <option value={'polyline'}>Polyline</option>
                    <option value={'area'}>Area</option>
                    <option value={'oval'}>Ellipse</option>
                    <option value={'volume'}>Volume</option>
                    <option value={'VTI'}>VTI</option>
                    <option value={'cobb-angle'}>Cobb Angle</option>
                    <option value={'roi'}>Region of Interest</option>
                </select>
                <button onClick={() => this.deleteMeasurementsFromActiveViewport()}>Delete ALL Measurements</button>
            </>
        )
    }
}
