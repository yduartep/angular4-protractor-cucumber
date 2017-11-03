Feature: login - We want to test the login process

  Scenario Outline: SC01.Check the user can login into the application
  Verify that the values introduced by the user are correctly sent to the Authentication service.
    Given the user is in the Login page
    And the user set the username '<userId>'
    And the user set the password '<password>'
    When the user logs in the application
    Then the user is redirected to the 'Welcome' page

    Examples:
      | userId | password |
      | guest  | guest123 |
