import React, {useState} from 'react';

export default function SaveAnnotations () {
    const [saveInProgress, setSaveInProgress] = useState(false);

    function saveAnnotations () {
        if (!saveInProgress && global.viewportsCore.segmentingAnnotationsController.hasUnsavedChanges()) {
            setSaveInProgress(true);
            global.viewportsCore.segmentingAnnotationsController.saveAnnotations()
                .then(() => {
                    console.log('Annotation saved')
                })
                .finally(() => {
                    setSaveInProgress(false);
                });
        }
    }

    return (
        <div
            className={`annotation-toolbar-button save-button`}
            onClick={() => saveAnnotations()}
        >
            Save
        </div>
    );
}
