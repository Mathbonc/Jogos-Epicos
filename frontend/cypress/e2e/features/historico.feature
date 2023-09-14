Feature: Historico de reviews
  As a usuário
  I want ver o histórico de reviews
  So that eu possa ver todos os reviews que eu já fiz.

Scenario: Pesquisa de reviews por categoria
  Given o usuário está na página "users/1/history"
  Given a categoria "Action" está disponível
  When o usuário escolhe a categoria "Action"
  Then apenas os reviews relacionados à categoria "Action" são exibidos do mais novo para o mais antigo.

Scenario: Inverter a ordem dos reviews
  Given o usuário está na página "users/1/history"
  When o usuário clica no botão "Inverter ordem"
  Then os reviews são exibidos do mais antigo para o mais novo
  When o usuário clica no botão "Inverter ordem"
  Then os reviews são exibidos do mais novo para o mais antigo.

Scenario: Remover filtro de categoria
  Given o usuário está na página "users/1/history"
  Given a categoria "Action" está selecionada
  When o usuário clica no botão "All"
  Then os reviews são exibidos do mais novo para o mais antigo.

Scenario: Ir para o histórico
  Given o usuário está na página "users/1"
  When o usuário clica no botão "Histórico"
  Then o usuário é direcionado para a página "/history"
  Then os reviews são exibidos do mais novo para o mais antigo.


