import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {ThemePalette} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule, MatCheckboxChange} from '@angular/material/checkbox';
import {MatSelectModule, MatSelectChange} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule, MatChipListboxChange} from '@angular/material/chips'; 

import { Game } from '../../../../backend/src/models/game.model';
import { User } from '../../../../backend/src/models/user.model';
import { EntryType, ListEntry, GameList } from '../../../../backend/src/models/list.model';
import imageUtils from "../../assets/getImages.service";
import { url } from 'inspector';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgIf

  ]
  
})
export class GameListComponent implements OnInit{
  myControl = new FormControl();
  userId: number = 1;
  userLoggedInId: number = 1;
  addingGameId: number = -1;
  addingGameType: string = 'undefined';
  addingGameName: string = '';
  isUserLoggedIn: boolean = false;
  isAdding: boolean = false;
  isView : { [key: number]: boolean } = {};
  isDelete : { [key: number]: boolean } = {};
  isEdit : { [key: number]: boolean } = {};
  showGamesList: GameList = {userId : -1, entries : []};
  allGamesList: GameList = {userId : -1, entries : []};
  gamesTitles: {[key: number]: string} = {};
  entrytypes = ['played', 'wished', 'abandoned'];
  lastEditValue: {[key: number]: string} = {};
  gameOptions: number[] = [];
  filteredGameOption: number[] = [];
  entryOptions = {
    isAsc: false,
    order : 'date',
    subFilter: '',
    [String(EntryType.PLAYED)]: true,
    [String(EntryType.WISHLIST)]: true,
    [String(EntryType.ABANDONED)]: true
  }
  

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    if (this.route.parent) {
      
      this.route.parent.params.subscribe(params => {
        this.userId =+ params['id'];
        const url = `/users/${this.userId}/list`;
        this.http.get<GameList>(url).subscribe(list => {
          this.allGamesList = list;
          
          for (let entry of this.allGamesList.entries) {
              this.isView[entry.entryId - 1] = true;
              this.isDelete[entry.entryId - 1] = false;
              this.isEdit[entry.entryId - 1] = false
          }
          this.showGamesList = this.allGamesList;
          this.updateShowGamesList();
        });
        this.http.get('/me').subscribe(data => {
          const userLoggedIn = data as User;
          this.userLoggedInId =+ userLoggedIn.id;
          
          if (this.userLoggedInId === this.userId) {
            this.isUserLoggedIn = true;
          }
        })
        this.http.get<Game[]>('/games').subscribe(games => {
          for (let game of games) {
            this.gameOptions.push(game.gameId);
            this.gamesTitles[game.gameId] = game.gameName;
          }
          this.filteredGameOption = this.gameOptions;
          this.filteredGameOption = this.filteredGameOption.sort((a, b) => {
            const ag = this.gamesTitles[a];
            const bg = this.gamesTitles[b];
            if (!ag || !bg) {
              return 0;
            }
            return ag.localeCompare(bg);
          });
        });
        
      });
      
    }
  }
  
  _getGameTitle(gameId: number): Observable<string> {
    const url = `/games/${gameId}`;
    return this.http.get<Game>(url).pipe(
      map(game => game.gameName)
    );
  }
  _getGameImage(gameId : number) {
    const prefix = '../../'
    return imageUtils.getGameImage(prefix, gameId);
  }  
  _getDateString(date : Date) {
    const actDate = new Date(date);
    return actDate.toLocaleDateString();
  }
  _getEntryTypeColor(entryType: string): ThemePalette {
    switch (entryType) {
      case EntryType.PLAYED.toString():
        return 'primary';
      case EntryType.WISHLIST.toString():
        return 'accent';
      case EntryType.ABANDONED.toString():
        return 'warn';
      default:
        return undefined;
    }
  }
  _getEntryName(entryType : string): string {
    switch (entryType) {
      case EntryType.PLAYED.toString():
        return 'Finalizado';
      case EntryType.WISHLIST.toString():
        return 'Deseja Jogar';
      case EntryType.ABANDONED.toString():
        return 'Abandonado';
      case 'Finalizado':
        return EntryType.PLAYED.toString();
      case 'Deseja Jogar':
        return EntryType.WISHLIST.toString();
      case 'Abandonado':
        return EntryType.ABANDONED.toString();
      default:
        return 'Undefined';
    }
  }
  _setAddingGameName(ob: Event) {
    if (ob instanceof InputEvent) {
      this.addingGameName = ob.data ? this.addingGameName + ob.data : this.addingGameName.slice(0, -1);
    }
    this.filteredGameOption = this.gameOptions.filter(gameId => this.gamesTitles[gameId].toLowerCase().includes(this.addingGameName.toLowerCase()));
    this.filteredGameOption = this.filteredGameOption.sort((a, b) => {
      const ag = this.gamesTitles[a];
      const bg = this.gamesTitles[b];
      if (!ag || !bg) {
        return 0;
      }
      return ag.localeCompare(bg);
    });
  }
  _setAdding() {
    this.isAdding = true;
  }
  _setCancelAdding() {
    this.isAdding = false;
  }
  
  _setAddGame(gameName : string){
    this.addingGameId = this.gameOptions.find(gameId => this.gamesTitles[gameId] === gameName) || -1;
  }
  _setAddType(ob: MatChipListboxChange){
    this.addingGameType = this._getEntryName(ob.value);
  }
  _finishAdding(isAdd : boolean){
    this._setCancelAdding();
    if (!isAdd || this.addingGameId === -1 || this.addingGameType === 'undefined') {
      return;
    }
    const endpoint = '/users/' + this.userId + '/list';
    const newEntry = {
      gameId: this.addingGameId,
      entryType: this.addingGameType,
      reqDate: new Date()
    }
    this.http.post(endpoint, newEntry).subscribe(data => {
      this.allGamesList = data as GameList;
      this.updateShowGamesList();
      
    });
    
  }
  _setPlayed(ob: MatCheckboxChange) {
    this.entryOptions[EntryType.PLAYED.toString()] = ob.checked;
    this.updateShowGamesList();
  }
  _setAbandoned(ob: MatCheckboxChange) {
    this.entryOptions[EntryType.ABANDONED.toString()] = ob.checked;
    this.updateShowGamesList();
  }
  _setWishlist(ob: MatCheckboxChange) {
    this.entryOptions[EntryType.WISHLIST.toString()] = ob.checked;
    this.updateShowGamesList();
  }
  _setPreffix(ob: Event) {
    if (ob instanceof InputEvent) {
      this.entryOptions.subFilter = ob.data ? this.entryOptions.subFilter + ob.data : this.entryOptions.subFilter.slice(0, -1);
    }
    this.updateShowGamesList();
  }
  _setOrder(ob: MatSelectChange) {
    this.entryOptions.order = ob.value;
    this.updateShowGamesList();
  }
  _changeDir(){
    this.entryOptions.isAsc = !this.entryOptions.isAsc;
    this.updateShowGamesList();
  }
  _setDelete(id : number) {
    this.isView[id] = false;
    this.isDelete[id] = true;
    this.isEdit[id] = false;
  }
  _setEdit(id: number) {
    this.isView[id] = false;
    this.isDelete[id] = false;
    this.isEdit[id] = true;
    this.lastEditValue[id] = this.showGamesList.entries[id].entryType.toString();
  }
  _setView(id : number) {
    this.isView[id] = true;
    this.isDelete[id] = false;
    this.isEdit[id] = false;

  }
  _setEditSave(ob:  MatChipListboxChange, id: number) {
    this.lastEditValue[id] = this._getEntryName(ob.value);
  }
  _setSave(id: number){
    this._setView(id);
    const actDate = new Date()
    if (this.lastEditValue[id] === this.showGamesList.entries[id].entryType.toString()) {
      return;
    }
    this.showGamesList.entries[id].entryType = this.lastEditValue[id];
    this.showGamesList.entries[id].date = actDate;
    this.lastEditValue[id] = '';

    const idAll = this.allGamesList.entries.findIndex(entry => entry.entryId === this.showGamesList.entries[id].entryId);
    this.allGamesList.entries[idAll].entryType = this.showGamesList.entries[id].entryType;
    this.allGamesList.entries[idAll].date = actDate;
    const endpoint = '/users/' + this.userId + '/list/' + this.showGamesList.entries[id].entryId;
    const updatedEntry = this.showGamesList.entries[id].entryType;
    
    this.updateShowGamesList();
    this.http.put(endpoint, {entryType: updatedEntry, reqDate: actDate}).subscribe(data => {
      console.log(data + ' updated');
    });
    
    
  }
  _setDeleteConfirm(id: number) {
    this._setView(id);
    // Remove from allGamesList and showGamesList
    console.log("Deleting:")
    console.log(this.showGamesList.entries[id]);
    console.log(this.showGamesList.entries);
    const entryIdDel = this.showGamesList.entries[id].entryId;
    const idAll = this.allGamesList.entries.findIndex(entry => entry.entryId === this.showGamesList.entries[id].entryId);
    this.allGamesList.entries.splice(idAll, 1);
    this.showGamesList.entries.splice(id, 1);
    // Remove from database
    const endpoint = '/users/' + this.userId + '/list/' + entryIdDel;
    this.updateShowGamesList();
    console.log(this.showGamesList.entries);
    this.http.delete(endpoint).subscribe(data => {
      console.log(data + ' deleted');
    });
  }
  returnGameTitle(gameId: number): string {
    const title = this.gamesTitles[gameId];
    return title ? title : 'undefined';
  }
  updateShowGamesList() {
    // if any of the entry types is on edit or delete, do not update the list
    
    for (let i = 0; i < this.showGamesList.entries.length; i++) {
      if (this.isDelete[i] || this.isEdit[i]) {
        return;
      }
    }
    this.showGamesList = this.allGamesList;
    this.showGamesList = {userId : this.allGamesList.userId, entries : []};
    for (let entry of this.allGamesList.entries) {
      const isValid : boolean = this.entryOptions[entry.entryType.toString()] == true &&
                                this.returnGameTitle(entry.gameId).toLowerCase().includes(this.entryOptions.subFilter.toLowerCase());
      if (isValid) {
        this.showGamesList.entries.push(entry);
      }
    }
    for (let i = 0; i < this.showGamesList.entries.length; i++) {
      this._setView(i);
    }
    const criteria = this.entryOptions.order;
    const order = this.entryOptions.isAsc ? 'asc' : 'desc';
    const orderedEntries = this.showGamesList.entries.sort((a, b) => {
      if (criteria === 'date') {
        const at = new Date(a.date).getTime();
        const bt = new Date(b.date).getTime();
        return (order.localeCompare('asc') == 0) ? (at - bt) : (bt - at);
      }
      if (criteria === 'title') {
        const ag = this.returnGameTitle(a.gameId);
        const bg = this.returnGameTitle(b.gameId);
        if (!ag || !bg) {
          return 0;
        }
        return (order.localeCompare('asc') == 1) ? (ag.localeCompare(bg)) : (bg.localeCompare(ag));
      }
      return 0;
    });
    this.showGamesList.entries = orderedEntries;
  }
}
