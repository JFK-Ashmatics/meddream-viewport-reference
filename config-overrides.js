const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config) {
    config.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/viewports-core/dist/*.bundle.js',
                    to: 'static/js/[name].js',
                    force: true,
                    info: {
                        minimized: true
                    }
                }
            ]
        })
    );
    return config;
}
