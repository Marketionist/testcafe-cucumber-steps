'use strict';
/* eslint new-cap: 0 */ // --> OFF for Given, When, Then

// #############################################################################

const { Given, When, Then } = require('cucumber');
const { ClientFunction } = require('testcafe');

// #### When steps #############################################################

When('I go to URL {string}', async function (t, [url]) {
    await t.navigateTo(url);
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
