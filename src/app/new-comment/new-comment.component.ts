import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/models/comment.model';
import { User } from '../shared/models/user.model';
import { CommentService } from '../shared/services/comment.service';

@Component({
    selector: 'app-new-comment',
    templateUrl: './new-comment.component.html',
    styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {
    newComment: Comment;
    newCommentForm: FormGroup;

    @Input() user: User;
    @Input() gameId: number;

    constructor(
        private formBuilder: FormBuilder,
        private commentService: CommentService) { }

    ngOnInit(): void {
        this.newCommentForm = this.formBuilder.group({
            "usernameInput": new FormControl({ value: this.user.username, disabled: true }),
            "commentInput": new FormControl("", Validators.required)
        });
    }

    get usernameInput() { return this.newCommentForm.get("usernameInput"); }
    get commentInput() { return this.newCommentForm.get("commentInput"); }

    isInputInvalid(input) {
        return input.invalid && (input.dirty || input.touched);
    }

    onSubmit(): void {
        this.newComment = new Comment();

        this.newComment.comment = this.commentInput.value;
        this.newComment.timestamp = new Date();
        this.newComment.userId = this.user.id;
        this.newComment.gameId = this.gameId;
        this.newComment.username = this.user.username;

        this.commentService.addComment(this.newComment);
    }
}
