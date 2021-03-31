let HOME_PAGE = require('../../wdio.conf').config.baseUrl;

if (process.env.SAFARI) {
    HOME_PAGE = require('../../wdio.safari.conf').config.baseUrl;
}

describe('Line numbers', () => {
    const SOURCE_LINE = 'line29';
    let originalTimeout = 10000;

    beforeEach(async () => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

        await (async () => {
            await browser.url(`${HOME_PAGE}/Environment.html`);
            const sourceLink = await browser.$(`[href="Environment.js.html#${SOURCE_LINE}"]`);

            await browser.waitUntil(() => sourceLink.isClickable(),
                {
                    'timeout': 18000,
                    'timeoutMsg': 'expected link to be responsive after 18s'
                }
            );
            await sourceLink.click();
        })();
    });

    it('should have properly named hyperlinks', async () => {
        const foundLine = await browser.$('.selected');
        const idName = await foundLine.getAttribute('id');

        expect(idName).toEqual(SOURCE_LINE);
    });

    it('should be hightlighted', async () => {
        const foundLine = await browser.$('.selected');
        const ordinaryLine = await foundLine.previousElement();
        const lineStyle = await foundLine.getCSSProperty('background-color');
        const plainStyle = await ordinaryLine.getCSSProperty('background-color');

        expect(lineStyle.parsed.hex).not.toEqual(plainStyle.parsed.hex);
    });

    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
