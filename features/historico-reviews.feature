Feature: Histórico de reviews

    Scenario: Ordenação de reviews por data
        Given estou na página “Histórico de Reviews”
        When clico no botão “Ordenar por data”
        Then os reviews são reordenados do antigo para o mais novo
        And os reviews são exibidos em ordem cronológica

    Scenario: Pesquisa de reviews por categoria
        Given estou na página “Histórico de Reviews”
        And as seguintes categorias estão disponíveis: “Ação”, “Zumbi”, “RPG”
        When o usuário escolhe a categoria “Zumbi”
        And clica no botão “Pesquisar”
        Then apenas os reviews relacionados à categoria “Zumbi” são exibidos.

    Scenario: Pesquisa de reviews por categoria
        Given estou na página “Histórico de Reviews”
        And as seguintes categorias estão disponíveis: “Ação”, “Zumbi”, “RPG”
        When o usuário escolhe a categoria “Zumbi”
        And clica no botão “Pesquisar”
        Then apenas os reviews relacionados à categoria “Zumbi” são exibidos.

    Scenario: Pesquisa de reviews por categoria
        Given estou na página “Histórico de Reviews”
        And as seguintes categorias estão disponíveis: “Ação”, “Zumbi”, “RPG”
        When o usuário escolhe a categoria “Zumbi”
        And clica no botão “Pesquisar”
        Then apenas os reviews relacionados à categoria “Zumbi” são exibidos.