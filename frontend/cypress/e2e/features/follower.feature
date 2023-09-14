Feature: Seguidores
  As a usuário,
  I want to seguir e deixar de seguir outros usuários,
  So that posso acompanhar as atualizações dos meus seguidores.

Scenario: Seguir uma pessoa
  Given o usuário está na página "users/2"
  And "Seguir" está visível na seção de perfil
  When clico em "Seguir" na seção de perfil
  Then o texto muda de "Seguir" para "Seguindo"
  And o usuário de id "1" está na lista Seguidores do usuário de id "2"
  And o feed "Seguindo" contém as postagens do usuário de id "2"
  And o usuário de id "2" está na lista Seguindo do usuário de id "1"

Scenario: Deixar de seguir uma pessoa
  Given o usuário está na página "users/3"
  And "Seguindo" está visível na seção de perfil
  When clico em "Seguindo" na seção de perfil
  Then o texto muda de "Seguindo" para "Seguir"
  And o usuário de id "1" não está na lista Seguidores do usuário de id "3"
  And o feed "Seguindo" não contém as postagens do usuário de id "3"
  And o usuário de id "3" não está na lista Seguindo do usuário de id "1"

Scenario: Visualizar atualizações de seguindo
  Given o usuário está na página "me"
  And "Meu Feed" está visível na seção de conteúdo
  When clico em "Seguindo" na seção de conteúdo
  Then o feed "Seguindo" é aberto
  And o feed "Seguindo" contém as postagens de usuários seguidos

Scenario: Visualizar minhas atualizações
  Given o usuário está na página "me"
  And "Meu Feed" está visível na seção de conteúdo
  When clico em "Meu Feed" na seção de conteúdo
  Then o feed "Meu Feed" é aberto
  And o feed "Meu Feed" contém somente as minhas postagens

Scenario: Visitar perfil de seguidor pela lista de seguidores
  Given o usuário está na página "users/2"
  When clico no texto "Seguidores" na seção de perfil
  And o popup de "Seguidores" é aberto
  And clico no usuário de ordem "1" do topo de "Seguidores"
  Then sou encaminhado para a página do usuário

Scenario: Visitar perfil de seguindo pela lista de seguindo
  Given o usuário está na página "users/2"
  When clico no texto "Seguindo" na seção de perfil
  And o popup de "Seguindo" é aberto
  And clico no usuário de ordem "1" do topo de "Seguindo"
  Then sou encaminhado para a página do usuário

Scenario: Abrir e fechar popup de Seguidores
  Given o usuário está na página "users/2"
  When clico no texto "Seguidores" na seção de perfil
  Then o popup de "Seguidores" é aberto
  When clico no texto "Seguidores" na seção de perfil
  Then o popup de "Seguidores" é fechado

Scenario: Abrir e fechar popup de Seguindo
  Given o usuário está na página "users/2"
  When clico no texto "Seguindo" na seção de perfil
  Then o popup de "Seguindo" é aberto
  When clico no texto "Seguindo" na seção de perfil
  Then o popup de "Seguindo" é fechado