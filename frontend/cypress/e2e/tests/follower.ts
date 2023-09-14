import {Before, Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import { contains } from 'cypress/types/jquery';

describe('Seguidores features', () => {
  let userLoggedName = '';
  let userLoggedUser = '';
  let followersCountUserLogged = 0;
  let followingCountUserLogged = 0;
  Before(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5001/api/users/2/unfollow',
      body: {
        id: '1'
      },
      failOnStatusCode: false
    });
    cy.request({
      method: 'POST',
      url: 'http://localhost:5001/api/users/3/follow',
      body: {
        id: '1'
      },
      failOnStatusCode: false
    });
    cy.request({
      method: 'GET',
      url: 'http://localhost:5001/api/users/2/followers/count'
    }).then((response) => {
      expect(response.status).to.eq(200);
      followersCountUserLogged = response.body.followersCount;
    });
    cy.request({
      method: 'GET',
      url: 'http://localhost:5001/api/users/2/following/count'
    }).then((response) => {
      expect(response.status).to.eq(200);
      followingCountUserLogged = response.body.followersCount;
    });
    cy.visit('/me').then(() => {
      cy.wait(500).then(() => {
        cy.get('h1.username > .username').invoke('text').then((username) => {
          userLoggedName = username;
            });
          });
        });
  });


  Given("{string} está visível na seção de perfil", (button: string) => {
    cy.get('h1.username > .username').invoke('text').then((username) => {
      userName = username;
      cy.get('.Btn > p').should('contain', button);
    });
  });

  let userName : string = '';
  let OldCount : number = 0;
  let newCount : number = 0;
  When("clico em {string} na seção de perfil", (button: string) => {
    cy.get('.follower > .follower-counter').invoke('text').then((texto) => {
      OldCount = Number(texto);
      cy.get('.Btn > p').contains(button).click().then(() => {
        cy.wait(1000).then(() => {
          cy.get('.follower > .follower-counter').invoke('text').then((texto) => {
            newCount = Number(texto);
          });
        });
      });
    });
  });


  Then('o texto muda de {string} para {string}', (button1: string, button2: string) => {
    cy.get('.Btn > p').should('not.contain', button1);
    cy.get('.Btn > p').should('contain', button2);
  });

  Then('o usuário de id {string} está na lista Seguidores do usuário de id {string}', (id1: string, list: string, id2: string) => {
    cy.get('.follower').click().then(() => {
      cy.get('.popup > app-followers > .tab').should('contain', userLoggedName);
    });
  });

  Then('o usuário de id {string} não está na lista Seguidores do usuário de id {string}', (id1: string, list: string, id2: string) => {
    cy.get('.follower').click().then(() => {
      cy.get('.popup > app-followers > .tab').should('not.contain', userLoggedName);
    });
  });

  Then('a contagem de {string} do usuário de id {string} aumenta em {string}', (list: string, id: string, number: string) => {
    expect(newCount).to.equal(OldCount + Number(number));
  });

  Then('o feed {string} contém as postagens do usuário de id {string}', (feed: string, id: string) => {
    cy.visit('/me').wait(1000).get('.tabs').contains(feed).click().then(() => {
      cy.get('.feed-container').should('contain', userName);
    });
  });

  Then('o feed {string} não contém as postagens do usuário de id {string}', (feed: string, id: string) => {
    cy.visit('/me').wait(1000).get('.tabs').contains(feed).click().then(() => {
      cy.get('.feed-container').should('not.contain', userName);
    });
  });


  Then('o usuário de id {string} está na lista Seguindo do usuário de id {string}', (id1: string, list: string, id2: string) => {
    cy.get('.following').click().then(() => {
      cy.get('.popup > app-followers > .tab').should('contain', userName).then(() => {
        cy.get('.following').click();
      });
    });
  });

  Then('o usuário de id {string} não está na lista Seguindo do usuário de id {string}', (id1: string, list: string, id2: string) => {
    cy.get('.following').click().then(() => {
      cy.get('.popup > app-followers > .tab').should('not.contain', userName).then(() => {
        cy.get('.following').click();
      });
    });
  });

  When('clico no texto {string} na seção de perfil', (button : string) => {
    cy.get('.follows').contains(button).click();
  });

  let userToVisit : string = '';
    When('clico no usuário de ordem {string} do topo de {string}', (child: string, option: string) => {
      let app: string = '';
      app = 'app-followers'

      cy.get('.popup > app-followers > .tab > .inside-tab > .mat-mdc-card > :nth-child(1)')
      .invoke('text').then((name) => {
        userToVisit = name;
        cy.get('.popup > ' + app).get('.tab > .inside-tab > .mat-mdc-card > :nth-child(1) > strong').eq(0).click();
      });
    });

  When('{string} está visível na seção de conteúdo', (button : string) => {
    cy.get('.feed-container').should('contain', button);
  });

  When('clico em {string} na seção de conteúdo', (button : string) => {
    cy.get('.feed-container').contains(button).click();
  });

  Then('o popup de {string} é aberto', (popup : string) => {
    cy.get('.popup').should('contain', popup);
  });

  Then('o feed {string} é aberto', (feed : string) => {
    cy.get('.feed-container').get('.active').should('contain', feed)
  });

  Then('o popup de {string} é fechado', (popup : string) => {
    cy.get('.popup').should('not.exist');
  });

  Then('sou encaminhado para a página do usuário' , () => {
    cy.get('.userUser').invoke('text').then((username) => {
      expect(userToVisit).to.include(username);
    });
  });

  Then('o feed {string} contém as postagens de usuários seguidos', (feed: string) => {
    let userUser : string = '';
    cy.get('.userUser').invoke('text').then((useruser) => {
      userUser = useruser;
    }).then(() => {
        cy.get('.feed-container').children().each(($child) => {
        cy.wrap($child).get('.author-info > .author > .username').should('not.contain', userUser);
      });
    });
  });

  Then('o feed {string} contém somente as minhas postagens', (feed: string) => {
    let userUser : string = '';
    cy.get('.userUser').invoke('text').then((useruser) => {
      userUser = useruser;
    }).then(() => {
        cy.get('.feed-container').children().each(($child) => {
        cy.wrap($child).get('.author-info > .author > .username').should('contain', userUser);
      });
    });
  });

});