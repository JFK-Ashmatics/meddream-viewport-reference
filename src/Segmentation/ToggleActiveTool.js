import Communication from './Communication';

export function toggleActiveTool (props) {
    Communication.setSegmentationToolType(props.toolId);
    global.viewportsCore.segmentingAnnotationsController.selectToEdit(props.annotation);
}

export function canCreate (props) {
    const viewport = global.viewportsCore.getActiveViewport();
    if (!viewport || !viewport.segmentations) {
        return false;
    }

    return viewport.segmentations.canCreateObjectFromTool(props.toolId);
}

export function canEdit (props) {
    const viewport = global.viewportsCore.getActiveViewport();
    if (!viewport || !viewport.segmentations) {
        return false;
    }

    return viewport.segmentations.canEditObjectFromTool(props.toolId, props.annotation);
}

export function pickCreateButtonStyle (props) {
    const isEnabled = canCreate(props);
    if (isEnabled) {
        return 'active';
    }
    return 'disabled';
}

export function performLongRunningTask (promiseActionToRun, followUpAction) {
    promiseActionToRun()
        .then((result) => {
            followUpAction(result);
        })
        .catch((error) => {
            console.error('Failed to execute long running task', error);
        });
}

export function findNewAnnotation (annotationUid) {
    const activeInstance = global.viewportsCore.getActiveViewportInstance();
    if (!activeInstance) {
        return undefined;
    }
    const series = activeInstance.getSeries();
    const studyUid = series.getStudyUid();
    const seriesUid = series.getUid();

    const seriesAnnotations = global.viewportsCore.segmentingAnnotationsController.getSeriesAnnotations(studyUid, seriesUid);
    return seriesAnnotations.find((item) => item.getUid() === annotationUid);
}
