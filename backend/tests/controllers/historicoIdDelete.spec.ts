import request from 'supertest';
import app from '../../src/app';

describe('Test historicoIdDelete', () => {
    test('It should response the DELETE method', async () => {
        //delete review with id 1
        const review_id = 1;

        //Delete requistion
        const response_delete = await request(app).delete(`/api/historico/id/${review_id}`);
        expect(response_delete.status).toBe(204);

        //check if the review was deleted
        const response_get = await request(app).get(`/api/historico/id/${review_id}`);
        expect(response_get.status).toBe(404);
        expect(response_get.body).toHaveProperty('error', 'Review not found');

    });

    //should return 404 if the review id does not exist
    test('It should return 404 if the review id does not exist', async () => {
        const fake_id = 999999;
        const response = await request(app).delete(`/api/historico/id/${fake_id}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Review not found');
    });
});
