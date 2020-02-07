@Fast

Feature: Running Cucumber with TestCafe - test "user ..." steps feature 1
  As a user of TestCafe
  I should be able to use Cucumber
  to run my e2e tests

  Scenario: 'user goes to URL' should open corresponding page and verify title
    Given user goes to URL "http://localhost:8001/test1.html"
    Then the title should be "Test1 Page"
    And the title should contain "st1 Pa"

  Scenario: 'user goes to page' should open corresponding page
    Given user goes to "test-page"."pageTest1"
    Then the title should be "Test1 Page"

  Scenario: 'user goes to page' should open corresponding page (text style step)
    Given user goes to pageTest1 from test-page page
    Then the title should be "Test1 Page"

  Scenario: 'user reloads the page' should refresh the page, 'should be present' should verify the element
    Given user goes to "test-page"."pageTest1"
    And user reloads the page
    Then "test-page"."linkTest2Page" should be present

  Scenario: 'user reloads the page' should refresh the page, 'should be present' should verify the element (text style step)
    Given user goes to "test-page"."pageTest1"
    And user reloads the page
    Then linkTest2Page from test-page page should be present

  Scenario: 'should not be present': link on Page1 test page should not be present
    When user goes to "test-page"."pageTest1"
    And user waits for 200 ms
    Then "test-page"."linkInvisibleTest2Page" should not be present

  Scenario: 'should not be present': text error on Page1 test page should not be present (text style step, XPath)
    When user goes to "test-page"."pageTest1"
    And user waits for 200 ms
    Then textErrorXPath from test-page page should not be present

  Scenario: 'user clicks' Page1 test page link should lead to Page2 test page, 'user waits for' should wait for 200 ms
    Given user goes to URL "http://localhost:8001/test1.html"
    And user waits for 200 ms
    And user clicks "test-page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'user clicks' Page1 test page link should lead to Page2 test page, 'user waits for' should wait for 200 ms (text style step, XPath)
    Given user goes to URL "http://localhost:8001/test1.html"
    And user waits for 200 ms
    And user clicks linkTest2PageXPath from test-page page
    Then the title should be "Test2 Page"

  Scenario: 'user waits and clicks' on Page1 test page link should lead to Page2 test page
    When user goes to "test-page"."pageTest1"
    And user waits and clicks "test-page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'user waits and clicks' on Page1 test page link should lead to Page2 test page (text style step)
    When user goes to "test-page"."pageTest1"
    And user waits and clicks linkTest2Page from test-page page
    Then the title should be "Test2 Page"

  Scenario: 'user clicks if present': link on Page1 test page should be clicked if it is visible and lead to Page2 test page
    When user goes to "test-page"."pageTest1"
    And user waits for 200 ms
    And user clicks "test-page"."linkTest2Page" if present
    And user waits for 200 ms
    Then the title should be "Test2 Page"

  Scenario: 'user clicks if present': link on Page1 test page should not be clicked if it is not present
    When user goes to "test-page"."pageTest1"
    And user waits for 200 ms
    And user clicks "test-page"."linkInvisibleTest2Page" if present
    And user waits for 200 ms
    Then the title should be "Test1 Page"

  Scenario: 'user clicks if present': link on Page1 test page should be clicked if it is visible and lead to Page2 test page (text style step, XPath)
    When user goes to pageTest1 from test-page page
    And user waits for 200 ms
    And user clicks linkTest2PageXPath from test-page page if present
    And user waits for 200 ms
    Then the title should be "Test2 Page"

  Scenario: 'user clicks if present': link on Page1 test page should not be clicked if it is not present (text style step, XPath)
    When user goes to pageTest1 from test-page page
    And user waits for 200 ms
    And user clicks linkInvisibleTest2PageXPath from test-page page if present
    And user waits for 200 ms
    Then the title should be "Test1 Page"

  Scenario: 'user double clicks' on Page1 test page link should lead to Page2 test page
    When user goes to URL "http://localhost:8001/test1.html"
    And user waits for 200 ms
    And user double clicks "test-page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'user double clicks' on Page1 test page link should lead to Page2 test page (text style step)
    When user goes to URL "http://localhost:8001/test1.html"
    And user waits for 200 ms
    And user double clicks linkTest2Page from test-page page
    Then the title should be "Test2 Page"

  Scenario: 'user types' "Green" (string) text inside input should get this text typed in, 'text should be' should verify the text
    When user goes to "test2-page"."pageTest2"
    And user types "Green" in "test2-page"."inputColors"
    And user waits and clicks "test2-page"."inputColors"
    Then "test2-page"."blockInputColor" text should be "Green"

  Scenario: 'user types' "Green" (string) text inside input should get this text typed in, 'text should be' should verify the text (text style step)
    When user goes to "test2-page"."pageTest2"
    And user types "Green" in inputColors from test2-page page
    And user waits and clicks "test2-page"."inputColors"
    Then blockInputColor text from test2-page page should be "Green"

  Scenario: 'user types' "Gold" (page object) text inside input should get this text typed in, 'text should be' should verify the text
    When user goes to "test2-page"."pageTest2"
    And user types "test2-page"."textGold" in "test2-page"."inputColors"
    And user waits and clicks "test2-page"."inputColors"
    Then "test2-page"."blockInputColor" text should be "test2-page"."textGold"

  Scenario: 'user types' "Gold" (page object) text inside input should get this text typed in, 'text should be' should verify the text (text style step)
    When user goes to "test2-page"."pageTest2"
    And user types textGold from test2-page page in inputColors from test2-page page
    And user waits and clicks "test2-page"."inputColors"
    Then blockInputColor text from test2-page page should be textGold from test2-page page

  Scenario: 'user clears and types' "Green" (string) text inside input should overwrite the text
    Given user goes to "test2-page"."pageTest2"
    And user types "Yellow" in "test2-page"."inputColors"
    When user clears "test2-page"."inputColors" and types "Green"
    Then "test2-page"."blockInputColor" text should be "Green"

  Scenario: 'user clears and types' "Green" (string) text inside input should overwrite the text (text style step)
    Given user goes to "test2-page"."pageTest2"
    And user types "Yellow" in inputColors from test2-page page
    When user clears inputColors from test2-page page and types "Green"
    Then blockInputColor text from test2-page page should be "Green"

  Scenario: 'user clears and types' "Gold" (page object) text inside input should overwrite the text
    Given user goes to "test2-page"."pageTest2"
    And user types "test2-page"."textIndigo" in "test2-page"."inputColors"
    When user clears "test2-page"."inputColors" and types "test2-page"."textGold"
    Then "test2-page"."blockInputColor" text should be "test2-page"."textGold"

  Scenario: 'user clears and types' "Gold" (page object) text inside input should overwrite the text (text style step)
    Given user goes to "test2-page"."pageTest2"
    And user types textIndigo from test2-page page in inputColors from test2-page page
    When user clears inputColors from test2-page page and types textGold from test2-page page
    Then blockInputColor text from test2-page page should be textGold from test2-page page

  Scenario: 'user selects' "Green" (string) option text inside select dropdown should get this option selected, 'text should be' should verify the text
    Given user goes to "test2-page"."pageTest2"
    When user selects "Green" in "test2-page"."dropdownColors"
    Then "test2-page"."blockDropdownColor" text should be "green"

  Scenario: 'user selects' "Green" (string) option text inside select dropdown should get this option selected, 'text should be' should verify the text (text style step)
    Given user goes to "test2-page"."pageTest2"
    When user selects "Green" in dropdownColors from test2-page page
    Then blockDropdownColor text from test2-page page should be "green"

  Scenario: 'user selects' "Gold" (page object) option text inside select dropdown should get this option selected, 'text should be' should verify the text
    Given user goes to "test2-page"."pageTest2"
    When user selects "test2-page"."textGold" in "test2-page"."dropdownColors"
    Then "test2-page"."blockDropdownColor" text should be "test2-page"."textGold"

  Scenario: 'user selects' "Gold" (page object) option text inside select dropdown should get this option selected, 'text should be' should verify the text (text style step)
    Given user goes to "test2-page"."pageTest2"
    When user selects textGold from test2-page page in dropdownColors from test2-page page
    Then blockDropdownColor text from test2-page page should be textGold from test2-page page
