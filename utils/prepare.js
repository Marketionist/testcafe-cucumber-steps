'use strict';

// #############################################################################

const path = require('path');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const pathToTestsDir = path.join(__dirname, '../../../tests');
const pathToPageObjectsDir = path.join(pathToTestsDir, '/page-model');
const pathToTestExample = path.join(pathToTestsDir, 'test-example.feature');
const testExampleContent = `@fast @example-tests

Feature: Running Cucumber with TestCafe - test feature example
  As a user of Google
  I should be able to see the Products page
  to learn more about Google


  Scenario: Google's Products page title should contain "Google"
    Given user goes to URL "https://www.google.com/"
    When user clicks linkAbout from test-page-example
    And user clicks "test-page-example"."linkOurProducts"
    Then the title should contain "Google"`;
const pathToPageObjectsExample = path.join(pathToPageObjectsDir,
    'test-page-example.js');
const pageObjectsExampleContent = `'use strict';

let testPage = {

    linkAbout: 'a[href*="about.google"]',
    header: '.header'

};

testPage.linkOurProducts = \`\${testPage.header} a[title="Our products"]\`;

module.exports = testPage;`;
const pathToConfigExample = path.join(pathToTestsDir, '../', '.testcaferc.json');
const configExampleContent = `{
    "browsers": "chrome",
    "src": ["node_modules/testcafe-cucumber-steps/index.js", "tests/**/*.js", "tests/**/*.feature"],
    "screenshots": {
        "path": "tests/screenshots/",
        "takeOnFails": true,
        "pathPattern": "\${DATE}_\${TIME}/test-\${TEST_INDEX}/\${USERAGENT}/\${FILE_INDEX}.png"
    },
    "quarantineMode": false,
    "stopOnFirstFail": true,
    "skipJsErrors": true,
    "skipUncaughtErrors": true,
    "concurrency": 1,
    "selectorTimeout": 3000,
    "assertionTimeout": 1000,
    "pageLoadTimeout": 1000,
    "disablePageCaching": true
}`;

const exampleFiles = [{
    path: pathToTestExample,
    content: testExampleContent
},
{
    path: pathToPageObjectsExample,
    content: pageObjectsExampleContent
},
{
    path: pathToConfigExample,
    content: configExampleContent
}];

const createFile = async (filePath, fileContent) => {
    try {
        await writeFile(filePath, fileContent);
    } catch (error) {
        console.log(`Error creating a file ${filePath}:`, error);
    }
    console.log(`Created file: ${filePath}`);
};

const createFiles = async (filesArray) => {
    try {
        const testsDirExists = fs.existsSync(pathToTestsDir);
        const pageObjectsDirExists = fs.existsSync(pathToPageObjectsDir);

        if (!testsDirExists) {
            fs.mkdirSync(pathToTestsDir);
            fs.mkdirSync(pathToPageObjectsDir);
        } else if (testsDirExists && !pageObjectsDirExists) {
            fs.mkdirSync(pathToPageObjectsDir);
        }

        const writeFiles = filesArray.map(async (value) => {
            return await createFile(value.path, value.content);
        });

        await Promise.all(writeFiles);
    } catch (error) {
        console.log('Error creating a files:', error);
    }
};

createFiles(exampleFiles);
