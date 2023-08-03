import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';

import  Reviews  from '../../src/database/reviews';

const feature = loadFeature('../features/historico_teste.feature');

defineFeature(feature, test => {

    test('Filtering reviews by category', ({ given, when, then }) => {
        let response: supertest.Response;
        let expected_reviews: typeof Reviews;

        given('The service has a database containing reviews', () => {
        });

        when('A request is made to the service to filter reviews by category "Zumbi"', async () => {
            const username = 'Alice';
            const category = 'Zumbi';
            response = await supertest(app).get(`/api/user/${username}/historico/category/${category}`);
            expected_reviews = Reviews.filter(review => review.categories.includes(category));
        });

        then('The service should respond with a list of reviews containing the category "Zumbi"', () => {
            //console.log(response.body);
            expect(response.body).toEqual(expected_reviews);
        });

        then('The service should respond with status code 200', () => {
            expect(response.status).toBe(200);
        });
    });

    test('Get all reviews of the user', ({ given, when, then }) => {
        let response: supertest.Response;
        let expected_reviews: typeof Reviews;

        given('The service has a database containing reviews', () => {
        });

        when('A request is made to the service to get all reviews of the user', async () => {
            const username = 'Alice';
            response = await supertest(app).get(`/api/user/${username}/historico`);
            expected_reviews = Reviews.filter(review => review.author_id === 1);
        });

        then('The service should respond with a list of reviews of the user', () => {
            //console.log(response.body);
            expect(response.body).toEqual(expected_reviews);
        });

        then('The service should respond with status code 200', () => {
            expect(response.status).toBe(200);
        }); 

    });

});



