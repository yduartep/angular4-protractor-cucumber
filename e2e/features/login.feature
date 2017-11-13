Feature: login - We want to test the login process

  Scenario: SC01.Check the user can login into the application
  Verify that the user can enter in the application using correct credentials.
    Given the user is in the Login page
    And the user set the username 'guest'
    And the user set the password 'guest123'
    When the user logs in the application
    Then the user is redirected to the Welcome page
