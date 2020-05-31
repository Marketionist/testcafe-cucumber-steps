'use strict';
/* eslint new-cap: 0 */ // --> OFF for Given, When, Then, Selector

// #############################################################################

const { Given, When, Then } = require('cucumber');
const { ClientFunction, Selector } = require('testcafe');
const path = require('path');
const { readDirectories, createRequest } = require('js-automation-tools');
const SelectorXPath = require('./utils/selector-xpath.js');
const errors = require('./utils/errors.js');

const spacesToIndent = 4;

const isCalledExternally = __dirname.includes('node_modules');

const pageObjectsFolderPathes = 'PO_FOLDER_PATH' in process.env ?
    process.env.PO_FOLDER_PATH.replace(/\s+/g, '').split(',') :
    ['tests/page-model'];

const fullPageObjectsFolderPathes = isCalledExternally ?
    pageObjectsFolderPathes.map((pageObjectsFolderPath) => {
        return path.join(__dirname, '../..', pageObjectsFolderPath)
    }) :
    pageObjectsFolderPathes.map((pageObjectsFolderPath) => {
        return path.join(__dirname, pageObjectsFolderPath)
    });

// Require all Page Object files in directory
let pageObjects = {};

/**
 * Requires Page Object files
 * @returns {Array} allRequiredPageObjects
 */
async function requirePageObjects () {
    const allPageObjectFiles = await readDirectories(
        fullPageObjectsFolderPathes);
    const allRequiredPageObjects = allPageObjectFiles.filter(
        (value) => {
            return value.includes('.js');
        }
    ).map((file) => {
        const fileName = path.basename(file, '.js');

        pageObjects[fileName] = require(file);

        return file;
    });

    console.log(
        '\nPage Objects from PO_FOLDER_PATH:',
        `\n${JSON.stringify(pageObjects, null, spacesToIndent)}\n\n`
    );

    return allRequiredPageObjects;
}

requirePageObjects();

/**
 * Checks if locator is XPath
 * @param {String} locator
 * @returns {Boolean}
 */
function isXPath (locator) {
    const firstCharOfLocator = 0;
    const fourthCharOfLocator = 3;

    return locator.slice(firstCharOfLocator, fourthCharOfLocator).includes('//');
}

/**
 * Checks for XPath and gets proper element for further actions
 * @param {String} page
 * @param {String} elem
 * @returns {Object} element
 */
function getElement (page, elem) {
    const locator = pageObjects[page][elem];
    let element;

    try {
        if (isXPath(locator)) {
            element = SelectorXPath(locator);
        } else {
            element = locator;
        }
    } catch (error) {
        throw new ReferenceError(`${errors.SELECTOR_NOT_DEFINED} "${page}"."${element}" ${error}`);
    }

    return element;
}

/**
 * Sets cookie on the current website
 * @param {String} cookie
 */
function setCookie (cookie) {
    const domain = window.location.hostname.split('.').filter((part) => {
        return part !== 'www';
    }).join('.');

    document.cookie = `${cookie};domain=.${domain};path=/`;
    window.location.reload();
}

// #### Given steps ############################################################

Given('I/user go(es) to URL {string}', async function (t, [url]) {
    await t.navigateTo(url);
});

Given('I/user go(es) to {string}.{string}', async function (t, [page, element]) {
    await t.navigateTo(pageObjects[page][element]);
});

Given('I/user go(es) to {word} from {word}( page)', async function (t, [element, page]) {
    await t.navigateTo(pageObjects[page][element]);
});

Given('I/user set(s) cookie {string}', async function (t, [cookie]) {
    const executeSetCookie = ClientFunction((setCookieFunction, cookieString) => {
        return setCookieFunction(cookieString);
    });

    await executeSetCookie(setCookie, cookie);
});

Given('I/user set(s) cookie {string}.{string}', async function (t, [page, element]) {
    const executeSetCookie = ClientFunction((setCookieFunction, cookieString) => {
        return setCookieFunction(cookieString);
    });

    await executeSetCookie(setCookie, pageObjects[page][element]);
});

Given('I/user set(s) cookie {word} from {word}( page)', async function (t, [element, page]) {
    const executeSetCookie = ClientFunction((setCookieFunction, cookieString) => {
        return setCookieFunction(cookieString);
    });

    await executeSetCookie(setCookie, pageObjects[page][element]);
});

Given('I/user send(s) {string} request to {string} with body {string}', async function (
    t, [method, reqUrl, body]
) {
    await createRequest(method, reqUrl, '', body);
});

