import React from 'react';
import PropTypes from 'prop-types';
import {STUDIES} from '../Studies';

export default class StudiesMenu extends React.Component {
    constructor (props) {
        super(props);
        this.studyUid = React.createRef();
        this.instanceUid = React.createRef();
    }

    loadThreeSeriesInSameTime () {
        const studiesToLoad = [
            {
                study: STUDIES[0].studyUid,
                callback: () => this.openInstanceToContainer('viewport-container-1-1', STUDIES[0].instances[0].uid)
            },
            {
                study: STUDIES[0].studyUid,
                callback: () => this.openInstanceToContainer('viewport-container-1-2', STUDIES[0].instances[1].uid)
            },
            {
                study: STUDIES[0].studyUid,
                callback: () => this.openInstanceToContainer('viewport-container-1-3', STUDIES[0].instances[2].uid)
            },
        ];
        this.loadThreeStudies(studiesToLoad);
    }

    openInstanceToContainer (containerId, instanceUid) {
        global.viewportsCore.layoutController.openInstanceToViewportContainer(containerId, instanceUid);
    }

    loadThreeStudiesInSameTime () {
        const studiesToLoad = [
            {
                study: STUDIES[0].studyUid,
                callback: (studyData) => this.openInstanceToContainer('viewport-container-1-1', studyData.series[0].instances[0].uid)
            },
            {
                study: STUDIES[1].studyUid,
                callback: (studyData) => this.openInstanceToContainer('viewport-container-1-2', studyData.series[0].instances[0].uid)
            },
            {
                study: STUDIES[2].studyUid,
                callback: (studyData) => this.openInstanceToContainer('viewport-container-1-3', studyData.series[0].instances[0].uid)
            }
        ];
        this.loadThreeStudies(studiesToLoad);
    }

    loadStudy (containerId, studyUid, instanceUid) {
        global.viewportsCore.loadStudyWithHIS(studyUid).then((studyData) => {
            const instanceToOpen = instanceUid || studyData.series[0].instances[0].uid;
            global.viewportsCore.layoutController.openInstanceToViewportContainer(containerId, instanceToOpen);
        })
    }

    loadCustomStudy () {
        global.viewportsCore.loadStudyWithHIS(this.studyUid.current.value).then(() => {
            global.viewportsCore.layoutController.openInstanceToViewportContainer(this.props.activeContainerId, this.instanceUid.current.value);
        })
    }

    loadThreeStudies (studiesToLoad) {
        if (this.props.layoutColumns < 3) {
            this.props.onLayoutColumnsChanged({target: {value: 3}}, this.loadStudyWithHis(studiesToLoad));
        } else {
            this.loadStudyWithHis(studiesToLoad);
        }
    }

    loadStudyWithHis (studiesToLoad) {
        global.viewportsCore.loadStudiesWithHIS(studiesToLoad);
    }

    render () {
        return (
            <div className="top-menu">
                <div>
                    <button onClick={() => this.loadThreeSeriesInSameTime()}>Load 3 series</button>
                    <button onClick={() => this.loadThreeStudiesInSameTime()}>Load 3 studies</button>
                    {STUDIES.map(study => {
                        return study.instances.map(instance => {
                            return (
                                <button
                                    key={`studies-button-${instance.uid}`}
                                    onClick={() => this.loadStudy(this.props.activeContainerId, study.studyUid, instance.uid)}>{instance.name || study.studyName}
                                </button>
                            )
                        })
                    })}
                </div>
                <div className="custom-study">
                    <input type="text" className="input" placeholder="Study UID" ref={this.studyUid}/>
                    <input type="text" className="input" placeholder="Instance UID" ref={this.instanceUid}/>
                    <button onClick={() => this.loadCustomStudy()}>Custom</button>
                </div>
            </div>
        )
    }
}

StudiesMenu.propTypes = {
    activeContainerId: PropTypes.string.isRequired,
    layoutColumns: PropTypes.number.isRequired,
    onLayoutColumnsChanged: PropTypes.func.isRequired
}
