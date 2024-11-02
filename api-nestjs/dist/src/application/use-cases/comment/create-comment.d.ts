import { Comment } from '@application/entities/comment';
import { CommentRepository } from '@application/repositories/comments-repository';
interface CreateCommentRequest {
    content: string;
    title: string;
    userId: string;
}
interface CreateCommentResponse {
    comment: Comment;
}
export declare class CreateComment {
    private readonly commentRepository;
    constructor(commentRepository: CommentRepository);
    execute(request: CreateCommentRequest): Promise<CreateCommentResponse>;
}
export {};
