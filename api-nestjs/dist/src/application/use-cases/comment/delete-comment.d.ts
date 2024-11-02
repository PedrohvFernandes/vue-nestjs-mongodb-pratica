import { CommentRepository } from '@src/application/repositories/comments-repository';
interface DeleteCommentRequest {
    id: string;
    userId: string;
}
export declare class DeleteComment {
    private readonly commentRepository;
    constructor(commentRepository: CommentRepository);
    execute(request: DeleteCommentRequest): Promise<void>;
}
export {};
