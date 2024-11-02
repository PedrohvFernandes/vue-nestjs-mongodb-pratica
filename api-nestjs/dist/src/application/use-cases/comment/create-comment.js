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
exports.CreateComment = void 0;
const comment_1 = require("../../entities/comment");
const content_1 = require("../../entities/content");
const title_1 = require("../../entities/title");
const comments_repository_1 = require("../../repositories/comments-repository");
const common_1 = require("@nestjs/common");
const error_create_comment_1 = require("../errors/error-create-comment");
let CreateComment = class CreateComment {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async execute(request) {
        const { content, title, userId } = request;
        const commentCreated = new comment_1.Comment({
            userId,
            content: new content_1.Content(content),
            title: new title_1.Title(title)
        });
        const comment = await this.commentRepository.create(commentCreated);
        if (!comment) {
            throw new common_1.BadRequestException(new error_create_comment_1.ErrorCreateComment().message);
        }
        return {
            comment
        };
    }
};
exports.CreateComment = CreateComment;
exports.CreateComment = CreateComment = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentRepository])
], CreateComment);
//# sourceMappingURL=create-comment.js.map