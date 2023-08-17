import { User } from '../models/user.model';
import { EntryType, ListEntry, GameList } from "../models/list.model";
import { Game } from "../models/game.model";
import { getUsers } from '../routes';
import * as routesMethods from '../routes/index';
let loggedInId : number = 1;

function getAuthenticatedUserID(){
    return loggedInId;
}
function setAuthenticatedUserID(id : number){
    loggedInId = id;
}
function getUser(id : number, users : User[]) {
  return users.find((user) => user.id === id);
}
function getUsersList(id : number, lists : GameList[]) {
  return lists.find((list) => list.userId === id);
}
function getGame(id : number, games : Game[]) {
  return games.find((game) => game.gameId === id);
}
function isEntryInList(list : GameList, entryId : number) {
  return list.entries.find((entry : ListEntry) => entry.entryId === entryId);
}
function isGameInList(list : GameList, gameId : number) {
  return list.entries.find((entry : ListEntry) => entry.gameId === gameId);
}
function addUser(user: User){
  let users = routesMethods.getUsers();
  if (users.find((u) => u.id === user.id)) return;
  users.push(user);
  routesMethods.setUsers(users);
}
function addList(list: GameList){
  let lists = routesMethods.getLists();
  if (lists.find((l) => l.userId === list.userId)) return;
  lists.push(list);
  routesMethods.setList(lists);
}
function addGame(game: Game){
  let games = routesMethods.getGames();
  if (games.find((g) => g.gameId === game.gameId)) return;
  games.push(game);
  routesMethods.setGames(games);
}
function addEntry(id: number, entry: ListEntry){
  let lists = routesMethods.getLists();
  let list = lists.find((l) => l.userId === id);
  if (!list) return;
  if (list.entries.find((e) => e.entryId === entry.entryId)) return;
  list.entries.push(entry);
  routesMethods.setList(lists);
}
export {getAuthenticatedUserID, setAuthenticatedUserID, 
        loggedInId, 
        getUser, getUsersList, getGame, 
        addUser, addList, addGame, addEntry,
        isEntryInList, isGameInList};