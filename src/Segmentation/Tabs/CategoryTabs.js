import React from 'react';
import PropTypes from 'prop-types';
import CategoryTab from './CategoryTab';

export default function CategoryTabs ({className, activeTabId, onChange, tabs}) {
    function renderTab (tab) {
        const isActive = tab.id === activeTabId;
        return <CategoryTab isActive={isActive} key={`category-tab-${tab.id}`} {...tab} onClick={onChange} />;
    }

    return (
        <div className={className}>
            {tabs.map((tab) => renderTab(tab))}
        </div>
    );
}

CategoryTabs.propTypes = {
    className: PropTypes.string.isRequired,
    activeTabId: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    tabs: PropTypes.array.isRequired
};
