import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../backend/src/models/user.model'; // Update this path to the location of your User model
import { Observable } from 'rxjs';
import imageUtils from "../../assets/getImages.service";
@Component({
    selector: 'app-followers',
    templateUrl: './followers.component.html',
    styleUrls: ['./followers.component.scss'],
})

export class FollowersComponent implements OnInit {
    @Input() userId: number = -1;
    @Input() activeTab: string = 'followers';
    @Output() followersCountUpdated: EventEmitter<number> = new EventEmitter<number>();
    @Output() followingCountUpdated: EventEmitter<number> = new EventEmitter<number>();
    @Output() followersListUpdated: EventEmitter<User[]> = new EventEmitter<User[]>();
    @Output() followingListUpdated: EventEmitter<User[]> = new EventEmitter<User[]>();

    followers: User[] = [];
    following: User[] = [];
    followersCount: number = 0;
    followingCount: number = 0;
    followListShow : User[] = [];
    followListTitle : string = "";

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        // Se userId não foi passado como entrada, pegue-o da rota
        if (this.userId === -1) {
            const routeUserId = this.route.snapshot.paramMap.get('id');
            if (routeUserId) {
                this.userId = Number(routeUserId);
            }
        }


        const userId = this.userId;

        if (userId) {
            this.setActiveTab(this.activeTab);
        }

    }

    setActiveTab(tab: string) {
        this.activeTab = tab;
        this.getFollowersCount(Number(this.userId)).subscribe(response => {
            this.followersCount = response.followersCount;
            this.followersCountUpdated.emit(response.followersCount);
            if(this.activeTab === 'followers'){
                this.getFollowers(Number(this.userId)).subscribe(data => {
                    this.followListShow = data;
                });
                this.followListTitle = "Seguidores" + " (" + this.followersCount + ")";
            }
        });

        this.getFollowingCount(Number(this.userId)).subscribe(response => {
            this.followingCount = response.followingCount;
            this.followingCountUpdated.emit(response.followingCount);
            if(this.activeTab !== 'followers'){
                this.getFollowing(Number(this.userId)).subscribe(data => {
                    this.followListShow = data;
                });
                this.followListTitle = "Seguindo" + " (" + this.followingCount + ")";
            }
        });
    }

    getFollowers(userId: number): Observable<User[]> {
        return this.http.get<User[]>(`/users/${userId}/followers`);
    }

    getFollowing(userId: number): Observable<User[]> {
        return this.http.get<User[]>(`/users/${userId}/following`);
    }

    getFollowingCount(userId: number): Observable<{ followingCount: number }> {
        return this.http.get<{ followingCount: number }>(`/users/${userId}/following/count`);
    }

    getFollowersCount(userId: number): Observable<{ followersCount: number }> {
        return this.http.get<{ followersCount: number }>(`/users/${userId}/followers/count`);
    }

    getBlocked(userId: number): Observable<User[]> {
        return this.http.get<User[]>(`/users/${userId}/blocked`);
    }

    getBlockedCount(userId: number): Observable<{ blockedCount: number }> {
        return this.http.get<{ blockedCount: number }>(`/users/${userId}/blocked/count`);
    }

    navigateToUser(userId: number) {
        this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
            this.router.navigate([`/users/${userId}`]);
        });
    }

    _getProfileImage(userId : number) {
        const prefix = '../../../../'
        return imageUtils.getProfileImage(prefix, userId);
  }

}
