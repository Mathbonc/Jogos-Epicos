import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';

import  Reviews  from '../../src/database/reviews';

const feature = loadFeature('../features/historico_teste.feature');

defineFeature(feature, test => {
    let response: supertest.Response;
    let expected_reviews: typeof Reviews;

    test('Filtering reviews by category "Zumbi"', ({ given, when, then }) => {
        given('The service has a database containing reviews', () => {
        });

        when('A request is made to the service to filter reviews by category "Zumbi"', async () => {
            const username = 'Alice';
            const category = 'Zumbi';
            response = await supertest(app).get(`/api/user/${username}/historico/category/${category}`);
            expected_reviews = Reviews.filter(review => review.categories.includes(category));
        });

        then('The service should respond with a list of reviews containing the category "Zumbi"', () => {
            console.log(response.body);
            expect(response.body).toEqual(expected_reviews);
        });

        then('The service should respond with status code 200', () => {
            expect(response.status).toBe(200);
        });
    });
});

