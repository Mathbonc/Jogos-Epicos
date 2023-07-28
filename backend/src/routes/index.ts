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
function verifyUsername(username: string) {
  const user = users.find((user) => user.username === username);
  if (!user) {
    return null;
  }
  return user;
}

//function to verify review id
function verifyReviewId(id: number) {
  const review = reviews.find((review) => review.id === id);
  if (!review) {
    return null;
  }
  return review;
}

//Route to get all reviews of that user by username
router.get('/user/:username/historico', (req: Request, res: Response) => {
  //check user
  const user = verifyUsername(req.params.username);
  if (user === null) {
    return res.status(404).json({ error: 'User not found' });
  }

  const review = reviews.filter((review) => review.author_id === user.id);
  res.json(review);
});


//Route to filter reviews by category
router.get('/user/:username/historico/category/:category', (req: Request, res: Response) => {
  //check user
  const user = verifyUsername(req.params.username);
  if (user === null) {
    return res.status(404).json({ error: 'User not found' });
  }

  //check category
  const category = req.params.category;
  const review = reviews.filter((review) => review.categories.includes(category) && review.author_id === user.id);
  if (review.length === 0) {
    return res.status(404).json({ error: 'Any reviews with that category' });
  }

  res.json(review);
});

//Route to get a review by id
router.get('/user/:username/historico/id/:id', (req: Request, res: Response) => {
  //check user
  const user = verifyUsername(req.params.username);
  if (user === null) {
    return res.status(404).json({ error: 'User not found' });
  }

  //check review id
  const review = verifyReviewId(parseInt(req.params.id));
  if (review === null) {
    return res.status(404).json({ error: 'Review not found' });
  }

  //check if review belongs to user
  if (review.author_id !== user.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.json(review);
});

//Route to update a review by id
//Only the author of the review can update it and only if the author is logged in
router.put('/user/:username/historico/id/:id', (req: Request, res: Response) => {
  //check user
  const user = verifyUsername(req.params.username);
  if (user === null) {
    return res.status(404).json({ error: 'User not found' });
  }

  //check review id
  const review_to_edit = verifyReviewId(parseInt(req.params.id));
  if (review_to_edit === null) {
    return res.status(404).json({ error: 'Review not found' });
  }

  //check if review belongs to user
  if (review_to_edit.author_id !== user.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const reviewIndex = reviews.findIndex((review_to_edit) => review_to_edit.id === parseInt(req.params.id));

  if (reviewIndex === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }

  if (reviews[reviewIndex].author_id !== logged_in_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const review = reviews[reviewIndex];
  const updatedReview = { ...review, ...req.body };
  reviews[reviewIndex] = updatedReview;
  res.json(updatedReview);
});

//Route to delete a review by id
router.delete('/user/:username/historico/id/:id', (req: Request, res: Response) => {
  //check user
  const user = verifyUsername(req.params.username);
  if (user === null) {
    return res.status(404).json({ error: 'User not found' });
  }

  //check review id
  const review_to_delete = verifyReviewId(parseInt(req.params.id));
  if (review_to_delete === null) {
    return res.status(404).json({ error: 'Review not found' });
  }

  //check if review belongs to user
  if (review_to_delete.author_id !== user.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const reviewIndex = reviews.findIndex((review_to_delete) => review_to_delete.id === parseInt(req.params.id));

  if (reviewIndex === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }

  if (reviews[reviewIndex].author_id !== logged_in_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  reviews.splice(reviewIndex, 1);
  res.sendStatus(204);
});

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};
