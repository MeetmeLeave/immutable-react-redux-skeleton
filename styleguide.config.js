const path = require('path');

module.exports = {
    title: 'Units styleguide',
    components: './src/**/components/**.js',
    updateWebpackConfig(webpackConfig) {

        const styles = path.resolve(__dirname, './node_modules/bootstrap/dist/');

        const dirs = [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'tools')
        ];

        webpackConfig.entry.push(path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.min.css'));
        webpackConfig.resolve.alias['rsg-components/Wrapper'] = path.join(__dirname, 'tools/style-guidist-wrapper');

        webpackConfig.module.loaders.push(
            {
                test: /\.js?$/,
                include: dirs,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                include: [...dirs, styles],
                loaders: ['style', 'css?root=.', 'postcss']
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                include: [styles],
                loader: 'file'
            }, {
                test: /\.(woff|woff2)$/,
                include: [styles],
                loader: 'url?prefix=font/&limit=5000'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                include: [styles],
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                include: [styles],
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        );

        webpackConfig.entry.unshift('babel-polyfill');
        return webpackConfig;
    }
};