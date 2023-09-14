import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository';
import {loadFeature, defineFeature} from 'jest-cucumber'
import * as utils from '../../src/services/list.service';
import * as routes from '../../src/routes/index';
import { User } from '../../src/models/user.model';
import { ListEntry, EntryType, GameList } from '../../src/models/list.model';
import { Game } from '../../src/models/game.model';
import { error } from 'console';

const feature = loadFeature('tests/features/lista_de_jogos_service.feature')
const request = supertest(app)
function makeAuthenticatedUser(userId: string){
    utils.setAuthenticatedUserID(parseInt(userId));
}

function makeUser(userId: string){
    let user = {
        id: parseInt(userId),
        user: "username",
        email: "...",
        password: "...",
        name: "...",
        lastName: "...",
        pronouns: "...",
        bio: "...",
        followers: [],
        following: [],
        blocked : []
    }
    user.id = parseInt(userId);
    const users = routes.getUsers();
    if (users.find(u => u.id == parseInt(userId)) == undefined) routes.setUsers([...users, user]);

}

function makeList(userId: string, listId: string){
    let list = {
        userId: parseInt(userId),
        entries: []
    }
    const lists = routes.getLists();
    if (lists.find(l => l.userId == parseInt(listId)) == undefined) routes.setList([...lists, list]);
}

