export class Communication {
    getActiveSegmentingAnnotationsToolType () {
        return global.viewportsCore.getActiveSegmentingAnnotationToolId();
    }

    setSegmentationToolType (newType) {
        global.viewportsCore.setActiveSegmentingAnnotationToolId(newType);
    }

    setMouseButtonFunction (buttonCode, functionCode) {
        return () => {
            global.viewportsCore.setMouseButtonFunction(buttonCode, functionCode);
        };
    }
}

const communication = new Communication();
export default communication;
