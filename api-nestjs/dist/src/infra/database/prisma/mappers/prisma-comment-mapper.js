"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCommentMapper = void 0;
const comment_1 = require("../../../../application/entities/comment");
const content_1 = require("../../../../application/entities/content");
const title_1 = require("../../../../application/entities/title");
class PrismaCommentMapper {
    static toPrisma(comment) {
        return {
            title: comment.title.value,
            content: comment.content.value,
            updatedAt: comment.updatedAt,
            userId: comment.userId
        };
    }
    static toDomain(raw) {
        return new comment_1.Comment({
            content: new content_1.Content(raw.content),
            title: new title_1.Title(raw.title),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            userId: raw.userId
        }, raw.id);
    }
}
exports.PrismaCommentMapper = PrismaCommentMapper;
//# sourceMappingURL=prisma-comment-mapper.js.map