Given('I/user send(s) {string} request to {string} with body {string}.{string}', async function (
    t, [method, reqUrl, page, element]
) {
    await createRequest(method, reqUrl, '', pageObjects[page][element]);
});

Given('I/user send(s) {string} request to {string}.{string} with body {string}.{string}', async function (
    t, [method, page1, element1, page2, element2]
) {
    await createRequest(method, pageObjects[page1][element1], '', pageObjects[page2][element2]);
});

Given(
    'I/user send(s) {string} request to {word} from {word}( page) with body {word} from {word}( page)',
    async function (t, [method, element1, page1, element2, page2]
    ) {
        await createRequest(method, pageObjects[page1][element1], '', pageObjects[page2][element2]);
    }
);

Given('I/user send(s) {string} request to {string} with headers {string} and body {string}', async function (
    t, [method, reqUrl, headers, body]
) {
    await createRequest(method, reqUrl, headers, body);
});

Given(
    'I/user send(s) {string} request to {string} with headers {string}.{string} and body {string}.{string}',
    async function (t, [method, reqUrl, page1, element1, page2, element2]) {
        await createRequest(method, reqUrl, pageObjects[page1][element1], pageObjects[page2][element2]);
    }
);

Given(
    'I/user send(s) {string} request to {string}.{string} with headers {string}.{string} and body {string}.{string}',
    async function (t, [method, page1, element1, page2, element2, page3, element3]) {
        await createRequest(
            method,
            pageObjects[page1][element1],
            pageObjects[page2][element2],
            pageObjects[page3][element3]
        );
    }
);

Given(
    // eslint-disable-next-line cucumber/expression-type
    'I/user send(s) {string} request to {word} from {word}( page) with ' +
    'headers {word} from {word}( page) and body {word} from {word}( page)',
    async function (t, [method, element1, page1, element2, page2, element3, page3]
    ) {
        await createRequest(
            method,
            pageObjects[page1][element1],
            pageObjects[page2][element2],
            pageObjects[page3][element3]
        );
    }
);

// #### When steps #############################################################

When(
    // eslint-disable-next-line cucumber/expression-type
    'I/user log(s) in with l: {string} in {string}.{string} and ' +
    'p: {string} in {string}.{string} and click(s) {string}.{string}',
    async function (
        t, [login, page1, element1, password, page2, element2, page3, element3]
    ) {
        const inputLogin = getElement(page1, element1);
        const inputPassword = getElement(page2, element2);
        const buttonLogin = getElement(page3, element3);

        await t.typeText(inputLogin, login)
            .typeText(inputPassword, password).click(buttonLogin);
    }
);

When(
    // eslint-disable-next-line cucumber/expression-type
    'I/user log(s) in with l: {string} in {word} from {word}( page) and ' +
    'p: {string} in {word} from {word}( page) and click(s) ' +
    '{word} from {word}( page)',
    async function (
        t, [login, element1, page1, password, element2, page2, element3, page3]
    ) {
        const inputLogin = getElement(page1, element1);
        const inputPassword = getElement(page2, element2);
        const buttonLogin = getElement(page3, element3);

        await t.typeText(inputLogin, login)
            .typeText(inputPassword, password).click(buttonLogin);
    }
);

When(
    // eslint-disable-next-line cucumber/expression-type
    'I/user log(s) in with l: {string}.{string} in {string}.{string} and ' +
    'p: {string}.{string} in {string}.{string} and click(s) {string}.{string}',
    async function (
        t, [page1, element1, page2, element2, page3, element3, page4, element4, page5, element5]
    ) {
        const login = getElement(page1, element1);
        const inputLogin = getElement(page2, element2);
        const password = getElement(page3, element3);
        const inputPassword = getElement(page4, element4);
        const buttonLogin = getElement(page5, element5);

        await t.typeText(inputLogin, login)
            .typeText(inputPassword, password).click(buttonLogin);
    }
);

When(
    // eslint-disable-next-line cucumber/expression-type
    'I/user log(s) in with l: {word} from {word}( page) in {word} from {word}( page) and ' +
    'p: {word} from {word}( page) in {word} from {word}( page) and click(s) ' +
    '{word} from {word}( page)',
    async function (
        t, [element1, page1, element2, page2, element3, page3, element4, page4, element5, page5]
    ) {
        const login = getElement(page1, element1);
        const inputLogin = getElement(page2, element2);
        const password = getElement(page3, element3);
        const inputPassword = getElement(page4, element4);
        const buttonLogin = getElement(page5, element5);

        await t.typeText(inputLogin, login)
            .typeText(inputPassword, password).click(buttonLogin);
    }
);

