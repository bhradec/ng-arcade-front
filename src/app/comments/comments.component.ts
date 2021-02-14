import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Comment } from '../shared/models/comment.model';
import { Game } from '../shared/models/game.model';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { CommentService } from '../shared/services/comment.service';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
    @Input() gameId: number;
    
    isUserAuthenticated: boolean = false;
    displayNewCommentComponent: boolean = false;
    authChangeSubscription: Subscription;
    commentsChangeSubject: BehaviorSubject<Comment[]>;
    commentsChangeSubscription: Subscription;
    comments: Comment[] = [];
    user: User;

    constructor(
        private authService: AuthService,
        private commentService: CommentService,
        private router: Router) { }

    ngOnInit() {
        this.isUserAuthenticated = this.authService.isAuthenticated();
        this.user = this.authService.getUser();

        this.authChangeSubscription = this.authService.authChangeSubject
            .subscribe((res: boolean) => {
                this.isUserAuthenticated = res;
                if (this.isUserAuthenticated) {
                    this.user = this.authService.getUser();
                } else {
                    this.router.navigate(["/login"]);
                }
            });

        this.commentsChangeSubject = this.commentService.getComments();
        this.commentsChangeSubscription = this.commentsChangeSubject
            .subscribe((res: Comment[]) => {
                this.comments = res.filter((comment) => {
                    return comment.gameId == this.gameId;
                });
            });
    }

    ngOnDestroy() {
        this.authChangeSubscription.unsubscribe();
        this.commentsChangeSubscription.unsubscribe();
    }
}
