import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';

import  Reviews  from '../../src/database/reviews';
import exp from 'constants';

const feature = loadFeature('../features/historico_teste.feature');

defineFeature(feature, test => {

    test('Filtering reviews by category', ({ given, when, then }) => {
        let response: supertest.Response;
        let expected_reviews: typeof Reviews;

        given('The service has a database containing reviews', () => {
        });

        when(/^A request is made to the service to filter reviews by category "(.*)"$/, async (category) => {
            const username = 'Alice';
            response = await supertest(app).get(`/api/user/${username}/historico/category/${category}`);
            expected_reviews = Reviews.filter(review => review.categories.includes(category));
        });

        then(/^The service should respond with a list of reviews containing the category "(.*)"$/, () => {
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

        when(/^A request is made to the service to get all reviews of the user "(.*)"$/, async (username) => {
            response = await supertest(app).get(`/api/user/${username}/historico`);
            expected_reviews = Reviews.filter(review => review.author_id === 1);
        });

        then(/^The service should respond with a list of reviews of the user "(.*)"$/, () => {
            //console.log(response.body);
            expect(response.body).toEqual(expected_reviews);
        });

        then('The service should respond with status code 200', () => {
            expect(response.status).toBe(200);
        }); 

    });

    test('Edit a review', ({ given, when, then }) => {
        let response: supertest.Response;
        let expected_reviews: typeof Reviews;

        given('The service has a database containing reviews', () => {
        });

        when('A request is made to the service to edit a review', async () => {
            const username = 'Alice';
            const review_id = 1;
            const new_review = { rating: 4, description: 'Testando a ediçao de uma review' };            

            response = await supertest(app).put(`/api/user/${username}/historico/id/${review_id}`).send(new_review);
            expected_reviews = Reviews.map(review => {
                if (review.id === review_id) {
                    return { ...review, ...new_review };
                }
                return review;
            });
        });

        then('The service should respond with the edited review', () => {
            //console.log(response.body);
            expect(response.body).toEqual(expected_reviews[0]);
        });

        then('The service should respond with status code 200', () => {
            expect(response.status).toBe(200);
        });

    });

    test('Edit a review that does not exist', ({ given, when, then }) => {
        let response: supertest.Response;

        given('The service has a database containing reviews', () => {
        });

        when('A request is made to the service to edit a review that does not exist', async () => {
            const username = 'Alice';
            const review_id = 100;
            const new_review = { rating: 4, description: 'Testando a ediçao de uma review' };            

            response = await supertest(app).put(`/api/user/${username}/historico/id/${review_id}`).send(new_review);
        });

        then('The service should respond with status code 404', () => {
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Review not found' });
        });

    });

});



