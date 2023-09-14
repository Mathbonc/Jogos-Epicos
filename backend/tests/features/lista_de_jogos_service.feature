Feature: Games Lists

Scenario: The user gets an existing user list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the server has a game registered with id "1"
    And the server has a game registered with id "3"
    And the list with id "2" has two entries with ids "1" and "2", with the games of ids "1" and "3" and entryType "played" on both
    When the user sends a GET to the endpoint "/api/users/2/list"
    Then the response should return the list with id "2" object
    And return status code "200"

Scenario: The user tries to get a non-existing user list.
    Given that the server authenticates the user with id "1"
    And the server does not have a user registered with id "9"
    When the user sends a GET to the endpoint "/api/users/9/list"
    Then the response should return an error message 
    And return status code "404"

Scenario: The user adds a game to its own list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "1"
    And the server has a game registered with id "2" 
    And the user with id "1" has a list with corresponding id "1"
    And the list with id "1" has a single entry with id "1" that corresponds to a game with id "1" and entryType "abandoned" and reqDate "2021-05-04"
    When the user sends a POST to the endpoint "/api/users/1/list" with the body elements gameId = "2", entryType = "played" and reqDate = "2021-05-04"
    Then the response should return the list object with the new entry with id "1"
    And return status code "201"

Scenario: The user tries to add a game to another users list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "3"
    And the user with id "3" has a list with corresponding id "3"
    And the list with id "3" has no entries
    And the server has a game registered with id "1"
    When the user sends a POST to the endpoint "/api/users/3/list" with the body elements gameId = "1", entryType = "played" and reqDate = "2021-05-04"
    Then the response should return an error message
    And return status code "401"

Scenario: The user tries to add a repeated game to its own list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "1"
    And the server has a game registered with id "1" 
    And the user with id "1" has a list with corresponding id "1"
    And the list with id "1" has a entry with id "1" that corresponds to a game with id "1" and entryType "abandoned" and reqDate "2021-05-04"
    When the user sends a POST to the endpoint "/api/users/1/list" with the body elements gameId = "1", entryType = "played" and reqDate = "2021-05-04"
    Then the response should return an error message
    And return status code "409"

Scenario: The user gets all "Played" games from a list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "2"
    And the server has a game registered with id "1"
    And the server has a game registered with id "3"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has a entry with id "1" that corresponds to a game with id "1" and entryType "wished" and reqDate "2021-05-04"
    And the list with id "2" has a entry with id "2" that corresponds to a game with id "3" and entryType "played" and reqDate "2021-05-04"
    When the user sends a GET to the endpoint "/api/users/2/list/played"
    Then the response should return the filtered list object with id "2" and only entries of the type "played"
    And return status code "200"

Scenario: The user gets all "Abandoned" games from an empty list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has no entries
    When the user sends a GET to the endpoint "/api/users/2/list/abandoned"
    Then the response should return an empty list object
    And return status code "200"

Scenario: The user edits an "Abandoned" game from its own list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "1"
    And the server has a game registered with id "1"
    And the server has a game registered with id "3"
    And the user with id "1" has a list with corresponding id "1"
    And the list with id "1" has a entry with id "1" corresponding to a game with id "1" and entryType "abandoned" and reqDate "2021-05-04"
    And the list with id "1" has a entry with id "2" corresponding to a game with id "3" and entryType "played" and reqDate "2021-05-04"
    When the user sends a PUT to the endpoint "/api/users/1/list/1" with the body elements entryType = "played" and reqDate = "2021-06-04"
    Then the response should return the entry with id "1" and entryType "played" and reqDate "2021-06-04" from the list object of id "1"
    And return status code "200"

Scenario: The user tries to edit a "Wishlisted" game from another users list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the server has a game registered with id "4"
    And the server has a game registered with id "5"
    And the list with id "2" has a entry with id "1" corresponding to a game with id "4" and entryType "played" and reqDate "2021-05-01"
    And the list with id "2" has a entry with id "2" corresponding to a game with id "5" and entryType "played" and reqDate "2021-05-02"
    When the user sends a PUT to the endpoint "/api/users/2/list/1" with the body elements entryType = "played" and reqDate = "2021-06-04"
    Then the response should return an error message
    And return status code "401"
    
