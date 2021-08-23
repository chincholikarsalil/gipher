export class Card {
    imgUrl: string;
    title: string;
    recommend: boolean;

    constructor(title: string, imgUrl: string) {
        this.title = title;
        this.imgUrl = imgUrl;
        this.recommend = false;
    }
    
}