import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from '../shared/models/comment.model';
import { User } from '../shared/models/user.model';
import { CommentService } from '../shared/services/comment.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
    editCommentForm: FormGroup;
    editMode: boolean = false;

    @Input() comment: Comment;
    @Input() user: User;
    @Input() enableEdit: boolean;

    constructor(
        private commentService: CommentService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.editCommentForm = this.formBuilder.group({
            "commentInput": new FormControl({
                value: this.comment.comment,
                disabled: true
            }, Validators.required)
        });
    }

    get commentInput() { return this.editCommentForm.get("commentInput"); }

    isInputInvalid(input) {
        return input.invalid && (input.dirty || input.touched);
    }

    editComment() {
        this.editMode = true;
        this.commentInput.enable();
    }

    cancelEditComment() {
        this.editMode = false;
        this.commentInput.setValue(this.comment.comment);
        this.commentInput.disable();
    }

    deleteComment() {
        this.commentService.deleteComment(this.comment.id);
    }

    onSubmit() {
        this.commentInput.disable()
        this.editMode = false;
        let editedComment = new Comment();
        editedComment = this.comment;
        editedComment.comment = this.commentInput.value;
        editedComment.timestamp = new Date();
        this.commentService.editComment(editedComment);
    }
}