Scenario: The user deletes a game from its own list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "1"
    And the user with id "1" has a list with corresponding id "1"
    And the server has a game registered with id "1"
    And the server has a game registered with id "3"
    And the list with id "1" has a entry with id "1" corresponding to a game with id "1" and entryType "abandoned" and reqDate "2021-05-04"
    And the list with id "1" has a entry with id "2" corresponding to a game with id "3" and entryType "played" and reqDate "2021-05-04"
    When the user sends a DELETE to the endpoint "/api/users/1/list/1"
    Then the response should return a success message
    And return status code "200"

Scenario: The user tries to delete a game from another users list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the server has a game registered with id "4"
    And the server has a game registered with id "5"
    And the list with id "2" has a entry with id "1" corresponding to a game with id "4" and entryType "played" and reqDate "2021-05-01"
    And the list with id "2" has a entry with id "2" corresponding to a game with id "5" and entryType "played" and reqDate "2021-05-02"
    When the user sends a DELETE to the endpoint "/api/users/2/list/1"
    Then the response should return an error message
    And return status code "401"

Scenario: The user searches for a game in another users list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the server has a game registered with id "4"
    And the server has a game registered with id "5"
    And the list with id "2" has a entry with id "1" corresponding to a game with id "4" and entryType "played" and reqDate "2021-05-01"
    And the list with id "2" has a entry with id "2" corresponding to a game with id "5" and entryType "played" and reqDate "2021-05-02"
    When the user sends a GET to the endpoint "/api/users/2/list/search/Minecraft"
    Then the response should return the list object of id "2" with the entry with the gameId of the game with gameName "Minecraft"
    And return status code "200"

Scenario: The user searches for a game in an empty list.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has no entries
    When the user sends a GET to the endpoint "/api/users/2/list/search/Minecraft"
    Then the response should return an empty list object
    And return status code "200"

Scenario: The user sorts its own list by "Name", in ascending order.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "1"
    And the user with id "1" has a list with corresponding id "1"
    And the server has a game registered with id "1"
    And the server has a game registered with id "3"
    And the list with id "1" has a entry with id "1" corresponding to a game with id "1" and entryType "abandoned" and reqDate "2021-05-04"
    And the list with id "1" has a entry with id "2" corresponding to a game with id "3" and entryType "played" and reqDate "2021-05-04"
    When the user sends a GET to the endpoint "/api/users/1/list/title/asc"
    Then the response should return the list object of id "1" with the entries sorted by the game name in ascending order
    And return status code "200"

Scenario: The user sorts another users list by "Date", in descending order.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the server has a game registered with id "4"
    And the server has a game registered with id "5"
    And the list with id "2" has a entry with id "1" corresponding to a game with id "4" and entryType "played" and reqDate "2021-05-01"
    And the list with id "2" has a entry with id "1" corresponding to a game with id "5" and entryType "played" and reqDate "2021-05-02"
    When the user sends a GET to the endpoint "/api/users/2/list/date/desc"
    Then the response should return the list object of id "2" with the entries sorted by the game date in descending order
    And return status code "200"

Scenario: The user tries to sort another users list by "Color", in ascending order.
    Given that the server authenticates the user with id "1"
    And the server has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the server has a game registered with id "4"
    And the server has a game registered with id "5"
    And the list with id "2" has a entry with id "1" corresponding to a game with id "4" and entryType "played" and reqDate "2021-05-01"
    And the list with id "2" has a entry with id "1" corresponding to a game with id "5" and entryType "played" and reqDate "2021-05-02"
    When the user sends a GET to the endpoint "/api/users/2/list/color/asc"
    Then the response should return an error message
    And return status code "400"