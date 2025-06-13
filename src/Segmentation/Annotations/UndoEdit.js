import React, {useEffect, useState} from 'react';

export function UndoEdit () {
    const [isEnabled, setIsEnabled] = useState(!global.viewportsCore.segmentingAnnotationsController.isUndoStackEmpty());

    function undoAction () {
        global.viewportsCore.segmentingAnnotationsController.applyUndoAction();
    }

    useEffect(() => {
       return () => setIsEnabled(!global.viewportsCore.segmentingAnnotationsController.isUndoStackEmpty());
    });

    const style = isEnabled ? '' : 'disabled';

    return (
        <div
            className={`annotation-toolbar-button undo-button ${style}`}
            onClick={isEnabled ? undoAction : undefined}
        >
            Undo
        </div>
    );
}

export default UndoEdit;
