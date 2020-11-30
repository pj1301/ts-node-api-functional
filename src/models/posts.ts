export class Post {
    title: string;
    content: string;
    _id: string;

    constructor(post: Post) {
        this.title = post.title;
        this.content = post.content;
        this._id = post._id ?? '';
    }
}
