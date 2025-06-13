import React from 'react';
import PropTypes from 'prop-types';
import {ShowAnnotationMeasurements} from './Annotations/AnnotationButtons/ShowAnnotationMeasurements';
import {SEGMENTATION_TOOL_TYPES} from './Enum/SegmentationTypes';
import DeleteAnnotation from './Annotations/AnnotationButtons/DeleteAnnotation';
import {ChooseAnnotationColor} from './Annotations/AnnotationButtons/ChooseAnnotationColor';
import ShowHideAnnotation from './Annotations/AnnotationButtons/ShowHideAnnotation';
import {JumpToFirstSlice} from './Annotations/AnnotationButtons/JumpToFirstSlice';
import EditableAnnotationLabel from './Annotations/AnnotationButtons/EditableAnnotationLabel';
import {performLongRunningTask, toggleActiveTool} from './ToggleActiveTool';
import Communication from './Communication';

export class SmartPaintComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            activeAnnotation: this.props.annotation
        }
    }

    selectAnnotation () {
        if (this.props.getActiveAnnotation() !== this.props.annotation) {
            this.setState({activeAnnotation: this.props.annotation})
            Communication.setSegmentationToolType(SEGMENTATION_TOOL_TYPES.NONE);
            global.viewportsCore.segmentingAnnotationsController.resetEditMarkForAllAnnotations();
        }

        this.props.setActiveAnnotation(this.props.annotation);
    }

    convertToEditableAnnotation () {
        if (this.state.activeAnnotation.isFormatConversionPending()) {
            return (
                <div className="annotation-toolbar-button" onClick={() => this.convertToEditableForm()}>Convert to Edit</div>
            )
        }
    }

    convertToEditableForm () {
        const action = () => global.viewportsCore.segmentingAnnotationsController.convertBetweenFormats(this.props.annotation)
        performLongRunningTask(
            action,
            () => toggleActiveTool({
                annotation: this.props.annotation,
                toolId: SEGMENTATION_TOOL_TYPES.SMART_PAINT_BRUSH
            },
                this.props.setActiveAnnotation(this.props.annotation))
        );
    }

    render () {
        const activeClass = this.state.activeAnnotation && (this.props.getActiveAnnotation() === this.state.activeAnnotation) ? 'active' : '';
        return (
            <>
                <div
                    className={`annotation-object-actions smart-paint-annotation ${activeClass}`}
                    onClick={() => this.selectAnnotation()}
                >
                    <ChooseAnnotationColor annotation={this.props.annotation} />
                    <EditableAnnotationLabel annotation={this.props.annotation} />
                    <ShowHideAnnotation annotation={this.props.annotation} />
                    <JumpToFirstSlice annotation={this.props.annotation} />
                    <ShowAnnotationMeasurements annotation={this.props.annotation} />
                    <DeleteAnnotation annotation={this.props.annotation} />
                    {this.convertToEditableAnnotation()}
                </div>
            </>
        );
    }
}

SmartPaintComponent.propTypes = {
    annotation: PropTypes.object.isRequired,
    setActiveAnnotation: PropTypes.func.isRequired,
    getActiveAnnotation: PropTypes.func.isRequired
};

export default SmartPaintComponent;
