import { CommentRepository } from '@application/repositories/comments-repository';
import { Comment } from '@application/entities/comment';
interface UpdateCommentRequest {
    id: string;
    userId: string;
    content?: string;
    title?: string;
}
interface UpdateCommentResponse {
    comment: Comment;
}
export declare class UpdateComment {
    private readonly commentRepository;
    constructor(commentRepository: CommentRepository);
    execute(request: UpdateCommentRequest): Promise<UpdateCommentResponse>;
}
export {};
