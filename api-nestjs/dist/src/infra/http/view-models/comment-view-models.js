"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentViewModel = void 0;
class CommentViewModel {
    static toHTTP(comment) {
        return {
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            userId: comment.userId
        };
    }
}
exports.CommentViewModel = CommentViewModel;
//# sourceMappingURL=comment-view-models.js.map