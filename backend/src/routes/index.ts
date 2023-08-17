import { Express, Router, Request, Response, NextFunction } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';

import { loggedInId } from '../services/list.service';
import users from '../database/users';
import games from '../database/games';
import lists from '../database/lists';

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
  const user = verifyUserId(parseInt(req.params.id_user));

  if (user === null) 
    return res.status(404).json({ error: 'Usuário não encontrado' });
  
  let review_list = reviews.filter((review) => review.author_id === user.id);

  //para inverter a ordem da lista
  // /user/:id_user/historico?desc=true
  if (req.query.desc) 
    review_list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  else 
    review_list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
  res.json(review_list);
});


//Route to filter reviews by category
router.get('/user/:id_user/historico/category/:category', (req: Request, res: Response) => {
  //check user
  const user = verifyUserId(parseInt(req.params.id_user));
  if (user === null) 
    return res.status(404).json({ error: 'Usuário não encontrado' });

  //check category
  const category = req.params.category;
  const review = reviews.filter((review) => review.categories.includes(category) && review.author_id === user.id);
  if (review.length === 0) 
    return res.status(404).json({ error: 'Categoria não encontrada' });

  res.json(review);
});

//Route to get a review by id
router.get('/user/:id_user/historico/id_review/:id_review', (req: Request, res: Response) => {
  //check user
  const user = verifyUserId(parseInt(req.params.id_user));
  if (user === null) 
    return res.status(404).json({ error: 'Usuário não encontrado' });

  //check review id
  const review = verifyReviewId(parseInt(req.params.id_review));
  if (review === null) 
    return res.status(404).json({ error: 'Review não encontrado' });

  res.json(review);
});

//Route to update a review by id
//Only the author of the review can update it and only if the author is logged in
router.put('/user/:id_user/historico/id_review/:id_review', (req: Request, res: Response) => {
  //check user
  const user = verifyUserId(parseInt(req.params.id_user));
  if (user === null) 
    return res.status(404).json({ error: 'Usuário não encontrado' });

  //check review id
  let review_to_edit = verifyReviewId(parseInt(req.params.id_review));
  if (review_to_edit === null) 
    return res.status(404).json({ error: 'Review não encontrado' });

  //check if user is logged in
  if (review_to_edit.author_id !== logged_in_id) 
    return res.status(404).json({ error: 'Usuário precisa estar logado' });
  
  const updatedReview = { ...review_to_edit, ...req.body };
  reviews[parseInt(req.params.id_review) - 1] = updatedReview;

  res.json(reviews[parseInt(req.params.id_review) - 1]);
});

//Route to delete a review by id
router.delete('/user/:id_user/historico/id_review/:id_review', (req: Request, res: Response) => {
  //check user
  const user = verifyUserId(parseInt(req.params.id_user));
  if (user === null) 
    return res.status(404).json({ error: 'Usuário não encontrado' });

  //check review id
  const review_to_delete = verifyReviewId(parseInt(req.params.id_review));
  if (review_to_delete === null) 
    return res.status(404).json({ error: 'Review não encontrado' });

  //check if user is logged in
  if (review_to_delete.author_id !== logged_in_id) 
    return res.status(401).json({ error: 'Usuário precisa estar logado' });

  //delete review
  const index = reviews.findIndex((review) => review.id === review_to_delete.id);

  if (index !== -1) {
    reviews.splice(index, 1);
    return res.status(200).json({ message: 'Review deletado com sucesso' });
  }
  else 
    return res.status(404).json({ error: 'Review não encontrado*' });
});

// -------------------------------- FOLLOWERS ROUTES --------------------------------
// Route to get users
router.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

// List followers for a user
router.get('/users/:id/followers', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const followers = user.followers.map(followerId => {
    const follower = users.find(user => user.id === followerId);
    return follower;
  });

  res.json(followers);
});

// List following for a user
router.get('/users/:id/following', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const following = user.following.map(followingId => {
      const followingUser = users.find(user => user.id === followingId);
      return followingUser;
    });

    res.json(following);
});

