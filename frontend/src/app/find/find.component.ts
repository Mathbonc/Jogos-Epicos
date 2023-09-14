import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../backend/src/models/user.model';
import imageUtils from "../../assets/getImages.service";

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent {
  query: string = '';
  users: User[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

onSearch() {
  if(this.query == '') {
    this.users = []
  } else if (this.query.length < 30) {
    this.http.get<any[]>(`/search/users/${this.query}`).subscribe(
      data => {
        this.users = data.slice(0, 10);
        },
      error => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
    } else {
      this.users = [];
    }
  }

  onUserClick(userId: number) {
    this.router.navigate([`/users/${userId}`]);
  }

  _getProfileImage(userId : number) {
    const prefix = '../../'
    return imageUtils.getProfileImage(prefix, userId);
  }

  _getBackgroundImage(userId : number) {
    const prefix = '../../'
    return imageUtils.getBackgroundImage(prefix, userId);
  }

}

