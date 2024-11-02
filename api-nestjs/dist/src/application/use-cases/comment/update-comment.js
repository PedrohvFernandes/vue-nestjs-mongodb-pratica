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
exports.UpdateComment = void 0;
const comments_repository_1 = require("../../repositories/comments-repository");
const comment_not_found_1 = require("../errors/comment-not-found");
const user_not_owner_1 = require("../errors/user-not-owner");
const title_1 = require("../../entities/title");
const content_1 = require("../../entities/content");
const comment_1 = require("../../entities/comment");
const common_1 = require("@nestjs/common");
const error_content_or_title_1 = require("../errors/error-content-or-title");
let UpdateComment = class UpdateComment {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async execute(request) {
        if (!request.content && !request.title) {
            throw new common_1.BadRequestException(new error_content_or_title_1.ErrorContentOrTitle().message);
        }
        if (request.title && request.title.length < 5) {
            throw new common_1.BadRequestException(new error_content_or_title_1.ErrorContentOrTitle('O título deve ter no mínimo 5 caracteres').message);
        }
        if (request.content && request.content.length < 1) {
            throw new common_1.BadRequestException(new error_content_or_title_1.ErrorContentOrTitle('O conteúdo deve ter no mínimo 1 caracteres').message);
        }
        const commentUpdate = await this.commentRepository.findById(request.id);
        if (request.title === commentUpdate.title.value &&
            request.content === commentUpdate.content.value) {
            throw new common_1.BadRequestException(new error_content_or_title_1.ErrorContentOrTitle('O conteúdo e o título são iguais ao atual').message);
        }
        if (request.title === commentUpdate.title.value) {
            throw new common_1.BadRequestException(new error_content_or_title_1.ErrorContentOrTitle('O título é igual ao atual').message);
        }
        if (request.content === commentUpdate.content.value) {
            throw new common_1.BadRequestException(new error_content_or_title_1.ErrorContentOrTitle('O conteúdo é igual ao atual').message);
        }
        if (!commentUpdate) {
            throw new common_1.NotFoundException(new comment_not_found_1.CommentNotFound().message);
        }
        const userIsOwner = commentUpdate.userId === request.userId;
        if (!userIsOwner) {
            throw new common_1.NotFoundException(new user_not_owner_1.UserNotOwner().message);
        }
        const commentUpdated = new comment_1.Comment({
            ...commentUpdate.valuesComment,
            content: new content_1.Content(!request.content ? commentUpdate.content.value : request.content),
            title: new title_1.Title(!request.title ? commentUpdate.title.value : request.title),
            updatedAt: new Date()
        }, commentUpdate.id);
        const comment = await this.commentRepository.update(commentUpdated);
        return {
            comment
        };
    }
};
exports.UpdateComment = UpdateComment;
exports.UpdateComment = UpdateComment = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentRepository])
], UpdateComment);
//# sourceMappingURL=update-comment.js.map