import { Express, Router, Request, Response } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';

import reviews from '../database/reviews';
import users from '../database/users';

const router = Router();
const prefix = '/api';

//User with id 1 is logged in
const logged_in_id = 1;

//function to verify username
function verifyUserId(id: number) {
  const user = users.find((user) => user.id === id);
  //console.log(users);
  if (!user) {
    return null;
  }
  return user;
}

//function to verify review id
function verifyReviewId(id: number) {
  const review = reviews.find((r) => r.id === id);
  if (!review) {
    return null;
  }
  return review;
}

//Route to get all reviews of that user by id
router.get('/user/:id_user/historico', (req: Request, res: Response) => {
  //check user
  const userid = parseInt(req.params.id_user);
  const user = verifyUserId(userid);

  if (user === null) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const review_list = reviews.filter((review) => review.author_id === user.id);
  res.json(review_list);
});


//Route to filter reviews by category
router.get('/user/:id_user/historico/category/:category', (req: Request, res: Response) => {
  //check user
  const user = verifyUserId(parseInt(req.params.id_user));
  if (user === null) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  //check category
  const category = req.params.category;
  const review = reviews.filter((review) => review.categories.includes(category) && review.author_id === user.id);
  if (review.length === 0) {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }

  res.json(review);
});

//Route to get a review by id
router.get('/user/:id_user/historico/id_review/:id_review', (req: Request, res: Response) => {
  //check user
  const user = verifyUserId(parseInt(req.params.id_user));
  if (user === null) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  //check review id
  const review = verifyReviewId(parseInt(req.params.id_review));
  if (review === null) {
    return res.status(404).json({ error: 'Review não encontrado' });
  }

  //check if review belongs to user
  if (review.author_id !== user.id) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  res.json(review);
});

//Route to update a review by id
//Only the author of the review can update it and only if the author is logged in
router.put('/user/:id_user/historico/id_review/:id_review', (req: Request, res: Response) => {
  //check user
  const user = verifyUserId(parseInt(req.params.id_user));
  if (user === null) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  //check review id
  let review_to_edit = verifyReviewId(parseInt(req.params.id_review));
  if (review_to_edit === null) {
    return res.status(404).json({ error: 'Review não encontrado' });
  }

  //check if review belongs to user
  if (review_to_edit.author_id !== user.id) {
    return res.status(404).json({ error: 'Não autorizado' });
  }

  if (review_to_edit.author_id !== logged_in_id) {
    return res.status(404).json({ error: 'Usuário precisa estar logado' });
  }
  
  const updatedReview = { ...review_to_edit, ...req.body };

  reviews[parseInt(req.params.id_review) - 1] = updatedReview;
  
  res.json(reviews[parseInt(req.params.id_review) - 1]);
  
});

//Route to delete a review by id
router.delete('/user/:id_user/historico/id_review/:id_review', (req: Request, res: Response) => {
  //check user
  const user = verifyUserId(parseInt(req.params.id_user));
  if (user === null) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  //check review id
  const review_to_delete = verifyReviewId(parseInt(req.params.id_review));
  if (review_to_delete === null) {
    return res.status(404).json({ error: 'Review não encontrado' });
  }

  //check if review belongs to user
  if (review_to_delete.author_id !== user.id) {
    return res.status(401).json({ error: 'Não autorizado' });
  }


  if (review_to_delete.author_id !== logged_in_id) {
    return res.status(401).json({ error: 'Usuário precisa estar logado' });
  }

  //delete review
  const index = reviews.findIndex((review) => review.id === review_to_delete.id);

  if (index !== -1) {
    reviews.splice(index, 1);
    return res.status(200).json({ message: 'Review deletado com sucesso' });
  }
  else {
    return res.status(404).json({ error: 'Review não encontrado*' });
  }
});

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};
