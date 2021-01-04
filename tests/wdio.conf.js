require('dotenv').config();

const browserstack = require('browserstack-local');

exports.config = {
    'user': process.env.BROWSERSTACK_USERNAME,
    'key': process.env.BROWSERSTACK_ACCESS_KEY,
    'specs': ['./tests/specs/desktop/**'],
    'capabilities': [
        {
            'name': 'IE-ui-test',
            'project': 'clean-jsdoc',
            'build': 'clean-jsdoc-ui-testing',
            'os': 'Windows',
            'os_version': '7',
            'browserName': 'IE',
            'browser_version': '11.0',
            'browserstack.sendKeys': true,
            'browserstack.local': true,
            'browserstack.appiumLogs': false,
            'browserstack.seleniumLogs': false,
            'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER
        },
        {
            'name': 'Chrome-ui-test',
            'project': 'clean-jsdoc',
            'build': 'clean-jsdoc-ui-testing',
            'os': 'OS X',
            'os_version': 'Catalina',
            'browserName': 'Chrome',
            'browser_version': 'latest',
            'browserstack.local': true,
            'browserstack.appiumLogs': false,
            'browserstack.seleniumLogs': false,
            'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER
        },
        {
            'name': 'Firefox-ui-test',
            'project': 'clean-jsdoc',
            'build': 'clean-jsdoc-ui-testing',
            'os': 'Windows',
            'os_version': '10',
            'browserName': 'Firefox',
            'browser_version': 'latest',
            'browserstack.local': true,
            'browserstack.appiumLogs': false,
            'browserstack.seleniumLogs': false,
            'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER
        }
    ],
    'logLevel': 'error',
    'coloredLogs': false,
    'baseUrl': `http://localhost:${process.env.PORT || 3000}`,
    'waitforTimeout': 100000,
    'connectionRetryTimeout': 90000,
    'connectionRetryCount': 3,
    'framework': 'jasmine',
    'jasmineNodeOpts': {
        'defaultTimeoutInterval': 90000,
        'failFast': true
    },
    'onPrepare': (config, capabilities) => {
        console.log('Connecting to local server');

        return new Promise((resolve, reject) => {
            exports.bs_local = new browserstack.Local();
            exports.bs_local.start({
                'key': exports.config.key,
                'force': 'true',
                'onlyAutomate': 'true'
            }, error => {
                if (error) {
                    return reject(error);
                }

                resolve();
            });
        });
    },
    'onComplete'(capabilties, specs) {
        exports.bs_local.stop(() => {
            console.log('Shutting down local server');
        });
    }
};
