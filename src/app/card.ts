export class Card {
    id: string;
    imgUrl: string;
    title: string;
    recommendCount: number;

    constructor(id: string, title: string, imgUrl: string) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.recommendCount = 0;
    }
    
}