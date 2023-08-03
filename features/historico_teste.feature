Feature: Historico de reviews

  Scenario: Filtering reviews by category
    Given The service has a database containing reviews
    When A request is made to the service to filter reviews by category "Zumbi"
    Then The service should respond with a list of reviews containing the category "Zumbi"
    Then The service should respond with status code 200

  Scenario: Get all reviews of the user
    Given The service has a database containing reviews
    When A request is made to the service to get all reviews of the user
    Then The service should respond with a list of reviews of the user
    Then The service should respond with status code 200