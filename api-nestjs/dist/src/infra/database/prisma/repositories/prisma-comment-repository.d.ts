import { CommentRepository } from '@src/application/repositories/comments-repository';
import { Comment } from '@src/application/entities/comment';
import { PrismaService } from '../prisma.service';
import { User } from '@src/application/entities/user';
export declare class PrismaCommentRepository implements CommentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(comment: Comment): Promise<Comment>;
    update(comment: Comment): Promise<Comment>;
    findById(commentId: string): Promise<Comment>;
    findAll(page: number, perPage: number): Promise<{
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
    delete(commentId: string): Promise<void>;
}
