import React from 'react'
import PropTypes from 'prop-types';
import SegmentationToolbarHeader from './SegmentationToolbarHeader';
import {TABS} from './Enum/SegmentationTabTypes';
import CategoryTabs from './Tabs/CategoryTabs';
import {SEGMENTATION_TYPES} from './Enum/SegmentationTypes';
import CategoryTabPanel from './Tabs/CategoryTabPanel';
import BoundingBoxTab from './Tabs/BoundingBoxTab';
import FreeDrawTab from './Tabs/FreeDrawTab';
import SmartPaintTab from './Tabs/SmartPaintTab';
import SaveAnnotations from './Annotations/SaveAnnotations';
import ShowAllAnnotationMeasurements from './Annotations/ShowAllAnnotationMeasurements';
import UndoEdit from './Annotations/UndoEdit';

export default class SegmentationModal extends React.Component {
    constructor (props) {
        super(props);
        this.handleChangeBind = this.handleChange.bind(this);
        this.handleUpdateModal();

        const allowedTabs = this.filterTabs(TABS);
        this.state = {
            activeTabId: this.chooseDefaultTabByDefaultToolId(allowedTabs),
        };
    }

    componentDidUpdate (prevProps) {
        if (this.props.defaultToolId !== prevProps.defaultToolId) {
            const allowedTabs = this.filterTabs(TABS);
            const newActiveTab = this.chooseDefaultTabByDefaultToolId(allowedTabs);
            if (newActiveTab > -1) {
                this.setState({
                    activeTabId: newActiveTab
                });
            }
        }
    }

    chooseDefaultTabByDefaultToolId (availableTabs) {
        const matchingTab = availableTabs.find((item) => item.constraints.toolId === this.props.defaultToolId);
        return matchingTab ? matchingTab.id : undefined;
    }

    handleChange (newValue) {
        this.setState({activeTabId: newValue});
    }

    handleUpdateModal () {
        // Just for example purposes
        global.viewportsCore.registerEvent('segment-annotation-updated', () => {
            this.forceUpdate();
        });
    }

    filterTabs (tabList) {
        return tabList.reduce((result, tab) => {
            const isEnabled = this.props[tab.constraints.associatedRole];
            if (isEnabled) {
                result.push(tab);
            }
            return result;
        }, []);
    }

    filterAnnotations (type) {
        return global.viewportsCore.segmentingAnnotationsController.getAllAnnotations().filter((item) => item.type === type);
    }


    renderBoundingBoxTab () {
        if (this.state.activeTabId === 0) {
            const bBoxes = this.filterAnnotations(SEGMENTATION_TYPES.BOUNDING_BOX);
            return (
                <CategoryTabPanel
                    index={0}
                    activeTabId={this.state.activeTabId}
                    className="segmentation-toolbox-tab-panel"
                >
                    <BoundingBoxTab
                        annotations={bBoxes}
                    />
                </CategoryTabPanel>
            );
        }
    }

    renderFreeDrawTab () {
        if (this.state.activeTabId === 1) {
            const freeDraws = this.filterAnnotations(SEGMENTATION_TYPES.FREE_DRAW);
            return (
                <CategoryTabPanel
                    index={1}
                    activeTabId={this.state.activeTabId}
                    className="segmentation-toolbox-tab-panel"
                >
                    <FreeDrawTab
                        annotations={freeDraws}
                    />
                </CategoryTabPanel>
            );
        }
    }

    renderSmartPaintTab () {
        if (this.state.activeTabId === 2) {
            const smartPaints = this.filterAnnotations(SEGMENTATION_TYPES.SMART_PAINT);
            return (
                <CategoryTabPanel
                    index={2}
                    activeTabId={this.state.activeTabId}
                    className="segmentation-toolbox-tab-panel"
                >
                    <SmartPaintTab
                        annotations={smartPaints}
                    />
                </CategoryTabPanel>
            );
        }
    }

    renderActions () {
        return (
            <div className="segmentation-toolbox-actions">
                <UndoEdit />
                <ShowAllAnnotationMeasurements />
                <SaveAnnotations />
            </div>
        );
    }

    render () {
        if (!this.props.show) {
           return null;
        }
        const tabsAvailable = this.filterTabs(TABS);
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-tabs">
                        <SegmentationToolbarHeader
                            onClose={this.props.onClose}
                            activeTabName={TABS[this.state.activeTabId].label}
                        >
                            <div className="segmentation-toolbox-body">
                                <CategoryTabs
                                    className="segmentation-toolbox-category-tabs"
                                    activeTabId={this.state.activeTabId}
                                    onChange={this.handleChangeBind}
                                    tabs={tabsAvailable}
                                />
                                {this.renderBoundingBoxTab()}
                                {this.renderFreeDrawTab()}
                                {this.renderSmartPaintTab()}
                            </div>
                            {this.renderActions()}
                        </SegmentationToolbarHeader>
                    </div>
                </div>
            </div>
        )
    }
}

SegmentationModal.defaultProps = {
    canViewBoundingBox: true,
    canViewFreeDraw: true,
    canViewSmartPaint: true,
    defaultToolId: 'bounding-box'
}

SegmentationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