When('I/user reload(s) the page', async function (t) {
    await t.eval(() => location.reload(true));
});

When('I/user click(s) {string}.{string}', async function (t, [page, element]) {
    const elem = getElement(page, element);

    await t.click(elem);
});

When(
    'I/user click(s) {word} from {word}( page)',
    async function (t, [element, page]) {
        const elem = getElement(page, element);

        await t.click(elem);
    }
);

When('I/user wait(s) for {int} ms', async function (t, [timeToWait]) {
    await t.wait(timeToWait);
});

When('I/user wait(s) and click(s) {string}.{string}', async function (
    t, [page, element]
) {
    const elem = getElement(page, element);
    const timeToWait = 300;

    await t.wait(timeToWait).click(elem);
});

When('I/user wait(s) and click(s) {word} from {word}( page)', async function (
    t, [element, page]
) {
    const elem = getElement(page, element);
    const timeToWait = 300;

    await t.wait(timeToWait).click(elem);
});

When('I/user wait(s) up to {int} ms for {string}.{string} to appear', async function (
    t, [timeToWait, page, element]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).with(
        { timeout: timeToWait, visibilityCheck: true }
    ).exists).ok(
        `${errors.ELEMENT_NOT_PRESENT} "${page}"."${element}" up to ${timeToWait} ms`,
        { timeout: timeToWait }
    );
});

When('I/user wait(s) up to {int} ms for {word} from {word}( page) to appear', async function (
    t, [timeToWait, element, page]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).with(
        { timeout: timeToWait, visibilityCheck: true }
    ).exists).ok(
        `${errors.ELEMENT_NOT_PRESENT} "${page}"."${element}" up to ${timeToWait} ms`,
        { timeout: timeToWait }
    );
});

When('I/user click(s) {string}.{string} if present', async function (
    t, [page, element]
) {
    const elem = getElement(page, element);
    const isPresent = await Selector(elem).exists;

    if (isPresent) {
        // Click only if element is present
        await t.click(elem);
    }
});

When('I/user click(s) {word} from {word}( page) if present', async function (
    t, [element, page]
) {
    const elem = getElement(page, element);
    const isPresent = await Selector(elem).exists;

    if (isPresent) {
        // Click only if element is present
        await t.click(elem);
    }
});

When('I/user double click(s) {string}.{string}', async function (
    t, [page, element]
) {
    const elem = getElement(page, element);

    await t.doubleClick(elem);
});

When('I/user double click(s) {word} from {word}( page)', async function (
    t, [element, page]
) {
    const elem = getElement(page, element);

    await t.doubleClick(elem);
});

When('I/user type(s) {string} in {string}.{string}', async function (
    t, [text, page, element]
) {
    const elem = getElement(page, element);

    await t.typeText(elem, text);
});

When('I/user type(s) {string} in {word} from {word}( page)', async function (
    t, [text, element, page]
) {
    const elem = getElement(page, element);

    await t.typeText(elem, text);
});

When('I/user type(s) {string}.{string} in {string}.{string}', async function (
    t, [page1, element1, page2, element2]
) {
    const elem = getElement(page2, element2);

    await t.typeText(elem, pageObjects[page1][element1]);
});

When(
    'I/user type(s) {word} from {word}( page) in {word} from {word}( page)',
    async function (t, [element1, page1, element2, page2]) {
        const elem = getElement(page2, element2);

        await t.typeText(elem, pageObjects[page1][element1]);
    }
);

When('I/user clear(s) {string}.{string} and type(s) {string}', async function (
    t, [page, element, text]
) {
    const elem = getElement(page, element);

    await t.typeText(elem, text, { replace: true });
});

When(
    'I/user clear(s) {word} from {word}( page) and type(s) {string}',
    async function (t, [element, page, text]) {
        const elem = getElement(page, element);

        await t.typeText(elem, text, { replace: true });
    }
);

When(
    'I/user clear(s) {string}.{string} and type(s) {string}.{string}',
    async function (t, [page1, element1, page2, element2]) {
        const elem = getElement(page1, element1);

        await t.typeText(
            elem,
            pageObjects[page2][element2],
            { replace: true }
        );
    }
);

