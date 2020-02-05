'use strict';
/* eslint new-cap: 0 */ // --> OFF for Selector

// #############################################################################

const { Selector } = require('testcafe');

const getElementByXPath = Selector((xpath) => {
    const iterator = document.evaluate(
        xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null
    );
    const items = [];

    let item = iterator.iterateNext();

    while (item) {
        items.push(item);
        item = iterator.iterateNext();
    }

    return items;
});

module.exports = function (xpath) {
    return Selector(getElementByXPath(xpath));
};
