Feature: comentar em Posts
As um usuário do site de “jogos épicos”
I want to ler e fazer comentários em posts
So that eu posso ver e participar de uma discussão mais aprofundada do review em questão

Scenario: Visualizar Comentários
Given  eu estou logado como "iasm"
And eu vejo uma postagem de “user” que tem um comentário de "joão" feito na segunda
    e um comentário de "miguel" feito na terça
And eu vejo uma opção para ver comentários
When eu clico em "Ver comentários"
Then eu vejo os comentários do post cronologicamente.

Scenario: Erro ao Visualizar Comentários
Given  eu estou logado como "iasm"
And eu vejo uma postagem de “user” ainda sem comentários                         
And eu vejo uma opção para "Ver comentários"
When eu clico em "Ver comentários"
Then eu vejo um aviso de que o post n possui comentários.


Scenario: Comentar em Posts
Given eu estou logado como "iasm"
And eu clico na postagem de “user”                               
And eu vejo uma opção para adicionar um comentário
When eu digito meu comentário
And eu envio
Then eu recebo uma confirmação
And meu comentário aparece no topo do campo de comentários da postagem

Scenario: tentar comentar sem texto
Given eu estou logado como "iasm"
And eu clico na postagem de “user” 
When eu clico para comentar
And não há texto escrito
Then eu recebo uma mensagem de erro
And meu comentário não é publicado

Scenario: Editar um comentário
Given eu estou logado como "iasm"
And eu clico na postagem de “user”, com um comentário de "iasm"                              
And eu vejo uma opção para editar meu comentário
When eu digito meu novo comentário
And eu confirmo a edição
Then eu recebo uma confirmação
And meu comentário aparece editado no topo do campo de comentários da postagem
