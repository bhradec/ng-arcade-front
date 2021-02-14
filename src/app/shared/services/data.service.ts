import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    apiRootURL: string = environment.API_URL;
    apiUsersURL: string = environment.API_URL + "users/";
    apiGameAuthorsURL: string = environment.API_URL + "gameAuthors/";
    apiGamesURL: string = environment.API_URL + "games/";
    apiGamesByAuthorURL: string = environment.API_URL + "games/byAuthor/";
    apiGameImagesURL: string = environment.API_URL + "games/uploadGameImage/";
    apiCommentsURL: string = environment.API_URL + "comments/";
    apiCommentsByGameURL: string = environment.API_URL + "comments/byGame/";
    apiCommentsByUserURL: string = environment.API_URL + "comments/byUser/";
    apiGamesUsersURL: string = environment.API_URL + "gamesUsers/";
    apiGamesUsersByUserURL: string = environment.API_URL + "gamesUsers/byUser/";
    apiAuthURL: string = environment.API_URL + 'auth/';

    constructor(private httpClient: HttpClient) { }

    // Users.

    getUsers() {
        return this.httpClient.get(this.apiUsersURL);
    }

    getUser(id) {
        return this.httpClient.get(this.apiUsersURL + id);
    }

    addUser(user) {
        return this.httpClient.post(this.apiUsersURL, user);
    }

    editUser(user) {
        return this.httpClient.put(this.apiUsersURL, user);
    }

    deleteUser(id) {
        return this.httpClient.delete(this.apiUsersURL + id);
    }

    // Game authors.

    getGameAuthors() {
        return this.httpClient.get(this.apiGameAuthorsURL);
    }

    getGameAuthor(id) {
        return this.httpClient.get(this.apiGameAuthorsURL + id);
    }

    addGameAuthor(gameAuthor) {
        return this.httpClient.post(this.apiGameAuthorsURL, gameAuthor);
    }

    editGameAuthor(gameAuthor) {
        return this.httpClient.put(this.apiGameAuthorsURL, gameAuthor);
    }

    deleteGameAuthor(id) {
        return this.httpClient.delete(this.apiGameAuthorsURL + id);
    }

    // Games.

    getGames() {
        return this.httpClient.get(this.apiGamesURL);
    }

    getGamesByAuthor(id) {
        return this.httpClient.get(this.apiGamesByAuthorURL + id);
    }

    getGame(id) {
        return this.httpClient.get(this.apiGamesURL + id);
    }

    /* Prlikom dodavanja igre šalje se multipart forma jer se šalje 
    i slika igre zajedno sa drugim tekstualnim poljima. */
    addGame(gameFormData) {
        return this.httpClient.post(this.apiGamesURL, gameFormData);
    }

    /* Prlikom uređivanja igre šalje se multipart forma jer se šalje 
    i slika igre zajedno sa drugim tekstualnim poljima. */
    editGame(gameFormData) {
        return this.httpClient.put(this.apiGamesURL, gameFormData);
    }

    deleteGame(id) {
        return this.httpClient.delete(this.apiGamesURL + id);
    }

    uploadGameImage(gameId, gameImage) {
        return this.httpClient.post(this.apiGameImagesURL + gameId, gameImage);
    }

    // Comments.

    getComments() {
        return this.httpClient.get(this.apiCommentsURL);
    }

    getCommentsByGame(id) {
        return this.httpClient.get(this.apiCommentsByGameURL + id);
    }

    getCommentsByUser(id) {
        return this.httpClient.get(this.apiCommentsByUserURL + id);
    }

    getComment(id) {
        return this.httpClient.get(this.apiCommentsURL + id);
    }

    addComment(comment) {
        return this.httpClient.post(this.apiCommentsURL, comment);
    }

    editComment(comment) {
        return this.httpClient.put(this.apiCommentsURL, comment);
    }

    deleteComment(id) {
        return this.httpClient.delete(this.apiCommentsURL + id);
    }

    // GamesUsers.

    getGamesPlayedByUsers() {
        return this.httpClient.get(this.apiGamesUsersURL);
    }

    getGamesPlayedByUser(id) {
        return this.httpClient.get(this.apiGamesUsersByUserURL + id);
    }

    addGamePlayedByUser(userId, gameId, timestamp) {
        return this.httpClient.post(this.apiGamesUsersURL, {
            userId: userId,
            gameId: gameId,
            timestamp: timestamp
        });
    }

    // Authentication.

    authenticateUser(username, password) {
        return this.httpClient.post(this.apiAuthURL, {
            username: username,
            password: password,
        });
    }
}
