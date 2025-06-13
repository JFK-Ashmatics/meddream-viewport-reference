import React, {useState, useEffect} from 'react';

export default function RadiusSlider () {
    const radiusDefaults = global.viewportsCore.segmentingAnnotationsController.getToolSettings().radius;

    const [currentRadius, setCurrentRadius] = useState(radiusDefaults.value);

    useEffect(() => {
        const currentValue = global.viewportsCore.segmentingAnnotationsController.getToolSettings().radius.value;
        return () => setCurrentRadius(currentValue);
    });

    function setValue (value) {
        setCurrentRadius(value);
        global.viewportsCore.segmentingAnnotationsController.updateToolRadius(value);
    }

    return (
        <div
            className="slider radius-slider"
        >
            Radius:
            <input
                type="range"
                min={radiusDefaults.min}
                max={radiusDefaults.max}
                value={Number.parseFloat(currentRadius)}
                step={radiusDefaults.step}
                onChange={(value) => setValue(value.currentTarget.value)}
            />
            {Number.parseFloat(currentRadius)}
        </div>
    );
}
