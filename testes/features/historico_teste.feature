Feature: Historico de reviews

  Scenario: Filtering reviews by category
    Given The service has a database containing reviews
    And The database contains a review "id: 1", "author_id: 1" and "categories: ['Zumbi', 'RPG']"
    And The database contains a review "id: 2", "author_id: 1" and "categories: ['Ação', 'Aventura', 'RPG']"
    And The database contains a review "id: 3", "author_id: 2" and "categories: ['Zumbi', Ação', 'Aventura']"   
    And The database contains a review "id: 4", "author_id: 2" and "categories: ['Aventura', 'RPG', 'Sobrevivência']"
    When A "GET" request is made to "/api/user/1/historico/category/Zumbi" route
    Then The service should respond with a list of reviews of the user id: 1 containing the category "Zumbi"
    And The list of reviews should contain the review "id: 1", "author_id: 1" and "categories: ['Zumbi', 'RPG']"
    And The service should respond with status code "200"

  Scenario: Filtering reviews by category that does not exist
    Given The service has a database containing reviews
    And The database contains a review "id: 1", "author_id: 1" and "categories: ['Zumbi', 'RPG']"
    And The database contains a review "id: 2", "author_id: 1" and "categories: ['Ação', 'Aventura', 'RPG']"
    And The database contains a review "id: 3", "author_id: 2" and "categories: ['Zumbi', Ação', 'Aventura']"   
    And The database contains a review "id: 4", "author_id: 2" and "categories: ['Aventura', 'RPG', 'Sobrevivência']"
    When A "GET" request is made to "/api/user/1/historico/category/Comédia" route
    Then The service should respond with status code "404"
    And The respose should contain the message "Categoria não encontrada"

  Scenario: Get all reviews of the user
    Given The service has a database containing reviews
    And The database contains a review "id: 1", "author_id: 1" and "categories: ['Zumbi', 'RPG']"
    And The database contains a review "id: 2", "author_id: 1" and "categories: ['Ação', 'Aventura', 'RPG']"
    And The database contains a review "id: 3", "author_id: 2" and "categories: ['Zumbi', Ação', 'Aventura']"   
    And The database contains a review "id: 4", "author_id: 2" and "categories: ['Aventura', 'RPG', 'Sobrevivência']"
    When A "GET" request is made to "/api/user/1/historico" route
    Then The service should respond with a list of reviews containing the user with "id: 1"
    And The list of reviews should contain the review "id: 1" and "id: 2"
    And The service should respond with status code "200"

  Scenario: Get all reviews of the user that does not exist
    Given The service has a database containing users
    And The database contains a review "id: 1", "author_id: 1" and "categories: ['Zumbi', 'RPG']"
    And The database contains a review "id: 2", "author_id: 1" and "categories: ['Ação', 'Aventura', 'RPG']"
    And The database contains a review "id: 3", "author_id: 2" and "categories: ['Zumbi', Ação', 'Aventura']"   
    And The database contains a review "id: 4", "author_id: 2" and "categories: ['Aventura', 'RPG', 'Sobrevivência']"
    When A "GET" request is made to "/api/user/6historico" route
    Then The service should respond with status code "404"
    And The response should contain the message "Usuário não encontrado"
  
  Scenario: Edit a review
    Given The service has a database containing reviews
    And The database contains a review "id: 1", "author_id: 1" and "rating: 3"
    And A user with "username: Alice", "id: 1" exists
    And "Alice" is logged in
    When A "PUT" request is made to "/api/user/1/historico/id/1" route
    And The request contains a JSON body with updated review "rating: 5"
    Then The service should respond with the updated review 
    And The updated review should contain "rating: 5"
    Then The service should respond with status code "200"
    
  Scenario: Edit a review that does no exist
    Given The service has a database containing reviews
    And The database contains a review "id: 1", "author_id: 1", "categories: ['Zumbi', 'RPG']"
    And The database contains a review "id: 2", "author_id: 1", "categories: ['Ação', 'Aventura', 'RPG']"
    And The database contains a review "id: 3", "author_id: 2", "categories: ['Zumbi', Ação', 'Aventura']"
    And The database contains a review "id: 4", "author_id: 2", "categories: ['Aventura', 'RPG', 'Sobrevivência']"
    And A user "Alice" with ID 1 exists in the database
    And The user "Alice" is logged in
    When A "PUT" request is made to "/api/user/1/historico/id/5" route
    And The request contains a JSON body with updated review data "name: 'Testando errado'"
    Then The service should respond with status code "404"
    And The response should contain an error message "Review não encontrado"

  Scenario: Edit a review of a user that is not logged
    Given The service has a database containing reviews
    And The database contains a review "id: 1", "author_id: 1", "categories: ['Zumbi', 'RPG']"
    And The database contains a review "id: 2", "author_id: 1", "categories: ['Ação', 'Aventura', 'RPG']"
    And The database contains a review "id: 3", "author_id: 2", "categories: ['Zumbi', Ação', 'Aventura']"
    And The database contains a review "id: 4", "author_id: 2", "categories: ['Aventura', 'RPG', 'Sobrevivência']"
    And A user "Bob" with id 2 exists in the database
    When A "PUT" request is made to "/api/user/2/historico/id/3" route
    And The request contains a JSON body with updated review data "name: 'Testando errado'"
    Then The service should respond with status code "404"
    And The response should contain an error message "Usuário precisa estar logado"

    