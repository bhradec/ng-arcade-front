import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../models/comment.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    comments: Comment[] = [];
    commentsChangeSubject: BehaviorSubject<Comment[]> = new BehaviorSubject(this.comments);

    constructor(private dataService: DataService) {
        this.dataService.getComments()
            .subscribe((res: { status: number, description?: string, comments: Comment[] }) => {
                this.comments = res.comments;
                this.commentsChangeSubject.next(this.comments);
            });
    }

    getComments() {
        return this.commentsChangeSubject;
    }

    addComment(comment) {
        this.dataService.addComment(comment)
            .subscribe((res: { status: number, description?: string, insertId?: number }) => {
                comment.id = res.insertId;
                this.comments.push(comment);
                this.commentsChangeSubject.next(this.comments);
            });
    }

    editComment(comment) {
        this.dataService.editComment(comment)
            .subscribe((res) => {
                this.comments[this.comments.findIndex(c => c.id == comment.id)] = comment;
                this.commentsChangeSubject.next(this.comments);
            });
    }

    deleteComment(id) {
        this.dataService.deleteComment(id)
            .subscribe((res) => {
                this.comments = this.comments.filter(comment => comment.id != id);
                this.commentsChangeSubject.next(this.comments);
            });
    }
}
