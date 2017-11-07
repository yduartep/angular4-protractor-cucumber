Feature: login - We want to test the login process

  Scenario: SC01.Check the user can login into the application
  Verify that the values introduced by the user are correctly sent to the Authentication service.
    Given the user is in the Login page
    And the user set the username 'guest'
    And the user set the password 'guest123'
    When the user logs in the application
    Then the user is redirected to the 'Welcome' page
	
   Scenario: SC02.Check that the login cookie is stored.
   Verify that the cookie is created and stored when there is a successful login.
    Given the user is in the Login page
    And the user set the username 'guest'
    And the user set the password 'guest123'
    When the user logs in the application
    Then a cookie with name 'userId' is created with the value 'guest'
