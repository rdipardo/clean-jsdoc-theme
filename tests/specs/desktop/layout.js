let HOME_PAGE = require('../../wdio.conf').config.baseUrl;

if (process.env.SAFARI) {
    HOME_PAGE = require('../../wdio.safari.conf').config.baseUrl;
}

describe('Page layout', () => {
    const linkTitle = '[title="View project on GitHub"]';
    let searchBox = null;
    let originalTimeout = 10000;

    beforeEach(async () => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;

        await (async () => {
            await browser.url(`${HOME_PAGE}`);
            searchBox = await browser.$('#search-box-input');
            await searchBox.clearValue();
        })();
    });

    it('should have project\'s name in title', async () => {
        await browser.url(`${HOME_PAGE}`);

        const title = await browser.getTitle();

        expect(title).toContain('clean-jsdoc');
    });

    it('should display a link to project\'s homepage', async () => {
        const github = await browser.$(linkTitle);

        expect(await github.isExisting()).toBeTrue();
    });

    it('should display project\'s version number', async () => {
        const github = await browser.$(linkTitle);
        const projectVersion = await github.parentElement();
        const version = await projectVersion.previousElement();

        expect(await version.getText()).toMatch(/\d+\.\d+\.\d+/u);
    });

    it('should respond to search input', async () => {
        await searchBox.setValue('surv');
        const foundMethod = await browser.$('[href="Tree.html#survive"]');

        expect(await foundMethod.isExisting()).toBeTrue();
    });

    it('should generate links to documented members', async () => {
        await searchBox.setValue('cr');
        const foundMethod = await browser.$('[href="Tree.html#crop"]');

        await browser.waitUntil(() => foundMethod.isClickable(),
            {
                'timeout': 10000,
                'timeoutMsg': 'expected link to respond to clicks'
            }
        );

        await foundMethod.click();

        if ((/(bs-local)/iu).test(HOME_PAGE)) {
            await browser.waitUntil(async () => (/(Tree)/iu).test(await browser.getTitle()),
                {
                    'timeout': 20000,
                    'timeoutMsg': 'expected page navigation to complete in 2s'
                }
            );
        }

        const title = await browser.getTitle();

        expect(title).toContain('Tree');
    });

    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
