import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {performLongRunningTask} from '../../ToggleActiveTool';

export function JumpToFirstSlice (props) {
    const [isLoading, setIsLoading] = useState(false);

    function jumpToFirstSlice () {
        if (!isLoading) {
            setIsLoading(true);
            const action = () => global.viewportsCore.segmentingAnnotationsController.findFirstInstance(props.annotation);

            performLongRunningTask(
                action,
                (instance) => {
                    if (instance) {
                        global.viewportsCore.layoutController.openInstanceToActiveViewportContainer(instance.getUid());
                    }
                    setIsLoading(false);
                }
            );
        }
    }

    const buttonClassName = isLoading ? 'loader-button disabled' : 'location-button';

    return (
        <div
            className={`annotation-action-button ${buttonClassName}`}
            onClick={jumpToFirstSlice}
        >
            Location
        </div>
    );
}

JumpToFirstSlice.propTypes = {
    annotation: PropTypes.object.isRequired
};
