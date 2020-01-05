@Fast

Feature: Running Cucumber with TestCafe
  As a user of TestCafe
  I should be able to use Cucumber
  to run my e2e tests

  Scenario: 'I go to URL' should open corresponding page and verify title
    When I go to URL "http://localhost:8001/test1.html"
    Then the title should be "Test1 Page"
    And the title should contain "st1 Pa"

  Scenario: 'I go to page' should open corresponding page
    When I go to "test.page"."pageTest1"
    Then the title should be "Test1 Page"

  Scenario: 'I go to page' should open corresponding page (text style step)
    When I go to pageTest1 from test.page page
    Then the title should be "Test1 Page"

  Scenario: 'I reload the page' should refresh the page, 'should be present' should verify the element
    When I go to "test.page"."pageTest1"
    And I reload the page
    Then "test.page"."linkTest2Page" should be present

  Scenario: 'I reload the page' should refresh the page, 'should be present' should verify the element (text style step)
    When I go to "test.page"."pageTest1"
    And I reload the page
    Then linkTest2Page from test.page page should be present
