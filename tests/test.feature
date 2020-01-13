@Fast

Feature: Running Cucumber with TestCafe
  As a user of TestCafe
  I should be able to use Cucumber
  to run my e2e tests

  Scenario: 'I go to URL' should open corresponding page and verify title
    Given I go to URL "http://localhost:8001/test1.html"
    Then the title should be "Test1 Page"
    And the title should contain "st1 Pa"

  Scenario: 'I go to page' should open corresponding page
    Given I go to "test.page"."pageTest1"
    Then the title should be "Test1 Page"

  Scenario: 'I go to page' should open corresponding page (text style step)
    Given I go to pageTest1 from test.page page
    Then the title should be "Test1 Page"

  Scenario: 'I reload the page' should refresh the page, 'should be present' should verify the element
    Given I go to "test.page"."pageTest1"
    And I reload the page
    Then "test.page"."linkTest2Page" should be present

  Scenario: 'I reload the page' should refresh the page, 'should be present' should verify the element (text style step)
    Given I go to "test.page"."pageTest1"
    And I reload the page
    Then linkTest2Page from test.page page should be present

  Scenario: 'I click' Page1 test page link should lead to Page2 test page, 'I wait for' should wait for 200 ms
    Given I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I click "test.page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'I click' Page1 test page link should lead to Page2 test page, 'I wait for' should wait for 200 ms (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I click linkTest2Page from test.page page
    Then the title should be "Test2 Page"

  Scenario: 'I wait and click' on Page1 test page link should lead to Page2 test page
    When I go to "test.page"."pageTest1"
    And I wait and click "test.page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'I wait and click' on Page1 test page link should lead to Page2 test page (text style step)
    When I go to "test.page"."pageTest1"
    And I wait and click linkTest2Page from test.page page
    Then the title should be "Test2 Page"

  Scenario: 'I click if present': link on Page1 test page should be clicked if it is visible and lead to Page2 test page
    When I go to "test.page"."pageTest1"
    And I wait for 200 ms
    And I click "test.page"."linkTest2Page" if present
    And I wait for 200 ms
    Then the title should be "Test2 Page"

  Scenario: 'I click if present': link on Page1 test page should not be clicked if it is not present
    When I go to "test.page"."pageTest1"
    And I wait for 200 ms
    And I click "test.page"."linkInvisibleTest2Page" if present
    And I wait for 200 ms
    Then the title should be "Test1 Page"

  Scenario: 'I click if present': link on Page1 test page should be clicked if it is visible and lead to Page2 test page (text style step)
    When I go to pageTest1 from test.page page
    And I wait for 200 ms
    And I click linkTest2Page from test.page page if present
    And I wait for 200 ms
    Then the title should be "Test2 Page"

  Scenario: 'I click if present': link on Page1 test page should not be clicked if it is not present (text style step)
    When I go to pageTest1 from test.page page
    And I wait for 200 ms
    And I click linkInvisibleTest2Page from test.page page if present
    And I wait for 200 ms
    Then the title should be "Test1 Page"

  Scenario: 'I double click' on Page1 test page link should lead to Page2 test page
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I double click "test.page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'I double click' on Page1 test page link should lead to Page2 test page (text style step)
    When I go to URL "http://localhost:8001/test1.html"
    And I wait for 200 ms
    And I double click linkTest2Page from test.page page
    Then the title should be "Test2 Page"
