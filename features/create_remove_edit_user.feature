Feature: Criar / Remover / Editar usuario comum 
	As: Um usuario da plataforma de compartilhamento de reviews
	I want to: Criar, remover e editar minha conta quando quiser
	So that: Possa navegar pela plataforma e interagir com outros usuários

Scenario: Criar uma nova conta com sucesso
    Given Estou na tela de cadastro
    And Vejo espaços para preenchimento
    When Preencho o campo de "Usuario"
    And Preencho o campo de "Email"
    And Preencho o campo de "Senha" com pelo menos 6 numeros e uma letra
    And Clico no botão de continuar
    Then Continuo na tela de cadastro
    And Vejo mais espaços para preenchimento
    When Preencho o campo de "Nome"
    And Preencho o campo de "Sobrenome"
    And Preencho o campo de "Pronomes"
    And Preencho o campo de "Bio"
    And Confirmo a criacao da conta
    Then Recebo uma confirmacao que minha conta foi criada
    And Vou para página "Inicio" do aplicativo, com minha conta conectado

Scenario: Criar uma conta com informações opcionais faltando
    Given Estou na tela de cadastro
    And Vejo varios espaços para preenchimento
    When Preencho o campo de "Usuario"
    And Preencho o campo de "Email"
    And Preencho o campo de "Senha" com pelo menos 6 numeros e uma letra
    And Clico no botão de continuar
    Then Continuo na tela de cadastro
    And Vejo mais espaços para preenchimento
    When Preencho o campo de "Nome"
    And Preencho o campo de "Sobrenome"
    And Deixo o campo de "Pronomes" em branco
    And Preencho o campo de "Bio"
    And Confirmo a criacao da conta
    Then Recebo uma confirmacao que minha conta foi criada
    And Vou para página "Inicio" do aplicativo, com minha conta conectado

Scenario: Criar uma conta com informações obrigatórias faltando
	Given Estou na tela de cadastro
	And Vejo varios espaços para preenchimento
	When Preencho o campo de "Usuario"
	And Preencho o campo de "Email"
	And Preencho o campo de "Senha" com pelo menos 6 numeros e uma letra
	And Clico no botão de continuar
	Then Continuo na tela de cadastro
	And Vejo mais espaços para preenchimento
	When Deixo o campo de "Nome" em branco
	And Preencho o campo de "Sobrenome"
	And Preencho o campo de "Pronomes"
	And Preencho o campo de "Bio"
	And Confirmo a criacao da conta
	Then Recebo uma notificacao que ha campos obrigatorios a serem preenchidos
	And Continuo na tela de cadastro
 
Scenario: Criar uma conta com alguma informação ja cadadastrada
	Given Estou na tela de cadastro
	And Vejo varios espaços para preenchimento
	When Preencho o campo de "Usuario"
	And Preencho o campo de "Email" com algum email já utilizado
	And Preencho o campo de "Senha" com pelo menos 6 numeros e uma letra
	And Clico no botão de continuar
	Then Continuo na tela de cadastro
	And Vejo mais espaços para preenchimento
	When Preencho o campo de "Nome"
	And Preencho o campo de "Sobrenome"
	And Preencho o campo de "Pronomes"
	And Preencho o campo de "Bio"
	And Confirmo a criacao da conta
	Then Recebo uma notificacao que ha campos com informacoes já cadastradas
	And Continuo na tela de cadastro 

Scenario: Criar uma conta com senha invalida
	Given Estou na tela de cadastro
	And Vejo varios espaços para preenchimento
	When Preencho o campo de "Usuario"
	And Preencho o campo de "Email"
	And Preencho o campo de "Senha" apenas com numeros
	And Clico no botão de continuar
	Then Continuo na tela de cadastro
	And Vejo mais espaços para preenchimento
	When Preencho o campo de "Nome"
	And Preencho o campo de "Sobrenome"
	And Preencho o campo de "Pronomes"
	And Preencho o campo de "Bio"
	And Confirmo a criacao da conta
	Then Recebo uma notificacao que a senha nao e valida
	And Continuo na tela de cadastro

Scenario: Excluir minha conta com sucesso
	Given Estou na tela principal do aplicativo
	And Abro meu perfil
	When Seleciono a opção de exclusão de conta
	Then Aparece uma notificacao de confirmacao
	When Confirmo a exclusao da conta
	Then Vou para a pagina de "Inicio", sem estar conectado à conta
	And Percebo uma mensagem de confirmação de exclusão
Scenario: Recusar exclusão da conta
	Given Estou na tela principal do aplicativo
	And Abro meu perfil
	When Seleciono a opção de exclusão de conta
	Then Aparece uma notificacao de confirmacao
	When Recuso a exclusao da conta
	Then Retorno para meu perfil

Scenario: Editar minha conta com sucesso
	Given Estou na tela principal do aplicativo
	And Abro meu perfil
	When Clico na opcao de edicao de conta
	Then Aparece uma notificacao para confirmar a edicao da conta
	When Confirmo a edicao
	Then As informações presentes no meu perfil agora podem ser editadas
	And Eu edito meu "Usuario"
	When Salvo as informacoes
	Then Minha conta agora mostra as informacoes editadas
	And Retorno para tela de perfil

Scenario: Não confirmar edição de conta
	Given Estou na tela principal do aplicativo
	And Abro meu perfil
	When Clico na opcao de edicao de conta
	Then Aparece uma notificacao para confirmar a edicao da conta
	When Não confirmo a edicao
	Then Retorno para tela de perfil