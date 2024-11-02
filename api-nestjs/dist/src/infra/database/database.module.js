"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const comments_repository_1 = require("../../application/repositories/comments-repository");
const prisma_comment_repository_1 = require("./prisma/repositories/prisma-comment-repository");
const users_repository_1 = require("../../application/repositories/users-repository");
const prisma_user_repository_1 = require("./prisma/repositories/prisma-user-repository");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        exports: [comments_repository_1.CommentRepository, users_repository_1.UserRepository],
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: comments_repository_1.CommentRepository,
                useClass: prisma_comment_repository_1.PrismaCommentRepository
            },
            {
                provide: users_repository_1.UserRepository,
                useClass: prisma_user_repository_1.PrismaUserRepository
            }
        ]
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map