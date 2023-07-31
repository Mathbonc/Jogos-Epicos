Feature: Review filtering by category

  Scenario: Filtering reviews by category "Zumbi"
    Given The service has a database containing reviews
    When A request is made to the service to filter reviews by category "Zumbi"
    Then The service should respond with a list of reviews containing the category "Zumbi"
    And The service should respond with status code 200
