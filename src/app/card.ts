export class Card {
    id: string;
    imgUrl: string;
    title: string;
    recommend: boolean;

    constructor(id: string, title: string, imgUrl: string) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.recommend = false;
    }
    
}