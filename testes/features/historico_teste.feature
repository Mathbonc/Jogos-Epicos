Feature: Historico de reviews

  Scenario: Filtering reviews by category
    Given The service has a database containing reviews
    And The database contains a review "id: 1,
                                        author_id: 1,
                                        name: 'Days Gone',
                                        rating: 5,
                                        description: 'Muito legal, amei matar as hordas!',
                                        date: '2021-01-01',
                                        categories: ['Zumbi', 'RPG'], 
                                        comments: ['Muito bom mesmo!', 'Jogo muito bom, recomendo!'],
                                        likes: 2"
    And The database contains a review "id: 2,
                                        author_id: 1,
                                        name: 'God of War',
                                        rating: 5,
                                        description: 'Jogo muito bom, recomendo!',
                                        date: '2021-05-03',
                                        categories: ['Ação', 'Aventura', 'RPG'],
                                        comments: ['Muito bom mesmo!', 'Jogo muito bom, recomendo!'],
                                        likes: 5"
    And The database contains a review "id: 3,      
                                        author_id: 2,
                                        name: 'The Last of Us',
                                        rating: 4,
                                        description: 'Jogo muito dificil, mas muito bom!',
                                        date: '2022-01-01',
                                        categories: ['Zumbi', 'Ação', 'Aventura', 'RPG],
                                        comments: ['Muito bom mesmo!', 'Jogo muito bom, recomendo!'],
                                        likes: 5"
    When A "GET" request is made to "/api/user/Alice/historico/category/Zumbi" route
    Then The service should respond with a list of reviews containing the category "Zumbi"
    And The list of reviews should contain the review "id: 1,
                                                       author_id: 1,
                                                       name: 'Days Gone',
                                                       rating: 5,
                                                       description: 'Muito legal, amei matar as hordas!',
                                                       date: '2021-01-01',
                                                       categories: ['Zumbi', 'RPG'], 
                                                       comments: ['Muito bom mesmo!', 'Jogo muito bom, recomendo!'],
                                                       likes: 2"
    And The service should respond with status code "200"

  Scenario: Filtering reviews by category that does not exist

  Scenario: Get all reviews of the user

  Scenario: Get all reviews of the user that does not exist
    
  Scenario: Edit a review
    
  Scenario: Edit a review that does no exist
    