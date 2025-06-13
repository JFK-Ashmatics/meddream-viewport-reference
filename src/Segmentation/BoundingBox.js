import React from 'react';
import PropTypes from 'prop-types';
import {ShowAnnotationMeasurements} from './Annotations/AnnotationButtons/ShowAnnotationMeasurements';
import AnnotationType from './Annotations/AnnotationType';
import {ChooseAnnotationColor} from './Annotations/AnnotationButtons/ChooseAnnotationColor';
import ShowHideAnnotation from './Annotations/AnnotationButtons/ShowHideAnnotation';
import {JumpToFirstSlice} from './Annotations/AnnotationButtons/JumpToFirstSlice';
import EditableAnnotationLabel from './Annotations/AnnotationButtons/EditableAnnotationLabel';
import DuplicateAnnotation from './Annotations/AnnotationButtons/DuplicateAnnotation';
import DeleteAnnotation from './Annotations/AnnotationButtons/DeleteAnnotation';
import {SEGMENTATION_TOOL_TYPES} from './Enum/SegmentationTypes';
import EditAnnotationShape from './Annotations/EditAnnotationShape';

export default class BoundingBox extends React.Component {
    getInformationButton () {
        return <ShowAnnotationMeasurements annotation={this.props.annotation} />;
    }

    renderRightSideButtons () {
        return (
            <>
                {this.getInformationButton()}
                <DuplicateAnnotation annotation={this.props.annotation} />
                <DeleteAnnotation annotation={this.props.annotation} />
                <EditAnnotationShape
                    annotation={this.props.annotation}
                    toolId={SEGMENTATION_TOOL_TYPES.BOUNDING_BOX_PENCIL}
                />
            </>
        );
    }

    render () {
        return (
            <div className={`annotation-object-actions bounding-box-annotation`}>
                <AnnotationType annotation={this.props.annotation} />
                <ChooseAnnotationColor annotation={this.props.annotation} />
                <EditableAnnotationLabel annotation={this.props.annotation} />
                <ShowHideAnnotation annotation={this.props.annotation} />
                <JumpToFirstSlice annotation={this.props.annotation} />
                {this.renderRightSideButtons()}
            </div>
        );
    }
}

BoundingBox.propTypes = {
    annotation: PropTypes.object.isRequired
};

