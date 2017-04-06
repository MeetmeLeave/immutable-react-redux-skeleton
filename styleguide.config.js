const path = require('path');
const loaders = require('loaders');
const componentWrapper = path.join(__dirname, 'tools/style-guidist-wrapper');
const productionWebpackConfig = require('./webpack.config.prod');
const devWebpackConfig = require('./webpack.config.dev');

module.exports = {
    title: 'Units Styleguide',
    serverHost: '0.0.0.0',
    serverPort: 3030,
    skipComponentsWithoutExample: true,
    getExampleFilename(componentpath) {
        return componentpath.replace(/\.js?$/, '.md');
    },
    getComponentPathLine(componentPath) {
        const name = path.basename(componentPath);
        const dir = path
            .dirname(componentPath)
            .replace('../../', '');
        return `${dir}/${name}`;
    },
    styleguideDir: path.resolve(__dirname, '../../styleguide'),
    components: './src/**/components/**.js',
    require: [
        'bootstrap-loader', componentWrapper, path.resolve(__dirname, './node_modules/bootstrap/dist/css/bootstrap.min.css')
    ],
    webpackConfig(env) {
        const webpackConfig = 'production' === env
            ? productionWebpackConfig
            : devWebpackConfig;
        if (!webpackConfig.resolve) {
            webpackConfig.resolve = {};
        }

        if (!webpackConfig.resolve.alias) {
            webpackConfig.resolve.alias = {};
        }

        webpackConfig.resolve.alias = {
            'rsg-components/Wrapper': componentWrapper
        };
        return webpackConfig;
    }
};