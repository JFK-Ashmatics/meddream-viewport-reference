import React, {useState, useEffect} from 'react';

export default function SensitivitySlider () {
    const sensitivityDefaults = global.viewportsCore.segmentingAnnotationsController.getToolSettings().sensitivity;

    const [currentSensitivity, setCurrentSensitivity] = useState(sensitivityDefaults.value);

    useEffect(() => {
        const currentValue = global.viewportsCore.segmentingAnnotationsController.getToolSettings().sensitivity.value;
        return () => setCurrentSensitivity(currentValue);
    });

    function setValue (value) {
        setCurrentSensitivity(value);
        global.viewportsCore.segmentingAnnotationsController.updateToolSensitivity(value);
    }

    return (
        <div
            className="slider sensitivity-slider"
        >
            Sensitivity:
            <input
                type="range"
                min={sensitivityDefaults.min}
                max={sensitivityDefaults.max}
                value={Number.parseFloat(currentSensitivity)}
                step={sensitivityDefaults.step}
                onChange={(value) => setValue(value.currentTarget.value)}
            />
            {Number.parseFloat(currentSensitivity)}
        </div>
    );
}
