import { Comment } from '@application/entities/comment';
import { CommentRepository } from '@application/repositories/comments-repository';
import { User } from '@src/application/entities/user';
interface CommentRequestProps {
    page: number;
    perPage: number;
}
interface CommentResponseProps {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    total: number;
    comments: {
        comment: Comment;
        user: User;
    }[];
}
export declare class GetAllComments {
    private readonly commentRepository;
    constructor(commentRepository: CommentRepository);
    execute(request: CommentRequestProps): Promise<CommentResponseProps>;
}
export {};
