Feature: Lista de jogos já finalizados, abandonados e desejados.
As a usuário.
I want to adicionar os jogos que já joguei, quero jogar ou abandonei em uma lista.
So that I possa compartilhar minhas opiniões sobre um jogo e acompanhar as opiniões de quem eu me interesso.


Scenario: Adicionar jogo como “Finalizou”, com nota e com review, com título
    Given o usuário "Davi" está em qualquer página do sistema
    When o usuário "Davi" seleciona a opção “Adicionar Jogo”
    And o usuário "Davi" escolhe o jogo "Hollow Knight"
    And o usuário "Davi" seleciona a opção "Finalizado"
    And o usuário "Davi" dá nota ao jogo
    And o usuário "Davi" escreve uma review
    And o usuário "Davi" escreve um título para a review
    And o usuário "Davi" seleciona a opção "Submeter"
    Then o usuário "Davi" visualiza uma mensagem de sucesso
    And o usuário "Davi" continua na página que estava inicialmente
    And o jogo "Hollow Knight" está na lista de jogos do usuário "Davi" como "Finalizado"


Scenario: Adicionar jogo como "Finalizou", com nota e com review, mas sem título
    Given o usuário "Davi" está em qualquer página do sistema
    When o usuário "Davi" seleciona a opção “Adicionar Jogo”
    And o usuário "Davi"  escolhe o jogo "Hollow Knight"
    And o usuário "Davi" seleciona a opção "Finalizado"
    And o usuário "Davi" dá nota ao jogo
    And o usuário "Davi" escreve uma review
    And o usuário "Davi" não escreve um título para a review
    And o usuário "Davi" seleciona a opção "Submeter"
    Then o usuário "Davi" visualiza uma mensagem de erro 
    And o usuário "Davi" continua na página de adicionar jogo


Scenario: Adicionar jogo como “Abandonou”
    Given o usuário "Davi" está em qualquer página do sistema
    When o usuário "Davi" seleciona a opção “Adicionar Jogo”
    And o usuário "Davi" escolhe o jogo "League of Legends"
    And o usuário "Davi" seleciona a opção "Abandonou"
    And o usuário "Davi" dá nota ao jogo
    And o usuário "Davi" não escreve uma review
    And o usuário "Davi" seleciona a opção "Submeter"
    Then o usuário "Davi" visualiza uma mensagem de sucesso 
    And o usuário "Davi" continua na página que estava inicialmente
    And o jogo "League of Legends" está na lista de jogos do usuário "Davi" como "Abandonou"


Scenario: Adicionar jogo como “Deseja Jogar”
    Given o usuário "Davi" está em qualquer página do sistema
    When o usuário "Davi" seleciona a opção “Adicionar Jogo”
    And o usuário "Davi" escolhe o jogo "Spelunky"
    And o usuário "Davi" seleciona a opção "Deseja Jogar"
    And o usuário "Davi" seleciona a opção "Submeter"
    Then o usuário "Davi" visualiza uma mensagem de sucesso 
    And o jogo "Spelunky" está na lista de jogos do usuário "Davi" como "Deseja Jogar"


Scenario: Adicionar jogo como “Finalizado” que estava em “Deseja Jogar”
    Given o usuário "Davi" está em qualquer página do sistema
    When o usuário "Davi" seleciona a opção “Adicionar Jogo”
    And o usuário "Davi" escolhe o jogo "Spelunky"
    And o usuário "Davi" seleciona a opção "Finalizado"
    And o usuário "Davi" dá nota ao jogo
    And o usuário "Davi" escreve uma review
    And o usuário "Davi" seleciona a opção "Submeter"
    Then o usuário "Davi" visualiza uma mensagem de sucesso 
    And o usuário "Davi" continua na página que estava inicialmente
    And o jogo "Spelunky" está na lista de jogos do usuário "Davi" como "Finalizado"


Scenario: Editar uma entrada na lista de jogos
    Given o usuário "João" está na página da sua lista de jogos
    And o usuário "João" tem uma entrada na lista de jogos com o título "Hollow Knight"
    And o usuário "João" escreveu uma review para o jogo "Hollow Knight"
    When o usuário "João" seleciona a opção “Editar” do jogo "amei esse"
    And o usuário "João" altera o título da review para "Hollow Knight é um jogo muito bom"
    And o usuário "João" seleciona a opção "Submeter"
    Then o usuário "João" visualiza uma mensagem de sucesso 
    And o usuário "João" continua na página da sua lista de jogos


Scenario: Editar uma entrada na lista de jogos, mas ultrapassando o limite de caracteres
    Given o usuário "João" está na página da sua lista de jogos
    And o usuário "João" tem uma entrada na lista de jogos com o título "Hollow Knight"
    And o usuário "João" escreveu uma review para o jogo "Hollow Knight"
    When o usuário "João" seleciona a opção “Editar” do jogo "amei esse"
    And o usuário "João" altera o título da review para "Hollow Knight é um jogo muuuu...ito bom" com mais de 120 caracteres
    And o usuário "João" seleciona a opção "Submeter"
    Then o usuário "João" visualiza uma mensagem de erro 


Scenario: Pesquisar um jogo na lista de jogos de um usuário, com sucesso
    Given o usuário "João" está na página da lista de jogos do usuário "Davi"
    And o usuário "Davi" tem uma entrada na lista de jogos com o título "Hollow Knight"
    When o usuário "João" pesquisa pelo jogo "Hollow Knight"
    Then o usuário "João" visualiza o jogo "Hollow Knight" na lista de jogos do usuário "Davi"
    And o usuário "João" não visualiza outros jogos na lista de jogos do usuário "Davi"
    And o usuário "João" continua na página da lista de jogos do usuário "Davi"


Scenario: Pesquisar um jogo na lista de jogos de um usuário, sem sucesso
    Given o usuário "João" está na página da lista de jogos do usuário "Davi"
    And o usuário "Davi" tem uma entrada na lista de jogos com o título "Hollow Knight"
    When o usuário "João" pesquisa pelo jogo "League of Legends"
    Then o usuário "João" não visualiza o jogo "League of Legends" na lista de jogos do usuário "Davi"
    And o usuário "João" visualiza uma mensagem de erro 
    And o usuário "João" continua na página da lista de jogos do usuário "Davi"


Scenario: Remover uma entrada na lista de jogos
    Given o usuário "João" está na página da sua lista de jogos
    And o usuário "João" tem uma entrada na lista de jogos com o título "Hollow Knight"
    When o usuário "João" seleciona a opção "Remover" do jogo "Hollow Knight"
    And o usuário "João" confirma a remoção
    Then o usuário "João" visualiza uma mensagem de sucesso


Scenario: Filtrar a lista de jogos de um usuário por status
    Given o usuário "João" está na página da lista de jogos do usuário "Davi"
    And o usuário "João" seleciona a opção "Filtrar por"
    When o usuário "João" seleciona a opção "Abandonou"
    Then o usuário "João" visualiza apenas os jogos que o usuário "Davi" abandonou


Scenario: Ordenar a lista de jogos de um usuário por critério
    Given o usuário "João" está na página da lista de jogos do usuário "Davi"
    And o usuário "João" seleciona a opção "Ordenar por"
    When o usuário "João" seleciona a opção "Nome"
    Then o usuário "João" visualiza os jogos do usuário "Davi" ordenados por nome