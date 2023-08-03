Feature: Historico de reviews

  Scenario: Filtering reviews by category
    Given The service has a database containing reviews
    When A request is made to the service to filter reviews by category "Zumbi"
    Then The service should respond with a list of reviews containing the category "Zumbi"
    Then The service should respond with status code 200

  Scenario: Get all reviews of the user
    Given The service has a database containing reviews
    When A request is made to the service to get all reviews of the user "Alice"
    Then The service should respond with a list of reviews of the user "Alice"
    Then The service should respond with status code 200

  Scenario: Edit a review
    Given The service has a database containing reviews
    When A request is made to the service to edit a review
    Then The service should respond with the edited review
    Then The service should respond with status code 200

  Scenario: Edit a review that does not exist
    Given The service has a database containing reviews
    When A request is made to the service to edit a review that does not exist
    Then The service should respond with status code 404