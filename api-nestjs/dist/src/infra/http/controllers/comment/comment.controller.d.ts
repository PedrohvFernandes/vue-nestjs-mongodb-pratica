import { Comment } from '@src/application/entities/comment';
import { User } from '@src/application/entities/user';
import { CreateComment } from '@src/application/use-cases/comment/create-comment';
import { GetAllComments } from '@src/application/use-cases/comment/get-all-comments';
import { UpdateComment } from '@src/application/use-cases/comment/update-comment';
import { CreateCommentBody } from '@infra/http/dtos/comment/create-comment-body';
import { UpdateCommentBody } from '@infra/http/dtos/comment/update-comment-body';
import { DeleteComment } from '@src/application/use-cases/comment/delete-comment';
export declare class CommentController {
    private readonly createComment;
    private readonly getAllComments;
    private readonly updateComment;
    private readonly deleteComment;
    constructor(createComment: CreateComment, getAllComments: GetAllComments, updateComment: UpdateComment, deleteComment: DeleteComment);
    allComments(page: string, perPage: string): Promise<{
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
    }>;
    create(body: CreateCommentBody): Promise<Comment>;
    update(body: UpdateCommentBody, id: string, userId: string): Promise<Comment>;
    delete(id: string, userId: string): Promise<void>;
}
