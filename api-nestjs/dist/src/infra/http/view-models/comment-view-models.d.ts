import { Comment } from '@src/application/entities/comment';
export declare class CommentViewModel {
    static toHTTP(comment: Comment): {
        id: string;
        content: import("../../../application/entities/content").Content;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    };
}
