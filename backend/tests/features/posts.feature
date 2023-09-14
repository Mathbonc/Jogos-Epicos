Feature: Creating a new forum post

Scenario: Creating a new post
  Given there is a user with username "usuario1", email "usuario1@example.com", password "senha123", and id "1"
  And there is a category with the name "Adventure"
  And there is a game with the name "Hollow Knight"
  When a POST request is made to the route "/api/posts" with the request body
  """
  {"category":["Adventure"],
    "game":"Hollow Knight",
    "rate":5,
    "title":"Primeiro Post no forum pessoal!! Hollow Knight",
    "description":"Usando essa oportunidade para dar as boas vindas à todos os novos membros que chegarem aqui, vamos fazer um espaço massa pra todo mundo compartilhar e discutir nossa opinião em jogos!! Meu jogo favorito é Hollow Knight!!"}
  """
  Then the server responds with the code "201" with the message "Post sucessfully made"

Scenario: Excluindo um post
  Given o server tem uma database contendo posts
  And a database contém um usuário com id "1" e um post "1"
  When um request de DELETE é feito para "/api/posts/1/1" route
  Then The service should respond with status code "201" and the message "Post deleted"
    
Scenario: Editing a post
  Given o servidor tem uma database com posts
  And a database contém o post
 """
  {
    "user_id":1,
    "post_id":1,
    "category":["Adventure"],
    "game":"Hollow Knight",
    "rate":5,
    "title":"Primeiro Post no forum pessoal!! Hollow Knight",
    "description":"Usando essa oportunidade para dar as boas vindas à todos os novos membros que chegarem aqui, vamos fazer um espaço massa pra todo mundo compartilhar e discutir nossa opinião em jogos!! Meu jogo favorito é Hollow Knight!!"
  }
  """
  And A user with id "1" is logged in
  When A PUT request is made to "/api/posts/1/1" route with the request body 
      """
      {
        "title":"Testing editing a post",
        "rate":"3.5",
        "description":"This is a test editing"
      }
      """
  Then The service should respond with status code "201" with the message "Post edited"