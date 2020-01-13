'use strict';
/* eslint new-cap: 0 */ // --> OFF for Given, When, Then

// #############################################################################

const { Given, When, Then } = require('cucumber');
const { ClientFunction, Selector } = require('testcafe');
const pageObjectsFolderPath = process.env.PO_FOLDER_PATH || 'tests/page-model';
const path = require('path');
const fs = require('fs');

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

// if (!isCalledExternally) {
//     console.log('Page Objects found:', pageObjects);
// }

// #### Given steps ############################################################

Given('I go to URL {string}', async function (t, [url]) {
    await t.navigateTo(url);
});

Given('I go to {string}.{string}', async function (t, [page, element]) {
    await t.navigateTo(pageObjects[page][element]);
});

Given('I go to {word} from {word} page', async function (t, [element, page]) {
    await t.navigateTo(pageObjects[page][element]);
});

// #### When steps #############################################################

When('I reload the page', async function (t) {
    await t.eval(() => location.reload(true));
});

When('I click {string}.{string}', async function (t, [page, element]) {
    await t.click(pageObjects[page][element]);
});

When('I click {word} from {word} page', async function (t, [element, page]) {
    await t.click(pageObjects[page][element]);
});

When('I wait for {int} ms', async function (t, [timeToWait]) {
    await t.wait(timeToWait);
});

When('I wait and click {string}.{string}', async function (
    t, [page, element]
) {
    const timeToWait = 300;

    await t.wait(timeToWait).click(pageObjects[page][element]);
});

When('I wait and click {word} from {word} page', async function (
    t, [element, page]
) {
    const timeToWait = 300;

    await t.wait(timeToWait).click(pageObjects[page][element]);
});

When('I click {string}.{string} if present', async function (
    t, [page, element]
) {
    const isPresent = await Selector(pageObjects[page][element]).exists;

    if (isPresent) {
        // Click only if element is present
        await t.click(pageObjects[page][element]);
    }
});

When('I click {word} from {word} page if present', async function (
    t, [element, page]
) {
    const isPresent = await Selector(pageObjects[page][element]).exists;

    if (isPresent) {
        // Click only if element is present
        await t.click(pageObjects[page][element]);
    }
});

When('I double click {string}.{string}', async function (
    t, [page, element]
) {
    await t.doubleClick(pageObjects[page][element]);
});

When('I double click {word} from {word} page', async function (
    t, [element, page]
) {
    await t.doubleClick(pageObjects[page][element]);
});

// #### Then steps #############################################################

const getTitle = ClientFunction(() => {
    return document.title;
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
    await t.expect(Selector(pageObjects[page][element]).exists).ok();
});

Then('{word} from {word} page should be present', async function (
    t, [element, page]
) {
    await t.expect(Selector(pageObjects[page][element]).exists).ok();
});
