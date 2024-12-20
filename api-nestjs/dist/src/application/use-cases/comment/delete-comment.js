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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteComment = void 0;
const common_1 = require("@nestjs/common");
const comments_repository_1 = require("../../repositories/comments-repository");
const comment_not_found_1 = require("../errors/comment-not-found");
const user_not_owner_1 = require("../errors/user-not-owner");
let DeleteComment = class DeleteComment {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async execute(request) {
        const comment = await this.commentRepository.findById(request.id);
        if (!comment) {
            throw new common_1.NotFoundException(new comment_not_found_1.CommentNotFound().message);
        }
        const userIsOwner = comment.userId === request.userId;
        if (!userIsOwner) {
            throw new common_1.NotFoundException(new user_not_owner_1.UserNotOwner().message);
        }
        await this.commentRepository.delete(request.id);
    }
};
exports.DeleteComment = DeleteComment;
exports.DeleteComment = DeleteComment = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentRepository])
], DeleteComment);
//# sourceMappingURL=delete-comment.js.map