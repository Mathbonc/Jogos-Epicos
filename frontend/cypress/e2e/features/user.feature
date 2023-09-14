Feature: User 
	As: Um usuario da plataforma de compartilhamento de reviews
	I want to: Criar, remover e editar minha conta quando quiser
	So that: Possa navegar pela plataforma e interagir com outros usuários

Scenario: Ir para página de edição do usuário
	Given o usuário está na página de perfil
	And "Editar" está visível - user
	When clico em "Editar" e aparece uma notificação com a menssagem "Tem certeza que deseja editar sua conta?"
	When Confirmo a notificação "Tem certeza que deseja editar sua conta?"
	Then o usuário está na página de edição

Scenario: Excluir minha conta com sucesso
	Given o usuário está na página de edição
	And "Excluir" está visível - user
	When clico em "Excluir" e aparece uma notificação com a menssagem "Tem certeza que deseja excluir sua conta?"
	When Confirmo a notificação "Tem certeza que deseja excluir sua conta?"
	Then o usuário foi para a página "/"

Scenario: Editar minha conta com sucesso
	Given o usuário está na página de edição
	When o campo "Nome" é editado para a string "Treloso"
	And clico em "Salvar" - user
	Then o campo "Nome" contém a string "Treloso"

Scenario: Criar uma conta com informações opcionais faltando
	Given o usuário está na página "/signup"
	When Preencho o campo de "username" com "Willie"
	And Preencho o campo de "email" com "Willow@etest.com"
	And Preencho o campo de "password" com "123456a"
	And Preencho o campo de "name" com "Willah"
	And Preencho o campo de "lastname" com "Cat"
	And Preencho o campo de "pronouns" com " "
	And Preencho o campo de "bio" com "Willie Willow Willah tutuutututuututu..."
	And clico em "Cadastrar" - user
	Then o usuário foi para a página do seu perfil