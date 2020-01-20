@Fast

Feature: Running Cucumber with TestCafe - feature 1
  As a user of TestCafe
  I should be able to use Cucumber
  to run my e2e tests

  Scenario: 'I go to URL' should open corresponding page and verify title
    Given I go to URL "http://localhost:8001/test1.html"
    Then the title should be "Test1 Page"
    And the title should contain "st1 Pa"

  Scenario: 'I go to page' should open corresponding page
    Given I go to "test-page"."pageTest1"
    Then the title should be "Test1 Page"

  Scenario: 'I go to page' should open corresponding page (text style step)
    Given I go to pageTest1 from test-page page
    Then the title should be "Test1 Page"

  Scenario: 'I reload the page' should refresh the page, 'should be present' should verify the element
    Given I go to "test-page"."pageTest1"
    And I reload the page
    Then "test-page"."linkTest2Page" should be present

  Scenario: 'I reload the page' should refresh the page, 'should be present' should verify the element (text style step)
    Given I go to "test-page"."pageTest1"
    And I reload the page
    Then linkTest2Page from test-page page should be present

  Scenario: 'should not be present': link on Page1 test page should not be present
    When I go to "test-page"."pageTest1"
    And I wait for 200 ms
    Then "test-page"."linkInvisibleTest2Page" should not be present

  Scenario: 'should not be present': link on Page1 test page should not be present (text style step)
    When I go to "test-page"."pageTest1"
    And I wait for 200 ms
    Then linkInvisibleTest2Page from test-page page should not be present

  Scenario: 'I click' Page1 test page link should lead to Page2 test page, 'I wait for' should wait for 200 ms
    Given I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I click "test-page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'I click' Page1 test page link should lead to Page2 test page, 'I wait for' should wait for 200 ms (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I click linkTest2Page from test-page page
    Then the title should be "Test2 Page"

  Scenario: 'I wait and click' on Page1 test page link should lead to Page2 test page
    When I go to "test-page"."pageTest1"
    And I wait and click "test-page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'I wait and click' on Page1 test page link should lead to Page2 test page (text style step)
    When I go to "test-page"."pageTest1"
    And I wait and click linkTest2Page from test-page page
    Then the title should be "Test2 Page"

  Scenario: 'I click if present': link on Page1 test page should be clicked if it is visible and lead to Page2 test page
    When I go to "test-page"."pageTest1"
    And I wait for 200 ms
    And I click "test-page"."linkTest2Page" if present
    And I wait for 200 ms
    Then the title should be "Test2 Page"

  Scenario: 'I click if present': link on Page1 test page should not be clicked if it is not present
    When I go to "test-page"."pageTest1"
    And I wait for 200 ms
    And I click "test-page"."linkInvisibleTest2Page" if present
    And I wait for 200 ms
    Then the title should be "Test1 Page"

  Scenario: 'I click if present': link on Page1 test page should be clicked if it is visible and lead to Page2 test page (text style step)
    When I go to pageTest1 from test-page page
    And I wait for 200 ms
    And I click linkTest2Page from test-page page if present
    And I wait for 200 ms
    Then the title should be "Test2 Page"

  Scenario: 'I click if present': link on Page1 test page should not be clicked if it is not present (text style step)
    When I go to pageTest1 from test-page page
    And I wait for 200 ms
    And I click linkInvisibleTest2Page from test-page page if present
    And I wait for 200 ms
    Then the title should be "Test1 Page"

  Scenario: 'I double click' on Page1 test page link should lead to Page2 test page
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I double click "test-page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'I double click' on Page1 test page link should lead to Page2 test page (text style step)
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I double click linkTest2Page from test-page page
    Then the title should be "Test2 Page"

  Scenario: 'I type' "Green" (string) text inside input should get this text typed in, 'text should be' should verify the text
    When I go to "test2-page"."pageTest2"
    And I type "Green" in "test2-page"."inputColors"
    And I wait and click "test2-page"."inputColors"
    Then "test2-page"."blockInputColor" text should be "Green"

  Scenario: 'I type' "Green" (string) text inside input should get this text typed in, 'text should be' should verify the text (text style step)
    When I go to "test2-page"."pageTest2"
    And I type "Green" in inputColors from test2-page page
    And I wait and click "test2-page"."inputColors"
    Then blockInputColor text from test2-page page should be "Green"

  Scenario: 'I type' "Gold" (page object) text inside input should get this text typed in, 'text should be' should verify the text
    When I go to "test2-page"."pageTest2"
    And I type "test2-page"."textGold" in "test2-page"."inputColors"
    And I wait and click "test2-page"."inputColors"
    Then "test2-page"."blockInputColor" text should be "test2-page"."textGold"

  Scenario: 'I type' "Gold" (page object) text inside input should get this text typed in, 'text should be' should verify the text (text style step)
    When I go to "test2-page"."pageTest2"
    And I type textGold from test2-page page in inputColors from test2-page page
    And I wait and click "test2-page"."inputColors"
    Then blockInputColor text from test2-page page should be textGold from test2-page page

  Scenario: 'I clear and type' "Green" (string) text inside input should overwrite the text
    Given I go to "test2-page"."pageTest2"
    And I type "Yellow" in "test2-page"."inputColors"
    When I clear "test2-page"."inputColors" and type "Green"
    Then "test2-page"."blockInputColor" text should be "Green"

  Scenario: 'I clear and type' "Green" (string) text inside input should overwrite the text (text style step)
    Given I go to "test2-page"."pageTest2"
    And I type "Yellow" in inputColors from test2-page page
    When I clear inputColors from test2-page page and type "Green"
    Then blockInputColor text from test2-page page should be "Green"

  Scenario: 'I clear and type' "Gold" (page object) text inside input should overwrite the text
    Given I go to "test2-page"."pageTest2"
    And I type "test2-page"."textIndigo" in "test2-page"."inputColors"
    When I clear "test2-page"."inputColors" and type "test2-page"."textGold"
    Then "test2-page"."blockInputColor" text should be "test2-page"."textGold"

  Scenario: 'I clear and type' "Gold" (page object) text inside input should overwrite the text (text style step)
    Given I go to "test2-page"."pageTest2"
    And I type textIndigo from test2-page page in inputColors from test2-page page
    When I clear inputColors from test2-page page and type textGold from test2-page page
    Then blockInputColor text from test2-page page should be textGold from test2-page page

  Scenario: 'I select' "Green" (string) option text inside select dropdown should get this option selected, 'text should be' should verify the text
    Given I go to "test2-page"."pageTest2"
    When I select "Green" in "test2-page"."dropdownColors"
    Then "test2-page"."blockDropdownColor" text should be "green"

  Scenario: 'I select' "Green" (string) option text inside select dropdown should get this option selected, 'text should be' should verify the text (text style step)
    Given I go to "test2-page"."pageTest2"
    When I select "Green" in dropdownColors from test2-page page
    Then blockDropdownColor text from test2-page page should be "green"

  Scenario: 'I select' "Gold" (page object) option text inside select dropdown should get this option selected, 'text should be' should verify the text
    Given I go to "test2-page"."pageTest2"
    When I select "test2-page"."textGold" in "test2-page"."dropdownColors"
    Then "test2-page"."blockDropdownColor" text should be "test2-page"."textGold"

  Scenario: 'I select' "Gold" (page object) option text inside select dropdown should get this option selected, 'text should be' should verify the text (text style step)
    Given I go to "test2-page"."pageTest2"
    When I select textGold from test2-page page in dropdownColors from test2-page page
    Then blockDropdownColor text from test2-page page should be textGold from test2-page page
