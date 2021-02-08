export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    level: number;

    constructor(id, username, email, password, level) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.level = level;
    }
}