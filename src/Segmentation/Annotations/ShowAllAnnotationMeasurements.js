import React, {useState} from 'react';
import {performLongRunningTask} from '../ToggleActiveTool';

export function ShowAllAnnotationMeasurements () {
    const [isLoading, setIsLoading] = useState(false);

    function printToConsole () {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        const annotations = global.viewportsCore.segmentingAnnotationsController.getAllAnnotations();
        const action = () => global.viewportsCore.segmentingAnnotationsController.getMeasurementsForList(annotations)

        performLongRunningTask(
            action,
            (result) => {
                setIsLoading(false);
                console.log(result)
            }
        );
    }

    const isDisabled = isLoading ? 'disabled' : '';
    return (
        <div
            className={`annotation-toolbar-button show-all-measurements-button ${isDisabled}`}
            onClick={printToConsole}
        >
            All Annotations Measurement Info
        </div>
    );
}

export default ShowAllAnnotationMeasurements;