function makeEntryInList(listId: string, entryId: string, gameId: string, entryType: string, reqDate: Date){
    let entry = {
        entryId: parseInt(entryId),
        gameId: parseInt(gameId),
        entryType: entryType as EntryType,
        date: reqDate
    }
    const lists = routes.getLists();
    let list = findListOfUser(listId)
    if (list != undefined) {
        if (list.entries.find(e => e.entryId == parseInt(entryId)) == undefined) list.entries.push(entry);
        routes.setList([...lists.filter(l => l.userId != parseInt(listId)), list]);
    }
}
function findListOfUser(userId: string){
    const lists = routes.getLists();
    let list = lists.find(l => l.userId == parseInt(userId));
    return list;
}
function makeGame(gameId: string){
    let game = {
        gameId: parseInt(gameId),
        gameName: "game",
    }
    const games = routes.getGames();
    if (games.find(g => g.gameId == parseInt(gameId)) == undefined) routes.setGames([...games, game]);
}
defineFeature(feature, (test) => {
    let response: supertest.Response;
    const previousUsers = routes.getUsers();
    const previousGames = routes.getGames();
    const previousLists = routes.getLists();

    beforeEach(() => {
        routes.setGames([]);
        routes.setUsers([]);
        routes.setList([]);
    });
    afterAll(() => {
        routes.setGames(previousGames);
        routes.setUsers(previousUsers);
        routes.setList(previousLists);
    });
    
    test('The user gets an existing user list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, 
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/, 
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, 
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/, 
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/, 
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the list with id "(.*)" has two entries with ids "(.*)" and "(.*)", with the games of ids "(.*)" and "(.*)" and entryType "(.*)" on both$/, 
        async (listId, entryId1, entryId2, game1Id, game2Id, entryType) => {
            makeEntryInList(listId, entryId1, game1Id, entryType, new Date("2021-05-06"));
            makeEntryInList(listId, entryId2, game2Id, entryType, new Date("2021-05-06"));
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, 
        async (endpoint) => {
            response = await request.get(endpoint);
        });
    
        then(/^the response should return the list with id "(.*)" object$/, 
        async (listId) => {
            const lists = routes.getLists();
            let list = findListOfUser(listId)
            // Convert body date string to Date to compare
            let bodyList = response.body as GameList;
            bodyList.entries.forEach(e => { e.date = new Date(e.date) });
            expect(bodyList).toEqual(list);
        });
    
        and(/^return status code "(.*)"$/, 
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user tries to get a non-existing user list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, 
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server does not have a user registered with id "(.*)"$/, 
        async (userId) => {
            const users = routes.getUsers();
            if (users.find(u => u.id == parseInt(userId)) != undefined) routes.setUsers(users.filter(u => u.id != parseInt(userId)));
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, 
        async (endpoint) => {
            response = await request.get(endpoint);
        });
    
        then('the response should return an error message', 
        async () => {
            expect(response.body.message).not.toBeUndefined();
        });
    
        and(/^return status code "(.*)"$/, 
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user adds a game to its own list.',  ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, 
        async (userId) => {
            makeAuthenticatedUser(userId);
        });

        and(/^the server has a user registered with id "(.*)"$/, 
        async (userId) => {
            makeUser(userId);
        });

        and(/^the server has a game registered with id "(.*)"$/, 
        async (gameId) => {
            makeGame(gameId);
        });

        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, 
        async (userId, listId) => {
            makeList(userId, listId);
        });

        and(/^the list with id "(.*)" has a single entry with id "(.*)" that corresponds to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, 
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });

        when(/^the user sends a POST to the endpoint "(.*)" with the body elements gameId = "(.*)", entryType = "(.*)" and reqDate = "(.*)"$/, 
        async (endpoint, gameId, entryType, reqDate) => {
            response = await request.post(endpoint).send({
                gameId: parseInt(gameId),
                entryType: entryType,
                reqDate: reqDate
            });
        });

        then(/^the response should return the list object with the new entry with id "(.*)"$/, 
        async (entryId) => {
            const lists = routes.getLists();
            let list = lists.find(l => l.userId == utils.getAuthenticatedUserID());
            let bodyList = response.body as GameList;
            bodyList.entries.forEach(e => { e.date = new Date(e.date) });
            expect(bodyList).toEqual(list);
        });

        and(/^return status code "(.*)"$/, 
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user tries to add a game to another users list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, 
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/,  
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/,  
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the list with id "(.*)" has no entries$/,  
        async (listId) => {
            const lists = routes.getLists();
            let list = findListOfUser(listId)
            if (list != undefined) {
                list.entries = [];
                routes.setList([...lists.filter(l => l.userId != parseInt(listId)), list]);
            }
        });
    
        and(/^the server has a game registered with id "(.*)"$/,  
        async (gameId) => {
            makeGame(gameId);
        });
    
        when(/^the user sends a POST to the endpoint "(.*)" with the body elements gameId = "(.*)", entryType = "(.*)" and reqDate = "(.*)"$/,  
        async (endpoint, gameId, entryType, reqDate) => {
            response = await request.post(endpoint).send({
                gameId: parseInt(gameId),
                entryType: entryType,
                reqDate: reqDate
            });
        });
    
        then('the response should return an error message',  
        async () => {
            expect(response.body.message).not.toBeUndefined();
        });
    
        and(/^return status code "(.*)"$/,  
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user tries to add a repeated game to its own list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,  
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/,  
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/, 
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, 
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" that corresponds to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, 
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        when(/^the user sends a POST to the endpoint "(.*)" with the body elements gameId = "(.*)", entryType = "(.*)" and reqDate = "(.*)"$/,  
        async (endpoint, gameId, entryType, reqDate) => {
            response = await request.post(endpoint).send({
                gameId: parseInt(gameId),
                entryType: entryType,
                reqDate: reqDate
            });
        });
    
        then('the response should return an error message',  
        async () => {
            expect(response.body.message).not.toBeUndefined();
        });
    
        and(/^return status code "(.*)"$/, 
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user gets all "Played" games from a list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,  
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/, 
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/, 
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/, 
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, 
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" that corresponds to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,  
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" that corresponds to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,  
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, 
        async (endpoint) => {
            response = await request.get(endpoint);
        });
    
        then(/^the response should return the filtered list object with id "(.*)" and only entries of the type "(.*)"$/, 
        async (listId, entryType) => {
            const lists = routes.getLists();
            let list = lists.find(l => l.userId == listId);
            if (list) list.entries = list.entries.filter(e => e.entryType == entryType);
            let bodyList = response.body as GameList;
            bodyList.entries.forEach(e => { e.date = new Date(e.date) });
            expect(bodyList).toEqual(list);
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });

    test('The user gets all "Abandoned" games from an empty list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/,
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/,
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the list with id "(.*)" has no entries$/,
        async (listId) => {
            const lists = routes.getLists();
            let list = findListOfUser(listId)
            if (list != undefined) {
                list.entries = [];
                routes.setList([...lists.filter(l => l.userId != parseInt(listId)), list]);
            }
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/,
        async (endpoint) => {
            response = await request.get(endpoint);
        });
    
        then('the response should return an empty list object',
        async () => {
            expect(response.body.entries.length).toBe(0);
        });
    
        and(/^return status code "(.*)"$/,
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user edits an "Abandoned" game from its own list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/,
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/,
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        when(/^the user sends a PUT to the endpoint "(.*)" with the body elements entryType = "(.*)" and reqDate = "(.*)"$/,
        async (endpoint, entryType, reqDate) => {
            response = await request.put(endpoint).send({
                entryType: entryType,
                reqDate: reqDate
            });
        });
    
        then(/^the response should return the entry with id "(.*)" and entryType "(.*)" and reqDate "(.*)" from the list object of id "(.*)"$/, 
        async (entryId, entryType, reqDate, listId) => {
            const lists = routes.getLists();
            let list = lists.find(l => l.userId == listId);
            let entry = list?.entries.find(e => e.entryId == parseInt(entryId));
            let bodyList = response.body as ListEntry;
            bodyList.date = new Date(bodyList.date);
            expect(bodyList).toEqual(entry);
        });
    
        and(/^return status code "(.*)"$/,
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user tries to edit a "Wishlisted" game from another users list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/,
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/,
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        when(/^the user sends a PUT to the endpoint "(.*)" with the body elements entryType = "(.*)" and reqDate = "(.*)"$/,
        async (endpoint, entryType, reqDate) => {
            response = await request.put(endpoint).send({
                entryType: entryType,
                reqDate: reqDate
            });
        });
    
        then('the response should return an error message',
        async () => {
            expect(response.body.message).not.toBeUndefined();
        });
    
        and(/^return status code "(.*)"$/,
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user deletes a game from its own list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,
        async (userId) => {
            makeAuthenticatedUser(userId);
        });

        and(/^the server has a user registered with id "(.*)"$/,
        async (userId) => {
            makeUser(userId);
        });

        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/,
        async (userId, listId) => {
            makeList(userId, listId);
        });

        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });

        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });

        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });

        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });

        when(/^the user sends a DELETE to the endpoint "(.*)"$/,
        async (endpoint) => {
            response = await request.delete(endpoint);
        });

        then('the response should return a success message', () => {
            expect(response.body.message).not.toBeUndefined();
        });

        and(/^return status code "(.*)"$/, (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user tries to delete a game from another users list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/,
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/,
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        when(/^the user sends a DELETE to the endpoint "(.*)"$/,
        async (endpoint) => {
            response = await request.delete(endpoint);
        });
    
        then('the response should return an error message',
        async () => {
            expect(response.body.message).not.toBeUndefined();
        });
    
        and(/^return status code "(.*)"$/,
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user searches for a game in another users list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/,
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/,
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/,
        async (endpoint) => {
            response = await request.get(endpoint);
        });
    
        then(/^the response should return the list object of id "(.*)" with the entry with the gameId of the game with gameName "(.*)"$/,
        async (listId, gameName) => {
            const lists = routes.getLists();
            let list = lists.find(l => l.userId == listId);
            if (list) list.entries = list.entries.filter(e => e.gameId == routes.getGames().find(g => g.gameName == gameName)?.gameId);
            let bodyList = response.body as GameList;
            bodyList.entries.forEach(e => { e.date = new Date(e.date) });
            expect(bodyList).toEqual(list);
        });
        and(/^return status code "(.*)"$/,
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user searches for a game in an empty list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/,
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/,
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the list with id "(.*)" has no entries$/,
        async (listId) => {
            const lists = routes.getLists();
            let list = findListOfUser(listId)
            if (list != undefined) {
                list.entries = [];
                routes.setList([...lists.filter(l => l.userId != parseInt(listId)), list]);
            }
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/,
        async (endpoint) => {
            response = await request.get(endpoint);
        });
    
        then('the response should return an empty list object',
        async () => {
            expect(response.body.entries.length).toBe(0);
        });
    
        and(/^return status code "(.*)"$/,
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user sorts its own list by "Name", in ascending order.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/,
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/,
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/,
        async (endpoint) => {
            response = await request.get(endpoint);
        });
    
        then(/^the response should return the list object of id "(.*)" with the entries sorted by the game name in ascending order$/,
        async (listId) => {
            const lists = routes.getLists();
            let list = lists.find(l => l.userId == listId);
            const order = 'asc';
            const games = routes.getGames();
            if (list){
                list.entries = list.entries.sort((a, b) => {
                    const ag = utils.getGame(a.gameId, games);
                    const bg = utils.getGame(b.gameId, games);
                    if (!ag || !bg) {
                    return 0;
                    }
                    return (order.localeCompare('asc') == 0) ? (ag.gameName.localeCompare(bg.gameName)) : (bg.gameName.localeCompare(ag.gameName));
                  });
            }
            let bodyList = response.body as GameList;
            bodyList.entries.forEach(e => { e.date = new Date(e.date) });
            expect(bodyList).toEqual(list);
        });
    
        and(/^return status code "(.*)"$/,
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user sorts another users list by "Date", in descending order.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/,
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/,
        async (userId, listId) => {
            makeList(userId, listId);
        });

        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });

        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/,
        async (endpoint) => {
            response = await request.get(endpoint);
        });
    
        then(/^the response should return the list object of id "(.*)" with the entries sorted by the game date in descending order$/,
        async (listId) => {
            const lists = routes.getLists();
            let list = lists.find(l => l.userId == listId);
            const order = 'desc';
            const games = routes.getGames();
            if (list){
                list.entries = list.entries.sort((a, b) => {
                    return (order.localeCompare('asc') == 0) ? (a.date.getTime() - b.date.getTime()) : (b.date.getTime() - a.date.getTime());
                  });
            }
            let bodyList = response.body as GameList;
            bodyList.entries.forEach(e => { e.date = new Date(e.date) });
            expect(bodyList).toEqual(list);
        });
    
        and(/^return status code "(.*)"$/,
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user tries to sort another users list by "Color", in ascending order.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/,
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/,
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/,
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/,
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/,
        async (listId, entryId, gameId, entryType, reqDate) => {
            makeEntryInList(listId, entryId, gameId, entryType, new Date(reqDate));
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/,
        async (endpoint) => {
            response = await request.get(endpoint);
        });
    
        then('the response should return an error message',
        async () => {
            expect(response.body.message).not.toBeUndefined();
        });
    
        and(/^return status code "(.*)"$/,
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    
});

