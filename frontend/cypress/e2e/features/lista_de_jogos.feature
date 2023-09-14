Feature: Lista de jogos já finalizados, abandonados e desejados.
As a usuário.
I want to adicionar os jogos que já joguei, quero jogar ou abandonei em uma lista.
So that I possa compartilhar minhas opiniões sobre um jogo e acompanhar as opiniões de quem eu me interesso.

Scenario: Adicionar jogo na lista de jogos.
    Given o usuário está na página da sua lista de jogos
    Given o jogo "Hollow Knight" está no banco de dados
    Given o jogo "Hollow Knight" está na sua lista de jogos, com o status "Finalizado" e a data "15/08/2021"    
    When o usuário seleciona o botão "Adicionar Jogo"
    When o usuário busca o jogo "Hollow Knight" no campo de busca "Adicionar Jogo"
    When o usuário seleciona o botão "Abandonado"
    When o usuário seleciona o botão "Adicionar Jogo"
    Then o jogo "Hollow Knight" está na sua lista de jogos, com o status "Finalizado" e a data "15/08/2021"

Scenario: Remover jogo da lista de jogos.
    Given o usuário está na página da sua lista de jogos
    Given o jogo "Hollow Knight" está na sua lista de jogos, com o status "Finalizado" e a data "15/08/2021"
    When o usuário seleciona o botão "Excluir", no jogo "Hollow Knight"
    When o usuário seleciona o botão "Confirmar", no jogo "Hollow Knight"
    Then o jogo "Hollow Knight" não está na sua lista de jogos

Scenario: Tentar remover jogo da lista de jogos, mas cancelar.
    Given o usuário está na página da sua lista de jogos
    Given o jogo "Hollow Knight" está na sua lista de jogos, com o status "Finalizado" e a data "15/08/2021"
    When o usuário seleciona o botão "Excluir", no jogo "Hollow Knight"
    When o usuário seleciona o botão "Cancelar", no jogo "Hollow Knight"
    Then o jogo "Hollow Knight" está na sua lista de jogos, com o status "Finalizado" e a data "15/08/2021"

Scenario: Editar jogo da lista de jogos.
    Given o usuário está na página da sua lista de jogos
    Given o jogo "Hollow Knight" está na sua lista de jogos, com o status "Finalizado" e a data "15/08/2021"
    When o usuário seleciona o botão "Editar", no jogo "Hollow Knight"
    When o usuário seleciona o botão "Abandonado", no jogo "Hollow Knight"
    When o usuário seleciona o botão "Salvar", no jogo "Hollow Knight"
    Then o jogo "Hollow Knight" está na sua lista de jogos, com o status "Abandonado" e a data "today"

Scenario: Editar jogo da lista de jogos e deixa-lo igual a antes.
    Given o usuário está na página da sua lista de jogos
    Given o jogo "Hollow Knight" está na sua lista de jogos, com o status "Finalizado" e a data "15/08/2021"
    When o usuário seleciona o botão "Editar", no jogo "Hollow Knight"
    When o usuário seleciona o botão "Finalizado", no jogo "Hollow Knight"
    When o usuário seleciona o botão "Salvar", no jogo "Hollow Knight"
    Then o jogo "Hollow Knight" está na sua lista de jogos, com o status "Finalizado" e a data "15/08/2021"

Scenario: Tentar editar jogo da lista de jogos, mas cancelar.
    Given o usuário está na página da sua lista de jogos
    Given o jogo "Hollow Knight" está na sua lista de jogos, com o status "Finalizado" e a data "15/08/2021"
    When o usuário seleciona o botão "Editar", no jogo "Hollow Knight"
    When o usuário seleciona o botão "Abandonado", no jogo "Hollow Knight"
    When o usuário seleciona o botão "Cancelar", no jogo "Hollow Knight"
    Then o jogo "Hollow Knight" está na sua lista de jogos, com o status "Finalizado" e a data "15/08/2021"


