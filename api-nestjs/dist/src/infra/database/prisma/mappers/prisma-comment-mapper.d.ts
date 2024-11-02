import { Comment } from '@src/application/entities/comment';
import { Comment as RawComment } from '@prisma/client';
export declare class PrismaCommentMapper {
    static toPrisma(comment: Comment): {
        title: string;
        content: string;
        updatedAt: Date;
        userId: string;
    };
    static toDomain(raw: RawComment): Comment;
}
