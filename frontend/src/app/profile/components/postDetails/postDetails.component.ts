import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../../../../../backend/src/models/post.model';
import { catchError } from 'rxjs';
import { User } from '../../../../../../backend/src/models/user.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './postDetails.component.html',
  styleUrls: ['./postDetails.component.scss'],
})

export class PostDetailComponent implements OnInit {
  userId : number = 0;
  postId: number = 0;
  user : User = {} as User;
  post : Post = {} as Post;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('post_id'));

    if (this.route.parent) {
      this.route.parent.params.subscribe(params => {
        this.userId = params['id'];
      });
    }

      console.log(this.post)
      this.post = {
        user_id: this.userId,
        post_id: this.postId,
        status: this.post.status,
        date: '14/09',
        category: ['Aventura'],
        game: 'Celeste',
        rate: 5,
        title: 'Muito bom o jogo',
        description: 'Me diverti muito jogando celeste',
        comments: 3,
      };
      console.log(this.post.post_id)
      console.log(this.post.user_id)
    
      };
  }
