export class Game {
    id: number;
    name: string;
    link: string;
    sourceLink: string;
    imagePath: string;
    gameAuthorId: number;
    gameAuthorName?: string;

    constructor(id, name, link, sourceLink, imagePath, gameAuthorId, gameAuthorName?) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.sourceLink = sourceLink;
        this.imagePath = imagePath;
        this.gameAuthorId = gameAuthorId;

        if (gameAuthorName) { this.gameAuthorName = gameAuthorName; }
    }
}