// Unfollow a user
router.post('/users/:id/unfollow', (req: Request, res: Response) => {
  const unfollowId = parseInt(req.params.id);
  const id = parseInt(req.body.id);

  const user = users.find(user => user.id === id);
  const unfollowedUser = users.find(user => user.id === unfollowId);

  if(!user?.following.includes(unfollowId)) {
    res.status(400).json({ message: 'You are not following this user' });
    return;
  }

  if (!user || !unfollowedUser) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.following = user.following.filter(userId => userId !== unfollowId);
  unfollowedUser.followers = unfollowedUser.followers.filter(userId => userId !== id);

  res.json({ message: 'You are no longer following this user!'});
});

// Follow a user
router.post('/users/:id/follow', (req: Request, res: Response) => {
  const followId = parseInt(req.params.id);
  const id = parseInt(req.body.id);
  const user = users.find(user => user.id === id);
  const follower = users.find(user => user.id === followId);

  if (user?.following.includes(followId)) {
    res.status(400).json({ message: 'You are already following this user' });
    return;
  }

  if (!user || !follower) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.following.push(followId);
  follower.followers.push(id);
  res.json({ message: 'You are now following this user!'});
});
1
// Blocks a user
router.post('/users/:id/block', (req: Request, res: Response) => {
  const blockId = parseInt(req.params.id);
  const id = parseInt(req.body.id);
  const user = users.find(user => user.id === id);
  const blockedUser = users.find(user => user.id === blockId);

  if (user?.blocked.includes(blockId)) {
    res.status(400).json({ message: 'You have already blocked this user' });
    return;
  }

  if (!user || !blockedUser) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.blocked.push(blockId);
  res.json({ message: 'You have blocked this user!'});
});

// Unblocks a user
router.post('/users/:id/unblock', (req: Request, res: Response) => {
  const unblockId = parseInt(req.params.id);
  const id = parseInt(req.body.id);
  const user = users.find(user => user.id === id);
  const unblockedUser = users.find(user => user.id === unblockId);

  if(!user?.blocked.includes(unblockId)) {
    res.status(400).json({ message: 'You have not blocked this user' });
    return;
  }

  if (!user || !unblockedUser) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.blocked = user.blocked.filter(userId => userId !== unblockId);
  res.json({ message: 'You have unblocked this user!'});
});

// List blocked users
router.get('/users/:id/blocked/count', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const blockedUsersCount = user.blocked.length;

  res.json({ blockedUsersCount });
});

// Counter for followers
router.get('/users/:id/followers/count', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const followersCount = user.followers.length;

  res.json({ followersCount });
});

// Counter for following
router.get('/users/:id/following/count', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);

  if(!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const followingCount = user.following.length;

  res.json({ followingCount });
});

// END OF FOLLOWERS ROUTES


// ----------------------- LIST ROUTES ----------------------- //
// Importing users, games, and lists
import { ListEntry, EntryType, GameList } from '../models/list.model';
import { User } from '../models/user.model';
import { Game } from '../models/game.model';
import * as utils from '../services/list.service'

function setUsers(newUsers : User[]){
  users.length = 0;
  users.push(...newUsers);
}
function setList(newList : GameList[]){
  lists.length = 0;
  lists.push(...newList);
}
function setGames(newGames : Game[]){
  games.length = 0;
  games.push(...newGames);
}
function getGames(){
  return games;
}
function getUsers(){
  return users;
}
function getLists(){
  return lists;
}

export {setUsers, setList, setGames, getGames, getUsers, getLists};
// GET : List of games for a user
router.get('/users/:id/list', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const user = utils.getUser(id, users);
  const userLists = utils.getUsersList(id, lists);

  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if(!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  
  return res.status(200).json(userLists);

});


// POST : Add a game to a user's list
router.post('/users/:id/list', async (req, res) => {
  const id : number = parseInt(req.params.id);
  if(id !== loggedInId) {
    return res.status(401).json({ message : 'Unauthorized' });
  }
  
  const { gameId, entryType, reqDate } = req.body;

  const user = utils.getUser(id, users);
  const game = utils.getGame(gameId, games);
  const list = utils.getUsersList(id, lists);

  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!game) {
    return res.status(404).json({ message : 'Game not found' });
  }
  if (!list) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (utils.isGameInList(list, gameId)) {
    return res.status(409).json({ message : 'Game already exists in list' });
  }
  
  const lastEntryId = list.entries.length > 0 ? list.entries[list.entries.length - 1].entryId : 0;
  
  const nextEntry = {
    entryId : lastEntryId + 1,
    gameId,
    entryType,
    date : new Date(reqDate)
  };
  list.entries.push(nextEntry);
  return res.status(201).json(list);
});
  
