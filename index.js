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

// #### When steps #############################################################

When('I go to URL {string}', async function (t, [url]) {
    await t.navigateTo(url);
});

When('I go to {string}.{string}', async function (t, [page, element]) {
    await t.navigateTo(pageObjects[page][element]);
});

When('I go to {word} from {word} page', async function (t, [element, page]) {
    await t.navigateTo(pageObjects[page][element]);
});

When('I reload the page', async function (t) {
    await t.eval(() => location.reload(true));
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
