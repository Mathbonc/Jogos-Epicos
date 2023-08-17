Feature: Amigos/Seguidores
As a usuário do aplicativo,
I want to poder seguir e deixar de seguir outros usuários,
So that posso acompanhar as atualizações dos meus seguidores.

Scenario: Seguir Usuários
  Given eu estou logado como "user"
  And  eu visito o perfil de um usuário
  When eu clico em "Seguir"
  Then o botão muda para "Seguindo"
  And eu começo a receber atualizações desse usuário em uma seção específica do site.

Scenario: Deixar de Seguir Usuários
  Given eu estou logado como "user"
  And eu estou seguindo um usuário específico
  And eu visito o perfil desse usuário
  When eu clico em "Seguindo"
  Then o botão muda para "Seguir"
  And eu paro de receber atualizações desse usuário.

Scenario: Comentar em Postagens
  Given eu estou logado como "user"
  And eu sigo um usuário específico
  And eu vejo uma postagem desse usuário
  And eu vejo uma opção para "Adicionar um comentário"
  When eu clico em "Adicionar um comentário"
  And eu digito meu comentário
  And eu clico em "Enviar"
  Then meu comentário aparece sob a postagem do usuário.
