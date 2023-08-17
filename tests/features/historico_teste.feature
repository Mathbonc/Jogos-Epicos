Feature: Historico de reviews

  Scenario: Filtering reviews by category
    Given The service has a database containing reviews
    And The database contains a review id: "1", author_id: "1" and categories: '["Zumbi", "RPG"]'
    And The database contains a review id: "2", author_id: "1" and categories: '["Ação", "Aventura", "RPG"]'
    And The database contains a review id: "3", author_id: "2" and categories: '["Zumbi", "Ação", "Aventura"]'
    And The database contains a review id: "4", author_id: "2" and categories: '["Aventura", "RPG", "Sobrevivência"]'
    When A "GET" request is made to "/api/user/1/historico/category/Zumbi" route
    Then The service should return a list of reviews of the user with id: "1" containing the category 'Zumbi'
    And The list of reviews should contain the review id: "1" and categories: '["Zumbi", "RPG"]'
    And The service should respond with status code "200"

  Scenario: Filtering reviews by category that does not exist
    Given The service has a database containing reviews
    And The database does not contain a review with category "Comedia"
    When A "GET" request is made to "/api/user/1/historico/category/Comedia" route
    Then The service should respond with status code "404"
    And The respose should contain the message "Categoria não encontrada"

  Scenario: Get all reviews of the user
    Given The service has a database containing reviews
    And The database contains a review id: "1" and author_id: "1" 
    And The database contains a review id: "2" and author_id: "1" 
    And The database contains a review id: "3" and author_id: "2" 
    And The database contains a review id: "4" and author_id: "2" 
    When A "GET" request is made to "/api/user/1/historico" route
    Then The service should respond with a list of reviews containing the user with id: "1"
    And The list of reviews should contain the review id: "1" and id: "2"
    And The service should respond with status code "200"

  Scenario: Get all reviews of the user that does not exist
    Given The service has a database containing reviews
    And The database does not contain any review with author_id: "6"
    When A "GET" request is made to "/api/user/6/historico" route
    Then The service should respond with status code "404"
    And The response should contain the message "Usuário não encontrado"
  
  Scenario: Edit a review
    Given The service has a database containing reviews
    And The database contains a review id: "1", author_id: "1" and rating: "3"
    And The user with id: "1" is logged in
    When A "PUT" request is made to "/api/user/1/historico/id_review/1" route
    And The request contains a JSON body with updated review rating: "5"
    Then The service should respond with the updated review 
    And The updated review should contain rating: "5"
    Then The service should respond with status code "200"
    
  Scenario: Edit a review that does no exist
    Given The service has a database containing reviews
    And The database does not contain a review with id: "6"
    And A user with id: "1" is logged in
    When A "PUT" request is made to "/api/user/1/historico/id_review/6" route
    And The request contains a JSON body with updated review data name: "Testando errado"
    Then The service should respond with status code "404"
    And The response should contain an error message "Review não encontrado"

  Scenario: Edit a review without being logged in
    Given The service has a database containing reviews
    And The database contain a review with author_id: "2" and id: "3"
    And The user with id: "2" is not logged in
    When A "PUT" request is made to "/api/user/2/historico/id_review/3" route
    And The request contains a JSON body with updated review data name: "Testando errado"
    Then The service should respond with status code "404"
    And The response should contain an error message "Usuário precisa estar logado"

  Scenario: Delete a review
    Given The service has a database containing reviews
    And The database contains a review id: "1" and author_id: "1"
    And The user with id: "1" is logged in
    When A "DELETE" request is made to "/api/user/1/historico/id_review/1" route
    Then The service should respond with status code "200"
    And The response should contain a message "Review deletado com sucesso"

  Scenario: Delete a review that does not exist
    Given The service has a database containing reviews
    And The database does not contain a review with id: "6"
    And The user with id: "1" is logged in
    When A "DELETE" request is made to "/api/user/1/historico/id_review/6" route
    Then The service should respond with status code "404"
    And The response should contain an error message "Review não encontrado"

    