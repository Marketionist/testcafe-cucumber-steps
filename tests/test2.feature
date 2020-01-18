@Fast

Feature: Running Cucumber with TestCafe - feature 2
  As a user of TestCafe
  I should be able to use Cucumber
  to run my e2e tests

  Scenario: 'I move to' element should trigger its hovered state, 'text should contain' should verify the text
    When I go to URL "http://localhost:8001/test1.html"
    And I move to "test-page"."titleTest1"
    Then "test-page"."blockTextTest" text should contain "test-page"."txtTest1"

  Scenario: 'I move to' element should trigger its hovered state, 'text should contain' should verify the text (text style step)
    When I go to URL "http://localhost:8001/test1.html"
    And I move to titleTest1 from test-page page
    Then blockTextTest text from test-page page should contain txtTest1 from test-page page

  Scenario: 'I move to with an offset' should trigger element's hovered state
    When I go to URL "http://localhost:8001/test1.html"
    And I move to "test-page"."titleTest1" with an offset of x: 10px, y: 5px
    Then "test-page"."blockTextTest" text should contain "test-page"."txtTest1"

  Scenario: 'I move to with an offset' should trigger element's hovered state (text style step)
    When I go to URL "http://localhost:8001/test1.html"
    And I move to titleTest1 from test-page page with an offset of x: 10px, y: 5px
    Then "test-page"."blockTextTest" text should contain "test-page"."txtTest1"
