@Fast

Feature: Running Cucumber with TestCafe
  As a user of TestCafe
  I should be able to use Cucumber
  to run my e2e tests

  Scenario: Go to URL should open corresponding page
    When I go to URL "https://www.google.com/"
    Then the title should be "Google"
