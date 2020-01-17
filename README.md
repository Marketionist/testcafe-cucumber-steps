# testcafe-cucumber-steps
Cucumber steps (step definitions) written with TestCafe for end-to-end (e2e) tests

[![Build Status](https://travis-ci.org/Marketionist/testcafe-cucumber-steps.svg?branch=master)](https://travis-ci.org/Marketionist/testcafe-cucumber-steps)
[![npm version](https://img.shields.io/npm/v/testcafe-cucumber-steps.svg)](https://www.npmjs.com/package/testcafe-cucumber-steps)
[![NPM License](https://img.shields.io/npm/l/testcafe-cucumber-steps.svg)](https://github.com/Marketionist/testcafe-cucumber-steps/blob/master/LICENSE)

## Supported versions
[Node.js](http://nodejs.org/):
- 8.x
- 9.x
- 10.x
- 11.x
- 12.x

[TestCafe](https://github.com/DevExpress/testcafe):
- 1.x

[Cucumber](https://github.com/cucumber/cucumber-js):
- 5.x
- 6.x

## Installation
> This package is lightweight and has only 3 peerDependencies - it uses:
> - [cucumber](https://github.com/cucumber/cucumber-js) to parse step definitions
> - [testcafe](https://github.com/DevExpress/testcafe) to execute steps
> - [gherkin-testcafe](https://github.com/kiwigrid/gherkin-testcafe) to connect TestCafe with Cucumber

To run tests and add more custom step definitions you will also need to install
this dependencies, so to install the package + its peerDependencies and add it
to your `package.json` just run:
```
npm install testcafe-cucumber-steps cucumber testcafe gherkin-testcafe --save-dev
```

If you also want to have pre-created config (`./.testcaferc.json`) and example
test files (`./tests/test-example.feature, ./tests/page-model/test-page-example.js`
) - just run:
```
node node_modules/testcafe-cucumber-steps/utils/prepare.js
```

## Importing and running in CLI
It is quite simple to use - to get access to all Cucumber steps defined in this
package just specify the path to this package when launching tests (also use
`gherkin-testcafe` just like you use TestCafe's CLI - replace `testcafe` with
`gherkin-testcafe` and load all .js files (for step definitions) and .feature
files (for steps to execute):
```
PO_FOLDER_PATH='tests/page-model' gherkin-testcafe chrome,firefox node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature
```
Note the `PO_FOLDER_PATH` environment variable - it has to be specified to show
the path to your Page Objects folder (if not set - it defaults to `'tests/page-model'`).

Also you can just add `test-e2e` command to `scripts` in `package.json`:
```
"test-e2e": "PO_FOLDER_PATH='tests/page-model' gherkin-testcafe 'chrome:headless' node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature"
```
and then launch tests with:
```
npm run test-e2e
```

> Use `gherkin-testcafe --help` command to see all options (all
> [TestCafe CLI options](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html)
> are supported).

Additionally, you can specify:

- tags to run:
    ```
    gherkin-testcafe chrome,firefox node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature --tags @Fast
    ```

    When using more than one tag, the list needs to be comma separated:
    ```
    gherkin-testcafe chrome node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature --tags @Fast,@Long
    ```

    Negation of a tag (via `~`) is also possible (to run all scenarios that have
    tag `Fast`, but not `Long`):
    ```
    gherkin-testcafe chrome node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature --tags @Fast,~@Long
    ```

- custom parameter types:
    ```
    gherkin-testcafe chrome node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature --param-type-registry-file ./a-file-that-exports-a-parameter-type-registry.js
    ```

    > See Cucumber Expressions in [gherkin-testcafe](https://github.com/kiwigrid/gherkin-testcafe#cucumber-expressions)
    > and Custom Parameter types in
    > [cucumber.io](https://cucumber.io/docs/cucumber/cucumber-expressions/#custom-parameter-types).

## Importing and running with config file
To make life easier and not to specify all options in CLI command, a `.testcaferc.json`
configuration file can be created in root directory to store all settings (pathes
to all step definitions and tests should be specified inside the array in `src`):
```
{
    "browsers": "chrome",
    "src": ["node_modules/testcafe-cucumber-steps/index.js", "tests/**/*.js", "tests/**/*.feature"],
    "screenshots": {
        "path": "tests/screenshots/",
        "takeOnFails": true,
        "pathPattern": "${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png"
    },
    "quarantineMode": false,
    "stopOnFirstFail": true,
    "skipJsErrors": true,
    "skipUncaughtErrors": true,
    "concurrency": 2,
    "selectorTimeout": 3000,
    "assertionTimeout": 1000,
    "pageLoadTimeout": 1000,
    "disablePageCaching": true
}
```
and then launch tests with:
```
PO_FOLDER_PATH='tests/page-model' gherkin-testcafe
```

All options that are specified in CLI command will override settings from `.testcaferc.json`.

> For all possible settings see:
> - [TestCafe Configuration File description](https://devexpress.github.io/testcafe/documentation/using-testcafe/configuration-file.html)
> - [example of .testcaferc.json](https://github.com/DevExpress/testcafe/blob/master/examples/.testcaferc.json)
> - [all TestCafe CLI options](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html)

## List of predefined steps
You can see the example of how to use predefined steps in
[`test.feature`](https://github.com/Marketionist/testcafe-cucumber-steps/blob/master/tests/test.feature).

### Given steps
- `I go to URL "..."` - open a site (by its URL provided in "" as a string) in
the current browser window/tab.
- `I go to "..."."..."` - open a site (by its URL provided in
**"page"."object"**) in the current browser window/tab.
- `I go to ... from ... page` - open a site (by its URL provided in **object**
from **page**) in the current browser window/tab.

### When steps
- `I reload the page` - reload current page.
- `I click "..."."..."` - click on any element (provided in **"page"."object"**
as CSS selector).
- `I click ... from ... page` - click on any element (provided in **object**
from **page** as CSS selector).
- `I wait for {int} ms` - wait for provided amount of time (in milliseconds).
- `I wait and click "..."."..."` - wait for 300 ms and then click on any element (provided in **"page"."object"** as CSS selector).
- `I wait and click ... from ... page` - wait for 300 ms and then click on any element (provided in **object** from **page** as CSS selector).
- `I click "..."."..." if present` - click on any element (provided in **"page"."object"** as CSS selector) only if it is present on the page.
- `I click ... from page ... if present` - click on any element (provided in **object** from **page** as CSS selector) only if it is present on the page.
- `I double click "..."."..."` - double click on any element (provided in **"page"."object"** as CSS selector).
- `I double click ... from ... page` - double click on any element (provided in **object** from **page** as CSS selector).
- `I type "..." in "..."."..."` - type any text (provided in "" as a string) in the input field (provided in **"page"."object"** as CSS selector).
- `I type "..." in ... from ... page` - type any text (provided in "" as a string) in the input field (provided in **object** from **page** as CSS selector).
- `I type "..."."..." in "..."."..."` - type any text (provided in **"page1"."object1"**) in the input field (provided in **"page2"."object2"** as CSS selector).
- `I type ... from ... page in ... from ... page` - type any text (provided in **object1** from **page1**) in the input field (provided in **object2** from **page2** as CSS selector).
- `I select "..." in "..."."..."` - select any option (provided in "" as a string) in the dropdown (provided in **"page"."object"** as CSS selector).
- `I select "..." in ... from ... page` - select any option (provided in "" as a string) in the dropdown (provided in **object** from **page** as CSS selector).
- `I select "..."."..." in "..."."..."` - select any option (provided in **"page1"."object1"**) in the dropdown (provided in **"page2"."object2"** as CSS selector).
- `I select ... from ... page in ... from ... page` - select any option (provided in **object1** from **page1**) in the dropdown (provided in **object2** from **page2** as CSS selector).
- `I move to "..."."..."` - move the mouse pointer over any element (hover with cursor an element provided in **"page"."object"** as CSS selector).
- `I move to ... from ... page` - move the mouse pointer over any element (hover with cursor an element provided in **object** from **page** as CSS selector).

### Then steps
- `the title should be "..."` - verify that title of the current browser
window/tab equals to the text (provided in "" as a string).
- `"..."."..." should be present` - verify that element (provided in
**"page"."object"** as CSS selector) is present on the page.
- `... from ... page should be present` - verify that element (provided in
**object** from **page** as CSS selector) is present on the page.
- `"..."."..." should not be present` - verify that element (provided in **"page"."object"** as CSS selector) is not present on the page.
- `... from ... page should not be present` - verify that element (provided in **object** from **page** as CSS selector) is not present on the page.
- `"..."."..." text should be "..."` - verify that text of the element (provided in **"page"."object"** as CSS selector) equals to the text (provided in "" as a string).
- `... text from ... page should be "..."` - verify that text of the element (provided in **object** from **page** as CSS selector) equals to the text (provided in "" as a string).
- `"..."."..." text should be "..."."..."` - verify that text of the element (provided in **"page1"."object1"** as CSS selector) equals to the text (provided in **"page2"."object2"**).
- `... text from ... page should be ... from ... page` - verify that text of the element (provided in **object1** from **page1** as CSS selector) equals to the text (provided in **object2** from **page2**).
- `"..."."..." text should contain "..."` - verify that text of the element (provided in **"page"."object"** as CSS selector) contains the text (provided in "" as a string).
- `... text from ... page should contain "..."` - verify that text of the element (provided in **object** from **page** as CSS selector) contains the text (provided in "" as a string).
- `"..."."..." text should contain "..."."..."` - verify that text of the element (provided in "page1"."object1" as CSS selector) contains the text (provided in "page2"."object2").
- `... text from ... page should contain ... from ... page` - verify that text of the element (provided in **object1** from **page1** as CSS selector) contains the text (provided in **object2** from **page2**).

## Thanks
If this package was helpful for you, please give it a **★ Star** on
[Github](https://github.com/Marketionist/testcafe-cucumber-steps).