// Unitary Tests for 
/*
getAuthenticatedUserID, setAuthenticatedUserID, 
getUser, getUsersList, getGame, 
isEntryInList, isGameInList

*/
describe("Testes Unitários", () => {
    test('Set Authenticated User', () => {
        const newUserId = 4;
        makeAuthenticatedUser(newUserId.toString());
        expect(utils.getAuthenticatedUserID()).toBe(newUserId);
    });
    test('Get Authenticated User', () => {
        expect(utils.getAuthenticatedUserID()).toBe(utils.loggedInId);
    });
    test('Get User', () => {
        const userId = 1;
        const users = routes.getUsers();
        const user = utils.getUser(userId, users);
        expect(user).toEqual(routes.getUsers().find(u => u.id == userId));
    });
    test('Get Users List', () => {
        const userId = 1;
        const lists = routes.getLists();
        const list = utils.getUsersList(userId, lists);
        expect(list).toEqual(routes.getLists().find(l => l.userId == userId));
    });
    test('Get Game', () => {
        const gameId = 1;
        makeGame(gameId.toString());
        const games = routes.getGames();
        const game = utils.getGame(gameId, games);
        expect(game).toEqual(routes.getGames().find(g => g.gameId == gameId));
    });
    test('Add User', () => {
        makeUser("4");
        const users = routes.getUsers();
        const user = users[users.length - 1];
        expect(user).toEqual(routes.getUsers().find(u => u.id == user.id));
    });
    test('Add List', () => {
        makeUser("4");
        makeList("4", "4");
        const lists = routes.getLists();
        const list = lists[lists.length - 1];
        expect(lists[lists.length - 1]).toEqual(list);
    });
    test('Add Game', () => {
        makeGame("4");
        const games = routes.getGames();
        const game = games[games.length - 1];
        expect(games[games.length - 1]).toEqual(game);
    });
    test('Add Entry', () => {
        makeUser("4");
        makeList("4", "4");
        makeEntryInList("4", "4", "4", "Wishlisted", new Date());
        const lists = routes.getLists();
        const list = lists.find(l => l.userId == 4);
        if (!list){
            expect(true).toBe(false);
            return;
        }
        const entry = list?.entries.find(e => e.entryId == 4);
        expect(utils.isEntryInList(list, 4)).toEqual(entry);
    });
    test('Is Entry In List', () => {
        const listId = 1;
        const entryId = 1;
        const lists = routes.getLists();
        const list = lists.find(l => l.userId == listId);
        if (!list){
            return;
        }
        const entry = list?.entries.find(e => e.entryId == entryId);
        expect(utils.isEntryInList(list, entryId)).toEqual(entry);
    });
    test('Is Game In List', () => {
        const listId = 1;
        const gameId = 1;
        const lists = routes.getLists();
        const list = lists.find(l => l.userId == listId);
        if (!list){
            return;
        }
        const entry = list?.entries.find(e => e.gameId == gameId);
        expect(utils.isGameInList(list, gameId)).toEqual(entry);
    });
});
