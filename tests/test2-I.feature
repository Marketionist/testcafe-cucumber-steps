@long @i-steps

Feature: Running Cucumber with TestCafe - test "I ..." steps feature 2
  As a user of TestCafe
  I should be able to use Cucumber
  to run my e2e tests

  Scenario: 'I log in with l: and p: and click' should show credentials that were submitted for logging in
    Given I go to "test2-page"."pageTest2"
    When I log in with l: "testUser" in "test2-page"."inputUsername" and p: "1111" in "test2-page"."inputPassword" and click "test2-page"."buttonLogin"
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'I log in with l: and p: and click' should show credentials that were submitted for logging in (text style step)
    Given I go to "test2-page"."pageTest2"
    When I log in with l: "testUser" in inputUsername from test2-page and p: "1111" in inputPassword from test2-page and click buttonLogin from test2-page
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'I log in with l: and p: and click' should show credentials that were submitted for logging in (Page Object style step)
    Given I go to "test2-page"."pageTest2"
    When I log in with l: "test2-page"."loginTest2" in "test2-page"."inputUsername" and p: "test2-page"."passwordTest2" in "test2-page"."inputPassword" and click "test2-page"."buttonLogin"
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'I log in with l: and p: and click' should show credentials that were submitted for logging in (text style step)
    Given I go to "test2-page"."pageTest2"
    When I log in with l: loginTest2 from test2-page in inputUsername from test2-page and p: passwordTest2 from test2-page in inputPassword from test2-page and click buttonLogin from test2-page
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'I move to' element should trigger its hovered state, 'text should contain' should verify the text
    Given I go to URL "http://localhost:8001/test1.html"
    When I move to "test-page"."titleTest1"
    Then "test-page"."blockTextTest" text should contain "test-page"."txtTest1"

  Scenario: 'I move to' element should trigger its hovered state, 'text should contain' should verify the text (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I move to titleTest1 from test-page page
    Then blockTextTest from test-page page text should contain txtTest1 from test-page page

  Scenario: 'I move to with an offset' should trigger element's hovered state
    Given I go to URL "http://localhost:8001/test1.html"
    When I move to "test-page"."titleTest1" with an offset of x: 10px, y: 5px
    Then "test-page"."blockTextTest" text should contain "test-page"."txtTest1"

  Scenario: 'I move to with an offset' should trigger element's hovered state (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I move to titleTest1 from test-page page with an offset of x: 10px, y: 5px
    Then "test-page"."blockTextTest" text should contain "test-page"."txtTest1"

  Scenario: 'I switch to' iframe should change the context to this iframe
    Given I go to URL "http://localhost:8001/test-iframe.html"
    When I switch to "iframe-page"."iframeTest1Page" frame
    Then "test-page"."linkTest2Page" should be present

  Scenario: 'I switch to' iframe should change the context to this iframe (text style step)
    Given I go to URL "http://localhost:8001/test-iframe.html"
    When I switch to iframeTest1Page frame from iframe-page page
    Then "test-page"."linkTest2Page" should be present

  Scenario: 'I switch to main frame' should change the context back to the main page
    Given I go to URL "http://localhost:8001/test-iframe.html"
    And I switch to "iframe-page"."iframeTest1Page" frame
    And "test-page"."linkTest2Page" should be present
    When I switch to main frame
    Then "test-page"."linkTest2Page" should not be present

  Scenario: 'I execute function' should change the content on the page
    Given I go to URL "http://localhost:8001/test1.html"
    When I execute "test2-page"."updateText" function
    Then "test-page"."blockTextTest" text should contain "Text to test script execution"

  Scenario: 'I execute function' should change the content on the page (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I execute updateText function from test2-page page
    Then "test-page"."blockTextTest" text should contain "Text to test script execution"

  Scenario: 'I accept further browser alerts' should get the alert accepted
    Given I go to URL "http://localhost:8001/test-alert.html"
    When I accept further browser alerts
    And I click "alert-page"."buttonLaunchAlert"
    Then "alert-page"."blockAlertStatus" text should be "alert-page"."textAlertAccepted"

  Scenario: 'I dismiss further browser alerts' should get the alert canceled
    Given I go to URL "http://localhost:8001/test-alert.html"
    When I dismiss further browser alerts
    And I click "alert-page"."buttonLaunchAlert"
    Then "alert-page"."blockAlertStatus" text should be "alert-page"."textAlertCanceled"

  Scenario: 'I press' should press the specified keyboard keys
    Given I go to URL "http://localhost:8001/test2.html"
    And I type "Text is 12" in "test2-page"."inputColors"
    And I click "test2-page"."inputColors"
    When I press "home right right right right delete delete delete"
    Then "test2-page"."blockInputColor" text should be "Text 12"
