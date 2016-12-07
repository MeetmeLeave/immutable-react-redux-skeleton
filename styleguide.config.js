module.exports = {
    title: 'Units styleguide',
    components: './src/**/components/*.js',
    updateWebpackConfig(webpackConfig) {
        const path = require('path');
        const dir = path.resolve(__dirname, 'src');
        webpackConfig.module.loaders.push(
            {
                test: /\.jsx?$/,
                include: dir,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                include: dir,
                loader: 'style!css?modules&importLoaders=1'
            }
        );
        return webpackConfig;
    }
};