When(
    'I/user clear(s) {word} from {word}( page) and type(s) {word} from {word}( page)',
    async function (t, [element1, page1, element2, page2]) {
        const elem = getElement(page1, element1);

        await t.typeText(
            elem,
            pageObjects[page2][element2],
            { replace: true }
        );
    }
);

When('I/user select(s) {string} in {string}.{string}', async function (
    t, [text, page, element]
) {
    const elem = getElement(page, element);
    const dropdown = Selector(elem);
    const option = dropdown.find('option');

    await t.click(dropdown).click(option.withText(text));
});

When('I/user select(s) {string} in {word} from {word}( page)', async function (
    t, [text, element, page]
) {
    const elem = getElement(page, element);
    const dropdown = Selector(elem);
    const option = dropdown.find('option');

    await t.click(dropdown).click(option.withText(text));
});

When('I/user select(s) {string}.{string} in {string}.{string}', async function (
    t, [page1, element1, page2, element2]
) {
    const elem = getElement(page2, element2);
    const dropdown = Selector(elem);
    const option = dropdown.find('option');

    await t.click(dropdown)
        .click(option.withText(pageObjects[page1][element1]));
});

When(
    'I/user select(s) {word} from {word}( page) in {word} from {word}( page)',
    async function (t, [element1, page1, element2, page2]) {
        const elem = getElement(page2, element2);
        const dropdown = Selector(elem);
        const option = dropdown.find('option');

        await t.click(dropdown)
            .click(option.withText(pageObjects[page1][element1]));
    }
);

When(
    'I/user move(s) to {string}.{string}',
    async function (t, [page, element]) {
        const elem = getElement(page, element);

        await t.hover(elem);
    }
);

When(
    'I/user move(s) to {word} from {word}( page)',
    async function (t, [element, page]) {
        const elem = getElement(page, element);

        await t.hover(elem);
    }
);

When(
    'I/user move(s) to {string}.{string} with an offset of x: {int}px, y: {int}px',
    async function (t, [page, element, offsetX, offsetY]) {
        const elem = getElement(page, element);

        await t.hover(elem, {
            offsetX: offsetX,
            offsetY: offsetY
        });
    }
);

When(
    'I/user move(s) to {word} from {word}( page) with an offset of x: {int}px, y: {int}px',
    async function (t, [element, page, offsetX, offsetY]) {
        const elem = getElement(page, element);

        await t.hover(elem, {
            offsetX: offsetX,
            offsetY: offsetY
        });
    }
);

When('I/user switch(es) to {string}.{string} frame', async function (
    t, [page, element]
) {
    const elem = getElement(page, element);

    await t.switchToIframe(elem);
});

When('I/user switch(es) to {word} frame from {word}( page)', async function (
    t, [element, page]
) {
    const elem = getElement(page, element);

    await t.switchToIframe(elem);
});

When('I/user switch(es) to main frame', async function (t) {
    await t.switchToMainWindow();
});

When('I/user execute(s) {string}.{string} function', async function (
    t, [page, element]
) {
    const executeCustomFunction = ClientFunction((customFunction) => {
        return customFunction();
    });

    await executeCustomFunction(pageObjects[page][element]);
});

When('I/user execute(s) {word} function from {word}( page)', async function (
    t, [element, page]
) {
    const executeCustomFunction = ClientFunction((customFunction) => {
        return customFunction();
    });

    await executeCustomFunction(pageObjects[page][element]);
});

When('I/user accept(s) further browser alerts', async function (t) {
    await t.setNativeDialogHandler(() => true);
});

When('I/user dismiss(es) further browser alerts', async function (t) {
    await t.setNativeDialogHandler(() => false);
});

When('I/user press(es) {string}', async function (t, [text]) {
    await t.pressKey(text);
});

When('I/user debug(s)', async function (t) {
    await t.debug();
});

// #### Then steps #############################################################

const getTitle = ClientFunction(() => {
    return window.document.title;
});

const getLocation = ClientFunction(() => {
    return window.location.href;
});

Then('the title should be {string}', async function (t, [text]) {
    await t.expect(getTitle()).eql(text);
});

Then('the title should contain {string}', async function (t, [text]) {
    await t.expect(getTitle()).contains(text);
});

Then('{string}.{string} should be present', async function (
    t, [page, element]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).exists).ok(
        `${errors.ELEMENT_NOT_PRESENT} "${page}"."${element}"`
    );
});

