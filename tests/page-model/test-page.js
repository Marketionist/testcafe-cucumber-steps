'use strict';

// #############################################################################

let testPage = {

    pageTest1: 'http://localhost:8001/test1.html',
    textErrorXPath: `//*[ancestor::*[@class="todo-container" and 
        descendant::*[text()="New"]] and @type="checkbox"]`,
    linkTest2Page: '#link-test2-page',
    linkTest2PageXPath: '//*[@id="link-test2-page"]',
    titleTest1: 'h1',
    blockTextTest: '#text-test',
    txtTest1: 'Test 1 sample',
    txtTest2: 'Test2',
    linkInvisibleTest2Page: '#link-invisible-test2-page',
    linkInvisibleTest2PageXPath: '//*[@id="link-invisible-test2-page"]',
    pageLoader: 'http://localhost:8001/test-loader.html',
    blockTestContent: '#block-content',
    blockTestContentXPath: `//*[@id="block-content" and contains(text(),
         "This is a test content on a page with loader")]`

};

module.exports = testPage;
