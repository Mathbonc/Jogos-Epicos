import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../backend/src/app';

import Reviews, { getReviews } from '../../backend/src/database/reviews';

const feature = loadFeature('./tests/features/historico_teste.feature');
const request = supertest(app);

defineFeature(feature, test => {

    // Cenário de sucesso para filtrar por categoria

    test('Filtering reviews by category', ({ given, when, then, and }) => {

        let response: supertest.Response;

        given('The service has a database containing reviews', async () => {
            //Checando se a base de dados de reviews não esta vazia
            expect(getReviews().length).not.toBe(0);
        });

        and(/^The database contains a review id: "(.*)", author_id: "(.*)" and categories: '(.*)'$/ ,
            (arg0, arg1, arg2) => {

            const categories = JSON.parse(arg2);

            //Checando se a base de dados de reviews contem uma review com os dados passados
            expect(Reviews.find(review =>
                review.id === parseInt(arg0) &&
                review.author_id === parseInt(arg1) &&
                categories.every((category: string) => review.categories.includes(category))
            )).toBeDefined();

        });

        and(/^The database contains a review id: "(.*)", author_id: "(.*)" and categories: '(.*)'$/ ,
            (arg0, arg1, arg2) => {

            const categories = JSON.parse(arg2);

            expect(Reviews.find(review =>
                review.id === parseInt(arg0) &&
                review.author_id === parseInt(arg1) &&
                categories.every((category: string) => review.categories.includes(category))
            )).toBeDefined();

        });

        and(/^The database contains a review id: "(.*)", author_id: "(.*)" and categories: '(.*)'$/ ,
            (arg0, arg1, arg2) => {

            const categories = JSON.parse(arg2);

            expect(Reviews.find(review =>
                review.id === parseInt(arg0) &&
                review.author_id === parseInt(arg1) &&
                categories.every((category: string) => review.categories.includes(category))
            )).toBeDefined();

        });

        and(/^The database contains a review id: "(.*)", author_id: "(.*)" and categories: '(.*)'$/ ,
            (arg0, arg1, arg2) => {

            const categories = JSON.parse(arg2);

            expect(Reviews.find(review =>
                review.id === parseInt(arg0) &&
                review.author_id === parseInt(arg1) &&
                categories.every((category: string) => review.categories.includes(category))
            )).toBeDefined();

        });

        when(/^A "GET" request is made to "(.*)" route$/, async (route: string) => {
            //Fazendo uma requisição GET para a rota passada
            response = await request.get(route);
        });

        then(/^The service should return a list of reviews of the user with id: "(.*)" containing the category '(.*)'$/,
            (arg0, arg1) => {
                expect(response.body[0].author_id).toEqual(parseInt(arg0));
                expect(response.body[0].categories).toContain(arg1);
        });

        and(/^The list of reviews should contain the review id: "(.*)" and categories: '(.*)'$/,
            (arg0, arg1) => {
                expect(response.body[0].id).toBe(parseInt(arg0));
                JSON.parse(arg1).forEach((category: string) => {
                    //console.log(category);
                    expect(response.body[0].categories).toContain(category);
                });
        });

        and(/^The service should respond with status code "(.*)"$/,
            (arg0) => {
                expect(response.status).toBe(parseInt(arg0));
        });

    });

    // Cenário de erro para filtrar por categoria

    test('Filtering reviews by category that does not exist', ({ given, when, then, and }) => {

        let response: supertest.Response;

        given('The service has a database containing reviews', async () => {
            //Checando se a base de dados de reviews não esta vazia
            expect(getReviews().length).not.toBe(0);
        });

        and(/^The database does not contain a review with category "(.*)"$/ , (arg0) => {
            //Checando se a base de dados de reviews não contem uma review com a categoria passada
            expect(Reviews.find(review => review.categories.includes(arg0))).toBeUndefined();
        });

        when(/^A "GET" request is made to "(.*)" route$/, async (route: string) => {
            //Fazendo uma requisição GET para a rota passada
            response = await request.get(route);
        });

        then(/^The service should respond with status code "(.*)"$/, (arg0) => {
            expect(response.status).toBe(parseInt(arg0));
        });

        and(/^The respose should contain the message "(.*)"$/, (arg0) => {
            //console.log(response.body.error);
            expect(response.body.error).toBe(arg0);
        });   
        
    });

    // Cenário de sucesso para obter todas as reviews de um usuário

    test('Get all reviews of the user', ({ given, when, then, and }) => {

        let response: supertest.Response;

        given('The service has a database containing reviews', async () => {
            //Checando se a base de dados de reviews não esta vazia
            expect(getReviews().length).not.toBe(0);
        });

        and(/^The database contains a review id: "(.*)" and author_id: "(.*)"$/, (arg0,arg1) => {
            expect(Reviews.find(review => 
                review.id === parseInt(arg0) && 
                review.author_id === parseInt(arg1))
                ).toBeDefined();
        });

        and(/^The database contains a review id: "(.*)" and author_id: "(.*)"$/, (arg0,arg1) => {
            expect(Reviews.find(review => 
                review.id === parseInt(arg0) && 
                review.author_id === parseInt(arg1))
                ).toBeDefined();
        });

        and(/^The database contains a review id: "(.*)" and author_id: "(.*)"$/, (arg0,arg1) => {
            expect(Reviews.find(review => 
                review.id === parseInt(arg0) && 
                review.author_id === parseInt(arg1))
                ).toBeDefined();
        });

        and(/^The database contains a review id: "(.*)" and author_id: "(.*)"$/, (arg0,arg1) => {
            expect(Reviews.find(review => 
                review.id === parseInt(arg0) && 
                review.author_id === parseInt(arg1))
                ).toBeDefined();
        });

        when(/^A "GET" request is made to "(.*)" route$/, async (route: string) => {
            //Fazendo uma requisição GET para a rota passada
            response = await request.get(route);
        });

        then(/^The service should respond with a list of reviews containing the user with id: "(.*)"$/, (arg0) => {
            //console.log(response.body[0]);
            expect(response.body[0].author_id).toEqual(parseInt(arg0));
            
            //checando a ordem
            const isOrdered = response.body.every((review: typeof Reviews[0], index: number, array: typeof Reviews[0][]) => {
                return index === 0 || new Date(review.date).getTime() >= new Date(array[index - 1].date).getTime();
            });
                
            expect(isOrdered).toBe(true);
        });

        and(/^The list of reviews should contain the review id: "(.*)" and id: "(.*)"$/, (arg0, arg1) => {
            expect(response.body[0].id).toBe(parseInt(arg0));
            expect(response.body[1].id).toBe(parseInt(arg1));
        });

        and(/^The service should respond with status code "(.*)"$/, (arg0) => {
            expect(response.status).toBe(parseInt(arg0));
        });

    });

    // Cenário de erro para obter todas as reviews de um usuário

    test('Get all reviews of the user that does not exist', ({ given, when, then, and }) => {

        let response: supertest.Response;

        given('The service has a database containing reviews', async () => {
            //Checando se a base de dados de reviews não esta vazia
            expect(getReviews().length).not.toBe(0);
        });

        and(/^The database does not contain any review with author_id: "(.*)"$/ , (arg0) => {
            //Checando se a base de dados de reviews não contem uma review com o id do usuário passado
            expect(Reviews.find(review => review.author_id === parseInt(arg0))).toBeUndefined();
        });

        when(/^A "GET" request is made to "(.*)" route$/, async (route: string) => {
            //Fazendo uma requisição GET para a rota passada
            response = await request.get(route);
        });

        then(/^The service should respond with status code "(.*)"$/, (arg0) => {
            expect(response.status).toBe(parseInt(arg0));
        });

        and(/^The response should contain the message "(.*)"$/, (arg0) => {
            //console.log(response.body.error);
            expect(response.body.error).toBe(arg0);
        });

    });

    // Cenário de sucesso para editar um review

    test('Edit a review', ({ given, when, then, and }) => {

        let response: supertest.Response;
        let past_review: typeof Reviews[0] | undefined;
        let endpoint: string;

        given('The service has a database containing reviews', async () => {
            //Checando se a base de dados de reviews não esta vazia
            expect(getReviews().length).not.toBe(0);
        });

        and(/^The database contains a review id: "(.*)", author_id: "(.*)" and rating: "(.*)"$/ , (arg0, arg1, arg2) => {
            //Checando se a base de dados de reviews contem uma review com os dados passados
            past_review = Reviews.find(review =>
                review.id === parseInt(arg0) &&
                review.author_id === parseInt(arg1) &&
                review.rating === parseInt(arg2)
                );
                
            //Salvando a review que será editada
            expect(past_review).toBeDefined();
            //console.log(past_review);
        });

        and(/^The user with id: "(.*)" is logged in$/ , (arg0) => {
            //Checando se o usuário com o id passado esta logado
            // nessa implementação todos os usuários que tem o id 1 estão logados
            expect(parseInt(arg0)).toBe(1);
        });

        when(/^A "PUT" request is made to "(.*)" route$/, async (route: string) => {
            //Fazendo uma requisição PUT para a rota passada
            endpoint = route;
        });

        and(/^The request contains a JSON body with updated review rating: "(.*)"$/ , async (arg0) => {
            //Checando se o corpo da requisição contem o rating passado
            response = await request.put(endpoint).send({rating: parseInt(arg0)});
            //console.log(response.body);

        });

        then(/^The service should respond with the updated review$/ , () => {
            //Checando se o corpo da resposta contem o review editado
            expect(response.body.rating).not.toBe(past_review?.rating);                                     

        });

        and(/^The updated review should contain rating: "(.*)"$/ , (arg0) => {
            //Checando se o rating da review foi alterado
            expect(response.body.rating).toBe(parseInt(arg0));
        });

        and(/^The service should respond with status code "(.*)"$/ , (arg0) => {
            //Checando se o status code da resposta é o esperado
            expect(response.status).toBe(parseInt(arg0));
        });

    });

    // Cenário de erro para editar um review que não existe

    test('Edit a review that does no exist', ({ given, when, then, and }) => {

        let response: supertest.Response;
        let endpoint: string;

        given('The service has a database containing reviews', async () => {
            //Checando se a base de dados de reviews não esta vazia
            expect(getReviews().length).not.toBe(0);
        });

        and(/^The database does not contain a review with id: "(.*)"$/ , (arg0) => {
            //Checando se a base de dados de reviews não contem uma review com o id passado
            expect(Reviews.find(review => review.id === parseInt(arg0))).toBeUndefined();
        });

        and(/^A user with id: "(.*)" is logged in$/ , (arg0) => {
            //Checando se o usuário com o id passado esta logado
            // nessa implementação todos os usuários que tem o id 1 estão logados
            expect(parseInt(arg0)).toBe(1);
        });

        when(/^A "PUT" request is made to "(.*)" route$/, (route: string) => {
            //Fazendo uma requisição PUT para a rota passada
            endpoint = route;
        });

        and(/^The request contains a JSON body with updated review data name: "(.*)"$/ , async (arg0) => {
            //Checando se o corpo da requisição contem o nome passado
            response = await request.put(endpoint).send({name: arg0});
            //console.log(response);
        });

        then(/^The service should respond with status code "(.*)"$/ , (arg0) => {
            //Checando se o status code da resposta é o esperado
            expect(response.status).toBe(parseInt(arg0));
        });

        and(/^The response should contain an error message "(.*)"$/ , (arg0) => {
            //Checando se a resposta contem a mensagem de erro esperada
            expect(response.body.error).toBe(arg0);
        });

    });

    // Cenário de erro para editar sem estar logado

    test('Edit a review without being logged in', ({ given, when, then, and }) => {

        let response: supertest.Response;
        let endpoint: string;

        given('The service has a database containing reviews', async () => {
            //Checando se a base de dados de reviews não esta vazia
            expect(getReviews().length).not.toBe(0);
        });

        and(/^The database contain a review with author_id: "(.*)" and id: "(.*)"$/ , (arg0, arg1) => {
            //Checando se a base de dados de reviews contem uma review com o id e author_id passados
            expect(Reviews.find(review =>
                review.id === parseInt(arg1) &&
                review.author_id === parseInt(arg0)
                )).toBeDefined();
        });

        and(/^The user with id: "(.*)" is not logged in$/ , (arg0) => {
            //Checando se o usuário com o id passado não esta logado
            // nessa implementação todos os usuários que tem o id 1 estão logados
            expect(parseInt(arg0)).not.toBe(1);
        });

        when(/^A "PUT" request is made to "(.*)" route$/, (route: string) => {
            //Fazendo uma requisição PUT para a rota passada
            endpoint = route;
        });

        and(/^The request contains a JSON body with updated review data name: "(.*)"$/ , async (arg0) => {
            //Checando se o corpo da requisição contem o nome passado
            response = await request.put(endpoint).send({name: arg0});
            //console.log(response);
        });

        then(/^The service should respond with status code "(.*)"$/ , (arg0) => {
            //Checando se o status code da resposta é o esperado
            expect(response.status).toBe(parseInt(arg0));
        });

        
        and(/^The response should contain an error message "(.*)"$/ , (arg0) => {
            //Checando se a resposta contem a mensagem de erro esperada
            expect(response.body.error).toBe(arg0);
        });

    });

    // Cenário de sucesso para deletar um review

    test('Delete a review', ({ given, when, then, and }) => {

        let response: supertest.Response;
        let endpoint: string;

        given('The service has a database containing reviews', async () => {
            //Checando se a base de dados de reviews não esta vazia
            expect(getReviews().length).not.toBe(0);
        });

        and(/^The database contains a review id: "(.*)" and author_id: "(.*)"$/ , (arg0, arg1) => {
            //Checando se a base de dados de reviews contem uma review com o id e author_id passados
            expect(Reviews.find(review =>
                review.id === parseInt(arg1) &&
                review.author_id === parseInt(arg0)
                )).toBeDefined();
        });

        and(/^The user with id: "(.*)" is logged in$/ , (arg0) => {
            //Checando se o usuário com o id passado esta logado
            // nessa implementação todos os usuários que tem o id 1 estão logados
            expect(parseInt(arg0)).toBe(1);
        });

        when(/^A "DELETE" request is made to "(.*)" route$/, async (route: string) => {
            //Fazendo uma requisição DELETE para a rota passada
            response = await request.delete(route);
            //console.log(response.body);
        });

        then(/^The service should respond with status code "(.*)"$/ , (arg0) => {
            //Checando se o status code da resposta é o esperado
            expect(response.status).toBe(parseInt(arg0));
        });

        and(/^The response should contain a message "(.*)"$/ , (arg0) => {
            //Checando se a resposta contem a mensagem de sucesso esperada
            expect(response.body.message).toBe(arg0);
        });

    });

    // Cenário de erro para deletar um review que não existe

    test('Delete a review that does not exist', ({ given, when, then, and }) => {

        let response: supertest.Response;

        given('The service has a database containing reviews', async () => {
            //Checando se a base de dados de reviews não esta vazia
            expect(getReviews().length).not.toBe(0);
        });

        and(/^The database does not contain a review with id: "(.*)"$/ , (arg0) => {
            //Checando se a base de dados de reviews não contem uma review com o id passado
            expect(Reviews.find(review => review.id === parseInt(arg0))).toBeUndefined();
        });

        and(/^The user with id: "(.*)" is logged in$/ , (arg0) => {
            //Checando se o usuário com o id passado esta logado
            // nessa implementação todos os usuários que tem o id 1 estão logados
            expect(parseInt(arg0)).toBe(1);
        });

        when(/^A "DELETE" request is made to "(.*)" route$/, async (route: string) => {
            //Fazendo uma requisição DELETE para a rota passada
            response = await request.delete(route);
            console.log(response.body);
        });

        then(/^The service should respond with status code "(.*)"$/ , (arg0) => {
            //Checando se o status code da resposta é o esperado
            expect(response.status).toBe(parseInt(arg0));
        });

        and(/^The response should contain an error message "(.*)"$/ , (arg0) => {
            //Checando se a resposta contem a mensagem de erro esperada
            expect(response.body.error).toBe(arg0);
        });

    });


});

