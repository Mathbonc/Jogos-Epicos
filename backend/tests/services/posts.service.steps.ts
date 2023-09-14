import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import users from '../../src/database/users';
import posts from '../../src/database/posts';

const feature = loadFeature('./tests/features/posts.feature');
const request = supertest(app)

defineFeature(feature, test => {
    let response: supertest.Response;
    test('Creating a new post', ({ given, when, then, and }) => {

        given(/^there is a user with username "(.*)", email "(.*)", password "(.*)", and id "(.*)"$/ , async (username, email, password, userid) => {
            // Simulate creating a user and adding it to the 'users' array
            users.push(username);
            users.push(email);
            users.push(password);
            users.push(userid)
        });
        
        and(/^there is a category with the name "(.*)"$/, async (category) => {
            // Simulate creating a category and adding it to the 'categories' array
            posts.push(category);
        });
        
        and(/^there is a game with the name "(.*)"$/, async (game) => {
            // Simulate creating a game and adding it to the 'games' array
            posts.push(game);
        });
        
        when(/^a POST request is made to the route "(.*)" with the request body$/, async (endpoint, requestBody) => {
            response = await request.post(`${endpoint}`).send(JSON.parse(requestBody));

        });
        
        then(/^the server responds with the code "(.*)" with the message "(.*)"$/, (statusCode, message) => {
            expect(response.status).toBe(parseInt(statusCode,10));  
        });
    });

// Test to delete a post route
    test('Excluindo um post', ({ given, and, when, then }) => {
        let testPost : any;
        let loggedID : number;
        given('o server tem uma database contendo posts', () => {

        });

        and(/^a database contém um usuário com id "(.*)" e um post "(.*)"$/, (userId, docString) => {
            loggedID = parseInt(userId);
            testPost = JSON.parse(docString)
            posts.push(testPost);
        });

        when(/^um request de DELETE é feito para "(.*)" route$/, async (endpoint) => {
            response = await request.delete(`${endpoint}`).query({loggedID : loggedID});
        });

        then(/^The service should respond with status code "(.*)" and the message "(.*)"$/, (statusCode, message) => {
            expect(response.status).toBe(parseInt(statusCode,10));
            expect(posts.find(post => post.post_id === testPost)).toBeUndefined();
        });
    });

    // Test to Edit a post route
    test('Editing a post', ({ given, and, when, then }) => {
        let testPost: any;
        let loggedID : number;
        given('o servidor tem uma database com posts', () => {

        });

        and('a database contém o post', (docString) => {
            testPost = JSON.parse(docString)
            posts.push(testPost);
        });

        and(/^A user with id "(.*)" is logged in$/, (userId) => {
            loggedID = parseInt(userId);
        });

        when(/^A PUT request is made to "(.*)" route with the request body$/, async (endpoint, requestBody) => {
            response = await request.put(`${endpoint}`).send(JSON.parse(requestBody)).query({loggedID : loggedID});
        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (statusCode, message) => {
            expect(response.status).toBe(parseInt(statusCode,10));
        });
    });
});