// GET: Games of a certain entryType on a user's list
router.get('/users/:id/list/:entryType', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const entryType : string = req.params.entryType;
  const user = utils.getUser(id, users);
  const userLists = utils.getUsersList(id, lists);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (entryType != EntryType.PLAYED && entryType != EntryType.ABANDONED && entryType != EntryType.WISHLIST) {
    return res.status(404).json({ message : 'Invalid entry type: ' + entryType });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }

  const filteredEntries = userLists.entries.filter((entry) => entry.entryType === entryType);
  const filteredList = {
    userId : userLists.userId,
    entries : filteredEntries
  };
  return res.status(200).json(filteredList);

});

// PUT : Edit a game on a user's list
router.put('/users/:id/list/:entryId', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const entryId : number = parseInt(req.params.entryId);
  const user = utils.getUser(id, users);
  const { entryType, reqDate } = req.body;
  if (id !== loggedInId) {
    return res.status(401).json({ message : 'Unauthorized' });
  }
  const userLists = utils.getUsersList(id, lists);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (! utils.isEntryInList(userLists, entryId)) {
    return res.status(404).json({ message : 'Entry not found' });
  }
  if (entryType != EntryType.PLAYED && entryType != EntryType.ABANDONED && entryType != EntryType.WISHLIST) {
    return res.status(400).json({ message : 'Invalid entry type' });
  }
  const entryIndex = userLists.entries.findIndex((entry) => entry.entryId === entryId);
  userLists.entries[entryIndex].entryType = entryType;
  userLists.entries[entryIndex].date = new Date(reqDate);
  return res.status(200).json(userLists.entries.find((entry) => entry.entryId === entryId));
});

// DELETE : Remove a game from a user's list
router.delete('/users/:id/list/:entryId', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const entryId : number = parseInt(req.params.entryId);
  const user = utils.getUser(id, users);
  if (id !== loggedInId) {
    return res.status(401).json({ message : 'Unauthorized' });
  }
  const userLists = utils.getUsersList(id, lists);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (! utils.isEntryInList(userLists, entryId)) {
    return res.status(404).json({ message : 'Entry not found' });
  }
  const entryIndex = userLists.entries.findIndex((entry) => entry.entryId === entryId);
  userLists.entries.splice(entryIndex, 1);
  return res.status(200).json({ message : 'Entry deleted' });
});

// GET: Search a name in a user's list
router.get('/users/:id/list/search/:name', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const name : string = req.params.name;
  const user = utils.getUser(id, users);
  const userLists = utils.getUsersList(id, lists);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  const filteredEntries = userLists.entries.filter((entry) => {
    const game = utils.getGame(entry.gameId, games);
    if (!game) {
      return false;
    }
    return game.gameName.replace(/\s+/g, "").toLowerCase().includes(name.toLowerCase());
  });
  const filteredList = {
    userId : userLists.userId,
    entries : filteredEntries
  };
  return res.status(200).json(filteredList);
});

// GET: List ordered by criteria
router.get('/users/:id/list/:criteria/:order', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const criteria : string = req.params.criteria;
  const order : string = req.params.order;
  const user = utils.getUser(id, users);
  const userLists = utils.getUsersList(id, lists);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (criteria !== 'date' && criteria !== 'title') {
    return res.status(400).json({ message : 'Invalid criteria' });
  }
  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).json({ message : 'Invalid order' });
  }
  const orderedEntries = userLists.entries.sort((a, b) => {
    if (criteria === 'date') {
      return (order.localeCompare('asc') == 0) ? (a.date.getTime() - b.date.getTime()) : (b.date.getTime() - a.date.getTime());
    }
    if (criteria === 'title') {
      const ag = utils.getGame(a.gameId, games);
      const bg = utils.getGame(b.gameId, games);
      if (!ag || !bg) {
        return 0;
      }
      return (order.localeCompare('asc') == 0) ? (ag.gameName.localeCompare(bg.gameName)) : (bg.gameName.localeCompare(ag.gameName));
    }
    return 0;
  });
  const orderedList = {
    userId : userLists.userId,
    entries : orderedEntries
  };
  return res.status(200).json(orderedList);
});


// ----------------------- END LIST ROUTES ------------------- //

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};
