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
exports.GetAllComments = void 0;
const comments_repository_1 = require("../../repositories/comments-repository");
const common_1 = require("@nestjs/common");
let GetAllComments = class GetAllComments {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async execute(request) {
        const { page, perPage } = request;
        const comments = await this.commentRepository.findAll(page, perPage);
        return {
            first: comments.first,
            prev: comments.prev,
            next: comments.next,
            last: comments.last,
            pages: comments.pages,
            items: comments.items,
            total: comments.total,
            comments: comments.comments
        };
    }
};
exports.GetAllComments = GetAllComments;
exports.GetAllComments = GetAllComments = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentRepository])
], GetAllComments);
//# sourceMappingURL=get-all-comments.js.map