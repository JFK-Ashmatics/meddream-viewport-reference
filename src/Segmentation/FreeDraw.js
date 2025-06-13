import React from 'react';
import PropTypes from 'prop-types';
import {ShowAnnotationMeasurements} from './Annotations/AnnotationButtons/ShowAnnotationMeasurements';
import {SEGMENTATION_TOOL_TYPES} from './Enum/SegmentationTypes';
import {ChooseAnnotationColor} from './Annotations/AnnotationButtons/ChooseAnnotationColor';
import ShowHideAnnotation from './Annotations/AnnotationButtons/ShowHideAnnotation';
import {JumpToFirstSlice} from './Annotations/AnnotationButtons/JumpToFirstSlice';
import EditableAnnotationLabel from './Annotations/AnnotationButtons/EditableAnnotationLabel';
import DeleteAnnotation from './Annotations/AnnotationButtons/DeleteAnnotation';
import EditAnnotationShape from './Annotations/EditAnnotationShape';
import EraseAnnotationContour from './Annotations/EraseAnnotationContour';

export class FreeDraw extends React.Component {
    getInformationButton () {
        return <ShowAnnotationMeasurements annotation={this.props.annotation} />;
    }

    renderRightSideButtons () {
        return (
            <>
                {this.getInformationButton()}
                <DeleteAnnotation annotation={this.props.annotation} />
                <EditAnnotationShape
                    annotation={this.props.annotation}
                    toolId={SEGMENTATION_TOOL_TYPES.FREE_DRAW_PENCIL}
                />
                <EraseAnnotationContour
                    annotation={this.props.annotation}
                    toolId={SEGMENTATION_TOOL_TYPES.ERASE_CONTOUR}
                />
            </>
        );
    }

    render () {
        return (
            <div className="annotation-object-actions free-draw-annotation">
                <EditableAnnotationLabel annotation={this.props.annotation} />
                <ChooseAnnotationColor annotation={this.props.annotation} />
                <ShowHideAnnotation annotation={this.props.annotation} />
                <JumpToFirstSlice annotation={this.props.annotation} />
                {this.renderRightSideButtons()}
            </div>
        );
    }
}

FreeDraw.propTypes = {
    annotation: PropTypes.object.isRequired,
    selectedAnnotationUid: PropTypes.string,
    popupDetails: PropTypes.object.isRequired,
    selectAnnotation: PropTypes.func.isRequired,
    annotationToolChanged: PropTypes.func.isRequired
};

export default FreeDraw;
