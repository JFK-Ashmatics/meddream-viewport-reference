import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

export default class AnnotationsList extends React.Component {
    groupAnnotationsByStudyUid (annotations) {
        return annotations.reduce((accumulator, item) => {
            const studyUid = item.getStudyUid();
            const otherItems = accumulator[studyUid] || [];
            otherItems.push(item);
            accumulator[studyUid] = otherItems;
            return accumulator;
        }, {});
    }

    renderGroupList (studyUid, group) {
        if (!this.state[studyUid]) {
            return null;
        }
        return (
            <div>{this.props.renderOpenedGroup(group)}</div>
        );
    }

    renderGroupedAnnotations (studyUid, group) {
        return (
            <Fragment key={`annotations-group-${studyUid}`}>
                {this.renderGroupList(studyUid, group)}
            </Fragment>
        );
    }

    renderAnnotations (annotations) {
        const groups = this.groupAnnotationsByStudyUid(annotations);
        if (Object.keys(groups).length === 1) {
            return this.props.renderOpenedGroup(annotations);
        }
        return Object.keys(groups).map((studyUid) => this.renderGroupedAnnotations(studyUid, groups[studyUid]));
    }

    render () {
        return (
            <div className="segmentation-toolbox-annotations-list">
                {this.renderAnnotations(this.props.annotations)}
            </div>
        );
    }
}

AnnotationsList.propTypes = {
    annotations: PropTypes.array.isRequired,
    renderOpenedGroup: PropTypes.func.isRequired
};
