import React from 'react';
import PropTypes from 'prop-types';
import Communication from '../Communication';
import {SEGMENTATION_TOOL_TYPES, SUBTYPES} from '../Enum/SegmentationTypes';
import BoundingBox from '../BoundingBox';
import AnnotationsList from '../Annotations/AnnotationsList';
import AnnotationActionsBar from '../Annotations/AnnotationActionsBar';
import {AddNewAnnotation} from '../Annotations/AddNewAnnotation';

export default class BoundingBoxTab extends React.Component {
    constructor (props) {
        super(props);
        this.renderOpenedGroupBind = this.renderOpenedGroup.bind(this);
    }

    componentWillUnmount () {
        this.resetAnnotationEditStates();
    }

    resetAnnotationEditStates () {
        Communication.setSegmentationToolType(SEGMENTATION_TOOL_TYPES.NONE);
        global.viewportsCore.segmentingAnnotationsController.resetEditMarkForAllAnnotations();
    }

    renderOpenedGroup (annotations) {
        return annotations.map((annotation) => (
            <BoundingBox
                key={`segm-annotation-${annotation.getUid()}`}
                selectedAnnotationUid={this.props.selectedAnnotationUid}
                annotation={annotation}
                {...annotation}
            />
        ));
    }

    renderAnnotationsList (annotations) {
        return (
            <AnnotationsList
                key="bounding-box-annotations"
                annotations={annotations}
                renderOpenedGroup={this.renderOpenedGroupBind}
            />
        );
    }

    renderActionsBar () {
        return (
            <AnnotationActionsBar
                className="tab-pane-margin-right"
                key="annotation-actions"
            >
                <div className="buttons-group">
                    <AddNewAnnotation
                        className="plus-2d-action"
                        toolId={SEGMENTATION_TOOL_TYPES.BOUNDING_BOX_2D}
                        toolSubtype={SUBTYPES.BBOX_2D}
                        title={'Add 2d'}
                    />
                    <AddNewAnnotation
                        className="plus-3d-action"
                        toolId={SEGMENTATION_TOOL_TYPES.BOUNDING_BOX}
                        toolSubtype={SUBTYPES.BBOX_3D}
                        title={'Add 3d'}
                    />
                </div>
            </AnnotationActionsBar>
        );
    }

    render () {
        return (
            <>
                {this.renderAnnotationsList(this.props.annotations)}
                {this.renderActionsBar()}
            </>
        );
    }
}

BoundingBoxTab.propTypes = {
    annotations: PropTypes.array.isRequired,
    selectedAnnotationUid: PropTypes.string
};
