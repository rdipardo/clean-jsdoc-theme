require('dotenv').config();

const browserstack = require('browserstack-local');

exports.config = {
    'user': process.env.BROWSERSTACK_USERNAME,
    'key': process.env.BROWSERSTACK_ACCESS_KEY,
    'specs': ['./tests/specs/mobile/**'],
    'capabilities': [{
        'name': 'Android-ui-test',
        'project': 'clean-jsdoc',
        'build': 'clean-jsdoc-mobile-ui-testing',
        'device': 'Google Pixel 3',
        'os_version': '9.0',
        'realMobile': true,
        'browserName': 'Android',
        'browserstack.local': true,
        'browserstack.appiumLogs': false,
        'browserstack.seleniumLogs': false
    }],
    'logLevel': 'error',
    'coloredLogs': false,
    'baseUrl': `http://localhost:${process.env.PORT || 3000}`,
    'waitforTimeout': 50000,
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
