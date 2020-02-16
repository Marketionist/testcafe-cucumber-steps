'use strict';
/* eslint new-cap: 0 */ // --> OFF for Given, When, Then, Selector

// #############################################################################

const { Given, When, Then } = require('cucumber');
const { ClientFunction, Selector } = require('testcafe');
const pageObjectsFolderPath = process.env.PO_FOLDER_PATH || 'tests/page-model';
const path = require('path');
const fs = require('fs');
const SelectorXPath = require('./utils/selector-xpath.js');

const isCalledExternally = __dirname.includes('node_modules');

const fullPageObjectsFolderPath = isCalledExternally ?
    path.join(__dirname, '../..', pageObjectsFolderPath) :
    path.join(__dirname, pageObjectsFolderPath);

// Require all Page Object files in directory
let pageObjects = {};

fs.readdirSync(fullPageObjectsFolderPath).filter(
    (value) => value.includes('.js')
).map((file) => {
    const fileName = path.basename(file, '.js');

    pageObjects[fileName] = require(path.join(fullPageObjectsFolderPath, file));
});

/**
 * Checks for XPath and gets proper element for further actions
 * @param {string} page
 * @param {string} elem
 * @returns {Object} element
 */
function getElement (page, elem) {
    const locator = pageObjects[page][elem];
    let element;

    if (locator[0] + locator[1] === '//') {
        element = SelectorXPath(locator);
    } else {
        element = locator;
    }

    return element;
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

// #### When steps #############################################################

When(
    // eslint-disable-next-line cucumber/expression-type
    'I/user log(s) in with login {string} in {string}.{string} and ' +
    'password {string} in {string}.{string} and click(s) {string}.{string}',
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
    'I/user log(s) in with login {string} in {word} from {word}( page) and ' +
    'password {string} in {word} from {word}( page) and click(s) ' +
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

// #### Then steps #############################################################

const getTitle = ClientFunction(() => {
    return document.title;
});

const getLocation = ClientFunction(() => {
    return document.location.href;
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

    await t.expect(Selector(elem).exists).ok();
});

Then('{word} from {word}( page) should be present', async function (
    t, [element, page]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).exists).ok();
});

Then('{string}.{string} should not be present', async function (
    t, [page, element]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).exists).notOk();
});

Then('{word} from {word}( page) should not be present', async function (
    t, [element, page]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).exists).notOk();
});

Then('{string}.{string} text should be {string}', async function (
    t, [page, element, text]
) {
    const elem = getElement(page, element);

    await t.expect(Selector(elem).innerText).eql(text);
});

Then('{word} text from {word}( page) should be {string}', async function (
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
    '{word} text from {word}( page) should be {word} from {word}( page)',
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

Then('{word} text from {word}( page) should contain {string}', async function (
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
    '{word} text from {word}( page) should contain {word} from {word}( page)',
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
