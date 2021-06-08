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
    When I move to "test1-page"."titleTest1"
    Then "test1-page"."blockTextTest" text should contain "test1-page"."txtTest1"

  Scenario: 'I move to' element should trigger its hovered state, 'text should contain' should verify the text (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I move to titleTest1 from test1-page page
    Then blockTextTest from test1-page page text should contain txtTest1 from test1-page page

  Scenario: 'I move to with an offset' should trigger element's hovered state
    Given I go to URL "http://localhost:8001/test1.html"
    When I move to "test1-page"."titleTest1" with an offset of x: 10px, y: 5px
    Then "test1-page"."blockTextTest" text should contain "test1-page"."txtTest1"

  Scenario: 'I move to with an offset' should trigger element's hovered state (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I move to titleTest1 from test1-page page with an offset of x: 10px, y: 5px
    Then "test1-page"."blockTextTest" text should contain "test1-page"."txtTest1"

  Scenario: 'I switch to frame' should change the context to this iframe
    Given I go to URL "http://localhost:8001/test-iframe.html"
    When I switch to "iframe-page"."iframeTest1Page" frame
    Then "test1-page"."linkTest2Page" should be present

  Scenario: 'I switch to frame' should change the context to this iframe (text style step)
    Given I go to URL "http://localhost:8001/test-iframe.html"
    When I switch to iframeTest1Page frame from iframe-page page
    Then "test1-page"."linkTest2Page" should be present

  Scenario: 'I wait up to and switch to frame' should wait for the iframe to load up to provided number of ms and then change the context to this iframe
    Given I go to URL "http://localhost:8001/test-iframe.html"
    When I wait up to 10000 ms and switch to "iframe-page"."iframeTest1Page" frame
    Then "test1-page"."linkTest2Page" should be present

  Scenario: 'I wait up to and switch to frame' should wait for the iframe to load up to provided number of ms and then change the context to this iframe (text style step)
    Given I go to URL "http://localhost:8001/test-iframe.html"
    When I wait up to 10000 ms and switch to iframeTest1Page frame from iframe-page page
    Then "test1-page"."linkTest2Page" should be present

  Scenario: 'I switch to main frame' should change the context back to the main page
    Given I go to URL "http://localhost:8001/test-iframe.html"
    And I switch to "iframe-page"."iframeTest1Page" frame
    And "test1-page"."linkTest2Page" should be present
    When I switch to main frame
    Then "test1-page"."linkTest2Page" should not be present

  Scenario: 'I set file path' should set the path to the file (string) inside the Upload image input
    Given I go to URL "http://localhost:8001/test1.html"
    When I set "media/test-image1.jpg" file path in "test1-page"."inputUploadFile"
    Then "test1-page"."inputUploadFile" should be present

  Scenario: 'I set file path' should set the path to the file (string) inside the Upload image input (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I set "media/test-image1.jpg" file path in inputUploadFile from test1-page
    Then "test1-page"."inputUploadFile" should be present

  Scenario: 'I set file path' should set the path to the file (page object) inside the Upload image input
    Given I go to URL "http://localhost:8001/test1.html"
    When I set "test1-page"."pathToImage1" file path in "test1-page"."inputUploadFile"
    Then "test1-page"."inputUploadFile" should be present

  Scenario: 'I set file path' should set the path to the file (page object) inside the Upload image input (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I set pathToImage1 from test1-page file path in inputUploadFile from test1-page
    Then "test1-page"."inputUploadFile" should be present

  Scenario: 'I execute function' should change the content on the page
    Given I go to URL "http://localhost:8001/test1.html"
    When I execute "test2-page"."updateText" function
    Then "test1-page"."blockTextTest" text should contain "Text to test script execution"

  Scenario: 'I execute function' should change the content on the page (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I execute updateText function from test2-page page
    Then "test1-page"."blockTextTest" text should contain "Text to test script execution"

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

  Scenario: 'I open in new browser window' should open the page in the new browser window/tab (URL provided in the step string)
    Given I go to URL "http://localhost:8001/test1.html"
    When I open "http://localhost:8001/test2.html" in new browser window
    Then URL should contain "/test2.html"

  Scenario: 'I open in new browser window' should open the page in the new browser window/tab (Page Object style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I open "test2-page"."urlTest2" in new browser window
    Then URL should contain "/test2.html"

  Scenario: 'I open in new browser window' should open the page in the new browser window/tab (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I open urlTest2 from test2-page page in new browser window
    Then URL should contain "/test2.html"

  Scenario: 'I close current browser window' should close current browser window/tab
    Given I go to URL "http://localhost:8001/test1.html"
    And I open urlTest2 from test2-page page in new browser window
    When I close current browser window
    Then URL should contain "/test1.html"

  Scenario: 'I press' should press the specified keyboard keys
    Given I go to URL "http://localhost:8001/test2.html"
    And I type "Text is 12" in "test2-page"."inputColors"
    And I click "test2-page"."inputColors"
    When I press "home right right right right delete delete delete"
    Then "test2-page"."blockInputColor" text should be "Text 12"

  Scenario: 'I set PAGE_URL environment variable', 'I go to PAGE_URL' should set PAGE_URL environment variable and open a page with this URL
    Given I go to URL "http://localhost:8001/test1.html"
    When I set PAGE_URL environment variable
    And I go to URL "http://localhost:8001/test2.html"
    And I go to PAGE_URL
    Then URL should contain "/test1.html"
