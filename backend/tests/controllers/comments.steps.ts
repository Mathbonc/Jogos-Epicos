import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '/comments'; // Arrumar o caminho
                             // esse é o de teste local
const feature = loadFeature('./src/__tests__/comment.feature');

defineFeature(feature, (test) => {
  let response: request.Response;

  test('Create a new comment', ({ given, when, then }) => {
    given('the server is running', () => {
      
    });

    when('I send a POST request to "/comment" with body:', async (table) => {
      const { user_id, comment } = table.rows[0];
      response = await request(app)
        .post('/comment')
        .send({ user_id, comment });
    });

    then('I should receive a {int} status code', (statusCode) => {
      expect(response.status).toBe(parseInt(statusCode));
    });
  });
});
