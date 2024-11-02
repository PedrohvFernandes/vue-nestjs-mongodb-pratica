"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const create_comment_1 = require("../../../../application/use-cases/comment/create-comment");
const get_all_comments_1 = require("../../../../application/use-cases/comment/get-all-comments");
const update_comment_1 = require("../../../../application/use-cases/comment/update-comment");
const create_comment_body_1 = require("../../dtos/comment/create-comment-body");
const update_comment_body_1 = require("../../dtos/comment/update-comment-body");
const delete_comment_1 = require("../../../../application/use-cases/comment/delete-comment");
let CommentController = class CommentController {
    constructor(createComment, getAllComments, updateComment, deleteComment) {
        this.createComment = createComment;
        this.getAllComments = getAllComments;
        this.updateComment = updateComment;
        this.deleteComment = deleteComment;
    }
    async allComments(page, perPage) {
        const pageNumber = Number(page) || 1;
        const perPageNumber = Number(perPage) || 16;
        const { comments, first, items, last, next, pages, prev, total } = await this.getAllComments.execute({
            page: pageNumber,
            perPage: perPageNumber
        });
        return {
            first,
            items,
            last,
            next,
            pages,
            prev,
            total,
            comments
        };
    }
    async create(body) {
        const { content, userId, title } = body;
        const { comment } = await this.createComment.execute({
            content,
            userId,
            title
        });
        return comment;
    }
    async update(body, id, userId) {
        const { comment } = await this.updateComment.execute({
            id,
            userId,
            content: body.content,
            title: body.title
        });
        return comment;
    }
    async delete(id, userId) {
        await this.deleteComment.execute({ id, userId });
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('perPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "allComments", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_body_1.CreateCommentBody]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('commentId')),
    __param(2, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_comment_body_1.UpdateCommentBody, String, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('commentId')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "delete", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [create_comment_1.CreateComment,
        get_all_comments_1.GetAllComments,
        update_comment_1.UpdateComment,
        delete_comment_1.DeleteComment])
], CommentController);
//# sourceMappingURL=comment.controller.js.map