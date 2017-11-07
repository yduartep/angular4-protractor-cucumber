Feature: login - We want to test the login process

  Scenario: SC01.Check the user can login into the application
  Verify that the values introduced by the user are correctly sent to the Authentication service.
    Given the user is in the Login page
    And the user set the username 'guest'
    And the user set the password 'guest123'
    When the user logs in the application
    Then the user is redirected to the 'Welcome' page
    And a cookie with name 'userId' is created with the value 'guest'
    And a cookie with name 'token' is present
