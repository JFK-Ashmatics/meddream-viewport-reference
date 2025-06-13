import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {SEGMENTATION_TOOL_TYPES} from '../../../Enum/SegmentationTypes';

export default function OpacitySlider (props) {
    const {opacityDefaults} = global.viewportsCore.segmentingAnnotationsController.getToolSettings();
    const [currentValue, setCurrentValue] = useState(opacityDefaults.value);

    useEffect(() => {
        const currentOpacity = global.viewportsCore.segmentingAnnotationsController.getToolSettings().opacityDefaults.value;
        setCurrentValue(currentOpacity);
    }, [props.toolRecommendation]);

    function setValue (value) {
        setCurrentValue(value);
        global.viewportsCore.segmentingAnnotationsController.updateToolOpacity(value);
    }

    if (!props.canSave) {
        return null;
    }

    return (
        <div
            className="slider opacity-slider"
        >
            Opacity:
            <input
                type="range"
                min={opacityDefaults.min}
                max={opacityDefaults.max}
                value={Number.parseFloat(currentValue)}
                step={opacityDefaults.step}
                onChange={(value) => setValue(value.currentTarget.value)}
            />
            {currentValue}
        </div>
    );
}

OpacitySlider.defaultProps = {
    toolRecommendation: {
        toolId: SEGMENTATION_TOOL_TYPES.SMART_PAINT_BRUSH,
        updateNumber: 78
    }
}

OpacitySlider.propTypes = {
    canSave: PropTypes.bool.isRequired,
    toolRecommendation: PropTypes.object
};
