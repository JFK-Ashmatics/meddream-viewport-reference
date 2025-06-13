const {SEGMENTATION_TOOL_TYPES} = require('./SegmentationTypes');

export const TABS = [
    {
        id: 0,
        constraints: {
            associatedRole: 'canViewBoundingBox',
            toolId: SEGMENTATION_TOOL_TYPES.BOUNDING_BOX
        },
        label: 'BoundingBox',
        tabStyle: 'segmentation-toolbox-category-tab',
        labelStyle: 'segmentation-toolbox-category-tab-label'
    },
    {
        id: 1,
        constraints: {
            associatedRole: 'canViewFreeDraw',
            toolId: SEGMENTATION_TOOL_TYPES.FREE_DRAW
        },
        label: 'FreeDraw',
        tabStyle: 'segmentation-toolbox-category-tab',
        labelStyle: 'segmentation-toolbox-category-tab-label'
    },
    {
        id: 2,
        constraints: {
            associatedRole: 'canViewSmartPaint',
            toolId: SEGMENTATION_TOOL_TYPES.SMART_PAINT_BRUSH
        },
        label: 'SmartPaint',
        tabStyle: 'segmentation-toolbox-category-tab',
        labelStyle: 'segmentation-toolbox-category-tab-label'
    }
];
