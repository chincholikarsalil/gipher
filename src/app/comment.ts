export class Comment {
    cardId!: string;
    comments: Array<CommentDetails> = new Array<CommentDetails>();

    constructor() {}
}

export class CommentDetails {
    commentId!: string;
    comment!: string;
    likes!: number;

    constructor() {
        this.likes = 0;
    }
}

export class TweakComment {
    cardId!: string;
    comments!: string

    constructor() { }
}
