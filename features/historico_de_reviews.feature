feature: Historico de reviews

    Scenario: Remoção de um review no histórico
        Given estou logado em minha conta “Maria Eduarda” de usuário comum
        And estou na página “Histórico de Reviews” da minha conta
        And seleciono o review "Days Gone" presente no histórico
        When clico em “Excluir”
        Then uma janela é exibida na tela 
        And uma mensagem de confirmação é exibida
        When clico em “confirmar”
        Then uma nova mensagem de confirmação é exibida
        And o review "Days Gone" não está presente no histórico

    Scenario: Edição de um review no histórico
        Given estou logado em minha conta "Maria Eduarda" de usuário comum
        And estou na página de “Histórico de Reviews” da minha conta
        And seleciono o review "CS:GO"
        When clico em “Editar”
        Then uma janela é exibida com o review a ser editado
        And posso modificar o conteúdo diretamente nessa janela
        And ao clicar em “Salvar”
        Then uma mensagem de validação aparece na janela como confirmação
        And o review "CS:GO" está modificado

    Scenario: Pesquisa de reviews por categoria
        Given estou na página “Histórico de Reviews” do usuário "Maria Eduarda"
        And as seguintes categorias estão disponíveis: “Ação”, “Zumbi”, “RPG”
        And o review "Days Gone" possui a categoria "Zumbi" e "RPG"
        And o review "The Witcher 3" possui a categoria "RPG"
        And o review "The last of us" possui a categoria "Zumbi"
        When o usuário escolhe a categoria “Zumbi”
        And clica em “Zumbi”
        Then apenas os reviews "The last of us" e "Days Gone" são exibidos

    Scenario: Ordenação de reviews por data
        Given estou na página “Histórico de Reviews” do usuário "Maria Eduarda"
        And os reviews "Days Gone" - 12/02/22, "The Witcher 3" - 04/09/20 e "CS:GO" - 19/04/15 estão no histórico
        When clico no botão “Ordenar por data”
        Then os reviews são reordenados do antigo para o mais novo
        And os reviews são exibidos em ordem cronológica
        And o histórico aparece primeiro o review "CS:GO" seguido de "The Witcher 3" e por fim "Days Gone"

    Scenario: Abrir review através do histórico do usuário
        Given estou na página "Histórico de Reviews" do usuário "Maria Eduarda"
        And eu vejo um review deste usuário sobre "Days Gone"
        When eu clico no review "Days Gone"
        Then eu vejo a página do review sobre o jogo "Days Gone".