Feature: Criar Posts
As um usuário do site de “review de jogos”
I want to Criar uma nova postagem
So that eu possa mostrar minha opinião sobre jogos

Scenario: Criar um post apenas com a avaliação em nota
Given o usuário “vko” está na página inicial
When o usuário “vko” clica no textfield de criação de posts
And seleciona o jogo “Hollow Knight”
And adiciona a avaliação “5/5”
And Clica em “publicar”
Then recebe a notificação de “Publicação enviada”


Scenario: Criar um post com legenda e avaliação em nota
Given o usuário “vko” está na página inicial
When o usuário “vko” clica no textfield de criação de posts
And seleciona o jogo “Hollow Knight”
And adiciona a avaliação “5/5”
And o usuário “vko” escreve a legenda “melhor jogo já criado, muito bom!!”
And Clica em “publicar”
Then recebe a notificação de “Publicação enviada”

Scenario: Cancelar postagem
Given O usuário “vko” está na página inicial
When O usuário “vko” clica no textfield de criação de posts
And Seleciona o jogo “Hollow Knight”
And Adiciona a avaliação “5/5”
And O usuário “vko” escreve a legenda “melhor jogo já criado, muito bom!!”
And Clica no botão “x”
Then A textfield é desselecionada.

adjusted.

