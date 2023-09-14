Feature: Historico de posts

  Scenario: Filtering posts by category
    Given The service has a database containing posts
    And The database contains a post with id: "1", user_id: "1" and category: '["Action", "Adventure"]'
    And The database contains a post with id: "2", user_id: "1" and category: '["Action", "Adventure"]'
    And The database contains a post with id: "3", user_id: "1" and category: '["Action", "Adventure"]'
    And The database contains a post with id: "4", user_id: "1" and category: '["Platform"]'
    When A "GET" request is made to "/api/users/1/historic/category/Platform" route
    Then The service should return a list of post of the user with id: "1" containing the category "Platform"
    And The list of posts should contain the post with id: "4" and category: '["Platform"]'
    And The service should respond with status code "200"

  Scenario: Filtering posts by category that does not exist
    Given The service has a database containing posts
    And The database does not contain a post with category "FPS"
    When A "GET" request is made to "/api/users/1/historic/category/FPS" route
    Then The service should respond with status code "404"
    And The respose should contain the message "Category not found"

  Scenario: Get all posts of the user
    Given The service has a database containing posts
    And The database contains a post with id: "1", user_id: "1" 
    And The database contains a post with id: "2", user_id: "1" 
    And The database contains a post with id: "3", user_id: "1" 
    And The database contains a post with id: "4", user_id: "1" 
    When A "GET" request is made to "/api/users/1/historic" route
    Then The service should respond with a list of post of the user with id: "1"
    And The list of posts should contain the post with id: "6", "3", "2" and "4"
    And The service should respond with status code "200"

  Scenario: Get all posts of the user that does not exist
    Given The service has a database containing posts
    And The database does not contain any post with user_id: "999"
    When A "GET" request is made to "/api/users/999/historic" route
    Then The service should respond with status code "404"
    And The response should contain the message "User not found"
  
  Scenario: Edit a post
    Given The service has a database containing posts
    And The database contains a post with id: "1", user_id: "1" and rate: "5"
    And The user with id: "1" is logged in
    When A "PUT" request is made to "/api/users/1/historic/post_id/1" route
    And The request contains a JSON body with updated post rate: "4"
    Then The service should respond with the updated post
    And The updated post should contain rate: "4"
    Then The service should respond with status code "200"
    
  Scenario: Edit a post that does no exist
    Given The service has a database containing posts
    And The database does not contain a post with id: "99"
    And A user with id: "1" is logged in
    When A "PUT" request is made to "/api/users/1/historic/post_id/99" route
    And The request contains a JSON body with updated post data title: "Testando errado"
    Then The service should respond with status code "404"
    And The response should contain an error message "Post not found"

  Scenario: Edit a post without being logged in
    Given The service has a database containing posts
    And The database contain a post with id: "5" and user_id: "2"
    And The user with id: "2" is not logged in
    When A "PUT" request is made to "/api/users/2/historic/post_id/5" route
    And The request contains a JSON body with updated post data title: "Testando errado"
    Then The service should respond with status code "404"
    And The response should contain an error message "User must be logged in to edit a post"

  Scenario: Delete a post
    Given The service has a database containing posts
    And The database contains a post with id: "1" and user_id: "1"
    And The user with id: "1" is logged in
    When A "DELETE" request is made to "/api/users/1/historic/post_id/1" route
    Then The service should respond with status code "200"
    And The response should contain a message "Post deleted successfully"

  Scenario: Delete a post that does not exist
    Given The service has a database containing posts
    And The database does not contain a post with id: "99"
    And The user with id: "1" is logged in
    When A "DELETE" request is made to "/api/users/1/historic/post_id/99" route
    Then The service should respond with status code "404"
    And The response should contain an error message "Post not found"
