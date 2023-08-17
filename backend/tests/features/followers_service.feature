Feature: Followers
  As a user, I want to be able to follow other users and receive their updates in a specific section of the site.

  Scenario: Client follows a user
    Given that the system has an existing user with ID "1"
    And the system has an existing user with ID "2"
    And the list of following of the "1" does not have an user with ID "2"
    When a POST request is made to "/api/users/2/follow"
    And the request body is '{"id":1}'
    Then the system returns a "200" status and the message "You are now following this user!"
    And "1" is added to the list of followers of "2"
    And "2" is added to the list of following of "1"

  Scenario: Client unfollows a user
    Given that the system has an existing user with ID "3"
    And the system has an existing user with ID "2"
    And the list of following of the "3" has an user with ID "2"
    When a POST request is made to "/api/users/2/unfollow"
    And the request body is '{"id":3}'
    Then the system returns a "200" status and the message "You are no longer following this user!"
    And "3" is removed from the list of followers of "2"
    And "2" is removed from the list of following of "3"

  Scenario: Client follows a user that does not exist
    Given that the system has an existing user with ID "1"
    And the system does not have an existing user with ID "52"
    When a POST request is made to "/api/users/52/follow"
    And the request body is '{"id":1}'
    Then the system returns a "404" status and the message "User not found"

  Scenario: Client blocks a user
    Given that the system has an existing user with ID "1"
    And the system has an existing user with ID "2"
    And the list of blocked of the "1" does not have an user with ID "2"
    When a POST request is made to "/api/users/2/block"
    And the request body is '{"id":1}'
    Then the system returns a "200" status and the message "You have blocked this user!"
    And "2" is added to the list of blocked of "1"

  Scenario: Client blocks a user that does not exist
    Given that the system has an existing user with ID "1"
    And the system does not have an existing user with ID "52"
    When a POST request is made to "/api/users/52/block"
    And the request body is '{"id":1}'
    Then the system returns a "404" status and the message "User not found"

  Scenario: Client unblocks a user
    Given that the system has an existing user with ID "5"
    And the system has an existing user with ID "2"
    And the list of blocked of the "5" has an user with ID "2"
    When a POST request is made to "/api/users/2/unblock"
    And the request body is '{"id":5}'
    Then the system returns a "200" status and the message "You have unblocked this user!"
    And "2" is removed from the list of blocked of "5"