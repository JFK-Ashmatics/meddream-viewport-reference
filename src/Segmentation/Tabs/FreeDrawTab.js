import React from 'react';
import PropTypes from 'prop-types';
import {SEGMENTATION_TOOL_TYPES} from '../Enum/SegmentationTypes';
import Communication from '../Communication';
import AnnotationsList from '../Annotations/AnnotationsList';
import FreeDraw from '../FreeDraw';
import AnnotationActionsBar from '../Annotations/AnnotationActionsBar';
import {AddNewAnnotation} from '../Annotations/AddNewAnnotation';

export default class FreeDrawTab extends React.Component {
    constructor (props) {
        super(props);
        this.renderOpenedGroupBind = this.renderOpenedGroup.bind(this);
    }

    componentWillUnmount () {
        this.resetAnnotationEditStates();
    }

    findSelectedAnnotation () {
        return this.props.annotations.find((item) => item.getUid() === this.props.selectedAnnotationUid);
    }

    resetAnnotationEditStates () {
        Communication.setSegmentationToolType(SEGMENTATION_TOOL_TYPES.NONE);
        global.viewportsCore.segmentingAnnotationsController.resetEditMarkForAllAnnotations();
    }

    renderOpenedGroup (annotations) {
        return annotations.map((annotation) => (
            <FreeDraw
                key={`segm-annotation-${annotation.getUid()}`}
                annotation={annotation}
                selectedAnnotationUid={this.props.selectedAnnotationUid}
                {...annotation}
            />
        ));
    }

    renderFreeDrawList (annotations) {
        return (
            <AnnotationsList
                key="free-draw-annotations-list"
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
                        title={'Free draw'}
                        toolId={SEGMENTATION_TOOL_TYPES.FREE_DRAW}
                    />
                </div>
            </AnnotationActionsBar>
        );
    }

    render () {
        return (
            <>
                {this.renderFreeDrawList(this.props.annotations)}
                {this.renderActionsBar()}
            </>
        );
    }
}

FreeDrawTab.propTypes = {
    annotations: PropTypes.array.isRequired,
    selectedAnnotationUid: PropTypes.string
};
