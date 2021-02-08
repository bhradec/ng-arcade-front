export class Comment {
    id: number;
    comment: string;
    timestamp: Date;
    userId: number;
    gameId: number;
    username?: string;

    constructor(id, comment, timestamp, userId, gameId, username?) {
        this.id = id;
        this.comment = comment;
        this.timestamp = timestamp;
        this.userId = userId;
        this.gameId = gameId;
        
        if (username) { this.username = username; }
    }
}
