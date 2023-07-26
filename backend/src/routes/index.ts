import { Express, Router, Request, Response } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';

import reviews from '../database/reviews';

const router = Router();
const prefix = '/api';

//Route to get all reviews
router.get('/historico', (req: Request, res: Response) => {
  res.json(reviews);
});

//Route to filter reviews by category
router.get('/historico/category/:category', (req: Request, res: Response) => {
  const category = req.params.category;
  const review = reviews.filter((review) => review.categories.includes(category));
  res.json(review);
});

//Route to get a review by id
router.get('/historico/id/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const review = reviews.find((review) => review.id === id);
  res.json(review);
});

//Route to update a review by id
router.put('/historico/id/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const reviewIndex = reviews.findIndex((review) => review.id === id);
  const review = reviews[reviewIndex];
  const updatedReview = { ...review, ...req.body };
  reviews[reviewIndex] = updatedReview;
  res.json(updatedReview);
});

//Route to delete a review by id
router.delete('/historico/id/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const reviewIndex = reviews.findIndex((review) => review.id === id);
  reviews.splice(reviewIndex, 1);
  res.sendStatus(204);
});

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};
