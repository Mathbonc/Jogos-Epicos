import { User } from '../models/user.model';
import { EntryType, ListEntry, GameList } from "../models/list.model";
import { Game } from "../models/game.model";
import { getUsers } from '../routes';
import * as routesMethods from '../routes/index';
let loggedInId : number = 0;

function getAuthenticatedUserID(){
    return loggedInId;
}
function setAuthenticatedUserID(id : number){
    loggedInId = id;
}
function getUser(id : number, users : User[]) {
  if (!users) return;
  return users.find((user) => user.id === id);
}
function getUsersList(id : number, lists : GameList[]) {
  if (!lists) return;
  return lists.find((list) => list.userId === id);
}
function getGame(id : number, games : Game[]) {
  if (!games) return;
  return games.find((game) => game.gameId === id);
}
function isEntryInList(list : GameList, entryId : number) {
  if (!list || !list.entries) return false;
  return list.entries.find((entry : ListEntry) => entry.entryId === entryId);
}
function isGameInList(list : GameList, gameId : number) {
  if (!list || !list.entries) return false;
  return list.entries.find((entry : ListEntry) => entry.gameId === gameId);
}

export {getAuthenticatedUserID, setAuthenticatedUserID, 
        loggedInId, 
        getUser, getUsersList, getGame, 
        isEntryInList, isGameInList};