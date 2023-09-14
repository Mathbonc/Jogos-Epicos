import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../backend/src/models/user.model';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})


export class MeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {};

  ngOnInit(): void {
    this.navigateToUserLoggedIn();
  }

  navigateToUserLoggedIn(){
    this.http.get('/me').subscribe(data => {
      const userLoggedIn = data as User;
      this.router.navigate(['/users/' + userLoggedIn.id]);
    });
  }

}