Then('{word} from {word}( page) should be present', async function (
    t, [element, page]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).exists).ok(
        `${errors.ELEMENT_NOT_PRESENT} "${page}"."${element}"`
    );
});

Then('{int} {string}.{string} should be present', async function (
    t, [number, page, element]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).count).eql(number);
});

Then('{int} {word} from {word}( page) should be present', async function (
    t, [number, element, page]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).count).eql(number);
});

Then('{string}.{string} should not be present', async function (
    t, [page, element]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).exists).notOk(
        `${errors.ELEMENT_PRESENT} "${page}"."${element}"`
    );
});

Then('{word} from {word}( page) should not be present', async function (
    t, [element, page]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).exists).notOk(
        `${errors.ELEMENT_PRESENT} "${page}"."${element}"`
    );
});

Then('{string}.{string} text should be {string}', async function (
    t, [page, element, text]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).innerText).eql(text);
});

Then('{word} from {word}( page) text should be {string}', async function (
    t, [element, page, text]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).innerText).eql(text);
});

Then('{string}.{string} text should be {string}.{string}', async function (
    t, [page1, element1, page2, element2]
) {
    const elem = getElement(page1, element1);

    await t.expect(Selector(elem).innerText)
        .eql(pageObjects[page2][element2]);
});

Then(
    '{word} from {word}( page) text should be {word} from {word}( page)',
    async function (t, [element1, page1, element2, page2]) {
        const elem = getElement(page1, element1);

        await t.expect(Selector(elem).innerText)
            .eql(pageObjects[page2][element2]);
    }
);

Then('{string}.{string} text should contain {string}', async function (
    t, [page, element, text]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).innerText).contains(text);
});

Then('{word} from {word}( page) text should contain {string}', async function (
    t, [element, page, text]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).innerText).contains(text);
});

Then('{string}.{string} text should contain {string}.{string}', async function (
    t, [page1, element1, page2, element2]
) {
    const elem = getElement(page1, element1);

    await t.expect(Selector(elem).innerText)
        .contains(pageObjects[page2][element2]);
});

Then(
    '{word} from {word}( page) text should contain {word} from {word}( page)',
    async function (t, [element1, page1, element2, page2]) {
        const elem = getElement(page1, element1);

        await t.expect(Selector(elem).innerText)
            .contains(pageObjects[page2][element2]);
    }
);

Then('URL should be {string}', async function (t, [url]) {
    await t.expect(getLocation()).eql(url);
});

Then('URL should be {string}.{string}', async function (t, [page, element]) {
    const url = getElement(page, element);

    await t.expect(getLocation()).eql(url);
});

Then('URL should be {word} from {word}( page)', async function (
    t, [element, page]
) {
    const url = getElement(page, element);

    await t.expect(getLocation()).eql(url);
});

Then('URL should contain {string}', async function (t, [url]) {
    await t.expect(getLocation()).contains(url);
});

Then('URL should contain {string}.{string}', async function (
    t, [page, element]
) {
    const url = getElement(page, element);

    await t.expect(getLocation()).contains(url);
});

Then('URL should contain {word} from {word}( page)', async function (
    t, [element, page]
) {
    const url = getElement(page, element);

    await t.expect(getLocation()).contains(url);
});

Then('{string}.{string} attribute {string} should contain {string}',
    async function (t, [page, element, attribute, attributeValue]) {
        const locator = pageObjects[page][element];
        let elem;

        if (isXPath(locator)) {
            elem = SelectorXPath(`${locator.slice(0, -1)} and contains(@${attribute}, "${attributeValue}")]`);
        } else {
            elem = `${locator}[${attribute}*="${attributeValue}"]`;
        }

        await t.expect(Selector(elem).exists).ok(
            `${errors.ATTRIBUTE_NOT_INCLUDES} "${page}"."${element}" -> "${attribute}" to include "${attributeValue}"`
        );
    }
);

Then('{word} from {word}( page) attribute {string} should contain {string}',
    async function (t, [element, page, attribute, attributeValue]) {
        const locator = pageObjects[page][element];
        let elem;

        if (isXPath(locator)) {
            elem = SelectorXPath(`${locator.slice(0, -1)} and contains(@${attribute}, "${attributeValue}")]`);
        } else {
            elem = `${locator}[${attribute}*="${attributeValue}"]`;
        }

        await t.expect(Selector(elem).exists).ok(
            `${errors.ATTRIBUTE_NOT_INCLUDES} "${page}"."${element}" -> "${attribute}" to include "${attributeValue}"`
        );
    }
);
