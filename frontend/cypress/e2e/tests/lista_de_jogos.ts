import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { is } from "cypress/types/bluebird";
import { data } from "cypress/types/jquery";

let curID : string = undefined;
let backURL : string = "http://localhost:5001/api";
function generateRandomString(size : number){
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < size; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
beforeEach(() => {
    cy.request('GET', backURL + '/me').then((response) => {
        expect(response.status).to.equal(200);
        curID = response.body.id;
    });

    // Remove Hollow Knight e Spelunky, se existirem
    let list = undefined;
    cy.request('GET', backURL + '/users/' + curID + '/list').then((response1) => {
        for (let i = 0; i < response1.body.entries.length; i++){
            if (response1.body.entries[i].gameId === "2" || response1.body.entries[i].gameId === "3"){
                cy.request({
                    method: 'DELETE',
                    url: backURL + '/users/' + curID + '/list/' + response1.body.entries[i].entryId,
                    failOnStatusCode: false
                }).then((response2) => {
                    let body = {
                        gameId : response1.body.entries[i].gameId,
                        entryType: "played",
                        reqDate: new Date("15/08/2021")

                    }
                    cy.request({
                        method: 'PUT',
                        url: backURL + '/users/' + curID + '/list/',
                        body: body
                    }).then((response3) => {
                        expect(response3.status).to.equal(201);
                    });
                });
            }
        }
    });
});
describe('Lista de Jogos features', () => {
    
    function convertEntry(entry : string){
        switch(entry){
            case "played":
                return "Finalizado";
            case "abandoned":
                return "Abandonado";
            case "wished":
                return "Deseja Jogar";
            case "Finalizado":
                return "played";
            case "Abandonado":
                return "abandoned";
            case "Deseja Jogar":
                return "wished";
            default:
                return "undefined";
        }

    }
    
    Given('o usuário está na página da sua lista de jogos', () => {
        cy.visit('/users/' + curID  + '/list');
    });

    Given('o jogo {string} está no banco de dados', (jogo: string) => {
        cy.request({
            method: 'POST',
            url: backURL + '/games',
            body: {gameName: jogo, passW: "teste123"},
            failOnStatusCode: false
        }).then((response) => {
            expect([201, 409]).to.include(response.status);
        });
    });

    Given('o jogo {string} não está na sua lista de jogos', (jogo: string) => {
        cy.get('mat-grid-list').should('not.contain', jogo)
        
    });

    Given("o jogo {string} está na sua lista de jogos, com o status {string} e a data {string}", (jogo: string, status: string, data: string) => {
        if(data.localeCompare('today') === 0){
            data = new Date().toLocaleDateString();
        }
        cy.request({
            method: 'POST',
            url: backURL + '/users/' + curID + '/list',
            body: {gameId: 2, entryType: convertEntry(status), reqDate: new Date(data)},
            failOnStatusCode: false
        }).then((response) => {
            expect([201, 409]).to.include(response.status);
            cy.get('mat-card-title').should('contain', jogo);
        });
    });

    Then('a sua lista de jogos está ordenada por {string}', (order: string) => {
        if (order === "Nome") {
            cy.get('.entry-card').then($cards => {
                for (let i = 0; i < $cards.length - 1; i++) {
                    const gameTitle = Cypress.$($cards[i]).find('.mat-card-title').text().trim();
                    const nextGameTitle = Cypress.$($cards[i + 1]).find('.mat-card-title').text().trim();
                    expect(gameTitle.localeCompare(nextGameTitle)).to.be.lessThan(0);
                }
            });
        } else if (order === "Data de Inclusão") {
            cy.get('.entry-card').then($cards => {
                for (let i = 0; i < $cards.length - 1; i++) {
                    const gameDate = new Date(Cypress.$($cards[i]).find('.mat-card-subtitle').text().trim());
                    const nextGameDate = new Date(Cypress.$($cards[i + 1]).find('.mat-card-subtitle').text().trim());
                    expect(gameDate).to.be.gte(nextGameDate);
                }
            });
        }
    });
    
    Then('apenas o jogo {string} aparece na sua lista de jogos, com o status {string} e a data {string}', (jogo: string, status: string, data: string) => {
        let date = new Date();
        if (data.localeCompare('today') !== 0){
            date = new Date(data);
        }

    
        cy.get('.entry-card').should('have.length', 1);
        cy.get('.entry-card').within(($card) => {
            cy.get('.mat-card-title').should('contain', jogo);
            cy.get('.mat-card-subtitle').should('contain', date.toLocaleDateString());
            cy.get('.entry-type').should('contain', status);
        });
    });
    
    
    When('o usuário busca o jogo {string} no campo de busca {string}', (jogo: string, campo: string) => {
        cy.get(`input[placeholder="${campo}"]`).type(jogo);
    });
    
    When('o usuário seleciona o botão {string}', (button: string) => {
        cy.contains('button', button).click();
    });
    
    When('o usuário seleciona o botão {string}, no jogo {string}', (button: string, jogo: string) => {
        cy.contains('div', jogo).parent().parent().find('button').contains(button).click();
    });
    
    When('o usuário clica no checkbox {string}', (checkbox: string) => {
        cy.contains('mat-checkbox', checkbox).click();
    });
    
});
