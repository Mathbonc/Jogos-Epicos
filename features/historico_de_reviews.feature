feature: Historico de reviews

    Scenario: Remoção de um review no histórico
        Given estou logado em minha conta “Maria Eduarda” de usuário comum
        And estou na página “Histórico de Reviews” da minha conta
        When clico no botão “Excluir” associado a um review selecionado
        Then uma janela é exibida na tela 
        And uma mensagem de confirmação é exibida
        When clico no botão “confirmar”
        Then uma nova mensagem de confirmação é exibida

    Scenario: Edição de um review no histórico
        Given estou logado em minha conta "Maria Eduarda" de usuário comum
        And estou na página de “Histórico de Reviews” da minha conta
        When clico no botão “Editar” associado a um review selecionado
        Then uma janela é exibida com o review a ser editado
        And posso modificar o conteúdo diretamente nessa janela
        And ao clicar no botão “Salvar” na janela
        Then uma mensagem de validação aparece na janela como confirmação

    Scenario: Pesquisa de reviews por categoria
        Given estou na página “Histórico de Reviews”
        And as seguintes categorias estão disponíveis: “Ação”, “Zumbi”, “RPG”
        When o usuário escolhe a categoria “Zumbi”
        And clica no botão “Pesquisar”
        Then apenas os reviews relacionados à categoria “Zumbi” são exibidos.

    Scenario: Ordenação de reviews por data
        Given estou na página “Histórico de Reviews”
        When clico no botão “Ordenar por data”
        Then os reviews são reordenados do antigo para o mais novo
        And os reviews são exibidos em ordem cronológica
        