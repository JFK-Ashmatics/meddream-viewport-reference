import React from 'react';
import PropTypes from 'prop-types';
import Communication from '../Communication';
import {SEGMENTATION_TOOL_TYPES} from '../Enum/SegmentationTypes';
import AnnotationsList from '../Annotations/AnnotationsList';
import SmartPaint from '../SmartPaint';
import AddSmartPaintAnnotation from '../Annotations/AddSmartPaintAnnotation';
import ToggleToolButton from '../Annotations/ToggleToolButton';
import RadiusSlider from '../Annotations/AnnotationButtons/SmartPaintSliders/RadiusSlider';
import SensitivitySlider from '../Annotations/AnnotationButtons/SmartPaintSliders/SensitivitySlider';
import OpacitySlider from '../Annotations/AnnotationButtons/SmartPaintSliders/OpacitySlider';

export default class SmartPaintTab extends React.Component {
    constructor (props) {
        super(props);
        this.renderOpenedGroupBind = this.renderOpenedGroup.bind(this);
        this.state = {
            activeAnnotation: undefined
        };
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
            <SmartPaint
                key={`segm-annotation-${annotation.getUid()}`}
                annotation={annotation}
                setActiveAnnotation={(activeAnnotation) => this.setActiveAnnotation(activeAnnotation)}
                getActiveAnnotation={() => this.getActiveAnnotation()}
                {...annotation}
            />
        ));
    }

    setActiveAnnotation (annotation) {
        this.setState({activeAnnotation: annotation})
    }

    getActiveAnnotation () {
        return this.state.activeAnnotation;
    }

    renderToggleButtonActions () {
        if (this.state.activeAnnotation && !this.state.activeAnnotation.isFormatConversionPending()) {
            return (
                <div className="smart-paint-brush-actions">
                    <ToggleToolButton
                        annotation={this.state.activeAnnotation}
                        toolId={SEGMENTATION_TOOL_TYPES.SMART_PAINT_BRUSH}
                        className="smart-paint-brush-button"
                        tooltip="Brush"
                    />
                    <ToggleToolButton
                        annotation={this.state.activeAnnotation}
                        toolId={SEGMENTATION_TOOL_TYPES.SMART_PAINT_BRUSH_WITH_REF}
                        className="smart-paint-ref-brush-button"
                        tooltip="BrushWithRef"
                    />
                    <ToggleToolButton
                        annotation={this.state.activeAnnotation}
                        toolId={SEGMENTATION_TOOL_TYPES.SMART_PAINT_BUCKET}
                        className="smart-paint-bucket-button"
                        tooltip="Bucket"
                    />
                    <ToggleToolButton
                        annotation={this.state.activeAnnotation}
                        toolId={SEGMENTATION_TOOL_TYPES.SMART_PAINT_FILL_BRUSH}
                        className="smart-paint-fill-brush-button"
                        tooltip="FillBrush"
                    />
                    <ToggleToolButton
                        annotation={this.state.activeAnnotation}
                        toolId={SEGMENTATION_TOOL_TYPES.SMART_PAINT_SMOOTH_BRUSH}
                        className="smart-paint-smooth-brush-button"
                        tooltip="SmoothBrush"
                    />
                </div>
            )
        }
    }

    render () {
        return (
            <>
                <AnnotationsList
                    key="smart-paint-annotations-list"
                    annotations={this.props.annotations}
                    renderOpenedGroup={this.renderOpenedGroupBind}
                />
                <AddSmartPaintAnnotation
                    setActiveAnnotation={(activeAnnotation) => this.setActiveAnnotation(activeAnnotation)}
                />
                {this.renderToggleButtonActions()}
                <div className="smart-paint-actions">
                    <RadiusSlider />
                    <SensitivitySlider />
                    <OpacitySlider canSave />
                </div>
            </>
        );
    }
}

SmartPaintTab.propTypes = {
    annotations: PropTypes.array.isRequired
};
