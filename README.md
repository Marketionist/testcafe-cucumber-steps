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
- 13.x

[TestCafe](https://github.com/DevExpress/testcafe):
- 1.x

[Cucumber](https://github.com/cucumber/cucumber-js):
- 5.x
- 6.x

## Installation - fast
If you want to start writing tests as fast as possible, here are the commands
you'll need to execute:
```
npm init --yes
npm install testcafe-cucumber-steps cucumber testcafe gherkin-testcafe --save-dev
node node_modules/testcafe-cucumber-steps/utils/prepare.js
```

Then just see the [list of predefined steps](#list-of-predefined-steps) and
start writing tests (in `./tests/*.feature`) and adding Page Objects
(in `./tests/page-model/*.js`).

Run the tests with:
```
node_modules/.bin/gherkin-testcafe chrome,firefox
```

> All [TestCafe CLI options](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html)
> are supported.

![Install testcafe-cucumber-steps](https://raw.githubusercontent.com/Marketionist/testcafe-cucumber-steps/master/media/testcafe-cucumber-steps-installation.gif)

## Installation - detailed
> This package is lightweight and has only 3 peerDependencies - it uses:
> - [cucumber](https://github.com/cucumber/cucumber-js) to parse step definitions
> - [testcafe](https://github.com/DevExpress/testcafe) to execute steps
> - [gherkin-testcafe](https://github.com/kiwigrid/gherkin-testcafe) to connect TestCafe with Cucumber

First of all you will need to create `package.json` if you do not have one in
the root folder of your project:
```
npm init --yes
```

To install the testcafe-cucumber-steps package and its peerDependencies and to
save it to your `package.json` just run:
```
npm install testcafe-cucumber-steps cucumber testcafe gherkin-testcafe --save-dev
```

If you also want to have pre-created config (`./.testcaferc.json`) and example
test files (`./tests/test-example.feature, ./tests/page-model/test-page-example.js`) -
run additionally:
```
node node_modules/testcafe-cucumber-steps/utils/prepare.js
```

### Importing and running in CLI
To get access to all Cucumber steps defined in this package just specify the
path to this package when launching tests:
```
node_modules/.bin/gherkin-testcafe chrome,firefox node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature
```

If you store your Page Objects not in `tests/page-model` folder, then
`PO_FOLDER_PATH` environment variable has to be specified to show the path to
your Page Objects folder:
```
PO_FOLDER_PATH='tests/my-custom-page-objects' node_modules/.bin/gherkin-testcafe chrome,firefox node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature
```

Also you can just add `test-e2e` command to `scripts` in `package.json`:
```
"test-e2e": "PO_FOLDER_PATH='tests/my-custom-page-objects' node_modules/.bin/gherkin-testcafe 'chrome:headless' node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature"
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
    node_modules/.bin/gherkin-testcafe chrome,firefox node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature --tags @Fast
    ```

    When using more than one tag, the list needs to be comma separated:
    ```
    node_modules/.bin/gherkin-testcafe chrome node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature --tags @Fast,@Long
    ```

    Negation of a tag (via `~`) is also possible (to run all scenarios that have
    tag `Fast`, but not `Long`):
    ```
    node_modules/.bin/gherkin-testcafe chrome node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature --tags @Fast,~@Long
    ```

- custom parameter types:
    ```
    node_modules/.bin/gherkin-testcafe chrome node_modules/testcafe-cucumber-steps/index.js tests/**/*.js tests/**/*.feature --param-type-registry-file ./a-file-that-exports-a-parameter-type-registry.js
    ```

    > See Cucumber Expressions in [gherkin-testcafe](https://github.com/kiwigrid/gherkin-testcafe#cucumber-expressions)
    > and Custom Parameter types in
    > [cucumber.io](https://cucumber.io/docs/cucumber/cucumber-expressions/#custom-parameter-types).

### Importing and running with config file
To make life easier and not to specify all options in CLI command, a
`.testcaferc.json` configuration file can be created in the root directory of
your project to store all settings (pathes to all step definitions and tests
should be specified inside the array in `src`):
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
    "concurrency": 1,
    "selectorTimeout": 3000,
    "assertionTimeout": 1000,
    "pageLoadTimeout": 1000,
    "disablePageCaching": true
}
```
and then launch tests with:
```
node_modules/.bin/gherkin-testcafe
```
or if you use custom Page Objects folder:
```
PO_FOLDER_PATH='tests/my-custom-page-objects' node_modules/.bin/gherkin-testcafe
```

All options that are specified in CLI command will override settings from `.testcaferc.json`.

> For all possible settings see:
> - [TestCafe configuration file description](https://devexpress.github.io/testcafe/documentation/using-testcafe/configuration-file.html)
> - [example of .testcaferc.json](https://github.com/DevExpress/testcafe/blob/master/examples/.testcaferc.json)
> - [all TestCafe CLI options](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html)

## List of predefined steps
You can see the example of how to use predefined steps in
[`test.feature`](https://github.com/Marketionist/testcafe-cucumber-steps/blob/master/tests/test.feature).

### Given steps
1. `I go to URL "..."` - open a site (by its URL provided in "" as a string) in
the current browser window/tab.
2. `I go to "..."."..."` - open a site (by its URL provided in
**"page"."object"**) in the current browser window/tab.
- `I go to ... from ... page` - open a site (by its URL provided in **object**
from **page**) in the current browser window/tab.

### When steps
3. `I reload the page` - reload current page.
4. `I click "..."."..."` - click on any element (provided in **"page"."object"**
as CSS selector).
- `I click ... from ... page` - click on any element (provided in **object**
from **page** as CSS selector).
5. `I wait for ... ms` wait for provided amount of time (in milliseconds).
6. `I wait and click "..."."..."` - wait for 300 ms and then click on any element
(provided in **"page"."object"** as CSS selector).
- `I wait and click ... from ... page` - wait for 300 ms and then click on any
element (provided in **object** from **page** as CSS selector).
7. `I click "..."."..." if present` - click on any element (provided in
**"page"."object"** as CSS selector) only if it is present on the page.
- `I click ... from page ... if present` - click on any element (provided in
**object** from **page** as CSS selector) only if it is present on the page.
8. `I double click "..."."..."` - double click on any element (provided in
**"page"."object"** as CSS selector).
- `I double click ... from ... page` - double click on any element (provided in
**object** from **page** as CSS selector).
9. `I type "..." in "..."."..."` - type any text (provided in "" as a string) in
the input field (provided in **"page"."object"** as CSS selector).
- `I type "..." in ... from ... page` - type any text (provided in "" as a
string) in the input field (provided in **object** from **page** as CSS
selector).
- `I type "..."."..." in "..."."..."` - type any text (provided in
**"page1"."object1"**) in the input field (provided in **"page2"."object2"** as
CSS selector).
- `I type ... from ... page in ... from ... page` - type any text (provided in
**object1** from **page1**) in the input field (provided in **object2** from
**page2** as CSS selector).
10. `I clear "..."."..." and type "..."` - overwrite any text (provided in "" as a
string) in the input field (provided in **"page"."object"** as CSS selector).
- `I clear ... from ... page and type "..."` - overwrite any text (provided in
"" as a string) in the input field (provided in **object** from **page** as CSS
selector).
- `I clear "..."."..." and type "..."."..."` - overwrite any text (provided in
**"page1"."object1"**) in the input field (provided in **"page2"."object2"** as
CSS selector).
- `I clear ... from ... page and type ... from ... page` - overwrite any text
(provided in **object1** from **page1**) in the input field (provided in
**object2** from **page2** as CSS selector).
11. `I select "..." in "..."."..."` - select any option (provided in "" as a
string) in the dropdown (provided in **"page"."object"** as CSS selector).
- `I select "..." in ... from ... page` - select any option (provided in "" as a
string) in the dropdown (provided in **object** from **page** as CSS selector).
- `I select "..."."..." in "..."."..."` - select any option (provided in
**"page1"."object1"**) in the dropdown (provided in **"page2"."object2"** as CSS
selector).
- `I select ... from ... page in ... from ... page` - select any option
(provided in **object1** from **page1**) in the dropdown (provided in
**object2** from **page2** as CSS selector).
12. `I move to "..."."..."` - move the mouse pointer over any element (hover with
cursor an element provided in **"page"."object"** as CSS selector).
- `I move to ... from ... page` - move the mouse pointer over any element (hover
with cursor an element provided in **object** from **page** as CSS selector).
13. `I move to "..."."..." with an offset of x: ...px, y: ...px` - move the mouse
pointer over any element (hover with cursor an element provided in
**"page"."object"** as CSS selector) with an offset of x: ...px, y: ...px.
- `I move to ... from ... page with an offset of x: ...px, y: ...px` - move the
mouse pointer over any element (hover with cursor an element provided in
**object** from **page** as CSS selector) with an offset of x: ...px, y: ...px.
14. `I switch to "..."."..." frame` - switch the context to iframe (provided in
**"page"."object"** as CSS selector).
- `I switch to ... frame from ... page` - switch the context to iframe (provided
in **object** from **page** as CSS selector).
15. `I switch to main frame` - switch the context back to default (initial) frame.
16. `I execute "..."."..." function` - execute script (JavaScript function)
provided in **"page"."object"**.
- `I execute ... function from ... page` - execute script (JavaScript function)
provided in **object** from **page**.
17. `I accept further browser alerts` - accept (OK) all further browser alerts
(after this step).
18. `I dismiss further browser alerts` - dismiss (Cancel) all further browser
alert (after this step).

### Then steps
19. `the title should be "..."` - verify that title of the current browser
window/tab equals to the text (provided in "" as a string).
20. `"..."."..." should be present` - verify that element (provided in
**"page"."object"** as CSS selector) is present on the page.
- `... from ... page should be present` - verify that element (provided in
**object** from **page** as CSS selector) is present on the page.
21. `"..."."..." should not be present` - verify that element (provided in
**"page"."object"** as CSS selector) is not present on the page.
- `... from ... page should not be present` - verify that element (provided in
**object** from **page** as CSS selector) is not present on the page.
22. `"..."."..." text should be "..."` - verify that text of the element (provided
in **"page"."object"** as CSS selector) equals to the text (provided in "" as a
string).
- `... text from ... page should be "..."` - verify that text of the element
(provided in **object** from **page** as CSS selector) equals to the text
(provided in "" as a string).
- `"..."."..." text should be "..."."..."` - verify that text of the element
(provided in **"page1"."object1"** as CSS selector) equals to the text (provided
in **"page2"."object2"**).
- `... text from ... page should be ... from ... page` - verify that text of the
element (provided in **object1** from **page1** as CSS selector) equals to the
text (provided in **object2** from **page2**).
23. `"..."."..." text should contain "..."` - verify that text of the element
(provided in **"page"."object"** as CSS selector) contains the text (provided in
"" as a string).
- `... text from ... page should contain "..."` - verify that text of the
element (provided in **object** from **page** as CSS selector) contains the text
(provided in "" as a string).
- `"..."."..." text should contain "..."."..."` - verify that text of the
element (provided in "page1"."object1" as CSS selector) contains the text
(provided in "page2"."object2").
- `... text from ... page should contain ... from ... page` - verify that text
of the element (provided in **object1** from **page1** as CSS selector) contains
the text (provided in **object2** from **page2**).
24. `URL should be "..."` - verify that URL of the current page equals to the text
(provided in "" as a string).
25. `URL should contain "..."` - verify that URL of the current page contains the
text (provided in "" as a string).

## Thanks
If this package was helpful to you, please give it a **★ Star** on
[Github](https://github.com/Marketionist/testcafe-cucumber-steps).
