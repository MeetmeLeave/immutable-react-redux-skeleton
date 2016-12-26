/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable no-console */

var port = 8080;
var fs = require('fs');
var path = fs.absolute(fs.workingDirectory + '/phantomcss.js');
var phantomcss = require(path);
var server = require('webserver').create();

var html = fs.read(fs.absolute(fs.workingDirectory + '/styleguide/index.html'));
var js = fs.read(fs.absolute(fs.workingDirectory + '/styleguide/build/bundle.js'));

server.listen(port, function (req, res) {
    switch (req.url) {
        case '/build/bundle.js':
            res.write(js);
            break;
        default:
            res.headers = {
                'Cache': 'no-cache',
                'Content-Type': 'text/html;charset=utf-8'
            };
            res.write(html);
            break;
    }
    res.statusCode = 200;
    res.close();
});

function getComponents() {
    var components = document.querySelectorAll('.ReactStyleguidist-ReactComponent__root');
    return Array.prototype.map.call(components, function (e) {
        return e.getAttribute('id');
    });
}

casper.test.begin('React components test', function (test) {

    phantomcss.init({
        rebase: casper.cli.get("rebase"),
        casper: casper,
        libraryRoot: fs.absolute(fs.workingDirectory + ''),
        screenshotRoot: fs.absolute(fs.workingDirectory + '/screenshots'),
        failedComparisonsRoot: fs.absolute(fs.workingDirectory + '/screenshots/failures'),
        addLabelToFailedImage: false
    });

    casper.on('remote.message', function (msg) {
        this.echo(msg);
    });

    casper.on('error', function (err) {
        this.die("PhantomJS has errored: " + err);
    });

    casper.on('resource.error', function (err) {
        casper.log('Resource load error: ' + err, 'warning');
    });

    casper.start('http://localhost:' + port);

    casper.viewport(1024, 768);

    casper.then(function () {
        casper.waitForSelector('#app',
            function success() {
                var components = this.evaluate(getComponents);
                for (var i = 0; i < components.length; i++) {
                    var componentId = components[i];
                    phantomcss.screenshot('#' + componentId, componentId + '-scrn');
                }
            },
            function timeout() {
                casper.test.fail('Tests failed! Should see components root!');
            }
        );
    });

    casper.then(function now_check_the_screenshots() {
        phantomcss.compareAll();
    });

    casper.run(function () {
        console.log('\nTHE END.');
        phantomcss.getExitStatus();
        casper.test.done();
    });
});