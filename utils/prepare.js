'use strict';

const path = require('path');
const fs = require('fs');

const pathToTestsDir = path.join(__dirname, '../../../tests');
const pathToPageObjectsDir = path.join(pathToTestsDir, '/page-model');
const pathToTestExample = path.join(pathToTestsDir, 'test-example.feature');
const testExampleContent = `@Fast

Feature: Running Cucumber with TestCafe - test feature example
  As a user of Google
  I should be able to see the About page
  to learn more about Google

  Scenario: Google's About page title should contain "Google"
    Given I go to URL "https://www.google.com/"
    When I click linkAbout from test-page-example page
    Then the title should contain "Google"`;
const pathToPageObjectsExample = path.join(pathToPageObjectsDir,
    'test-page-example.js');
const pageObjectsExampleContent = `'use strict';

module.exports = (function () {

    let testPage = {

        linkAbout: 'a[href*="about.google"]'

    };

    return testPage;

})();`;
const pathToConfigExample = path.join(pathToTestsDir, '.testcaferc.json');
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
    "selectorTimeout": 3000,
    "assertionTimeout": 1000,
    "pageLoadTimeout": 1000,
    "disablePageCaching": true
}`;

const createFile = (filePath, fileContent) => {
    fs.writeFileSync(filePath, fileContent, (error) => {
        if (error) {
            console.log(`Error creating a file ${filePath}:`, error);
        }
    });
};

const testsDirExists = fs.existsSync(pathToTestsDir);
const pageObjectsDirExists = fs.existsSync(pathToPageObjectsDir);

if (!testsDirExists) {
    fs.mkdirSync(pathToTestsDir);
    fs.mkdirSync(pathToPageObjectsDir);
} else if (testsDirExists && !pageObjectsDirExists) {
    fs.mkdirSync(pathToPageObjectsDir);
} else {
    console.log('"tests" and "page-model" folders are already in place');
}

createFile(pathToTestExample, testExampleContent);
createFile(pathToPageObjectsExample, pageObjectsExampleContent);
createFile(pathToConfigExample, configExampleContent);

