let HOME_PAGE = require('../../wdio.mobile.conf.js').config.baseUrl;

if (process.env.IOS) {
    HOME_PAGE = require('../../wdio.ios.conf').config.baseUrl;
}

describe('Mobile page layout', () => {
    beforeEach(async () => {
        await (async () => {
            await browser.url(`${HOME_PAGE}`);
        })();
    });

    it('should display navigation toggle button without scrolling', async () => {
        const navicon = await browser.$('.navicon-button.x');

        expect(await navicon.isDisplayedInViewport()).toBeTrue();
    });

    it('should toggle nav bar when button is tapped', async () => {
        const navicon = await browser.$('.navicon-button.x');

        await navicon.click();

        const searchBox = await browser.$('#search-box');

        expect(await searchBox.isDisplayedInViewport()).toBeTrue();

        await navicon.click();

        expect(await searchBox.isDisplayedInViewport()).toBeFalse();
    });

    it('should hide nav bar on link navigation', async () => {
        const navicon = await browser.$('.navicon-button.x');

        await navicon.click();
        let searchBox = await browser.$('#search-box');

        await searchBox.clearValue();
        await searchBox.setValue('cr');
        const foundMethod = await browser.$('[href="Tree.html#crop"]');

        await foundMethod.click();

        const title = await browser.getTitle();

        searchBox = await browser.$('#search-box');

        expect(title).toContain('Tree');
        expect(await searchBox.isDisplayedInViewport()).toBeFalse();
    });
});
