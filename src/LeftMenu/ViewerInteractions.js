import React from 'react';

export default class ViewerInteractions extends React.Component {
    handleMouseButtonFunction (event) {
        global.viewportsCore.setMouseButtonFunction(0, parseInt(event.target.value));
    }

    render () {
        return (
            <>
                <label htmlFor="viewerInteractions">Viewer Interactions:</label>
                <select id="viewerInteractions" onChange={this.handleMouseButtonFunction}>
                    <option value={0}>None</option>
                    <option value={1}>WL</option>
                    <option value={2}>Zoom</option>
                    <option value={3}>Pan</option>
                    <option value={4}>Scroll</option>
                    <option value={6}>Rotate</option>
                    <option value={8}>Crosshair</option>
                </select>
            </>
        )
    }
}
