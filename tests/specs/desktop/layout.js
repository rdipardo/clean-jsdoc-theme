let HOME_PAGE = require('../../wdio.conf').config.baseUrl;

if (process.env.SAFARI) {
    HOME_PAGE = require('../../wdio.safari.conf').config.baseUrl;
}

describe('Page layout', () => {
    let searchBox = null;

    beforeEach(async () => {
        await (async () => {
            await browser.url(`${HOME_PAGE}`);
            searchBox = await browser.$('#search-box');
            await searchBox.clearValue();
        })();
    });

    it('should have project\'s name in title', async () => {
        await browser.url(`${HOME_PAGE}`);

        const title = await browser.getTitle();

        expect(title).toContain('clean-jsdoc');
    });

    it('should display a link to project\'s homepage', async () => {
        const github = await browser.$('[title="View project on Github"]');

        expect(await github.isExisting()).toBeTrue();
    });

    it('should display project\'s version number', async () => {
        const github = await browser.$('[title="View project on Github"]');
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

        await foundMethod.click();
        const title = await browser.getTitle();

        expect(title).toContain('Tree');
    });
});
